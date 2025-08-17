import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables
const {
  ADMIN_TOKEN,
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = 587,
  SMTP_USER,
  SMTP_PASS,
  ALERT_TO,
  SLACK_WEBHOOK,
  TZ = 'Asia/Seoul'
} = process.env;

// Set timezone
process.env.TZ = TZ;

// Database setup
const db = new Database('yeyakbot.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    data TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    user_agent TEXT
  )
`);

// SMTP transporter
const transporter = SMTP_USER && SMTP_PASS ? nodemailer.createTransporter({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
}) : null;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// CORS for yeyakbot.com
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin.includes('yeyakbot.com')) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Form webhook
app.post('/api/webhook/form', async (req, res) => {
  try {
    const formData = req.body;
    const clientIP = req.ip;
    const userAgent = req.get('User-Agent');

    // Store in database
    const stmt = db.prepare('INSERT INTO submissions (type, data, ip_address, user_agent) VALUES (?, ?, ?, ?)');
    stmt.run('form', JSON.stringify(formData), clientIP, userAgent);

    // Send notifications
    await sendFormNotification(formData);

    res.json({ success: true, message: '예약 접수 완료' });
  } catch (error) {
    console.error('Form webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Demo webhook  
app.post('/api/webhook/demo', async (req, res) => {
  try {
    const demoData = req.body;
    const clientIP = req.ip;
    const userAgent = req.get('User-Agent');

    // Store in database
    const stmt = db.prepare('INSERT INTO submissions (type, data, ip_address, user_agent) VALUES (?, ?, ?, ?)');
    stmt.run('demo', JSON.stringify(demoData), clientIP, userAgent);

    // Send notifications
    await sendDemoNotification(demoData);

    res.json({ success: true, message: '데모 예약 완료' });
  } catch (error) {
    console.error('Demo webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin dashboard
app.get('/admin', (req, res) => {
  const token = req.query.token;
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const stats = db.prepare(`
      SELECT 
        type,
        COUNT(*) as count,
        DATE(timestamp) as date
      FROM submissions 
      WHERE timestamp >= datetime('now', '-30 days')
      GROUP BY type, DATE(timestamp)
      ORDER BY timestamp DESC
    `).all();

    const recent = db.prepare(`
      SELECT *
      FROM submissions
      ORDER BY timestamp DESC
      LIMIT 50
    `).all();

    res.json({ stats, recent });
  } catch (error) {
    console.error('Admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Notification functions
async function sendFormNotification(data) {
  const subject = `📞 새 예약 문의: ${data.name || '이름 없음'}`;
  const body = `
새로운 예약 문의가 접수되었습니다.

👤 고객 정보:
- 이름: ${data.name || 'N/A'}
- 연락처: ${data.contact || 'N/A'}
- 사업 유형: ${data.business_type || 'N/A'}
- 위치: ${data.location || 'N/A'}

💼 문의 내용:
- 문의 유형: ${data.inquiry_type || 'N/A'}
- 예산: ${data.budget || 'N/A'}
- 연락 가능 시간: ${data.call_time || 'N/A'}
- 추가 메모: ${data.notes || 'N/A'}

접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: TZ })}
  `;

  // Email notification
  if (transporter && ALERT_TO) {
    try {
      await transporter.sendMail({
        from: SMTP_USER,
        to: ALERT_TO,
        subject,
        text: body
      });
    } catch (error) {
      console.error('Email send error:', error);
    }
  }

  // Slack notification
  if (SLACK_WEBHOOK) {
    try {
      await axios.post(SLACK_WEBHOOK, {
        text: `🚀 새 고객 문의\n고객: ${data.name} (${data.contact})\n사업: ${data.business_type} / ${data.location}\n예산: ${data.budget}\n연락가능: ${data.call_time}`
      });
    } catch (error) {
      console.error('Slack send error:', error);
    }
  }
}

async function sendDemoNotification(data) {
  const subject = `📅 데모 예약 확정: ${data.company || '회사명 없음'}`;
  const body = `
새로운 데모 예약이 확정되었습니다.

🏢 회사 정보:
- 회사명: ${data.company || 'N/A'}
- 업종: ${data.industry || 'N/A'}
- 월 문의량: ${data.monthly_inquiries || 'N/A'}
- 놓치는 시간대: ${data.missed_periods || 'N/A'}

📅 예약 정보:
- 예약 시간: ${data.scheduled_time || 'N/A'}
- 참석자: ${data.attendee || 'N/A'}

접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: TZ })}
  `;

  // Email notification
  if (transporter && ALERT_TO) {
    try {
      await transporter.sendMail({
        from: SMTP_USER,
        to: ALERT_TO,
        subject,
        text: body
      });
    } catch (error) {
      console.error('Email send error:', error);
    }
  }

  // Slack notification
  if (SLACK_WEBHOOK) {
    try {
      await axios.post(SLACK_WEBHOOK, {
        text: `📅 데모 예약 확정\n회사: ${data.company} (${data.industry})\n월 문의: ${data.monthly_inquiries}\n예약시간: ${data.scheduled_time}`
      });
    } catch (error) {
      console.error('Slack send error:', error);
    }
  }
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 YEYAKBOT Server running on port ${PORT}`);
  console.log(`📧 Email alerts: ${transporter ? 'Enabled' : 'Disabled'}`);
  console.log(`💬 Slack alerts: ${SLACK_WEBHOOK ? 'Enabled' : 'Disabled'}`);
  console.log(`🌏 Timezone: ${TZ}`);
});

export default app;