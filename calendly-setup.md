# Calendly 설정 가이드

## 이벤트 생성

### 이벤트 정보
- **Event name**: 예약봇 20분 데모
- **Duration**: 20분
- **Location**: Google Meet (자동 생성)
- **Description**: 예약봇 전문가와 1:1로 만나 실제 동작 화면을 보며 모든 기능을 확인하세요. 궁금한 점은 무엇이든 물어보시고, 우리 비즈니스에 맞는 최적의 설정 방법을 알아보세요.

### 초대자 질문 설정 (Invitee Questions)
1. **업체명** (필수)
   - Question Type: Text
   - Required: Yes

2. **업종** (필수)
   - Question Type: Text
   - Required: Yes

3. **월 평균 문의량** (필수)
   - Question Type: Multiple Choice
   - Options:
     - 10건 미만
     - 10~30건
     - 30~100건
     - 100건 이상
   - Required: Yes

4. **놓치는 시간대** (필수)
   - Question Type: Multiple Choice (Allow multiple selections)
   - Options:
     - 야간 (18시~9시)
     - 주말 (토요일/일요일)
     - 점심시간 (12시~14시)
     - 기타
   - Required: Yes

## 확인 페이지 설정

### Confirmation Page
1. Event Actions → Confirmation Page
2. **Redirect to external site** 선택
3. **URL**: `https://yeyakbot.com/`
4. **Display text**: "예약봇 홈페이지로 이동"

또는 Custom confirmation page 설정:
```html
<h2>데모 예약이 완료되었습니다!</h2>
<p>곧 Google Meet 링크를 포함한 확인 이메일을 받으실 예정입니다.</p>
<p>데모 전 궁금한 점이 있으시면 언제든 연락 주세요.</p>
<a href="https://yeyakbot.com/" style="display: inline-block; padding: 12px 24px; background-color: #1e40af; color: white; text-decoration: none; border-radius: 6px; margin-top: 16px;">예약봇 홈페이지</a>
```

## 임베드 설정

1. Calendly 이벤트 → Share → Embed
2. **Inline Embed** 선택
3. 생성된 data-url 복사
4. `demo.html`의 `REPLACE_CALENDLY_URL` 부분을 실제 URL로 교체

## 임베드 URL 형식
```
https://calendly.com/your-username/yeyakbot-demo
```

## 알림 설정

### 이메일 알림
1. Event Settings → Notifications
2. **Host notifications**: 새 예약 시 이메일 알림
3. **Guest notifications**: 예약 확인 및 리마인더 설정

### 워크플로우 (Workflow) 설정
1. **1일 전**: 리마인더 이메일
2. **1시간 전**: SMS 또는 이메일 리마인더
3. **예약 후**: 후속 조치 이메일 (설정 링크 등)

## 추가 설정

### Buffer Time
- **Before event**: 5분
- **After event**: 5분

### 취소 정책
- **Cancellation policy**: 최소 2시간 전 취소 가능

### 일정 가능 시간
- **Availability**: 평일 9시~18시
- **Time zone**: Asia/Seoul (한국 시간)