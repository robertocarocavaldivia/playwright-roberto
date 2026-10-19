import { test, expect } from '@playwright/test';

test.describe('Autenticación de usuario registrado', () => {
  test('El sistema rechaza un Username no registrado', async ({ page }) => {
    // 1. Abrir la página de login en una sesión nueva.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Ingresar un Username no registrado y una contraseña no vacía.
    await page.getByRole('textbox', { name: 'Username' }).fill('UsuarioInvalido');
    await page.getByRole('textbox', { name: 'Password' }).fill('ClaveCualquiera123');

    // 3. Enviar y verificar el rechazo sin revelar cuál dato es incorrecto.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login/);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});