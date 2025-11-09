import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['html', { outputFolder: 'report' }],
    ['list'],               // 콘솔에 간단히 표시
    ['allure-playwright']   // Allure 결과 생성
  ],
  use: {
    screenshot: 'only-on-failure',  // 실패 시 스크린샷 자동 첨부
    trace: 'retain-on-failure',     // 실패 시 trace 첨부
    video: 'retain-on-failure',     // 실패 시 video 첨부
    headless: false,
    browserName: 'chromium',

    // 💡 Galaxy S24 사양에 맞춘 에뮬레이션
    viewport: { width: 1080, height: 2340 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (Linux; Android 14; SM-S921N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    launchOptions: {
      slowMo: 200,
    },
  },
});
