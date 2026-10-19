// spec: specs/text-box-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/datos-cuadro-texto.fixture';

test.describe('Formulario de cuadro de texto', () => {
  test('Completar los cuatro campos y enviar con datos válidos', async ({ page, textBoxData }) => {
    // 1. Abrir el formulario desde un contexto nuevo.
    await page.goto(textBoxData.url);
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    const fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
    const emailInput = page.getByRole('textbox', { name: 'name@example.com' });
    const currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
    const permanentAddressInput = page.locator('textarea#permanentAddress');
    const output = page.locator('#output');
    const form = textBoxData.validForm;

    await expect(fullNameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(currentAddressInput).toHaveValue('');
    await expect(permanentAddressInput).toHaveValue('');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await expect(output).toBeEmpty();

    // 2. Ingresar el nombre válido configurado en el fixture.
    await fullNameInput.fill(form.fullName);
    await expect(fullNameInput).toHaveValue(form.fullName);

    // 3. Ingresar el email válido configurado en el fixture.
    await emailInput.fill(form.email);
    await expect(emailInput).toHaveValue(form.email);

    // 4. Ingresar la dirección actual configurada en el fixture.
    await currentAddressInput.fill(form.currentAddress);
    await expect(currentAddressInput).toHaveValue(form.currentAddress);

    // 5. Ingresar la dirección permanente configurada en el fixture.
    await permanentAddressInput.fill(form.permanentAddress);
    await expect(permanentAddressInput).toHaveValue(form.permanentAddress);

    // 6. Hacer clic en Submit.
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(textBoxData.url);
    await expect(output).toContainText(`Name:${form.fullName}`);
    await expect(output).toContainText(`Email:${form.email}`);
    await expect(output).toContainText(`Current Address :${form.currentAddress}`);
    await expect(output).toContainText(`Permananet Address :${form.permanentAddress}`);
    await expect(fullNameInput).toHaveValue(form.fullName);
    await expect(emailInput).toHaveValue(form.email);
    await expect(currentAddressInput).toHaveValue(form.currentAddress);
    await expect(permanentAddressInput).toHaveValue(form.permanentAddress);
  });
});
