# Plan de pruebas: Flujo de login2 de OrangeHRM

## Application Overview

Validar el inicio de sesión de OrangeHRM para un usuario registrado mediante Username y Password, la navegación al dashboard con credenciales válidas y la presentación de un mensaje claro ante credenciales inválidas. El acceso público muestra las credenciales de demostración Admin / admin123; usar únicamente para el caso exitoso. Cada caso comienza en una sesión nueva y en la página de login, sin autenticación previa.

## Test Scenarios

### 1. Autenticación de usuario registrado

**Seed:** `tests\seed.spec.ts`

#### 1.1. El usuario registrado inicia sesión con credenciales válidas

**File:** `tests\login2\login-valido.spec.ts`

**Steps:**
  1. Abrir https://opensource-demo.orangehrmlive.com/web/index.php/auth/login en una sesión nueva, sin autenticación previa.
    - expect: Se muestra el formulario Login con los campos Username y Password y el botón Login.
  2. Ingresar Admin en Username y admin123 en Password, usando las credenciales demo visibles en la página.
  3. Seleccionar Login.
    - expect: La autenticación es exitosa y la URL cambia a /web/index.php/dashboard/index.
    - expect: Se visualiza la página Dashboard y no se muestra un mensaje Invalid credentials.

#### 1.2. El sistema informa claramente cuando ambos datos son inválidos

**File:** `tests\login2\credenciales-invalidas.spec.ts`

**Steps:**
  1. Abrir la página de login en una sesión nueva.
    - expect: El formulario Login está disponible.
  2. Ingresar un Username no registrado (por ejemplo, UsuarioInvalido) y una contraseña incorrecta (por ejemplo, ClaveIncorrecta123).
  3. Seleccionar Login y esperar la respuesta del servidor.
    - expect: La sesión no se inicia y se permanece en la página de login.
    - expect: Se muestra el mensaje claro “Invalid credentials”.
    - expect: El mensaje se presenta como alerta legible y no expone la contraseña ingresada.

#### 1.3. El sistema rechaza un Username no registrado

**File:** `tests\login2\usuario-invalido.spec.ts`

**Steps:**
  1. Abrir la página de login en una sesión nueva.
  2. Ingresar un Username no registrado y una contraseña no vacía.
  3. Seleccionar Login.
    - expect: Se rechaza el acceso, no se llega al dashboard y se mantiene el formulario de login.
    - expect: Se muestra “Invalid credentials” sin revelar cuál dato fue incorrecto.

#### 1.4. El sistema rechaza una contraseña incorrecta para un usuario registrado

**File:** `tests\login2\password-invalido.spec.ts`

**Steps:**
  1. Abrir la página de login en una sesión nueva.
  2. Ingresar el usuario demo Admin y una contraseña incorrecta distinta de admin123.
  3. Seleccionar Login.
    - expect: Se rechaza el acceso, no se llega al dashboard y se mantiene el formulario de login.
    - expect: Se muestra “Invalid credentials” sin revelar cuál dato fue incorrecto.

#### 1.5. El formulario no autentica cuando ambos campos están vacíos

**File:** `tests\login2\campos-vacios.spec.ts`

**Steps:**
  1. Abrir la página de login en una sesión nueva y dejar Username y Password vacíos.
  2. Seleccionar Login.
    - expect: No se inicia sesión ni se navega al dashboard.
    - expect: Se informa claramente que ambos campos son obligatorios, mediante validación asociada a los campos o un mensaje equivalente.
    - expect: No se presenta un resultado de autenticación exitosa para el formulario vacío.

#### 1.6. El formulario valida cada campo obligatorio por separado

**File:** `tests\login2\campo-obligatorio.spec.ts`

**Steps:**
  1. Abrir la página de login en una sesión nueva, dejar Username vacío, ingresar una contraseña no vacía y seleccionar Login.
    - expect: No se inicia sesión ni se navega al dashboard.
    - expect: Se informa que Username es obligatorio y el foco o la asociación accesible permite identificar el campo que debe corregirse.
  2. Sin salir del formulario, ingresar un Username no vacío, dejar Password vacío y seleccionar Login.
    - expect: No se inicia sesión ni se navega al dashboard.
    - expect: Se informa que Password es obligatorio y el campo que debe corregirse es identificable.

#### 1.7. El usuario puede corregir las credenciales después de un intento fallido

**File:** `tests\login2\recuperacion-tras-error.spec.ts`

**Steps:**
  1. Abrir la página de login en una sesión nueva, ingresar credenciales inválidas y seleccionar Login.
    - expect: Se permanece en login y se muestra “Invalid credentials”.
  2. Reemplazar los datos por las credenciales demo válidas Admin / admin123 y volver a seleccionar Login.
    - expect: La autenticación tiene éxito y se navega al dashboard.
    - expect: El error anterior deja de mostrarse y no bloquea el acceso correcto.
