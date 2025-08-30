# UTM 추적 방법 비교

## 현재 구현 (자동 스크립트)
```javascript
(function(){
  const qs = location.search ? location.search : '';
  document.querySelectorAll('a[href$="booking.html"], a[href$="demo.html"]').forEach(a=>{
    const join = a.href.includes('?') ? '&' : '?';
    a.href = a.href + (qs ? (join + qs.slice(1)) : '');
  });
})();
```

**장점:**
- 모든 booking/demo 링크에 자동 적용
- 기존 href 속성 유지하면서 UTM 추가
- 페이지 로드 시 자동 실행
- HTML 수정 없이 동작

## 제안된 방법 (함수 호출)
```javascript
function keepUTM(path){
  const qs = location.search || "";
  location.href = path + qs;
}
```

**사용법:**
```html
<a href="javascript:keepUTM('/booking.html')">3분 예약</a>
<a href="javascript:keepUTM('/demo.html')">20분 데모</a>
```

**장점:**
- 명시적 UTM 보존 제어
- 다양한 경로에 재사용 가능
- 직관적인 함수명

**단점:**
- 모든 링크를 수동으로 수정해야 함
- `javascript:` URL 사용 (SEO/접근성 우려)
- 기존 href 기능 상실

## 권장사항

현재 구현된 자동 스크립트가 더 적합합니다:
1. 전체 사이트에 일관성 있게 적용됨
2. SEO 친화적 (href 속성 유지)
3. 유지보수 용이성
4. 접근성 표준 준수

제안된 함수는 특별한 경우나 동적 링크 생성 시 보조적으로 활용 가능합니다.