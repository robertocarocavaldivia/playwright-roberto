// spec: specs/text-box-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/datos-cuadro-texto.fixture';

test.describe('Formulario de cuadro de texto', () => {
  test('Bloquear el envío con el dominio del correo vacío', async ({ page, textBoxData }) => {
    // 1. Abrir el formulario desde un contexto nuevo.
    await page.goto(textBoxData.url);
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    const fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
    const emailInput = page.getByRole('textbox', { name: 'name@example.com' });
    const currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
    const permanentAddressInput = page.locator('textarea#permanentAddress');
    const output = page.locator('#output');
    const validForm = textBoxData.validForm;
    const invalidEmail = textBoxData.invalidEmails.missingDomain;

    // 2. Completar los otros campos y usar un email sin dominio.
    await fullNameInput.fill(validForm.fullName);
    await emailInput.fill(invalidEmail);
    await currentAddressInput.fill(validForm.currentAddress);
    await permanentAddressInput.fill(validForm.permanentAddress);
    await expect(fullNameInput).toHaveValue(validForm.fullName);
    await expect(emailInput).toHaveValue(invalidEmail);
    await expect(currentAddressInput).toHaveValue(validForm.currentAddress);
    await expect(permanentAddressInput).toHaveValue(validForm.permanentAddress);

    // 3. Hacer clic en Submit.
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(textBoxData.url);
    await expect(output).toBeEmpty();
    await expect(fullNameInput).toHaveValue(validForm.fullName);
    await expect(emailInput).toHaveValue(invalidEmail);
    await expect(currentAddressInput).toHaveValue(validForm.currentAddress);
    await expect(permanentAddressInput).toHaveValue(validForm.permanentAddress);
  });
});
