import { test, expect } from '@playwright/test';

test.describe('Autenticación de login OrangeHRM', () => {
  test('Validar el envío del formulario con campos vacíos', async ({ page }) => {
    // 1. Abrir login en sesión limpia y comprobar que Username y Password están vacíos.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeEmpty();
    await expect(page.locator('input[name="password"]')).toBeEmpty();

    // 2. Enviar el formulario sin completar campos.
    await page.locator('button[type="submit"]').click();

    // 3. Verificar mensajes requeridos y ausencia de autenticación.
    const requiredMessages = page.getByText('Required', { exact: true });
    await expect(requiredMessages).toHaveCount(2);
    await expect(requiredMessages.first()).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveCount(0);
  });
});
