# YEYAKBOT 백엔드 서비스 구성

## 환경 변수 설정

### 핵심 서비스 구성
```env
PORT=3000                    # 백엔드 API 서버 포트
ADMIN_TOKEN=초강력토큰값      # 관리자 인증 토큰
TZ=Asia/Seoul               # 한국 시간대
```

### SMTP 이메일 알림
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=founder@yeyakbot.com
SMTP_PASS=구글앱비밀번호
ALERT_TO=hello@yeyakbot.com,sales@yeyakbot.com
```

### Slack 알림 통합
```env
SLACK_WEBHOOK=https://hooks.slack.com/services/XXX/YYY/ZZZ
```

## 서비스 아키텍처

### 1. 폼 제출 웹훅 (Form Webhook)
- **경로**: `POST /api/webhook/form`
- **기능**: Google Forms 제출 시 SMTP + Slack 알림
- **알림 내용**: 고객 정보, 사업 유형, 예산, 연락 가능 시간

### 2. 데모 예약 웹훅 (Demo Webhook)  
- **경로**: `POST /api/webhook/demo`
- **기능**: Calendly 예약 시 SMTP + Slack 알림
- **알림 내용**: 회사명, 업종, 월 문의량, 놓치는 시간대

### 3. 관리자 대시보드 (선택사항)
- **경로**: `GET /admin?token=초강력토큰값`
- **기능**: 실시간 제출 현황, 통계, 수동 알림 테스트

## 배포 옵션

### Option A: Replit Deployments
- 현재 정적 사이트와 함께 백엔드 API 통합
- 환경 변수 보안 관리
- 자동 HTTPS, 도메인 연결

### Option B: Separate Backend
- 정적 사이트: Cloudflare Pages/Vercel
- 백엔드 API: Railway/Render/DigitalOcean
- CORS 설정으로 도메인 간 통신

## 보안 고려사항

1. **토큰 관리**: ADMIN_TOKEN은 충분히 복잡하게
2. **SMTP 보안**: Gmail 앱 비밀번호 사용 (2FA 필수)
3. **Webhook 검증**: Google Forms/Calendly signature 검증
4. **CORS 설정**: yeyakbot.com 도메인만 허용
5. **Rate Limiting**: API 엔드포인트별 요청 제한

## 알림 템플릿 예시

### 이메일 제목
- 📞 새 예약 문의: {고객명} ({사업유형})
- 📅 데모 예약 확정: {회사명} ({예약시간})

### Slack 메시지
```
🚀 새 고객 문의
고객: 김철수 (010-1234-5678)
사업: 음식점 / 서울 강남구
예산: 월 50-100만원
연락가능: 오후 2-6시
```

이제 백엔드 서비스 개발 또는 기존 서비스 연동 준비가 완료되었습니다!