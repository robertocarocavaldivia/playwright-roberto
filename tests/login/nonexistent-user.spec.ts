// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Autenticación - Login', () => {
  test('Rechazar un email inexistente con contraseña válida', async ({ page, loginData }) => {
    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);

    // 2. Ingresar un email válido no registrado.
    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill(loginData.nonexistentUser.email);

    // 3. Ingresar la contraseña válida.
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill(loginData.nonexistentUser.password);

    // 4. Enviar las credenciales.
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 5. Verificar el rechazo sin revelar información sensible.
    await expect(page).toHaveURL(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
    await expect(page.getByText(loginData.errorMessage)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mi Cuenta' })).not.toBeVisible();
  });
});