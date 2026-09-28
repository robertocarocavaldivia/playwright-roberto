# Plan de pruebas - Login y autenticación

## Application Overview

Plan funcional para laboratoriodetesting.com basado en docs/historia-login.md. Se validan campos vacíos, email inválido, credenciales incorrectas y login válido. Cada prueba utiliza tests/seed.spec.ts como seed y comienza en contexto limpio.

## Test Scenarios

### 1. Login y autenticación

**Seed:** `tests/seed.spec.ts`

#### 1.1. Bloquear el envío con campos vacíos

**File:** `tests/login/empty-fields.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/auth/login en un contexto limpio.
    - expect: Se muestra "Inicia Sesión".
    - expect: Se muestran los campos de email y contraseña.
    - expect: El botón "Iniciar Sesión" está deshabilitado.
  2. Comprobar el estado del botón sin intentar forzar un clic sobre un control deshabilitado.
    - expect: El formulario permanece en /auth/login.
    - expect: No se inicia una sesión.
    - expect: No aparece un error técnico.

#### 1.2. Validar un email con formato inválido

**File:** `tests/login/invalid-email.spec.ts`

**Steps:**
  1. Abrir el login en contexto limpio.
    - expect: Se muestra el formulario vacío.
  2. Ingresar "usuario@dominio" y una contraseña de prueba.
    - expect: Se muestra "Email inválido".
    - expect: El botón permanece deshabilitado.
    - expect: No se inicia una sesión.
  3. Corregir el email a un formato válido y salir del campo.
    - expect: Desaparece el mensaje de validación.
    - expect: El valor corregido permanece visible.
    - expect: Si el botón continúa deshabilitado, se registra el defecto de validación.

#### 1.3. Mostrar un mensaje claro para credenciales incorrectas

**File:** `tests/login/invalid-credentials.spec.ts`

**Steps:**
  1. Abrir el login en contexto limpio.
    - expect: Se muestra el formulario.
  2. Ingresar un email válido de prueba y una contraseña incorrecta.
    - expect: El botón queda habilitado.
  3. Seleccionar "Iniciar Sesión".
    - expect: La URL permanece en /auth/login.
    - expect: Aparece el diálogo "Error" con un mensaje claro.
    - expect: No se autentica el usuario.
  4. Seleccionar "Volver".
    - expect: El diálogo se cierra y el formulario queda disponible.

#### 1.4. Iniciar sesión correctamente con credenciales válidas

**File:** `tests/login/valid-credentials.spec.ts`

**Steps:**
  1. Abrir el login en contexto limpio.
    - expect: El formulario está visible.
  2. Cargar las credenciales desde el fixture o configuración segura.
    - expect: La contraseña permanece oculta.
    - expect: El botón queda habilitado.
  3. Seleccionar "Iniciar Sesión".
    - expect: Se redirige al home autenticado.
    - expect: Se muestran indicadores como "Mi Cuenta" o "Cerrar Sesión".
    - expect: No aparece un error.
