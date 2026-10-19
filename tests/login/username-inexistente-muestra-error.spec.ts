import { test, expect } from '@playwright/test';

test.describe('Autenticación de login OrangeHRM', () => {
  test('Rechazar un username inexistente con un mensaje claro', async ({ page }) => {
    // 1. Abrir login en una sesión limpia.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Completar el formulario con un username inexistente.
    await page.locator('input[name="username"]').fill('usuario-inexistente');
    await page.locator('input[name="password"]').fill('clave-cualquiera');

    // 3. Enviar y verificar rechazo con mensaje genérico, sin acceso al Dashboard.
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.getByRole('alert')).toHaveText('Invalid credentials');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveCount(0);
  });
});
