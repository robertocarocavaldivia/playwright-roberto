# Plan de pruebas - Text Box DemoQA

## Application Overview

Plan de pruebas para el flujo de cuadro de texto de DemoQA en https://demoqa.com/text-box. La historia cubierta es: como usuario, quiero poder ingresar los datos requeridos en un formulario y enviarlos correctamente. El formulario observado contiene Full Name, Email, Current Address, Permanent Address y Submit. Un envío completo muestra los valores debajo del formulario; un email inválido impide el envío mediante validación del navegador; un envío vacío no genera resultados visibles.

## Test Scenarios

### 1. Formulario Text Box

**Seed:** `tests/seed.spec.ts`

#### 1.1. Completar y enviar el formulario con datos válidos

**File:** `tests/text-box/valid-form.spec.ts`

**Steps:**
  1. Partir de un estado fresco y navegar a https://demoqa.com/text-box.
    - expect: Se muestra el encabezado "Text Box".
    - expect: Se muestran los campos "Full Name", "Email", "Current Address" y "Permanent Address".
    - expect: Se muestra el botón "Submit".
    - expect: Los campos están vacíos y no hay resultados debajo del formulario.
  2. Ingresar "Juan Duarte" en "Full Name".
    - expect: El valor se conserva en el campo.
  3. Ingresar "juan.duarte@example.com" en "Email".
    - expect: El valor se conserva en el campo.
    - expect: El formato del email es aceptado.
  4. Ingresar "Av. Reforma 123, Ciudad de Mexico" en "Current Address".
    - expect: El valor se conserva en el campo.
  5. Ingresar "Calle Juarez 45, Ciudad de Mexico" en "Permanent Address".
    - expect: El valor se conserva en el campo.
  6. Hacer clic en "Submit".
    - expect: La URL permanece en https://demoqa.com/text-box.
    - expect: Se muestra un bloque de resultados debajo del formulario.
    - expect: El resultado muestra "Name:Juan Duarte".
    - expect: El resultado muestra "Email:juan.duarte@example.com".
    - expect: El resultado muestra la dirección actual ingresada.
    - expect: El resultado muestra la dirección permanente ingresada.
    - expect: No se pierden los datos ingresados en los campos.

#### 1.2. No enviar el formulario vacío

**File:** `tests/text-box/empty-form.spec.ts`

**Steps:**
  1. Partir de un estado fresco y navegar a https://demoqa.com/text-box.
    - expect: Los cuatro campos están vacíos.
    - expect: No se muestra el bloque de resultados.
  2. Hacer clic en "Submit" sin ingresar ningún dato.
    - expect: La página permanece en /text-box.
    - expect: No se muestra el bloque de resultados.
    - expect: No se produce una navegación inesperada.
    - expect: El formulario permanece disponible para completar.

#### 1.3. Validar email inválido

**File:** `tests/text-box/invalid-email.spec.ts`

**Steps:**
  1. Partir de un estado fresco y navegar a https://demoqa.com/text-box.
    - expect: Se muestra el formulario vacío.
  2. Ingresar "Juan Duarte" en "Full Name", "juan.duarte" en "Email", "Av. Reforma 123" en "Current Address" y "Calle Juarez 45" en "Permanent Address".
    - expect: Los valores se muestran en los campos.
    - expect: El email queda identificado por el navegador como un formato no válido al intentar enviar.
  3. Hacer clic en "Submit".
    - expect: El envío es bloqueado por la validación del campo Email.
    - expect: La página permanece en /text-box.
    - expect: No aparece el bloque de resultados.
    - expect: Los valores ingresados permanecen disponibles para corregir el email.
  4. Reemplazar el email por "juan.duarte@example.com" y volver a hacer clic en "Submit".
    - expect: La validación del email se resuelve.
    - expect: Se muestra el bloque de resultados con los valores del formulario.

#### 1.4. Aceptar campos de texto con espacios y caracteres de dirección

**File:** `tests/text-box/text-content-boundaries.spec.ts`

**Steps:**
  1. Partir de un estado fresco y navegar a https://demoqa.com/text-box.
    - expect: El formulario está vacío.
  2. Ingresar un nombre con espacios, un email válido y direcciones con números, comas y espacios.
    - expect: Los campos conservan exactamente los caracteres ingresados.
    - expect: No se truncan ni alteran los valores antes del envío.
  3. Hacer clic en "Submit".
    - expect: El bloque de resultados refleja los valores completos ingresados.
    - expect: Las direcciones se muestran sin perder números, comas ni espacios internos.

#### 1.5. Mantener los valores y resultados tras un segundo envío

**File:** `tests/text-box/repeated-submit.spec.ts`

**Steps:**
  1. Partir de un estado fresco, completar los cuatro campos con datos válidos y hacer clic en "Submit".
    - expect: Se muestra un bloque de resultados con la primera carga.
  2. Sin modificar los campos, hacer clic nuevamente en "Submit".
    - expect: La página no navega a otra URL.
    - expect: Los resultados siguen siendo coherentes con los valores de los campos.
    - expect: No se generan resultados duplicados inesperados ni se corrompe el contenido mostrado.

#### 1.6. Restablecer el formulario al recargar la página

**File:** `tests/text-box/form-reset.spec.ts`

**Steps:**
  1. Partir de un estado fresco, completar y enviar el formulario con datos válidos.
    - expect: Se muestran los resultados enviados.
  2. Recargar https://demoqa.com/text-box.
    - expect: Los campos vuelven a estar vacíos.
    - expect: El bloque de resultados deja de mostrarse.
    - expect: No quedan datos del envío anterior en el formulario.
