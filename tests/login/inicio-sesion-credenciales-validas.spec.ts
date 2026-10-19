import { test, expect } from '@playwright/test';

test.describe('Autenticación de login OrangeHRM', () => {
  test('Iniciar sesión correctamente con credenciales válidas', async ({ page }) => {
    // 1. Abrir login en contexto limpio y verificar sus controles.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page).not.toHaveURL(/dashboard/);

    // 2. Ingresar credenciales demo y comprobar que Password permanece oculto.
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.getByRole('textbox', { name: 'Password' });
    await username.fill('Admin');
    await password.fill('admin123');
    await expect(username).toHaveValue('Admin');
    await expect(password).toHaveAttribute('type', 'password');

    // 3. Enviar credenciales y verificar el acceso al Dashboard.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('alert')).toHaveCount(0);
  });
});
