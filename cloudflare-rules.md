# Cloudflare Rules for YEYAKBOT

## Redirect Rule: Booking Lite Parameter

**조건 (Condition):**
```
(http.host eq "yeyakbot.com" and
 http.request.uri.path eq "/booking" and
 http.request.uri.query contains "lite=1")
```

**액션 (Action):**
- Type: Dynamic redirect
- Expression: `concat("/booking-lite.html", http.request.uri.query ne "" and "?" or "", http.request.uri.query)`
- Status code: 302 (Temporary redirect)

**결과:**
- `yeyakbot.com/booking?lite=1` → `yeyakbot.com/booking-lite.html?lite=1`
- `yeyakbot.com/booking?lite=1&utm_source=facebook` → `yeyakbot.com/booking-lite.html?lite=1&utm_source=facebook`

## Cache Rules (권장)

### Rule 1: Assets Cache
**조건:** `http.request.uri.path matches "^/assets/.*"`
**액션:** Cache Everything, TTL 1 year

### Rule 2: HTML Cache  
**조건:** `http.request.uri.path matches ".*\.html$" or http.request.uri.path eq "/"`
**액션:** Cache Everything, TTL 5 minutes

### Rule 3: Booking Pages Bypass (옵션)
**조건:** `http.request.uri.path matches "^/(booking|demo).*"`
**액션:** Bypass cache (실시간 폼 데이터를 위해)