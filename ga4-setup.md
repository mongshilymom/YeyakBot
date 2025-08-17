# GA4 설정 가이드

## ✅ GA4 코드 적용 완료

모든 페이지에 표준화된 GA4 추적 코드가 적용되었습니다:

### 적용된 페이지 목록
- `index.html` - 메인 랜딩 페이지
- `booking.html` - 3분 예약 설정 페이지  
- `booking-lite.html` - 라이트 예약 페이지
- `demo.html` - 20분 데모 예약 페이지
- `privacy.html` - 개인정보처리방침
- `terms.html` - 이용약관
- `thank-you.html` - 감사 페이지

### 표준 GA4 코드 형식
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date()); gtag('config','G-XXXXXXX');</script>
```

## 🔧 실제 배포 시 설정 방법

### 1. GA4 Measurement ID 교체
`G-XXXXXXX`를 실제 GA4 측정 ID로 교체:
```javascript
// 예시: G-ABC123DEF4
gtag('config','G-ABC123DEF4');
```

### 2. 한 번에 모든 파일 교체하기
```bash
# Linux/Mac에서 일괄 교체
find . -name "*.html" -exec sed -i 's/G-XXXXXXX/G-ABC123DEF4/g' {} +

# 또는 개별 파일 직접 수정
```

## 📊 현재 구현된 GA4 이벤트 추적

### CTA 버튼 클릭 이벤트
- **이벤트명**: `lead_click`
- **매개변수**: `variant` (brand_backup, lite, demo_backup)

### JavaScript에서 추적되는 이벤트들
```javascript
// booking.html - 백업 링크
gtag('event','lead_click',{variant:'brand_backup'})

// booking-lite.html - 메인 버튼  
gtag('event','lead_click',{variant:'lite'})

// demo.html - 백업 링크
gtag('event','lead_click',{variant:'demo_backup'})
```

## 🎯 추가 설정 권장사항

### Enhanced Ecommerce (선택사항)
구독 전환을 추적하려면 향후 Enhanced Ecommerce 설정 고려

### Custom Dimensions (선택사항)
```javascript
// UTM 매개변수 커스텀 차원으로 전송
gtag('config', 'G-XXXXXXX', {
  custom_map: {
    'custom_parameter_1': 'utm_source',
    'custom_parameter_2': 'utm_medium'
  }
});
```

### Conversion Goals 설정
GA4에서 다음 목표 설정 권장:
- `lead_click` 이벤트를 전환으로 설정
- 각 variant별 전환율 분석
- 페이지별 체류시간 분석

## 🔍 테스트 방법

### 실시간 이벤트 확인
1. GA4 → Reports → Realtime
2. Events 섹션에서 `lead_click` 확인  
3. 매개변수에서 `variant` 값 확인

### 개발자 도구로 확인
```javascript
// 브라우저 콘솔에서 확인
dataLayer
// gtag 함수 테스트
gtag('event', 'test_event', {test_parameter: 'test_value'})
```

이제 실제 GA4 Measurement ID만 교체하면 완전한 추적 시스템이 작동합니다!