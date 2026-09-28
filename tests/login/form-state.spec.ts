// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Autenticación - Login', () => {
  test('Habilitar el envío con email y contraseña completos', async ({ page, loginData }) => {
    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);
    const emailInput = page.getByRole('textbox', { name: 'Ingresa tu email' });
    const passwordInput = page.getByRole('textbox', { name: 'Ingresa tu contraseña' });
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    await expect(submitButton).toBeDisabled();

    // 2. Completar el email.
    await emailInput.fill(loginData.validUser.email);

    // 3. Completar la contraseña.
    await passwordInput.fill(loginData.validUser.password);
    await expect(submitButton).toBeEnabled();

    // 4. Vaciar el email.
    await emailInput.fill('');
    await expect(submitButton).toBeDisabled();

    // 5. Restaurar el email y vaciar la contraseña.
    await emailInput.fill(loginData.validUser.email);
    await passwordInput.fill('');
    await expect(submitButton).toBeDisabled();
  });
});