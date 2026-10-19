// spec: specs/text-box-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/datos-cuadro-texto.fixture';

test.describe('Formulario de cuadro de texto', () => {
  test('Enviar el formulario vacío', async ({ page, textBoxData }) => {
    // 1. Abrir el formulario desde un contexto nuevo sin ingresar datos.
    await page.goto(textBoxData.url);
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    const fields = [
      page.getByRole('textbox', { name: 'Full Name' }),
      page.getByRole('textbox', { name: 'name@example.com' }),
      page.getByRole('textbox', { name: 'Current Address' }),
      page.locator('#permanentAddress'),
    ];
    const output = page.locator('#output');

    for (const field of fields) {
      await expect(field).toHaveValue('');
    }
    await expect(output).toBeEmpty();

    // 2. Hacer clic en Submit.
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(textBoxData.url);
    await expect(output).toBeEmpty();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    for (const field of fields) {
      await expect(field).toBeVisible();
    }
  });
});
