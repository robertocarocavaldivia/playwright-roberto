// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Login y autenticación', () => {
  test('Validar email con formato inválido', async ({ page, loginData }) => {
    test.fixme(true, 'Defecto de la aplicación: después de corregir el email, el mensaje desaparece pero el botón permanece deshabilitado.');

    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    // 2. Ingresar un email inválido y una contraseña de prueba.
    const emailInput = page.getByRole('textbox', { name: 'Ingresa tu email' });
    const passwordInput = page.getByRole('textbox', { name: 'Ingresa tu contraseña' });
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
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
    // El botón debería habilitarse aquí, pero la aplicación conserva el estado deshabilitado.
    await expect(submitButton).toBeEnabled();
  });
});