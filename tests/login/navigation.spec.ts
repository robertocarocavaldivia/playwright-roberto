// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Autenticación - Login', () => {
  test('Navegar a registro y recuperar el formulario sin autenticarse', async ({ page, loginData }) => {
    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    // 2. Navegar al registro.
    await page.getByRole('link', { name: '¿No tienes una cuenta? Crea' }).click();
    await expect(page).toHaveURL(loginData.signupUrl);

    // 3. Volver al login.
    await page.goto(loginData.loginUrl);

    // 4. Abrir la recuperación de contraseña.
    await page.getByRole('button', { name: '¿Olvidaste tu contraseña?' }).click();
    await expect(page.getByRole('heading', { name: 'Ingresa tu dirección email' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Recuperar contraseña' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mi Cuenta' })).not.toBeVisible();
  });
});