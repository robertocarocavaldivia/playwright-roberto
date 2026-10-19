import { test, expect } from '@playwright/test';

test.describe('Autenticación de usuario registrado', () => {
  test('El sistema rechaza una contraseña incorrecta para un usuario registrado', async ({ page }) => {
    // 1. Abrir la página de login en una sesión nueva.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Ingresar Admin y una contraseña errónea.
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('Incorrecta123');

    // 3. Enviar el formulario y verificar el mensaje genérico de rechazo.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login/);
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});