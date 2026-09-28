// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Autenticación - Login', () => {
  test('Mostrar la pantalla de login desde el acceso principal', async ({ page, loginData }) => {
    // 1. Abrir el home en una sesión limpia.
    await page.goto(loginData.baseUrl);

    // 2. Seleccionar el enlace de acceso.
    await page.getByRole('link', { name: 'Acceder' }).click();

    // 3. Verificar la pantalla de login.
    await expect(page).toHaveURL(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ingresa tu email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ingresa tu contraseña' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();
  });
});