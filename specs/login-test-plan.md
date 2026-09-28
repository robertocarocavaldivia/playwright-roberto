# Plan de pruebas - Flujo de Login

## Application Overview

Plan de pruebas funcionales para el flujo de autenticación de laboratoriodetesting.com. Se valida el acceso de un usuario registrado mediante email y contraseña, el rechazo de credenciales inválidas y la claridad de los mensajes de error. La pantalla observada está disponible en https://www.laboratoriodetesting.com/auth/login y, con las credenciales válidas juanduarte@test.com / 12345678, redirige al home. Cada caso debe comenzar con una sesión limpia, sin cookies ni estado de autenticación previo.

## Test Scenarios

### 1. Autenticación - Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Mostrar la pantalla de login desde el acceso principal

**File:** `tests/login/access-login.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/ en una sesión limpia.
    - expect: Se muestra la página principal sin una sesión autenticada.
  2. Seleccionar el enlace "Acceder".
    - expect: La aplicación navega a https://www.laboratoriodetesting.com/auth/login.
    - expect: Se muestra el encabezado "Inicia Sesión".
    - expect: Se muestran los campos "Ingresa tu email" e "Ingresa tu contraseña", el botón "Iniciar Sesión" y el enlace de creación de cuenta.
  3. Observar el botón "Iniciar Sesión" sin completar ningún campo.
    - expect: El botón permanece deshabilitado o no permite enviar el formulario mientras faltan datos.
    - expect: No se inicia una sesión accidentalmente.

#### 1.2. Habilitar el envío con email y contraseña completos

**File:** `tests/login/form-state.spec.ts`

**Steps:**
  1. Abrir directamente https://www.laboratoriodetesting.com/auth/login en una sesión limpia.
    - expect: Se muestra el formulario vacío.
  2. Escribir "juanduarte@test.com" en "Ingresa tu email".
    - expect: El email ingresado permanece visible en el campo.
    - expect: La aplicación no muestra un error de formato para este email válido.
  3. Escribir "12345678" en "Ingresa tu contraseña".
    - expect: La contraseña se acepta en el campo de contraseña.
    - expect: El botón "Iniciar Sesión" queda habilitado y puede seleccionarse.
  4. Borrar el email y conservar la contraseña.
    - expect: El botón vuelve a quedar deshabilitado o el envío queda bloqueado por falta de email.
  5. Restaurar el email válido y borrar la contraseña.
    - expect: El botón vuelve a quedar deshabilitado o el envío queda bloqueado por falta de contraseña.

#### 1.3. Iniciar sesión correctamente con las credenciales registradas

**File:** `tests/login/valid-credentials.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/auth/login en una sesión limpia.
    - expect: El formulario de login aparece vacío.
  2. Escribir "juanduarte@test.com" en el campo de email.
    - expect: El valor queda visible y se acepta como email válido.
  3. Escribir "12345678" en el campo de contraseña.
    - expect: El valor se acepta y el botón "Iniciar Sesión" queda habilitado.
  4. Seleccionar "Iniciar Sesión" una sola vez.
    - expect: La aplicación redirige a https://www.laboratoriodetesting.com/.
    - expect: No aparece el diálogo de error de credenciales.
    - expect: La sesión queda autenticada; la interfaz principal se muestra sin solicitar login inmediatamente.

#### 1.4. Rechazar una contraseña incorrecta con mensaje claro

**File:** `tests/login/invalid-credentials.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/auth/login en una sesión limpia.
    - expect: El formulario aparece vacío.
  2. Escribir "juanduarte@test.com" como email y "incorrecta" como contraseña.
    - expect: El botón "Iniciar Sesión" queda habilitado para intentar la autenticación.
  3. Seleccionar "Iniciar Sesión".
    - expect: La URL permanece en /auth/login.
    - expect: Se muestra un diálogo con el encabezado "Error".
    - expect: El mensaje visible es "No pudimos iniciar sesión con estas credenciales. Intenta de nuevo." o un texto equivalente, claro y específico.
    - expect: No se muestra una sesión autenticada ni se redirige al home.
  4. Seleccionar "Volver" en el diálogo.
    - expect: El diálogo se cierra.
    - expect: El usuario regresa al formulario para corregir las credenciales.
    - expect: Los valores ingresados permanecen disponibles o pueden editarse sin recargar inesperadamente la página.

#### 1.5. Rechazar un email inexistente con contraseña válida

**File:** `tests/login/nonexistent-user.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/auth/login en una sesión limpia.
    - expect: El formulario aparece vacío.
  2. Escribir "usuario.no registrado@test.com" como email y "12345678" como contraseña.
    - expect: El botón permite intentar el envío cuando ambos campos están completos.
  3. Seleccionar "Iniciar Sesión".
    - expect: La aplicación no autentica al usuario.
    - expect: La URL permanece en /auth/login.
    - expect: Se muestra un mensaje de error claro que no revela si existe o no una cuenta específica.
    - expect: El mensaje permite entender que las credenciales no fueron aceptadas.

#### 1.6. Validar email vacío, mal formado y con espacios

**File:** `tests/login/email-validation.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/auth/login en una sesión limpia y seleccionar el botón sin completar el email ni la contraseña.
    - expect: El envío se bloquea o se muestra una validación clara para los campos faltantes.
    - expect: No se realiza autenticación.
  2. Escribir "email-invalido" en el email y "12345678" en la contraseña; intentar iniciar sesión.
    - expect: El formulario bloquea el envío o muestra un error específico de formato de email.
    - expect: No se redirige al home ni se crea una sesión.
  3. Repetir con el valor " usuario@test.com " incluyendo espacios al inicio y al final.
    - expect: La aplicación recorta espacios o muestra una validación coherente.
    - expect: No debe autenticar de forma incorrecta ni enviar un valor ambiguo al backend.
  4. Repetir con "@test.com" y con "usuario@".
    - expect: Cada valor inválido es rechazado con una indicación comprensible.
    - expect: El estado del formulario sigue permitiendo corregir el email.

#### 1.7. Validar contraseña vacía y entradas límite

**File:** `tests/login/password-validation.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/auth/login en una sesión limpia.
    - expect: El formulario aparece vacío.
  2. Escribir "juanduarte@test.com" y dejar la contraseña vacía; intentar continuar.
    - expect: El botón permanece deshabilitado o se muestra una validación clara de contraseña requerida.
    - expect: No se realiza autenticación.
  3. Escribir una contraseña de un solo carácter y enviar si el botón lo permite.
    - expect: La aplicación rechaza la entrada si no cumple la política de contraseña o devuelve un error claro de autenticación.
    - expect: No se autentica al usuario.
  4. Escribir una contraseña muy extensa, por ejemplo 256 caracteres, y enviar.
    - expect: La interfaz permanece estable y no se rompe.
    - expect: La aplicación rechaza el valor o responde de forma controlada, sin error técnico visible ni autenticación indebida.

#### 1.8. Mostrar y ocultar la contraseña sin alterar el valor

**File:** `tests/login/password-visibility.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/auth/login en una sesión limpia.
    - expect: El campo de contraseña se presenta oculto por defecto.
  2. Escribir "12345678" en el campo de contraseña.
    - expect: El valor no se muestra en texto plano mientras el campo está oculto.
  3. Seleccionar el control de visibilidad asociado al campo de contraseña.
    - expect: La contraseña se muestra temporalmente en texto plano.
    - expect: El valor visible es exactamente "12345678".
  4. Seleccionar nuevamente el control de visibilidad.
    - expect: La contraseña vuelve a ocultarse.
    - expect: El valor no cambia y continúa siendo "12345678".

#### 1.9. Navegar a registro y recuperar el formulario sin autenticarse

**File:** `tests/login/navigation.spec.ts`

**Steps:**
  1. Abrir https://www.laboratoriodetesting.com/auth/login en una sesión limpia.
    - expect: Se muestra el formulario de login.
  2. Seleccionar "¿No tienes una cuenta? Crea una".
    - expect: La aplicación navega a /auth/signup.
    - expect: No se autentica ni se muestra el home como resultado del enlace.
  3. Volver a /auth/login y seleccionar "¿Olvidaste tu contraseña?".
    - expect: Se abre la vista, diálogo o flujo de recuperación de contraseña correspondiente.
    - expect: El flujo no inicia sesión ni muestra credenciales en claro.
    - expect: Si la recuperación no está implementada, se muestra un mensaje controlado y comprensible en lugar de un error técnico.
