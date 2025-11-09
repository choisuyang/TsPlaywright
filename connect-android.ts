// ...existing code...
import { _android as android } from 'playwright';  // ✅ 'playwright'에서 import

(async () => {
  // 연결된 안드로이드 기기 목록 가져오기
  const [device] = await android.devices();

  // 디바이스가 없으면 에러 처리
  if (!device) {
    console.error('연결된 안드로이드 디바이스가 없습니다. adb devices 확인하세요.');
    process.exit(1);
  }

  // 디버깅 로그용
  console.log('연결된 기기:', await device.model(), await device.serial());

  // 브라우저 실행 (기기 안의 Chrome)
  const context = await device.launchBrowser();
  const page = await context.newPage();

  await page.goto('https://www.naver.com');
  await page.screenshot({ path: 's24_test.png' });

  await context.close();
})();
// ...existing code...