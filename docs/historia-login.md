## Historia de usuario — Login y autenticación

**Actor:** Usuario registrado en laboratoriodetesting.com

**Acción:** Iniciar sesión con email y contraseña 
para acceder a la cuenta.

**Resultado esperado:**
- Login exitoso redirige al inicio de la sesión autenticada
- Credenciales incorrectas muestran mensaje de error claro
- Email con formato inválido muestra validación en el campo
- Campos vacíos no permiten enviar el formulario

**Datos de prueba:**
- Email inválido: usuario@dominio (sin extensión)
- Contraseña incorrecta: cualquier texto diferente a la real
- Campos vacíos: enviar sin llenar ninguno

**URL de inicio:** https://laboratoriodetesting.com/auth/login