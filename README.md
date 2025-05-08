# 📺 OTT Clone Project (TMDB API 기반)

Node.js, React, TypeScript를 사용하여 제작한 OTT 클론 프로젝트입니다. TMDB API를 통해 영화/TV 콘텐츠 정보를 가져와 사용자에게 제공하는 서비스를 구현했습니다.

# 📁 프로젝트 구조

```
📦 root
├── backend
│   ├── prisma              # ✅ Prisma ORM 및 DB 스키마 정의
│   ├── src
│   │   ├── config          # ⚙️ 환경설정 (예: DB 연결, dotenv 등)
│   │   ├── controllers     # 📡 요청 처리 핸들러 (REST API용)
│   │   ├── middlewares     # 🧱 인증, 에러 처리 미들웨어
│   │   ├── routes          # 🚦 API 라우팅 설정
│   │   ├── services        # 🧠 핵심 로직 처리 (비즈니스 로직)
│   │   ├── types           # 🧾 TypeScript 타입 정의
│   │   └── utils           # 🔧 유틸리티 함수
│   └── server.ts           # 🚀 Express 서버 엔트리 포인트
│
├── frontend
│   ├── public              # 🌐 정적 파일 (favicon, html 등)
│   ├── src
│   │   ├── apis            # 🌐 TMDB API 연동 모듈
│   │   ├── assets          # 🎨 이미지, 폰트 등 정적 리소스
│   │   ├── components      # 🧩 재사용 가능한 UI 컴포넌트
│   │   ├── pages           # 📄 페이지 단위 UI 구성
│   │   ├── styles          # 💅 CSS 모듈 / 전역 스타일
│   │   ├── types           # 🧾 프론트엔드용 타입 정의
│   │   └── utils           # 🔧 공통 유틸 함수
```

# ⚙️ 기술 스택

### FE
<div align=center>

  <img src="https://img.shields.io/badge/react-00A8E1?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/prettier-FF4F8B?style=for-the-badge&logo=prettier&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/axios-6935D3?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/npm-ED1C24?style=for-the-badge&logo=npm&logoColor=white">
  <br>
</div>

### BE
<div align=center>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=black">
  <img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">
  <img src="https://img.shields.io/badge/prettier-FF4F8B?style=for-the-badge&logo=prettier&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
  <img src="https://img.shields.io/badge/nginx-006272?style=for-the-badge&logo=nginx&logoColor=green">
  <img src="https://img.shields.io/badge/npm-ED1C24?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
  <br>
</div>

### 공통
<div align=center>

  <img src="https://img.shields.io/badge/figma-EF2D5E?style=for-the-badge&logo=figma&logoColor=black">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</div> 


## 🖥️ 서비스 소개
|   메인 화면  |  로그인  |   회원가입   |
|:--------:|:------:|:--------:|
| <img width="310" alt="main page" src="https://github.com/user-attachments/assets/24024b18-48b0-4d9a-b9a0-d74b348f96af" /> |<img width="310" alt="로그인" src="https://github.com/user-attachments/assets/b916ca7b-f74a-40d4-8e5d-395dc9ea7d68" /> | <img width="310" alt="스크린샷 2025-05-08 오전 11 37 09" src="https://github.com/user-attachments/assets/b677cf26-c549-4bc1-b1b3-430abb86bf8b" />|

|                                                                                                          마이 페이지                                                                                                          |                                                                                                              상세 페이지                                                                                                               |                                                                                                             찜 및 시청 기록                                                                                                            |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| <img width="310" alt="마이 페이지" src="https://github.com/user-attachments/assets/2c77939b-9cfe-4639-a5f8-5c3c0242b35d" />| <img width="310" alt="상세 페이지" src="https://github.com/user-attachments/assets/b3fc7d9f-cab5-4b7b-a8f0-2647713365b4" />| <img width="310" alt="찜 및 시청 기록" src="https://github.com/user-attachments/assets/fcbe0b82-3740-4d30-8f88-7a1dd8e3fc34" />|

# 🏗️ AWS 3-Tier Architecture for DIFLIX

![AWS Architecture Diagram](https://github.com/user-attachments/assets/a5767a22-cfc3-4204-9447-a37be15f5ac5)

---

## 🌐 아키텍처 개요

본 프로젝트는 AWS 기반 3-Tier 구조로 구성된 웹 애플리케이션입니다. 각 계층은 다음과 같이 역할이 분리되어 있습니다:

- **Web (Frontend)**: 정적 콘텐츠 제공 (React)
- **WAS (Backend)**: API 서버, 비즈니스 로직 처리 (Node.js, Express)
- **DB (Database)**: PostgreSQL 데이터베이스

---

## 🧩 구성 요소 설명

| 구성 요소          | 설명 |
|--------------------|------|
| **Public Subnet**  | Web 서버와 NAT Gateway 위치. 외부 인터넷과 직접 통신 가능. |
| **Private Subnet** | WAS, DB 인스턴스 위치. 외부 인터넷 접근 차단. |
| **Web (EC2)**      | React 기반 정적 페이지 제공 (Nginx 등 사용) |
| **WAS (EC2)**      | API 처리 및 데이터 로직 수행 |
| **DB (EC2 or RDS)**| PostgreSQL DB 운영 |
| **NAT Gateway**    | Private Subnet에 위치한 WAS가 외부로 통신할 수 있도록 지원 |
| **Internet Gateway**| Web 서버를 외부 인터넷과 연결 |
| **VPC**            | 전체 리소스를 담고 있는 가상 네트워크 |

---

## 🔄 동작 흐름

1. 사용자는 웹사이트 접속 (퍼블릭 IP 또는 도메인)
2. Web 서버에서 정적 파일 서빙, 필요시 WAS로 API 요청 전송
3. WAS는 DB와 통신하여 데이터 처리
4. 외부 API 호출 시 WAS는 **NAT Gateway**를 통해 인터넷 접근

---

## ✅ 설계 목적 및 이점

- **보안 강화**: DB와 WAS는 외부 노출 없이 Private Subnet에 배치
- **확장성 확보**: 각 계층의 역할 분리로 수평/수직 확장 용이
- **비용 최적화**: NAT Gateway를 통해 필요한 외부 접근만 허용
- **유지보수 용이성**: 문제 발생 시 계층별 추적과 디버깅이 쉬움

---

## 📝 참고 사항

- CloudFront, ALB 등 추가 구성 요소는 추후 확장 가능
- 모든 인스턴스는 EC2로 구성되며, 컨테이너(Docker) 기반으로 서비스 실행
- 보안 그룹은 최소 허용 원칙으로 설정

---



# 🚀 실행 방법

## 1. 환경 변수 설정

루트 디렉터리에 .env 파일을 생성하고 TMDB API 키와 DB 설정을 입력합니다.

```
env
# backend/.env
DATABASE_URL="postgresql"
TMDB_API_KEY="TMDB api key"
TOSS_SECRET_KEY="Toss API key"
TMDB_BASE_URL = "https://api.themoviedb.org/3"
```

# 🌟 주요 기능

- 🎞 TMDB API를 통한 영화 및 TV 콘텐츠 목록/상세 조회

- 🔍 키워드 기반 검색 기능

- 📌 영화 찜 기능
  
- 📱 반응형 UI 설계

- 영화 시청기록 기능

## 📑 프로젝트 규칙

### Branch Strategy
> - main / dev / 브랜치 기본 생성 


### Git Convention
> 1. 적절한 커밋 접두사 작성
> 2. 커밋 메시지 내용 작성
> 3. 내용 뒤에 이슈 (#이슈 번호)와 같이 작성하여 이슈 연결

### Pull Request
> ### Title
> * 제목은 '[Feat] 홈 페이지 구현'과 같이 작성합니다.

> ### PR Type
  > - [ ] FEAT: 새로운 기능 구현
  > - [ ] FIX: 버그 수정
  > - [ ] DOCS: 문서 수정
  > - [ ] STYLE: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  > - [ ] REFACTOR: 코드 리펙토링
  > - [ ] CHORE: 빌드 업무 수정, 패키지 매니저 수정

### Code Convention
>BE
> - 패키지명 전체 소문자
> - 클래스명, CamelCase
> - 클래스 이름 명사 사용


> FE
> - 클래스명, CamelCase
> - Event handler 사용 (ex. handle ~)
> - export방식 (ex. export default ~)
> - 화살표 함수 사용

### Communication Rules
> - Discord 활용
> - 정기 회의
