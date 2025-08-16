# Cloudflare Rules for YEYAKBOT

## 🔥 우선순위 규칙 (맨 위 배치)

### Priority Rule 1: Force Lite Parameter
**조건 (Condition):**
```
(http.host eq "yeyakbot.com" and
 (http.request.uri.path eq "/booking" or http.request.uri.path eq "/booking.html") and
 http.request.uri.query contains "lite=1")
```

**액션 (Action):**
- Type: Static URL
- URL: `https://yeyakbot.com/booking-lite.html`
- Status code: 301 (Permanent redirect)
- Preserve query string: ON

**결과:**
- `yeyakbot.com/booking?lite=1` → `yeyakbot.com/booking-lite.html?lite=1`
- `yeyakbot.com/booking.html?lite=1&utm_source=facebook` → `yeyakbot.com/booking-lite.html?lite=1&utm_source=facebook`

### Priority Rule 2: Booking Lite Path Normalization
**조건 (Condition):**
```
(http.host eq "yeyakbot.com" and
 (http.request.uri.path eq "/booking-lite" or http.request.uri.path eq "/booking-lite/"))
```

**액션 (Action):**
- Type: Static URL
- URL: `https://yeyakbot.com/booking-lite.html`
- Status code: 301 (Permanent redirect)
- Preserve query string: ON

**결과:**
- `yeyakbot.com/booking-lite` → `yeyakbot.com/booking-lite.html`
- `yeyakbot.com/booking-lite/` → `yeyakbot.com/booking-lite.html`
- `yeyakbot.com/booking-lite?utm_source=facebook` → `yeyakbot.com/booking-lite.html?utm_source=facebook`

## Redirect Rule 3: Thank You Path
**조건 (Condition):**
```
(http.host eq "yeyakbot.com" and 
 (http.request.uri.path eq "/thank-you" or http.request.uri.path eq "/thank-you/"))
```

**액션 (Action):**
- Type: Dynamic redirect
- Expression: `concat("/thank-you.html", http.request.uri.query ne "" and "?" or "", http.request.uri.query)`
- Status code: 301 (Permanent redirect)

**결과:**
- `yeyakbot.com/thank-you` → `yeyakbot.com/thank-you.html`
- `yeyakbot.com/thank-you?type=lead` → `yeyakbot.com/thank-you.html?type=lead`

## Cache Rules (권장)

### Rule 1: Assets Cache
**조건:** `http.request.uri.path matches "^/assets/.*"`
**액션:** Cache Everything, TTL 1 year

### Rule 2: HTML Cache  
**조건:** `http.request.uri.path matches ".*\.html$" or http.request.uri.path eq "/"`
**액션:** Cache Everything, TTL 5 minutes

### Rule 3: Booking Pages Bypass (옵션)
**조건:** `http.request.uri.path matches "^/(booking|demo|thank-you).*"`
**액션:** Bypass cache (실시간 폼 데이터를 위해)

## 🧪 테스트 체크리스트

### P2 — 캐시 & 테스트 순서

**1단계: 캐시 초기화**
- Cloudflare Dashboard → Caching → **Purge Everything** (1회 실행)

**2단계: 시크릿창 테스트**
- `/booking-lite` → `/booking-lite.html`로 301 후 페이지 표시 확인
- `/booking?lite=1` → `/booking-lite.html`로 301 확인
- 버튼 클릭 시 폼 새창 + GA4 `lead_click` 실시간 수집 확인

**3단계: GA4 이벤트 확인**
- GA4 Realtime → Events 에서 `lead_click` 이벤트 실시간 확인
- `variant: 'lite'` 매개변수 포함 여부 확인