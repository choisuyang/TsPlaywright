PLAYWRIGHT-TS-PROJECT/
 ├─ frontend/       # React (Vite) 프론트엔드
 ├─ utils/
 │   ├─ qaServer.ts       # Express 서버 (자동 검증 API)
 │   ├─ productCheck.ts   # Playwright 검증 엔진
 │   └─ form.ts
 ├─ tests/         # 기존 Playwright 테스트
 ├─ report/        # Allure 리포트
 ├─ storage/       # Playwright storage
 ├─ package.json   # Playwright & 서버 설정
 └─ playwright.config.ts # Playwright 설정

설치

1. root 프로젝트 (Playwright + 서버)
    npm install
    npx playwright install

2. 프론트엔드 설치
    root > frontend
    npm install

실행

1. root 프로젝트
    npm run qa-server - 기본포트 : 3001

2. 프론트엔드 실행
    cd frontend
    npm run dev - local:5173
