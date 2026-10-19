// spec: specs/text-box-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/datos-cuadro-texto.fixture';

test.describe('Formulario de cuadro de texto', () => {
  test('Conservar signos y espacios en las direcciones', async ({ page, textBoxData }) => {
    // 1. Abrir el formulario desde un contexto nuevo.
    await page.goto(textBoxData.url);
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    const fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
    const emailInput = page.getByRole('textbox', { name: 'name@example.com' });
    const currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
    const permanentAddressInput = page.locator('#permanentAddress');
    const output = page.locator('#output');
    const form = textBoxData.boundaryForm;

    await expect(fullNameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(currentAddressInput).toHaveValue('');
    await expect(permanentAddressInput).toHaveValue('');
    await expect(output).toBeEmpty();

    // 2. Completar todos los campos con los datos de límites configurados en el fixture.
    await fullNameInput.fill(form.fullName);
    await emailInput.fill(form.email);
    await currentAddressInput.fill(form.currentAddress);
    await permanentAddressInput.fill(form.permanentAddress);
    await expect(fullNameInput).toHaveValue(form.fullName);
    await expect(emailInput).toHaveValue(form.email);
    await expect(currentAddressInput).toHaveValue(form.currentAddress);
    await expect(permanentAddressInput).toHaveValue(form.permanentAddress);

    // 3. Hacer clic en Submit.
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(output).toContainText(`Name:${form.fullName}`);
    await expect(output).toContainText(`Email:${form.email}`);
    await expect(output).toContainText(`Current Address :${form.currentAddress}`);
    await expect(output).toContainText(`Permananet Address :${form.permanentAddress}`);
  });
});
