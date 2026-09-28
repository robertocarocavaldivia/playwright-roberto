import { test as base, expect } from '@playwright/test';

export type LoginData = {
  baseUrl: string;
  loginUrl: string;
  signupUrl: string;
  validUser: { email: string; password: string };
  invalidCredentials: { password: string };
  nonexistentUser: { email: string; password: string };
  invalidEmail: { value: string; correctedValue: string; password: string };
  boundaryPassword: { short: string; long: string };
  persistenceUser: { email: string; password: string };
  sqlInjection: { email: string; password: string };
  xss: { email: string; password: string };
  errorMessage: string;
};

export const loginData: LoginData = {
  baseUrl: 'https://www.laboratoriodetesting.com/',
  loginUrl: 'https://www.laboratoriodetesting.com/auth/login',
  signupUrl: 'https://www.laboratoriodetesting.com/auth/signup',
  validUser: { email: 'juanduarte@test.com', password: '12345678' },
  invalidCredentials: { password: 'wrong-password' },
  nonexistentUser: { email: 'inexistente.usuario.2026@test.com', password: '12345678' },
  invalidEmail: { value: 'usuario@dominio', correctedValue: 'usuario@dominio.com', password: 'cualquier-password' },
  boundaryPassword: { short: 'x', long: 'x'.repeat(256) },
  persistenceUser: { email: 'persistencia_test@qa.com', password: 'PruebaPersistencia123!' },
  sqlInjection: { email: "' OR 1=1 --@test.com", password: "' OR '1'='1" },
  xss: { email: "<script>alert('XSS')</script>@test.com", password: '<img src=x onerror=alert(\'XSS\')>' },
  errorMessage: 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.',
};

export const test = base.extend<{ loginData: LoginData }>({
  loginData: async ({}, use) => {
    await use(loginData);
  },
});

export { expect };
