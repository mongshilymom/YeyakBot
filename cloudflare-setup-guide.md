# Cloudflare 설정 가이드

## 1. 리다이렉트 규칙 설정

### Cloudflare 대시보드 접속
1. Cloudflare 대시보드 로그인
2. yeyakbot.com 도메인 선택
3. Rules → Redirect Rules 메뉴 이동

### 규칙 1: Booking 리다이렉트
```
Rule name: booking_redirect
When incoming requests match: Custom filter expression
Field: URI Path
Operator: equals
Value: /booking

Then:
Type: Static
URL: https://yeyakbot.com/booking.html
Status code: 301 - Permanent Redirect
```

### 규칙 2: Demo 리다이렉트
```
Rule name: demo_redirect
When incoming requests match: Custom filter expression
Field: URI Path
Operator: equals
Value: /demo

Then:
Type: Static
URL: https://yeyakbot.com/demo.html
Status code: 301 - Permanent Redirect
```

## 2. 캐시 규칙 설정

### Cloudflare 대시보드
1. Caching → Cache Rules 메뉴 이동

### 규칙 1: HTML 페이지 캐시
```
Rule name: html_pages_cache
When incoming requests match: Custom filter expression
Field: URI Path
Operator: matches regex
Value: .*\.html$

Then:
Cache status: Eligible for cache
Edge TTL: 5 minutes
```

### 규칙 2: 정적 자산 캐시
```
Rule name: static_assets_cache
When incoming requests match: Custom filter expression
Field: URI Path
Operator: starts with
Value: /assets/

Then:
Cache status: Eligible for cache
Edge TTL: 1 year
```

## 3. 캐시 초기화

### Purge Everything 실행
1. Caching → Configuration 메뉴
2. "Purge Everything" 버튼 클릭
3. 확인 후 실행

## 4. 테스트 확인

### 리다이렉트 테스트
```bash
curl -I https://yeyakbot.com/booking
# HTTP/1.1 301 Moved Permanently
# Location: https://yeyakbot.com/booking.html

curl -I https://yeyakbot.com/demo  
# HTTP/1.1 301 Moved Permanently
# Location: https://yeyakbot.com/demo.html
```

### 캐시 헤더 확인
```bash
curl -I https://yeyakbot.com/booking.html
# cf-cache-status: HIT/MISS
# cache-control: max-age=300

curl -I https://yeyakbot.com/assets/logo.png
# cf-cache-status: HIT/MISS  
# cache-control: max-age=31536000
```

## 주의사항

- 규칙 적용 후 전파되는데 몇 분 소요될 수 있음
- Purge Everything은 모든 캐시를 삭제하므로 필요시에만 사용
- 정규식 사용 시 정확한 패턴 확인 필요