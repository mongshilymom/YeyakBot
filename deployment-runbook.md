# YEYAKBOT 배포 런북 (2025-08-22)

## 5분 하드닝 체크리스트

### 1. GA4 설정 (1분)
- [ ] `G-XXXXXXXX`를 실제 GA4 측정 ID로 교체 (모든 페이지)
- [ ] GA4에서 측정 프로토콜 API 시크릿 생성
- [ ] `google-apps-script-ga4.js`에 실제 측정 ID + API 시크릿 적용

### 2. Google Forms 연동 (2분)
- [ ] Google Forms에서 예약 폼 생성 (8개 필드)
- [ ] 폼 URL을 `booking.html`에 교체
- [ ] Apps Script 프로젝트에서 `onFormSubmit` 트리거 설정
- [ ] `yeyakbot@gmail.com` 이메일 알림 테스트

### 3. Calendly 설정 (30초)
- [ ] `https://calendly.com/yeyakbot/30min` URL 확인
- [ ] 데모 페이지 임베드 정상 작동 확인

### 4. Cloudflare 규칙 적용 (1분 30초)
```
리디렉트 규칙:
- /booking → /booking.html (301)
- /demo → /demo.html (301)

캐시 규칙:
- /assets/* → 1년 캐시
- *.html → 5분 캐시
```

## 보안 강화 검토 사항

### 스팸 방지
- [ ] Google Forms reCAPTCHA 활성화
- [ ] Calendly Bot 방지 설정 확인
- [ ] 허니팟 필드 추가 검토

### 모니터링
- [ ] GA4 실시간 보고서에서 이벤트 수집 확인
- [ ] 이메일 알림 수신 테스트
- [ ] UTM 파라미터 추적 동작 확인

## 다음 단계 로드맵

### 결제 시스템 연동
- [ ] 토스페이먼츠 샌드박스 환경 구축
- [ ] 보증금 결제 웹훅 멱등성 처리
- [ ] HMAC 서명 검증 구현

### 성능 최적화
- [ ] Core Web Vitals 측정
- [ ] 이미지 최적화 (WebP 변환)
- [ ] CSS/JS 파일 압축

## 현재 완성 상태

✅ **Frontend**: 정적 HTML/CSS/JS (프레임워크 없음)
✅ **Forms**: Google Forms + Apps Script 자동화  
✅ **Analytics**: GA4 + Measurement Protocol
✅ **Email**: Gmail 자동 알림
✅ **SEO**: JSON-LD + OpenGraph 최적화
✅ **Mobile**: 반응형 디자인 + 스티키 헤더
✅ **Tracking**: UTM 파라미터 보존 + 완전한 이벤트 추적

## 기술적 위험 요소

1. **공개 이메일/Calendly 스팸**: reCAPTCHA, 허니팟, 요청 제한 검토 필요
2. **GA4 API 쿼터**: 과도한 이벤트 전송 시 제한 가능성
3. **Google Forms 제한**: 일일 응답 제한 (1000건) 모니터링 필요

## 지원 연락처

- **기술 문의**: 개발팀
- **운영 문의**: yeyakbot@gmail.com
- **GA4 대시보드**: Google Analytics 4
- **Forms 관리**: Google Forms 스프레드시트