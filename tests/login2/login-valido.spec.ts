import { test, expect } from '@playwright/test';

test.describe('Autenticación de usuario registrado', () => {
  test('El usuario registrado inicia sesión con credenciales válidas', async ({ page }) => {
    // 1. Abrir la página de login en una sesión nueva y verificar el formulario.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Ingresar las credenciales demo válidas.
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

    // 3. Seleccionar Login y verificar la página de destino.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index/);
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });
});