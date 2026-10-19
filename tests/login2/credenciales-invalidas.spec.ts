import { test, expect } from '@playwright/test';

test.describe('Autenticación de usuario registrado', () => {
  test('El sistema informa claramente cuando ambos datos son inválidos', async ({ page }) => {
    // 1. Abrir la página de login en una sesión nueva y verificar el formulario.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Ingresar un usuario inexistente y una contraseña incorrecta.
    await page.getByRole('textbox', { name: 'Username' }).fill('UsuarioInvalido');
    await page.getByRole('textbox', { name: 'Password' }).fill('ClaveIncorrecta123');

    // 3. Enviar el formulario y verificar el rechazo claro en una alerta accesible.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Invalid credentials');
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login/);
    await expect(page.getByRole('textbox', { name: 'Password' })).not.toHaveValue('ClaveIncorrecta123');
  });
});