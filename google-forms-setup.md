# Google Forms 통합 가이드

## 1. Google Forms 스크립트 설정

### 스크립트 에디터 접근
1. Google Forms 편집 화면에서 점 3개 메뉴 → "스크립트 편집기"
2. 또는 [script.google.com](https://script.google.com)에서 새 프로젝트 생성

### 스크립트 코드 적용
1. `google-forms-script.js` 내용을 복사
2. Apps Script 에디터에 붙여넣기
3. CONFIG 섹션의 TODO 항목들을 실제 값으로 교체:

```javascript
const CONFIG = {
  DEPOSIT_LINK: 'https://pay.toss.im/link/실제_토스_링크',
  BACKEND_ENDPOINT: 'https://yeyakbot.com/api/lead',
  GA4_MEASUREMENT_ID: 'G-실제측정ID',
  GA4_API_SECRET: '실제_API_시크릿',
  SLACK_WEBHOOK: 'https://hooks.slack.com/services/실제/웹훅/URL'
};
```

### 트리거 설정
1. Apps Script에서 "트리거" 메뉴
2. "트리거 추가" 클릭
3. 설정:
   - 실행할 함수: `onFormSubmit`
   - 이벤트 소스: "Google Forms에서"
   - 이벤트 유형: "양식 제출 시"

## 2. 필드 매핑 확인

스크립트의 필드명을 실제 Google Forms 질문과 매칭:

```javascript
const name    = getVal(v, '이름');          // → Google Forms 질문 제목과 정확히 일치
const phone   = getVal(v, '연락처');        // → Google Forms 질문 제목과 정확히 일치  
const email   = getVal(v, '이메일');        // → 선택사항
const service = getVal(v, '서비스');        // → 사업 유형 등
const datePref= getVal(v, '희망일시');      // → 연락 가능 시간 등
```

## 3. 백엔드 연동 확인

### API 엔드포인트
- URL: `https://yeyakbot.com/api/lead`
- Method: POST
- Content-Type: application/json

### 페이로드 형식
```json
{
  "name": "홍길동",
  "phone": "010-1234-5678", 
  "service": "카페",
  "date_pref": "오후 1-6시",
  "channel": "web_form",
  "utm_source": "gform"
}
```

## 4. GA4 Measurement Protocol 설정

### API Secret 생성
1. Google Analytics → Admin → Data Streams
2. 해당 스트림 선택 → "Measurement Protocol API secrets"
3. "Create" 버튼으로 새 시크릿 생성
4. 생성된 값을 `GA4_API_SECRET`에 입력

### 이벤트 확인
- Event name: `thank_you`
- Parameters:
  - `form`: 'booking'
  - `channel`: 'web_form' 
  - `service`: 실제 서비스 유형

## 5. Slack 웹훅 설정 (선택사항)

### 웹훅 URL 생성
1. Slack 워크스페이스의 Apps 관리
2. "Incoming Webhooks" 앱 설치
3. 채널 선택 후 웹훅 URL 복사
4. `SLACK_WEBHOOK`에 입력

### 알림 형식
```
🎉 [예약봇] 새 리드
이름: 홍길동
연락처: 010-1234-5678
서비스: 카페
희망일시: 오후 1-6시
```

## 6. 테스트 절차

1. **Google Forms 제출 테스트**
   - 실제 폼에서 테스트 데이터 입력
   - 이메일 수신 확인

2. **백엔드 연동 확인**
   - Apps Script 실행 로그 확인
   - 백엔드 데이터베이스에 데이터 저장 확인

3. **GA4 이벤트 확인**
   - GA4 Real-time 보고서에서 이벤트 확인
   - 24시간 후 표준 보고서에서 확인

4. **Slack 알림 확인**
   - 지정된 채널에 알림 도착 확인

## 7. 문제 해결

### 스크립트 실행 오류
- Apps Script 실행 로그에서 오류 메시지 확인
- 권한 승인 필요시 승인 진행

### 백엔드 연결 실패
- CORS 설정 확인
- API 엔드포인트 URL 정확성 확인

### 이메일 전송 실패
- Gmail 전송 권한 확인
- 수신 이메일 주소 유효성 확인

## 8. 운영 고려사항

- **데이터 보관**: Google Forms 응답은 자동으로 스프레드시트에 저장
- **백업**: 스크립트 코드는 버전 관리 시스템에 백업
- **모니터링**: 정기적으로 실행 로그와 오류 확인
- **성능**: 대량 제출 시 실행 시간 제한 고려 (Apps Script는 6분 제한)