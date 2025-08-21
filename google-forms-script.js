/**
 * YEYAKBOT Form → Mail + Backend + GA4
 * Google Apps Script for Google Forms integration
 * 복붙 후 아래 CONFIG의 TODO 부분만 채우세요.
 */
const CONFIG = {
  // === 필수 ===
  DEPOSIT_LINK: 'https://pay.toss.im/link/여기에_보증금_링크', // TODO: 토스 결제 링크
  BACKEND_ENDPOINT: 'https://yeyakbot.com/api/lead',          // 우리 백엔드(없으면 비워도 됨)

  // === GA4 Measurement Protocol (선택) ===
  GA4_MEASUREMENT_ID: 'G-XXXXXXX',    // TODO: GA4 측정ID (없으면 '' 유지)
  GA4_API_SECRET:    'YOUR_API_SECRET', // TODO: Admin > Data Streams > Measurement Protocol
  // === Slack 알림 (선택) ===
  SLACK_WEBHOOK: '' // 예: 'https://hooks.slack.com/services/XXX/YYY/ZZZ'
};

function onFormSubmit(e) {
  try {
    const v = e.namedValues; // 질문 제목 기준 매핑
    // TODO: 질문 제목에 맞춰 필드명 교체
    const name    = getVal(v, '이름');
    const phone   = getVal(v, '연락처');
    const email   = getVal(v, '이메일');
    const service = getVal(v, '서비스');         // 예: 이사/시공 등
    const datePref= getVal(v, '희망일시');       // 예: 8/20 오후 등
    const channel = 'web_form';

    // 1) 보증금 결제 안내 메일
    if (email) {
      const body = [
        '안녕하세요, 예약봇입니다.',
        '',
        '아래 링크에서 보증금 결제 시 일정이 확정됩니다.',
        `▶ ${CONFIG.DEPOSIT_LINK}`,
        '',
        `신청자: ${name}`,
        `연락처: ${phone}`,
        `서비스: ${service}`,
        `희망일시: ${datePref}`
      ].join('\n');
      GmailApp.sendEmail(email, '[예약봇] 보증금 결제 안내', body);
    }

    // 2) 백엔드로 리드 전달(선택)
    if (CONFIG.BACKEND_ENDPOINT) {
      const payload = {
        name, phone, service, date_pref: datePref,
        channel, utm_source: 'gform'
      };
      UrlFetchApp.fetch(CONFIG.BACKEND_ENDPOINT, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      });
    }

    // 3) GA4 lead_submit 이벤트 전송(선택) - 실제 제출 추적
    if (CONFIG.GA4_MEASUREMENT_ID && CONFIG.GA4_API_SECRET) {
      sendGa4Event({
        name: 'lead_submit',
        params: {
          form: 'booking',
          lead_name: name ? 'yes' : 'no',
          page: 'booking.html',
          channel: 'web_form'
        }
      });
    }

    // 4) Slack 알림(선택)
    if (CONFIG.SLACK_WEBHOOK) {
      const text = `:tada: [예약봇] 새 리드\n이름: ${name}\n연락처: ${phone}\n서비스: ${service}\n희망일시: ${datePref}`;
      UrlFetchApp.fetch(CONFIG.SLACK_WEBHOOK, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({ text }),
        muteHttpExceptions: true
      });
    }

  } catch (err) {
    console.error(err);
  }
}

function getVal(namedValues, key) {
  return (namedValues[key] && namedValues[key][0]) ? String(namedValues[key][0]).trim() : '';
}

/** GA4 Measurement Protocol 단순 래퍼 */
function sendGa4Event(event) {
  const cid = Utilities.getUuid(); // 간단 무작위 client_id
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${CONFIG.GA4_MEASUREMENT_ID}&api_secret=${CONFIG.GA4_API_SECRET}`;
  const payload = {
    client_id: cid,
    events: [event]
  };
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}