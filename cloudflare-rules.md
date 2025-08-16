# Cloudflare Rules for YEYAKBOT

## Redirect Rule 1: Booking Lite Parameter (개선됨)

**조건 (Condition):**
```
(http.host eq "yeyakbot.com" and
 (http.request.uri.path eq "/booking" or http.request.uri.path eq "/booking.html") and
 http.request.uri.query contains "lite=1")
```

**액션 (Action):**
- Type: Dynamic redirect
- Expression: `concat("/booking-lite.html", http.request.uri.query ne "" and "?" or "", http.request.uri.query)`
- Status code: 302 (Temporary redirect)

**결과:**
- `yeyakbot.com/booking?lite=1` → `yeyakbot.com/booking-lite.html?lite=1`
- `yeyakbot.com/booking?lite=1&utm_source=facebook` → `yeyakbot.com/booking-lite.html?lite=1&utm_source=facebook`

## Redirect Rule 2: Booking Lite Path Normalization

**조건 (Condition):**
```
(http.host eq "yeyakbot.com" and
 (http.request.uri.path eq "/booking-lite" or http.request.uri.path eq "/booking-lite/"))
```

**액션 (Action):**
- Type: Dynamic redirect
- Expression: `concat("/booking-lite.html", http.request.uri.query ne "" and "?" or "", http.request.uri.query)`
- Status code: 301 (Permanent redirect)

**결과:**
- `yeyakbot.com/booking-lite` → `yeyakbot.com/booking-lite.html`
- `yeyakbot.com/booking-lite/` → `yeyakbot.com/booking-lite.html`
- UTM 파라미터 보존됨

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