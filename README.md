# 예약봇 (YEYAKBOT) 웹사이트 MVP

한국 소상공인을 위한 "놓친 전화를 예약으로" 서비스 소개 웹사이트입니다.

## 프로젝트 개요

- **목표**: 정적 웹사이트로 서비스 소개, 3분 예약 폼, 20분 데모 예약 기능 제공
- **대상**: 한국 소상공인
- **기술 스택**: 순수 HTML5/CSS3/JavaScript (프레임워크 없음)
- **특징**: 모바일 퍼스트, 성능 최적화, SEO 친화적

## 파일 구조

```
/
├── index.html              # 메인 랜딩 페이지
├── booking.html            # 3분 예약 폼 페이지
├── demo.html               # 20분 데모 예약 페이지
├── 404.html                # 에러 페이지
├── robots.txt              # 검색엔진 크롤링 설정
├── sitemap.xml             # 사이트맵
├── assets/
│   ├── logo.svg            # 로고 (달력+체크 아이콘)
│   ├── favicon.ico         # 파비콘
│   └── og.svg              # Open Graph 이미지
├── css/
│   └── style.css           # 전체 스타일시트
└── js/
    └── app.js              # UTM 추적 및 인터랙션
```

## 기술 특징

### 디자인 & UX
- **모바일 퍼스트**: 375px부터 반응형 디자인
- **시스템 폰트**: 한글 최적화 폰트 스택 사용
- **접근성**: ARIA 레이블, 키보드 네비게이션, 충분한 색상 대비
- **성능**: LCP < 2.0s 목표, CLS 최소화

### 기능
- **UTM 추적**: localStorage를 통한 마케팅 파라미터 유지
- **헤더 효과**: 스크롤 시 그림자 효과
- **에러 처리**: 폼 로딩 실패 시 사용자 친화적 메시지
- **SEO 최적화**: 메타 태그, JSON-LD, 사이트맵 완비

## 완성 후 해야 할 일

### 1. 폼 링크 교체
- `booking.html`의 `REPLACE_FORM_URL`을 실제 Google Forms 또는 Tally 링크로 교체
- Google Forms: 보내기 → `<>` 임베드 → URL 복사
- 예시: `https://docs.google.com/forms/d/XXXXX/viewform?embedded=true`

### 2. 캘린더 링크 교체  
- `demo.html`의 `REPLACE_CALENDLY_URL`을 실제 Calendly 링크로 교체
- 예시: `https://calendly.com/yeyakbot/demo`

### 3. 검색엔진 등록
- **Google Search Console**: 사이트 소유 확인 메타 태그 추가
- **네이버 Search Advisor**: 사이트 소유 확인 메타 태그 추가
- 메타 태그를 `<head>` 섹션에 추가

### 4. 도메인 리다이렉트 설정 (Cloudflare)
- 예약봇.co.kr → yeyakbot.com (301 리다이렉트)
- 예약봇.kr → yeyakbot.com (301 리다이렉트)  
- 24bot.kr → yeyakbot.com (301 리다이렉트)
- www.yeyakbot.com → yeyakbot.com (301 리다이렉트)

### 5. 애널리틱스 설정 (선택사항)
- Google Analytics 또는 GTM 태그 추가
- `js/app.js`의 AnalyticsManager에서 실제 추적 코드 활성화

### 6. 성능 최적화 (배포 전)
- favicon.ico를 실제 ICO 파일로 교체
- og.svg를 JPG/PNG로 변환 (1200x630px, ~40KB)
- Lighthouse 점수 확인 (Performance/SEO 90점 이상 목표)

## 배포 방법

1. **정적 호스팅**: Netlify, Vercel, GitHub Pages 등
2. **CDN 설정**: Cloudflare를 통한 글로벌 배포
3. **HTTPS 설정**: SSL 인증서 자동 적용
4. **캐시 설정**: 정적 자원 브라우저 캐시 최적화

## 수용 기준 체크리스트

- [x] 모든 페이지 정상 로딩 (index, booking, demo, 404)
- [x] 모바일 뷰 375px에서 CTA 버튼 2개 정상 표시
- [x] UTM 파라미터 저장 및 전달 기능
- [x] 헤더 스크롤 효과 동작
- [x] SEO 메타 태그 및 구조화 데이터 완비
- [x] 접근성 기준 충족 (ARIA, 키보드 네비게이션)
- [x] 콘솔 에러 0개 (폼/캘린더 URL 교체 후)
- [x] 파일 총 용량 60KB 이하 (이미지 제외)
- [ ] 실제 폼 URL 교체 필요
- [ ] 실제 캘린더 URL 교체 필요

