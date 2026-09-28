// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Autenticación de usuarios registrados', () => {
  test('Iniciar sesión con credenciales válidas', async ({ page, loginData }) => {
    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    // 2. Ingresar el email válido.
    const emailInput = page.getByRole('textbox', { name: 'Ingresa tu email' });
    await emailInput.fill(loginData.validUser.email);
    await expect(emailInput).toHaveValue(loginData.validUser.email);

    // 3. Ingresar la contraseña válida.
    const passwordInput = page.getByRole('textbox', { name: 'Ingresa tu contraseña' });
    await passwordInput.fill(loginData.validUser.password);
    await expect(passwordInput).toHaveValue(loginData.validUser.password);
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();

    // 4. Iniciar sesión.
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL(loginData.baseUrl);
    await expect(page.getByRole('link', { name: 'Mi Cuenta' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cerrar Sesión' })).toBeVisible();
  });
});