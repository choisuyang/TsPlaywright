import { Page, test, expect,devices } from '@playwright/test';
import { fillByLabel } from '../utils/form';

test.describe.configure({ mode: 'serial' });

test.use(devices['Galaxy S24']);
// test.use({
//   storageState: 'storage/session.json'
// });

test.describe('오늘의 집 테스트', () => {
    test('오늘의집 자동화 테스트', async ({page}) => {
        // 오늘의집 홈페이지진입
        await page.goto("https://ohou.se/productions/541076/selling");

        // 모바일으로 진행
        await page.getByRole('button', { name: '닫기' }).click();

        const title = page.locator('span.production-selling-header__title__name');
        await expect(title).toHaveScreenshot();


        
    })
})
