import { test, expect } from '@playwright/test';

test.describe('Autenticación de usuario registrado', () => {
  test('El usuario puede corregir las credenciales después de un intento fallido', async ({ page }) => {
    // 1. Enviar credenciales erróneas y verificar el error.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('UsuarioInvalido');
    await page.getByRole('textbox', { name: 'Password' }).fill('Incorrecta123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();

    // 2. Reemplazar por las credenciales demo válidas y verificar el dashboard.
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index/);
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });
});