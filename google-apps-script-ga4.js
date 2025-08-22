// ===== GA4 Measurement Protocol : 폼 제출 이벤트 전송 =====
const GA4_MEASUREMENT_ID = 'G-XXXXXXX';      // GA4 ID
const GA4_API_SECRET     = 'API_SECRET_ABC'; // 위에서 발급한 시크릿

function sendLeadToGA4_(payload){
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;
  const body = {
    client_id: Utilities.getUuid(),          // 익명 식별자 (이메일 쓰면 PI라 비권장)
    events: [{ name: 'lead', params: payload }]
  };
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });
}

// 기존 onFormSubmit(e) 내부 끝부분에 추가
function onFormSubmit(e){
  // ===== 이메일 알림 발송 =====
  var owner = 'yeyakbot@gmail.com';
  var name  = e.namedValues['이름']?.[0] || '';
  var phone = e.namedValues['연락처']?.[0] || '';
  GmailApp.sendEmail(owner, '신규 예약 접수', `이름: ${name}\n연락처: ${phone}\n원본: 스프레드시트 참고`);
  
  // ===== GA4 이벤트 전송 =====
  sendLeadToGA4_({
    form_name: '3min_booking',
    channel: 'google_form',
  });
}

// ===== 사용법 =====
// 1. Google Analytics 4 → 관리 → 데이터 스트림 → 측정 프로토콜 API 보안 비밀번호 생성
// 2. GA4_MEASUREMENT_ID와 GA4_API_SECRET 값을 실제 값으로 교체
// 3. Google Apps Script 프로젝트에 이 코드를 추가
// 4. 폼 제출 트리거와 연결하여 서버 사이드 이벤트 추적 완성