// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Login y autenticación', () => {
  test('Rechazar credenciales incorrectas con un mensaje claro', async ({ page, loginData }) => {
    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    // 2. Ingresar el usuario válido y una contraseña incorrecta.
    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill(loginData.validUser.email);
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill(loginData.invalidCredentials.password);
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();

    // 3. Enviar y verificar el error.
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
    await expect(page.getByText(loginData.errorMessage)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Volver' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mi Cuenta' })).not.toBeVisible();

    // 4. Cerrar el diálogo.
    await page.getByRole('button', { name: 'Volver' }).click();
    await expect(page.getByRole('heading', { name: 'Error' })).not.toBeVisible();
  });
});