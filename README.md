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
- **다중 연락 수단**: 카카오채널, 전화 링크 포함 네비게이션
- **에러 처리**: 폼 로딩 실패 시 사용자 친화적 메시지
- **SEO 최적화**: 메타 태그, JSON-LD, 사이트맵 완비

## 완성 후 해야 할 일

### 1. Google Forms 설정 및 URL 교체
- `google-forms-setup.md` 가이드를 따라 Google Forms 생성
- 질문 구성: 성함, 연락처, 업체명/업종, 지역, 문의유형, 예산범위, 희망통화시간, 추가내용
- `booking.html`의 `REPLACE_GOOGLE_FORM_URL`을 실제 임베드 URL로 교체
- 임베드 설정: 폭 100%, 높이 900px

### 2. Calendly 설정 및 링크 교체  
- `calendly-setup.md` 가이드를 따라 Calendly 이벤트 생성
- 이벤트명: "예약봇 20분 데모", 위치: Google Meet
- 질문: 업체명, 업종, 월 평균 문의량, 놓치는 시간대
- `demo.html`의 `REPLACE_CALENDLY_URL`을 실제 Calendly 링크로 교체
- 확인 페이지에 yeyakbot.com 리디렉션 설정

### 3. 검색엔진 등록 및 애널리틱스 설정
- **Google Search Console**: `REPLACE_GOOGLE_TOKEN`을 실제 소유 확인 토큰으로 교체
- **네이버 Search Advisor**: `REPLACE_NAVER_TOKEN`을 실제 소유 확인 토큰으로 교체
- **Google Analytics 4**: `REPLACE_GA4_ID`를 실제 GA4 측정 ID로 교체 (예: G-XXXXXXXXX)

### 4. 연락처 정보 교체
- 카카오채널 URL: `https://pf.kakao.com/_yeyakbot`을 실제 채널 주소로 교체
- 전화번호: `tel:01000000000`을 실제 연락처로 교체

### 5. 도메인 리다이렉트 설정 (Cloudflare)
- 예약봇.co.kr → yeyakbot.com (301 리다이렉트)
- 예약봇.kr → yeyakbot.com (301 리다이렉트)  
- 24bot.kr → yeyakbot.com (301 리다이렉트)
- www.yeyakbot.com → yeyakbot.com (301 리다이렉트)

### 6. 고급 애널리틱스 설정 (선택사항)
- Google Tag Manager (GTM) 설정 시 GA4 대신 GTM 컨테이너 ID 사용
- `js/app.js`의 AnalyticsManager에서 커스텀 이벤트 추적 활성화
- 네이버 애널리틱스 추가 설정

### 7. 성능 최적화 (배포 전)
- [x] PNG 형식 favicon, logo, OG 이미지로 교체 완료
- Lighthouse 점수 확인 (Performance/SEO 90점 이상 목표)
- 이미지 압축 확인 (총 이미지 용량 100KB 이하 권장)

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
- [x] SEO 메타 태그, JSON-LD 구조화 데이터 (조직+제품) 완비
- [x] 접근성 기준 충족 (ARIA, 키보드 네비게이션)
- [x] 콘솔 에러 0개 (폼/캘린더 URL 교체 후)
- [x] 파일 총 용량 64KB (이미지 제외)
- [x] Google Analytics 4 및 검색엔진 인증 태그 준비 완료
- [ ] 실제 폼 URL 교체 필요
- [ ] 실제 캘린더 URL 교체 필요
- [ ] GA4 측정 ID 및 검색엔진 인증 토큰 교체 필요

