// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Autenticación - Login', () => {
  test('Validar contraseña vacía y entradas límite', async ({ page, loginData }) => {
    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);
    const emailInput = page.getByRole('textbox', { name: 'Ingresa tu email' });
    const passwordInput = page.getByRole('textbox', { name: 'Ingresa tu contraseña' });
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    await expect(submitButton).toBeDisabled();

    // 2. Completar el email y dejar la contraseña vacía.
    await emailInput.fill(loginData.validUser.email);
    await expect(submitButton).toBeDisabled();

    // 3. Probar una contraseña mínima.
    await passwordInput.fill(loginData.boundaryPassword.short);
    await expect(passwordInput).toHaveValue(loginData.boundaryPassword.short);
    await expect(submitButton).toBeDisabled();

    // 4. Probar una contraseña extensa.
    await passwordInput.fill(loginData.boundaryPassword.long);
    await expect(passwordInput).toHaveValue(loginData.boundaryPassword.long);
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Error' })).not.toBeVisible();
  });
});