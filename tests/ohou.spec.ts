import { Page, test, expect,devices } from '@playwright/test';
import { fillByLabel } from '../utils/form';

test.describe.configure({ mode: 'serial' }); // 🔹 이 줄 추가

test.use(devices['Galaxy S24']);
test.use({
  storageState: 'storage/session.json'
});

test.describe('오늘의 집 테스트', () => {
    test('오늘의집 자동화 테스트', async ({page}) => {
        // 오늘의집 홈페이지진입
        await page.goto("https://ohou.se/");

        // Title expect 확인
        await expect(page).toHaveTitle("라이프스타일 슈퍼앱, 오늘의집");

        // 모바일으로 진행
        await page.getByRole('button', { name: '닫기' }).click();

        // 베스트 > 라벨 (식품) 선택
        await page.locator('label').filter({ hasText: '식품' }).click();

        // 첫번째 상품 선택
        await page.locator('.e1fptbff1 > a').first().click();

        // 구매하기 버튼 선택
        await page.getByRole('button', { name: '구매하기' }).click();

        // 첫번째 옵션 상품 선택
        await page.getByRole('combobox').selectOption('0');
        await page.waitForTimeout(10000)

        // 바로구매버튼 선택
        await page.getByRole('button', { name: '바로구매' }).click();

        // 주문서 페이지 진입 및 주문자 확인
        await expect(page.getByRole('heading', { name : '주문자' })).toBeVisible();

        // // 이메일 입력
        // await fillByLabel(page, "이메일", 'chltndid724@gmail.com','input');

        // // 이메일 뒷자리 옵션 선택
        // await fillByLabel(page, '이메일','4','select')
        // await page.selectOption('select.css-6d28y2','4');

        // 위와 동일하게 채우기 버튼 선택
        await page.getByRole('button' , { name : '위와 동일하게 채우기' }).click();

        // 배송지명 입력
        await fillByLabel(page, "배송지명", "테스트",'input')

        // 주소찾기 버튼 선택
        await page.getByRole('button', { name : '주소찾기' }).click();

        // 주소 입력
        const searchInput = page.locator('#search-input');
        await searchInput.fill('남현동 602-113');
        page.keyboard.press('Enter');
        await page.getByRole('button', { name: '승방3가길 56' }).click();
        await fillByLabel(page, "주소", "402호", 'input')

        // 무통장 입금 버튼 선택
        await page.getByRole('button', { name: '무통장입금' }).click();
        
        // 나이스 페이 진입 대기 및 결제하기 버튼 선택
        await Promise.all([
            page.waitForURL('https://web.nicepay.co.kr/v3/smart/nPayment.jsp'),
            page.getByRole('button', { name: /결제하기$/ }).click()
        ]);

        // 이용약관 전체 동의 선택
        await page.locator('#chkAllAgree').click();

        // 모두 동의 후 진행 선택
        await page.locator('#agreeNextBtn').click();

        // 국민은행 버튼 선택
        await page.locator('#VBANK004').click();
        // 다음 버튼 노출 확인
        await expect(page.getByText('다음')).toBeVisible();
        // 다음 버튼 선택
        await page.locator('#nextBtn').click();
        // 현금영수증 OFF 
        await page.locator('#vbankRcptChk').click();
        await page.waitForTimeout(3000);
        // 결제정보를 모두 확인했습니다. 체크 박스 선택
        await page.getByLabel('결제 정보를 모두 확인했습니다.').click();
        await page.waitForTimeout(3000);
        // 다음 버튼 선택
        await page.locator('#nextBtn').click();
        // 주문완료 페이지에서 해당 텍스트 확인
        await expect(page.getByText('주문이 완료되었어요')).toBeVisible();
        // 쇼핑계속하기 버튼 선택
        await page.getByRole('button', { name: '쇼핑 계속하기' }).click();
        // 쇼핑홈 텍스트 확인
        await expect(page.getByText('쇼핑홈')).toBeVisible();
    })
})
