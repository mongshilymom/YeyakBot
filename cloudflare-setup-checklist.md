# Cloudflare 설정 체크리스트

## 🚀 우선순위 Redirect Rules (순서대로 추가)

### Rule 1: Force Lite Parameter (최상단)
```
조건: (http.host eq "yeyakbot.com" and
      (http.request.uri.path eq "/booking" or http.request.uri.path eq "/booking.html") and
      http.request.uri.query contains "lite=1")

액션: Static URL
URL: https://yeyakbot.com/booking-lite.html
Status: 301
Preserve query: ON
```

### Rule 2: Booking Lite Path (두번째)
```
조건: (http.host eq "yeyakbot.com" and
      (http.request.uri.path eq "/booking-lite" or http.request.uri.path eq "/booking-lite/"))

액션: Static URL  
URL: https://yeyakbot.com/booking-lite.html
Status: 301
Preserve query: ON
```

## 🧹 캐시 초기화

1. Cloudflare Dashboard 로그인
2. yeyakbot.com zone 선택
3. Caching → Configuration
4. **Purge Everything** 클릭 → Purge

## ✅ 테스트 절차

### 시크릿창에서 테스트:
1. `yeyakbot.com/booking-lite` 
   - 예상: 301 → `/booking-lite.html` → 라이트 페이지 표시
   
2. `yeyakbot.com/booking?lite=1`
   - 예상: 301 → `/booking-lite.html?lite=1` → 라이트 페이지 표시
   
3. **"예약 폼 열기"** 버튼 클릭
   - 예상: 새창에서 Google Forms + GA4 이벤트 발생

### GA4 실시간 확인:
1. GA4 → Reports → Realtime
2. Events 섹션에서 `lead_click` 확인
3. Event parameters에서 `variant: lite` 확인

## 🔧 문제 해결

**301 리다이렉트 안되는 경우:**
- Cloudflare Rules 순서 확인 (Force Lite가 최상단)
- 캐시 다시 Purge
- 시크릿창에서 재테스트

**GA4 이벤트 안오는 경우:**
- 브라우저 개발자도구 Network 탭 확인
- gtag 스크립트 로드 확인
- Console 오류 메시지 확인