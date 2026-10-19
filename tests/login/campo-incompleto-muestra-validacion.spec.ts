import { test, expect } from '@playwright/test';

test.describe('Autenticación de login OrangeHRM', () => {
  test('Validar campos incompletos de username y contraseña', async ({ page }) => {
    const username = page.locator('input[name="username"]');
    const password = page.locator('input[name="password"]');
    const requiredMessage = page.getByText('Required', { exact: true });

    // 1. Enviar con Username informado y Password vacío.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await username.fill('Admin');
    await page.locator('button[type="submit"]').click();
    await expect(requiredMessage).toHaveCount(1);
    await expect(requiredMessage).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);

    // 2. Enviar con Username vacío y Password informado.
    await username.fill('');
    await password.fill('clave-cualquiera');
    await page.locator('button[type="submit"]').click();
    await expect(requiredMessage).toHaveCount(1);
    await expect(requiredMessage).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveCount(0);
  });
});
