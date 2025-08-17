# YEYAKBOT Backend API Documentation

## 🚀 Server Status: RUNNING

Backend server is now running on port 3000 with the following configuration:

### Current Status
- **Email Alerts**: Disabled (환경변수 필요)
- **Slack Alerts**: Disabled (환경변수 필요) 
- **Database**: SQLite (yeyakbot.db)
- **Timezone**: Asia/Seoul

## API Endpoints

### 1. Health Check
```
GET /health
Response: { "status": "ok", "timestamp": "2025-08-17T15:15:30.123Z" }
```

### 2. Form Webhook
```
POST /api/webhook/form
Headers: Content-Type: application/json

Body Example:
{
  "name": "김철수",
  "contact": "010-1234-5678", 
  "business_type": "음식점",
  "location": "서울 강남구",
  "inquiry_type": "신규 도입",
  "budget": "월 50-100만원",
  "call_time": "오후 2-6시",
  "notes": "매주 30건 정도 놓치고 있습니다"
}

Response: { "success": true, "message": "예약 접수 완료" }
```

### 3. Demo Webhook
```
POST /api/webhook/demo
Headers: Content-Type: application/json

Body Example:
{
  "company": "맛있는 식당",
  "industry": "음식업",
  "monthly_inquiries": "50-100건",
  "missed_periods": "점심시간, 저녁시간",
  "scheduled_time": "2025-08-18 14:00",
  "attendee": "김철수 사장님"
}

Response: { "success": true, "message": "데모 예약 완료" }
```

### 4. Admin Dashboard
```
GET /admin?token=초강력토큰값

Response:
{
  "stats": [
    { "type": "form", "count": 5, "date": "2025-08-17" },
    { "type": "demo", "count": 2, "date": "2025-08-17" }
  ],
  "recent": [
    { "id": 1, "type": "form", "data": "...", "timestamp": "..." }
  ]
}
```

## Database Schema

### submissions Table
```sql
CREATE TABLE submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,           -- 'form' or 'demo'
  data TEXT NOT NULL,           -- JSON string
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT
);
```

## Environment Variables Setup

To enable notifications, add these to Replit Secrets:

```env
ADMIN_TOKEN=초강력토큰값
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=founder@yeyakbot.com
SMTP_PASS=구글앱비밀번호
ALERT_TO=hello@yeyakbot.com,sales@yeyakbot.com
SLACK_WEBHOOK=https://hooks.slack.com/services/XXX/YYY/ZZZ
TZ=Asia/Seoul
```

## Integration Options

### Option A: Google Forms Integration
- Use Google Apps Script to call webhook on form submit
- Add webhook URL: `https://your-replit.replit.app/api/webhook/form`

### Option B: Calendly Integration  
- Use Calendly webhook settings
- Add webhook URL: `https://your-replit.replit.app/api/webhook/demo`

### Option C: Direct Frontend Integration
- Replace form action with direct API calls
- Add JavaScript to handle form submissions

## Testing

### Local Testing:
```bash
# Test form webhook
curl -X POST http://localhost:3000/api/webhook/form \
  -H "Content-Type: application/json" \
  -d '{"name":"테스트","contact":"010-1234-5678"}'

# Test demo webhook  
curl -X POST http://localhost:3000/api/webhook/demo \
  -H "Content-Type: application/json" \
  -d '{"company":"테스트회사","industry":"음식업"}'
```

### Production Testing:
Replace `localhost:3000` with your Replit app URL when deployed.

## Security Features

- **CORS**: Only allows yeyakbot.com origins
- **Input validation**: JSON parsing with error handling
- **Rate limiting**: Can be added with express-rate-limit
- **Admin authentication**: Token-based access control
- **SQL injection protection**: Prepared statements