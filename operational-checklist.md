# YEYAKBOT 운영 체크리스트 (2025-08-30)

## 1. 구글폼 정책 링크 오타 수정 ⚠️
**문제**: Google Forms 내 개인정보처리방침 링크 오타
- 현재: `https://yeyakbot.com/privacy` (확장자 누락)
- 수정: `https://yeyakbot.com/privacy.html` (올바른 링크)

**수정 방법**:
1. Google Forms 편집 모드 진입
2. "(필수) 개인정보 수집·이용 동의" 질문 클릭
3. 질문 설명(description) 부분에서 링크 수정
4. `https://yeyakbot.com/privacy.html`로 교체

**액션**: 구글폼에서 수동으로 링크 URL 교체 필요

## 2. 헤더/버튼 UTM 보존 ✅
**상태**: 완료됨
- 모든 페이지에 UTM 파라미터 보존 스크립트 적용
- booking.html, demo.html 링크에 자동 query string 전파
- 광고 집행 시 UTM 추적 정상 작동

## 3. GA4 이벤트 확인 ⚠️
**필요**: 실제 GA4 ID 교체 후 실시간 수집 확인
- `lead_submit`: 폼 제출 완료 이벤트
- `demo_widget_view`: 데모 위젯 첫 로드 (1회성)
- `schedule`, `schedule_view`: Calendly 이벤트

**액션**: GA4 대시보드에서 실시간 보고서 모니터링

## 4. Cloudflare 리다이렉트/캐시 규칙 ⚠️
**설정 필요**:

### 리다이렉트 규칙 (Redirect Rules)
1. **Rule 1: Booking 리다이렉트**
   - Match: `(http.request.uri.path eq "/booking")`
   - Action: Redirect (301 Permanent)
   - Target: `https://yeyakbot.com/booking.html`

2. **Rule 2: Demo 리다이렉트**
   - Match: `(http.request.uri.path eq "/demo")`
   - Action: Redirect (301 Permanent)
   - Target: `https://yeyakbot.com/demo.html`

### 캐시 규칙 (Cache Rules)
1. **Rule 1: HTML 페이지**
   - Match: `(http.request.uri.path matches ".*\.html$")`
   - Cache TTL: 5분 (300초)

2. **Rule 2: 정적 자산**
   - Match: `(http.request.uri.path matches "^/assets/.*")`
   - Cache TTL: 1년 (31536000초)

**액션**: 
1. Cloudflare 대시보드 → Rules → Redirect Rules에서 위 2개 규칙 생성
2. Cloudflare 대시보드 → Caching → Cache Rules에서 위 2개 규칙 생성
3. 모든 규칙 적용 후 Caching → Configuration → Purge Everything 1회 실행

## 5. sitemap.xml 응답 체크 ✅
**상태**: 정상 작동
- HTTP 200 응답 확인됨
- robots.txt에서 sitemap 링크 정상
- 컨텐츠: 홈, booking.html, demo.html 포함

## 6. 백엔드 헬스체크 라우트 ✅
**상태**: 구현 완료
- 엔드포인트: `GET /health`
- 응답: `{ "ok": true }`
- leadengine.replit.app 가동/슬립 상태 구분 가능

## 추가 보안 검토사항

### 스팸 방지
- [ ] Google Forms reCAPTCHA 활성화
- [ ] Calendly Bot 방지 설정
- [ ] 허니팟 필드 추가 검토

### 모니터링
- [ ] GA4 실시간 이벤트 수집 확인
- [ ] 이메일 알림 수신 테스트
- [ ] UTM 파라미터 추적 동작 확인

## 우선순위 액션

1. **즉시**: Google Forms 개인정보처리방침 링크 수정
2. **배포 전**: Cloudflare 리다이렉트/캐시 규칙 설정
3. **배포 후**: GA4 실시간 이벤트 수집 모니터링
4. **운영 중**: 스팸 방지 설정 강화