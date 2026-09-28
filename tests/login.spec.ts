import { test, expect } from './fixtures/login.fixture';

test.describe('Módulo de Autenticación - Casos de Prueba Login', () => {
  test.beforeEach(async ({ page, loginData }) => {
    await page.goto(loginData.loginUrl);
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
  });

  test('TC-LOG-04: Botón Iniciar Sesión deshabilitado con campos vacíos', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();
  });

  test('TC-LOG-05: Validación de formato de email inválido muestra mensaje inline y bloquea envío', async ({ page, loginData }) => {
    await page.getByPlaceholder('Ingresa tu email').fill(loginData.invalidEmail.value);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(loginData.invalidEmail.password);
    await expect(page.getByText('Email inválido')).toBeVisible();
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page.getByRole('heading', { name: 'Error' })).not.toBeVisible();
    await expect(page).toHaveURL(loginData.loginUrl);
  });

  test('TC-LOG-06: Intento de login con credenciales incorrectas despliega modal de error', async ({ page, loginData }) => {
    await page.getByPlaceholder('Ingresa tu email').fill(loginData.nonexistentUser.email);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(loginData.invalidCredentials.password);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(loginData.errorMessage)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Volver' })).toBeVisible();
  });

  test('TC-LOG-10: Auditoría UI de botón de visibilidad de contraseña', async ({ page, loginData }) => {
    const passInput = page.getByPlaceholder('Ingresa tu contraseña');
    await passInput.fill(loginData.validUser.password);
    await expect(passInput).toHaveAttribute('type', 'password');
    const toggleButtonType = await page.locator('input[name="password"] ~ button').getAttribute('type');
    expect(toggleButtonType === null || toggleButtonType === 'submit').toBe(true);
  });

  test('TC-LOG-11: Cierre del modal de error mediante botón Volver y persistencia de datos', async ({ page, loginData }) => {
    const emailInput = page.getByPlaceholder('Ingresa tu email');
    const passInput = page.getByPlaceholder('Ingresa tu contraseña');
    await emailInput.fill(loginData.persistenceUser.email);
    await passInput.fill(loginData.persistenceUser.password);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    const volverBtn = page.getByRole('button', { name: 'Volver' });
    await expect(volverBtn).toBeVisible({ timeout: 10000 });
    await volverBtn.click();
    await expect(volverBtn).not.toBeVisible();
    await expect(emailInput).toHaveValue(loginData.persistenceUser.email);
    await expect(passInput).toHaveValue(loginData.persistenceUser.password);
  });

  test('TC-LOG-13: Navegación hacia la página de Registro', async ({ page, loginData }) => {
    await page.getByRole('link', { name: '¿No tienes una cuenta? Crea una' }).click();
    await expect(page).toHaveURL(loginData.signupUrl);
    await expect(page.getByRole('heading', { name: 'Crea un usuario nuevo' })).toBeVisible();
  });

  test('TC-LOG-14: Presencia y visibilidad del botón Olvidaste tu contraseña', async ({ page }) => {
    await expect(page.getByRole('button', { name: '¿Olvidaste tu contraseña?' })).toBeVisible();
  });

  test('TC-LOG-16: Seguridad - Resistencia a SQL Injection', async ({ page, loginData }) => {
    await page.getByPlaceholder('Ingresa tu email').fill(loginData.sqlInjection.email);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(loginData.sqlInjection.password);
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    const inlineError = page.getByText('Email inválido');

    if (await inlineError.isVisible()) {
      await submitButton.click();
      await expect(page.getByRole('heading', { name: 'Error' })).not.toBeVisible();
    } else {
      await submitButton.click();
      await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible({ timeout: 10000 });
    }

    await expect(page).toHaveURL(loginData.loginUrl);
  });

  test('TC-LOG-17: Seguridad - Sanitización contra XSS', async ({ page, loginData }) => {
    let dialogTriggered = false;
    page.on('dialog', async (dialog) => {
      dialogTriggered = true;
      await dialog.dismiss();
    });

    await page.getByPlaceholder('Ingresa tu email').fill(loginData.xss.email);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(loginData.xss.password);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL(loginData.loginUrl);
    expect(dialogTriggered).toBe(false);
  });
});