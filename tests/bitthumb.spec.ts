import { Page, test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' }); // 🔹 이 줄 추가


test.describe('빗썸 테스트', () => {
  test('빗썸 페이지 진입 및 타이틀 확인', async ({ page }) => {
    // 빗썸 메인 페이지 진입
    await page.goto('https://m.bithumb.com/react/main');
    // 빗썸 타이틀 요소 확인
    await expect(page).toHaveTitle(/거래소 | 빗썸/);

    // 상단 타이틀 '수수료 무료' 선택
    await page.getByRole('button', {name : '수수료 무료'}).click();
    // 지정한 코인 찾기 및 상세 페이지 진입
    await clickCoinByName(page, '앵커');
    // 주문 > 매수 선택
    await page.getByRole('button', {name : '매수'}).click();
    // 시장 선택
    await page.getByRole('button', { name: '시장'}).click();
    // 총액 선택
    await page.getByRole('textbox', { name: '총액' }).click();


    // 5000원 입력
    await page.getByRole('button',{ name : '5', exact:true}).click();
    await page.getByRole('button',{ name : '0', exact:true}).click();
    await page.getByRole('button',{ name : '0', exact:true}).click();
    await page.getByRole('button',{ name : '0', exact:true}).click();
    // 확인 버튼 선택
    await page.getByRole('button', { name : '확인' }).click();


    await page.waitForTimeout(10_000); // 10초 대기

    await page.screenshot({ path: 'test.png' });
  
  })

})

async function clickCoinByName(page: Page, name: string) {
  // 1. 가상화 리스트 컨테이너 잡기 (너 스샷 기준 클래스)
  const grid = page.locator('.ReactVirtualized__Grid');

  // 2. 스크롤 반복하면서 찾기
  const maxScroll = 20000;   // 안전빵으로 큰 값
  const step = 400;          // 한 번에 내릴 px
  let scrolled = 0;

  while (scrolled <= maxScroll) {
    // 지금 화면에 보이는 것 중에 '비트코인' 있는지 먼저 확인
    const item = page.getByText(name).first();

    if (await item.isVisible().catch(() => false)) {
      await item.click();
      return;
    }

    // 없으면 컨테이너를 조금 더 아래로 스크롤
    await grid.evaluate((el, step) => {
      el.scrollTop = (el.scrollTop || 0) + step;
    }, step);

    scrolled += step;
  }

  throw new Error(`"${name}" 항목을 가상화 리스트에서 찾지 못했습니다.`);
}
