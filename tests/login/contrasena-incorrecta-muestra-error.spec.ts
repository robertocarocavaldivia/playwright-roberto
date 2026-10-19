import { test, expect } from '@playwright/test';

test.describe('Autenticación de login OrangeHRM', () => {
  test('Rechazar una contraseña incorrecta con un mensaje claro', async ({ page }) => {
    // 1. Abrir login en sesión limpia.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Ingresar Admin y una contraseña incorrecta.
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('clave-incorrecta');

    // 3. Enviar las credenciales y comprobar el error accesible.
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.getByRole('alert')).toHaveText('Invalid credentials');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveCount(0);
  });
});
