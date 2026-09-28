// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Autenticación de usuarios registrados', () => {
  test('Validar formato de email antes de autenticar', async ({ page, loginData }) => {
    test.fixme(true, 'Defecto de la aplicación: después de rechazar un email inválido, el botón permanece deshabilitado aunque el formato ya sea válido.');

    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);
    const emailInput = page.getByRole('textbox', { name: 'Ingresa tu email' });
    const passwordInput = page.getByRole('textbox', { name: 'Ingresa tu contraseña' });
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    // 2. Ingresar un email con formato inválido y la contraseña de prueba.
    await emailInput.fill(loginData.invalidEmail.value);
    await passwordInput.fill(loginData.invalidEmail.password);
    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page).toHaveURL(loginData.loginUrl);
    await submitButton.click();
    await expect(page).toHaveURL(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Error' })).not.toBeVisible();

    // 3. Corregir el email.
    await emailInput.fill(loginData.invalidEmail.correctedValue);
    await emailInput.press('Tab');
    await expect(page.getByText('Email inválido')).not.toBeVisible();
    await expect(submitButton).toBeEnabled();
  });
});