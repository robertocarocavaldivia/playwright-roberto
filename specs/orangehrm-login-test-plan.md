# Plan de pruebas - Login OrangeHRM

## Application Overview

Plan funcional para https://opensource-demo.orangehrmlive.com/web/index.php/auth/login basado en la historia: como usuario registrado, quiero ingresar con mi username y password; si las credenciales son inválidas, quiero ver un mensaje de error claro. La pantalla presenta los campos Username y Password, y muestra las credenciales de demostración Admin / admin123. Durante la exploración, credenciales inválidas produjeron una alerta accesible con el texto "Invalid credentials" y la URL permaneció en la pantalla de login. Cada caso debe ejecutarse en una sesión aislada, sin cookies ni sesión autenticada previa.

## Test Scenarios

### 1. Autenticación de login OrangeHRM

**Seed:** `tests/seed.spec.ts`

#### 1.1. Iniciar sesión correctamente con credenciales válidas

**File:** `tests/login/inicio-sesion-credenciales-validas.spec.ts`

**Steps:**
  1. Abrir https://opensource-demo.orangehrmlive.com/web/index.php/auth/login en un contexto limpio.
    - expect: Se muestra el formulario Login con los campos Username y Password.
    - expect: No existe una sesión autenticada.
  2. Ingresar Admin en Username y admin123 en Password, credenciales de demostración visibles en la página.
    - expect: Los valores se aceptan en los campos correspondientes.
    - expect: La contraseña se mantiene oculta visualmente mientras se escribe.
  3. Seleccionar el botón Login y esperar la respuesta.
    - expect: La autenticación es exitosa y se muestra el Dashboard de OrangeHRM.
    - expect: La URL deja de corresponder a /auth/login.
    - expect: No aparece el mensaje Invalid credentials.

#### 1.2. Rechazar una contraseña incorrecta con un mensaje claro

**File:** `tests/login/contrasena-incorrecta-muestra-error.spec.ts`

**Steps:**
  1. Abrir la pantalla de login en una sesión limpia.
    - expect: Se muestra el formulario sin una sesión autenticada.
  2. Ingresar Admin en Username y clave-incorrecta en Password.
    - expect: Los datos quedan listos para enviar.
  3. Seleccionar Login y esperar la respuesta de autenticación.
    - expect: La autenticación es rechazada y se permanece en la pantalla de login.
    - expect: Se muestra una alerta accesible y clara con el texto Invalid credentials o una traducción equivalente.
    - expect: No se muestra el Dashboard ni se crea una sesión autenticada.

#### 1.3. Rechazar un username inexistente con un mensaje claro

**File:** `tests/login/username-inexistente-muestra-error.spec.ts`

**Steps:**
  1. Abrir la pantalla de login en una sesión limpia.
    - expect: Se muestra el formulario sin una sesión autenticada.
  2. Ingresar usuario-inexistente en Username y cualquier valor en Password.
    - expect: Los datos quedan listos para enviar.
  3. Seleccionar Login y esperar la respuesta de autenticación.
    - expect: La autenticación es rechazada y se permanece en la pantalla de login.
    - expect: Se presenta un mensaje claro de credenciales inválidas, equivalente al de contraseña incorrecta.
    - expect: El mensaje no revela si el username existe.
    - expect: No se muestra el Dashboard ni se crea una sesión autenticada.

#### 1.4. Validar el envío del formulario con campos vacíos

**File:** `tests/login/campos-vacios-muestran-validacion.spec.ts`

**Steps:**
  1. Abrir la pantalla de login en una sesión limpia y dejar Username y Password vacíos.
    - expect: Ambos campos están vacíos y no hay una sesión autenticada.
  2. Seleccionar Login.
    - expect: La aplicación no inicia sesión ni navega al Dashboard.
    - expect: Se indica de forma comprensible que los campos requeridos deben completarse, ya sea mediante validación visible o validación nativa del formulario.

#### 1.5. Validar campos incompletos de username y contraseña

**File:** `tests/login/campo-incompleto-muestra-validacion.spec.ts`

**Steps:**
  1. Abrir la pantalla de login en una sesión limpia, ingresar Admin en Username y dejar Password vacío; seleccionar Login.
    - expect: La autenticación no se inicia.
    - expect: Se señala que Password es requerido y la pantalla permite corregir el formulario.
  2. Borrar Username, ingresar cualquier valor en Password y seleccionar Login.
    - expect: La autenticación no se inicia.
    - expect: Se señala que Username es requerido y la pantalla permite corregir el formulario.
