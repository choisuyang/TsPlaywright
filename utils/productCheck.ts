import { chromium , devices} from '@playwright/test';

export interface ProductCheckResult {
    productNo : string;
    ok : boolean;
    fields : {
        title : boolean;
        price : boolean;
        // image : boolean;
        // description : boolean;
    }
    values: {
        title? : string | null;
        price? : string | null;
    }
    errors: string[];
    screenshot? : string | null;
}

// const expectedProductData: Record<string, {title: string; price: string;}> = {
//     '541076' : { title : '하이', price : '195,000' }
// }

export async function checkProduct(productNo : string) : Promise <ProductCheckResult>{
    const browser = await chromium.launch({ headless : false });
    const iPhone = devices['iPhone 11 Pro'];
    const context = await browser.newContext({
        ...iPhone,
    })
    const page = await context.newPage();

    // page.setDefaultTimeout(60000);
    // page.setDefaultNavigationTimeout(60000);
    

    const result : ProductCheckResult = {
        productNo,
        ok: false,
        fields: {
            title : false,
            price : false,
            // image : true,
            // description : true,
        },
        values : {
            title : null,
            price : null,
        },
        errors : [],
        screenshot : null
    };
    try {
        await page.goto(`https://ohou.se/productions/${productNo}/selling`, {
            waitUntil: 'domcontentloaded',
        });

        
        // const titleText = (await page.locator('span.production-selling-header__title__name').textContent())?.trim() ?? null;
        // const priceText = (await page.locator('.production-selling-header__price__price', {has: page.locator('span.number')}).textContent())?.trim() ?? null;
        try {
            await page.getByRole('button', { name: '닫기' }).click();
            const titleText = (await page.locator('span.production-selling-header__title__name').textContent()) ?? '';
            result.values.title = titleText;

            if (titleText) {
                result.fields.title = true;
            } else {
                result.errors.push('상품명 텍스트가 비어있음');
            }
        } catch (e:any) {
            result.errors.push(`상품명 체크 실패 : ${e?.message}`)
        }

        try {
            const priceText = (await page.locator('.production-selling-header__price__price', {has: page.locator('span.number')}).textContent()) ?? '';
            result.values.price = priceText;

            if (priceText){
                result.fields.price = true;
            } else {
                result.errors.push('가격 텍스트가 비어 있음');
            }
        } catch (e:any) {
            result.errors.push(`가격 체크 실패 : ${e?.message}`);
        }
        result.ok = Object.values(result.fields).every(Boolean);

        try {
            const buffer = await page.screenshot({ fullPage: true });
            result.screenshot = buffer.toString('base64');
        } catch (e) {
            result.errors.push('스크린샷 캡쳐 실패');
        }
    } catch (e:any) {
        result.errors.push(`페이지 진입 실패 : ${e?.message}`)
    } finally {
        await browser.close();
    }
    return result;
}

