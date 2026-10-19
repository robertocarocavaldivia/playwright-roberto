import { test, expect } from '@playwright/test';

test.describe('Autenticación de usuario registrado', () => {
  test('El formulario valida cada campo obligatorio por separado', async ({ page }) => {
    // 1. Abrir login y enviar con Username vacío y Password completado.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Required')).toBeVisible();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login/);

    // 2. Completar Username, vaciar Password y verificar su validación.
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Required')).toBeVisible();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login/);
  });
});