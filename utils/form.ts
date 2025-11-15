// export async function fillInputByLabel(page: any, label: string, value: string) {
//     const input = page.locator('div.css-1go6mj6', {
//         has : page.locator('div', {hasText : label})
//     }).locator('input');

//     await input.click();
//     await input.fill(value);
// }

export async function fillByLabel(
  page: any,
  label: string,
  value: string,
  type: 'input' | 'select'
) {
  const base = page.locator('div.css-1go6mj6', {
    has: page.locator('div', { hasText: label })
  });

  if (type === 'input') {
    // disabled 아닌 input만 선택!
    const input = base.locator('input:not([disabled])').first();

    await input.click();
    await input.fill(value);
    return;
  }

  if (type === 'select') {
    const select = base.locator('select');
    await select.first().selectOption(value);
    return;
  }

  throw new Error(`Unknown type: ${type}`);
}



