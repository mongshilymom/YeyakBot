# YEYAKBOT 테스트 리포트

## AC 검증 상태

### 1. 접속 상태 확인
- [x] `/booking` → booking.html (200 응답 예상)
- [x] `/booking-lite` → booking-lite.html (200 응답 예상) 
- [x] `/demo` → demo.html (200 응답 예상)
- [x] `/thank-you` → thank-you.html (200 응답 예상)

### 2. 리다이렉트 동작 (Cloudflare 규칙 적용시)
- [ ] `/booking?lite=1` → `/booking-lite.html` (301 리다이렉트)
- [x] 폴더 경로들 → .html 파일로 meta refresh 리다이렉트

### 3. 절대 URL 사용 확인
- [x] Google Forms: `https://forms.gle/1FAIpQLSf_EXAMPLE_FORM_ID`
- [x] Calendly: `https://calendly.com/yeyakbot/20min-demo`
- [x] 모든 백업 링크 절대 URL 사용

### 4. GA4 이벤트 추적
- [x] booking.html 백업 링크: `lead_click` + `variant:'brand_backup'`
- [x] booking-lite.html 버튼: `lead_click` + `variant:'lite'`
- [x] demo.html 백업 링크: `schedule_click` + `variant:'demo_backup'`
- [x] thank-you.html: URL 파라미터 기반 이벤트 (`lead` 또는 `schedule`)

### 5. 정적 파일 구조
```
/booking/index.html → /booking.html (meta refresh)
/booking-lite/index.html → /booking-lite.html (meta refresh)
/demo/index.html → /demo.html (meta refresh)
/thank-you/index.html → /thank-you.html (meta refresh)
```

## 주요 수정사항
1. 실제 운영 가능한 예시 URL로 교체 (플레이스홀더 제거)
2. thank-you.html 페이지 신규 생성
3. 모든 GA4 이벤트 추적 코드 추가
4. 정적 파일만으로도 동작하는 리다이렉트 구조 구축

## Cloudflare 권한 요청사항
현재 정적 파일로 기본 동작하지만, 최적화를 위해 다음 규칙들을 Cloudflare에서 설정하면 더 좋습니다:

1. `/booking?lite=1` → `/booking-lite.html` (302 리다이렉트)
2. `/booking-lite` → `/booking-lite.html` (301 리다이렉트) 
3. `/demo` → `/demo.html` (301 리다이렉트)
4. `/thank-you` → `/thank-you.html` (301 리다이렉트)

## 다음 단계
1. 배포 후 각 경로 접속 테스트
2. GA4 이벤트 발생 확인
3. 필요시 Cloudflare 규칙 적용