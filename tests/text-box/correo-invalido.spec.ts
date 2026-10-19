// spec: specs/text-box-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/datos-cuadro-texto.fixture';

test.describe('Formulario de cuadro de texto', () => {
  test('Bloquear el envío con un correo sin signo arroba', async ({ page, textBoxData }) => {
    // 1. Abrir el formulario desde un contexto nuevo.
    await page.goto(textBoxData.url);
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    const fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
    const emailInput = page.getByRole('textbox', { name: 'name@example.com' });
    const currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
    const permanentAddressInput = page.locator('#permanentAddress');
    const submitButton = page.getByRole('button', { name: 'Submit' });
    const output = page.locator('#output');
    const validForm = textBoxData.validForm;
    const invalidEmail = textBoxData.invalidEmails.missingAt;

    // 2. Completar los campos con datos válidos, excepto el email sin signo arroba.
    await fullNameInput.fill(validForm.fullName);
    await emailInput.fill(invalidEmail);
    await currentAddressInput.fill(validForm.currentAddress);
    await permanentAddressInput.fill(validForm.permanentAddress);
    await expect(fullNameInput).toHaveValue(validForm.fullName);
    await expect(emailInput).toHaveValue(invalidEmail);
    await expect(currentAddressInput).toHaveValue(validForm.currentAddress);
    await expect(permanentAddressInput).toHaveValue(validForm.permanentAddress);

    // 3. Hacer clic en Submit.
    await submitButton.click();
    await expect(page).toHaveURL(textBoxData.url);
    await expect(output).toBeEmpty();
    await expect(fullNameInput).toHaveValue(validForm.fullName);
    await expect(emailInput).toHaveValue(invalidEmail);
    await expect(currentAddressInput).toHaveValue(validForm.currentAddress);
    await expect(permanentAddressInput).toHaveValue(validForm.permanentAddress);

    // 4. Corregir el email y volver a enviar.
    await emailInput.fill(textBoxData.correctedEmail);
    await expect(emailInput).toHaveValue(textBoxData.correctedEmail);
    await submitButton.click();
    await expect(output).toContainText(`Name:${validForm.fullName}`);
    await expect(output).toContainText(`Email:${textBoxData.correctedEmail}`);
    await expect(output).toContainText(`Current Address :${validForm.currentAddress}`);
    await expect(output).toContainText(`Permananet Address :${validForm.permanentAddress}`);
  });
});
