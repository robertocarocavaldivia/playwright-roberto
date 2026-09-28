// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/login.fixture';

test.describe('Autenticación - Login', () => {
  test('Mostrar y ocultar la contraseña sin alterar el valor', async ({ page, loginData }) => {
    // 1. Abrir el login en una sesión limpia.
    await page.goto(loginData.loginUrl);
    const passwordInput = page.getByRole('textbox', { name: 'Ingresa tu contraseña' });
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // 2. Ingresar la contraseña válida.
    await passwordInput.fill(loginData.validUser.password);
    await expect(passwordInput).toHaveValue(loginData.validUser.password);
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // 3. Mostrar la contraseña.
    const visibilityControl = page.locator('div').filter({ hasText: 'Contraseña' }).getByRole('img');
    await visibilityControl.click();

    // 4. Verificar el valor visible.
    await expect(passwordInput).not.toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveValue(loginData.validUser.password);

    // 5. Ocultar nuevamente la contraseña.
    await visibilityControl.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveValue(loginData.validUser.password);
  });
});