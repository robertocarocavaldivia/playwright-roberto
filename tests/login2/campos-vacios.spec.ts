import { test, expect } from '@playwright/test';

test.describe('Autenticación de usuario registrado', () => {
  test('El formulario no autentica cuando ambos campos están vacíos', async ({ page }) => {
    // 1. Abrir login en una sesión nueva y dejar ambos campos vacíos.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Seleccionar Login y verificar que los campos obligatorios se identifican.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Required').first()).toBeVisible();
    await expect(page.getByText('Required')).toHaveCount(2);
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login/);
  });
});