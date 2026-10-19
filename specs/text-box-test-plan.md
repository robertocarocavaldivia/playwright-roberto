# Plan de pruebas - Formulario Text Box DemoQA

## Application Overview

Plan de pruebas del formulario Text Box de DemoQA (https://demoqa.com/text-box) para la historia: "llenar todos los campos del formulario y dar click a entregar". El formulario expone Full Name, Email, Current Address, Permanent Address y Submit. Al enviar datos válidos se muestra debajo del formulario un resumen con los cuatro valores; Email usa validación HTML nativa y los demás campos no son obligatorios. Cada prueba parte de un estado fresco.

## Test Scenarios

### 1. Formulario Text Box

**Seed:** `tests/seed.spec.ts`

#### 1.1. Completar los cuatro campos y enviar con datos válidos

**File:** `tests/text-box/formulario-valido.spec.ts`

**Steps:**
  1. Abrir https://demoqa.com/text-box desde un contexto nuevo.
    - expect: La página muestra el encabezado "Text Box".
    - expect: Aparecen los campos Full Name, Email, Current Address y Permanent Address, junto al botón Submit.
    - expect: Los campos están vacíos y no hay bloque de resultados.
  2. Ingresar "Ada Lovelace" en Full Name.
    - expect: El campo conserva el valor ingresado.
  3. Ingresar "ada.lovelace@example.com" en Email.
    - expect: El campo conserva el correo y su formato es válido.
  4. Ingresar "12 St James's Square, London" en Current Address.
    - expect: El campo conserva la dirección ingresada.
  5. Ingresar "Same as current address" en Permanent Address.
    - expect: El campo conserva la dirección ingresada.
  6. Hacer clic en Submit.
    - expect: La URL permanece en https://demoqa.com/text-box.
    - expect: Aparece el bloque de resultados debajo del formulario.
    - expect: El bloque muestra Name:Ada Lovelace y Email:ada.lovelace@example.com.
    - expect: El bloque muestra exactamente las direcciones ingresadas como Current Address y Permanent Address.
    - expect: Los valores permanecen en los campos después del envío.

#### 1.2. Bloquear el envío con un correo sin signo arroba

**File:** `tests/text-box/correo-invalido.spec.ts`

**Steps:**
  1. Abrir https://demoqa.com/text-box desde un contexto nuevo.
    - expect: Se muestra el formulario vacío y no hay resultados.
  2. Completar Full Name, Current Address y Permanent Address con datos de prueba, y escribir "correo-invalido" en Email.
    - expect: Los cuatro valores aparecen en sus respectivos campos.
    - expect: El valor de Email no tiene un formato de correo válido.
  3. Hacer clic en Submit.
    - expect: La validación nativa del navegador bloquea el envío por el campo Email.
    - expect: La página permanece en /text-box y no se genera un resultado nuevo.
    - expect: Todos los valores permanecen disponibles para corregir el correo.
  4. Reemplazar Email por "qa.user@example.com" y volver a hacer clic en Submit.
    - expect: El envío se completa sin bloqueo de validación.
    - expect: El bloque de resultados muestra los cuatro valores actuales.

#### 1.3. Bloquear el envío con el usuario del correo vacío

**File:** `tests/text-box/correo-sin-usuario.spec.ts`

**Steps:**
  1. Abrir https://demoqa.com/text-box desde un contexto nuevo.
    - expect: Se muestra el formulario vacío y no hay resultados.
  2. Completar Full Name, Current Address y Permanent Address con datos válidos; escribir "@example.com" en Email.
    - expect: Los campos conservan los valores ingresados.
    - expect: El valor de Email es inválido porque no contiene la parte local antes de @.
  3. Hacer clic en Submit.
    - expect: La validación nativa del navegador bloquea el envío.
    - expect: No aparece el bloque de resultados.
    - expect: Los valores permanecen en el formulario para corregirlos.

#### 1.4. Bloquear el envío con el dominio del correo vacío

**File:** `tests/text-box/correo-sin-dominio.spec.ts`

**Steps:**
  1. Abrir https://demoqa.com/text-box desde un contexto nuevo.
    - expect: Se muestra el formulario vacío y no hay resultados.
  2. Completar Full Name, Current Address y Permanent Address con datos válidos; escribir "qa.user@" en Email.
    - expect: Los campos conservan los valores ingresados.
    - expect: El valor de Email es inválido porque no contiene un dominio después de @.
  3. Hacer clic en Submit.
    - expect: La validación nativa del navegador bloquea el envío.
    - expect: No aparece el bloque de resultados.
    - expect: Los valores permanecen en el formulario para corregirlos.

#### 1.5. Bloquear el envío con espacios dentro del correo

**File:** `tests/text-box/correo-con-espacios.spec.ts`

**Steps:**
  1. Abrir https://demoqa.com/text-box desde un contexto nuevo.
    - expect: Se muestra el formulario vacío y no hay resultados.
  2. Completar Full Name, Current Address y Permanent Address con datos válidos; escribir "qa user@example.com" en Email.
    - expect: Los campos conservan los valores ingresados.
    - expect: El valor de Email es inválido porque contiene espacios internos.
  3. Hacer clic en Submit.
    - expect: La validación nativa del navegador bloquea el envío.
    - expect: No aparece el bloque de resultados.
    - expect: Los valores permanecen en el formulario para corregirlos.

#### 1.6. Enviar el formulario vacío

**File:** `tests/text-box/formulario-vacio.spec.ts`

**Steps:**
  1. Abrir https://demoqa.com/text-box desde un contexto nuevo y no ingresar datos.
    - expect: Los cuatro campos están vacíos y no hay resultados.
  2. Hacer clic en Submit.
    - expect: La página permanece en /text-box.
    - expect: No aparece el bloque de resultados.
    - expect: El formulario continúa disponible para completar.

#### 1.7. Conservar signos y espacios en las direcciones

**File:** `tests/text-box/direcciones-con-caracteres-especiales.spec.ts`

**Steps:**
  1. Abrir https://demoqa.com/text-box desde un contexto nuevo.
    - expect: Se muestra el formulario vacío.
  2. Completar todos los campos con un nombre y correo válidos; usar direcciones con espacios, números y puntuación, por ejemplo "12 St James's Square, Apt. 4" y "45, Calle Juárez #2".
    - expect: Cada campo conserva los caracteres ingresados sin truncamiento ni sustituciones antes del envío.
  3. Hacer clic en Submit.
    - expect: Se muestran los resultados del formulario.
    - expect: El nombre, correo y ambas direcciones aparecen asociados a su etiqueta correcta.
    - expect: Las direcciones conservan espacios, números y signos ingresados.
