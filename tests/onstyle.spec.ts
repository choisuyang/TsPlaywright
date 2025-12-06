import { Page, test, expect,devices } from '@playwright/test';
import { fillByLabel } from '../utils/form';

test.describe.configure({ mode: 'serial' }); // 🔹 이 줄 추가

test.use(devices['Galaxy S24']);
test.use({
  storageState: 'storage/session.json'
});

test.describe('온스타일 테스트', () => {
    test('온스타일 자동화 테스트', async ({page}) => {
        // 오늘의집 홈페이지진입
        await page.goto("https://base.cjonstyle.com/");

        // Title expect 확인
        await expect(page).toHaveTitle("홈 | CJ온스타일");

        await page.getByRole('button', { name: '닫기', exact: true }).click();
        
        await page.getByRole('link', { name: '마이 존' }).click();
         await page.getByRole('link', { name: '검색페이지로 이동' }).click();
        await page.getByRole('searchbox', { name: '검색어 입력' }).click();
        await page.getByRole('searchbox', { name: '검색어 입력' }).fill('볼펜');
        await page.getByRole('link', { name: '볼펜', exact: true }).click();
        await page.getByRole('link', { name: '오피스디포 미쯔비시 제트스트림 3색볼펜 투명 0.' }).click();
        await page.getByRole('button', { name: '닫기', exact: true }).click();
        await page.getByRole('button', { name: '구매하기' }).click();
        await page.getByRole('button', { name: '바로구매' }).click();
        await page.getByText('BC카드(페이북) 카드이름ONE(K-패스) 카드번호').click();
        await page.getByText('BC카드(페이북) 카드이름ONE(K-패스) 카드번호').click();
        page.once('dialog', dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          dialog.dismiss().catch(() => {});
        });
        await page.getByRole('button', { name: 'BC카드(페이북) 대표카드여부' }).click();
        const page1Promise = page.waitForEvent('popup');

        await page.locator('#fixOrderButtonSection button').filter({ hasText: '원 결제하기' }).click();
        const page1 = await page1Promise;
        await page1.getByRole('button', { name: '3' }).click();
        await page1.getByRole('button', { name: '6' }).click();
        await page1.getByRole('button', { name: '9' }).click();
        await page1.getByRole('button', { name: '7' }).click();
        await page1.getByRole('button', { name: '7' }).click();
        await page1.getByRole('button', { name: '7' }).click();
        await page.goto('https://base.cjonstyle.com/m/order/end/202512060932431174/20251206091872');
        await page.getByText('주문이 완료되었습니다').click();
        await page.getByRole('link', { name: '주문상세내역' }).click();

      // 결제수단: 원클릭으로 강제 설정
    




       


        // await page.locator('#fixOrderButtonSection button').filter({ hasText: '원 결제하기' }).click();

    })
})
