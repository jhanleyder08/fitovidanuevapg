# 📘 Guía del Panel de Administración - Fitovida

## Índice
1. [Acceso al Sistema](#acceso-al-sistema)
2. [Roles y Permisos](#roles-y-permisos)
3. [Dashboard](#dashboard)
4. [Gestión de Productos](#gestión-de-productos)
5. [Gestión de Usuarios](#gestión-de-usuarios)
6. [Configuración](#configuración)
7. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Acceso al Sistema

### 🔑 Credenciales de Acceso

**Desarrollador (Acceso Completo)**
```
Usuario: desarrollador
Contraseña: dev123
```

**Administrador (Gestión de Productos)**
```
Usuario: admin
Contraseña: admin123
```

### 🌐 URLs de Acceso

- **Página de Login**: `http://localhost/fitovida/login.html`
- **Panel Admin**: `http://localhost/fitovida/admin.html`
- **Sitio Principal**: `http://localhost/fitovida/index.html`

### 📱 Acceso desde el Sitio

1. Visita el sitio principal de Fitovida
2. Haz clic en el ícono de escudo (👤🛡️) en el header superior derecho
3. Ingresa tus credenciales
4. Automáticamente serás redirigido al panel

---

## Roles y Permisos

### 👨‍💻 DESARROLLADOR

**Permisos Completos:**
- ✅ Crear, editar y eliminar productos
- ✅ Modificar precios de productos
- ✅ Crear, editar y eliminar usuarios
- ✅ Cambiar roles de usuarios
- ✅ Activar/desactivar usuarios
- ✅ Acceso a todas las secciones
- ✅ Ver estadísticas completas

**Secciones Disponibles:**
- Dashboard
- Gestión de Productos
- Gestión de Usuarios
- Configuración

### 👨‍💼 ADMINISTRADOR

**Permisos Limitados:**
- ✅ Crear, editar y eliminar productos
- ✅ Modificar precios de productos
- ✅ Subir nuevos productos
- ✅ Ver estadísticas de productos
- ❌ No puede gestionar usuarios
- ❌ No puede ver estadísticas de usuarios

**Secciones Disponibles:**
- Dashboard (sin estadísticas de usuarios)
- Gestión de Productos
- Configuración

---

## Dashboard

### 📊 Estadísticas Disponibles

#### Tarjetas de Métricas

1. **Total Productos**
   - Muestra el número total de productos en el catálogo
   - Se actualiza en tiempo real

2. **Total Categorías**
   - Siempre muestra 6 (vitaminas, suplementos, hierbas, aceites, proteínas, todos)

3. **Precio Promedio**
   - Calcula automáticamente el precio promedio de todos los productos
   - Formato: $XX.XX

4. **Total Usuarios** (Solo DESARROLLADOR)
   - Muestra el número total de usuarios registrados
   - No visible para ADMINISTRADOR

#### Gráfico de Productos por Categoría

- Visualización de barras horizontales
- Muestra la distribución de productos por cada categoría
- Actualización automática al agregar/eliminar productos

---

## Gestión de Productos

### ➕ Crear Nuevo Producto

1. Haz clic en el botón **"Nuevo Producto"**
2. Completa el formulario:
   - **Nombre**: Nombre del producto (requerido)
   - **Categoría**: Selecciona una categoría (requerido)
     - Vitaminas
     - Suplementos
     - Hierbas
     - Aceites
     - Proteínas
   - **Precio**: Precio en dólares (requerido, formato: XX.XX)
   - **Imagen del Producto**: (requerido) Elige una opción:
     - **Seleccionar desde PC**: 
       - Haz clic en el área de carga
       - Selecciona una imagen de tu computadora
       - Formatos soportados: JPG, PNG, GIF, WebP, etc.
       - Tamaño máximo: 5MB
       - Verás una vista previa de la imagen
     - **Usar URL**: 
       - Ingresa la URL completa de la imagen
       - Ejemplo: `https://ejemplo.com/imagen.jpg` o `C:/ruta/imagen.jpg`
   - **Descripción**: Descripción detallada del producto (requerido)
3. Haz clic en **"Guardar"**
4. El producto aparecerá inmediatamente en el catálogo

**💡 Consejos para Imágenes:**
- Usa imágenes de buena calidad (mínimo 400x400px)
- Las imágenes cuadradas se ven mejor
- Comprime las imágenes antes de subirlas para mejor rendimiento
- Si usas imágenes desde PC, se guardarán en formato Base64 en localStorage

### ✏️ Editar Producto

1. En la tabla de productos, haz clic en el ícono de lápiz ✏️
2. Modifica los campos que desees
3. Haz clic en **"Guardar"**
4. Los cambios se aplicarán inmediatamente

**Permisos Requeridos:**
- ✅ DESARROLLADOR
- ✅ ADMINISTRADOR

### 🗑️ Eliminar Producto

1. En la tabla de productos, haz clic en el ícono de basura 🗑️
2. Confirma la eliminación en el diálogo
3. El producto será removido permanentemente

**⚠️ Advertencia:** Esta acción no se puede deshacer.

**Permisos Requeridos:**
- ✅ DESARROLLADOR
- ✅ ADMINISTRADOR

### 🔍 Buscar y Filtrar

#### Búsqueda por Texto
- Escribe en el campo de búsqueda
- Busca en nombre y descripción
- Resultados en tiempo real

#### Filtrado por Categoría
- Usa el selector de categorías
- Selecciona "Todas las categorías" para ver todo
- Combina con búsqueda de texto

### 📋 Tabla de Productos

**Columnas:**
- **ID**: Identificador único del producto
- **Imagen**: Miniatura del producto (50x50px)
- **Nombre**: Nombre completo del producto
- **Categoría**: Badge de color según categoría
- **Precio**: Formato $XX.XX
- **Acciones**: Botones de editar y eliminar

**Badges de Categorías:**
- 🟡 Vitaminas (Amarillo)
- 🟢 Suplementos (Verde medio)
- 🟢 Hierbas (Verde oscuro)
- 🟢 Aceites (Verde claro)
- 🟢 Proteínas (Verde muy oscuro)

---

## Gestión de Usuarios

> **Nota:** Esta sección solo está disponible para usuarios con rol **DESARROLLADOR**

### ➕ Crear Nuevo Usuario

1. Haz clic en **"Nuevo Usuario"**
2. Completa el formulario:
   - **Usuario**: Nombre de usuario único (requerido)
   - **Nombre Completo**: Nombre real del usuario (requerido)
   - **Email**: Correo electrónico (requerido)
   - **Contraseña**: Contraseña de acceso (requerido)
   - **Rol**: Selecciona el rol (requerido)
     - DESARROLLADOR
     - ADMINISTRADOR
   - **Estado**: Activo/Inactivo (requerido)
3. Haz clic en **"Guardar"**

**Validación:**
- El nombre de usuario debe ser único
- El email debe tener formato válido

### ✏️ Editar Usuario

1. Haz clic en el ícono de lápiz ✏️
2. Modifica los campos necesarios
3. Guarda los cambios

**Campos Editables:**
- Nombre completo
- Email
- Contraseña
- Rol
- Estado (Activo/Inactivo)

### 🗑️ Eliminar Usuario

1. Haz clic en el ícono de basura 🗑️
2. Confirma la eliminación

**Restricciones:**
- ❌ No puedes eliminar tu propio usuario
- ⚠️ La eliminación es permanente

### 🔍 Buscar Usuarios

- Busca por nombre de usuario, nombre completo o email
- Resultados en tiempo real

### 📋 Tabla de Usuarios

**Columnas:**
- **ID**: Identificador único
- **Usuario**: Nombre de usuario para login
- **Nombre**: Nombre completo
- **Email**: Correo electrónico
- **Rol**: Badge con el rol asignado
- **Estado**: Badge Activo (verde) o Inactivo (rojo)
- **Acciones**: Editar y eliminar

---

## Configuración

### 🔐 Cambiar Contraseña

1. Ve a la sección **"Configuración"**
2. Localiza el formulario **"Cambiar Contraseña"**
3. Completa:
   - **Contraseña Actual**: Tu contraseña actual (requerido)
   - **Nueva Contraseña**: Tu nueva contraseña (requerido)
   - **Confirmar Nueva Contraseña**: Repite la nueva contraseña (requerido)
4. Haz clic en **"Cambiar Contraseña"**

**Validaciones:**
- La contraseña actual debe ser correcta
- Las nuevas contraseñas deben coincidir

**Recomendaciones de Seguridad:**
- Usa al menos 8 caracteres
- Combina letras, números y símbolos
- No uses información personal
- Cambia tu contraseña regularmente

### ℹ️ Información del Sistema

Muestra:
- **Versión**: Versión actual del sistema
- **Última actualización**: Fecha de última modificación
- **Rol actual**: Tu rol de usuario actual

---

## Almacenamiento de Datos

### 💾 LocalStorage

El sistema utiliza **localStorage** del navegador para almacenar:

1. **Productos** (`fitovida_products`)
   - Toda la información de productos
   - Se sincroniza entre el sitio y el panel

2. **Usuarios** (`fitovida_users`)
   - Información de usuarios del sistema
   - Solo accesible desde el panel admin

3. **Sesión** (`fitovida_session`)
   - Datos de la sesión activa
   - Se elimina al cerrar sesión

4. **Carrito** (`fitovida_cart`)
   - Productos en el carrito del cliente
   - Visible en el sitio principal

### ⚠️ Importante sobre LocalStorage

**Ventajas:**
- ✅ Datos persisten al cerrar el navegador
- ✅ No requiere servidor backend
- ✅ Rápido y eficiente

**Limitaciones:**
- ⚠️ Datos almacenados en el navegador del cliente
- ⚠️ Límite de ~5-10MB por dominio
- ⚠️ No compartido entre diferentes navegadores
- ⚠️ Se puede borrar limpiando datos del navegador

**Recomendación:**
Para producción, considera migrar a una base de datos real (MySQL, PostgreSQL, MongoDB).

---

## Preguntas Frecuentes

### ❓ ¿Puedo recuperar mi contraseña?

Actualmente no hay sistema de recuperación. Si olvidas tu contraseña:
- Como DESARROLLADOR: Edita localStorage manualmente o contacta al administrador del sistema
- Como ADMINISTRADOR: Contacta a un DESARROLLADOR

### ❓ ¿Puedo tener más de 2 usuarios?

Sí, un DESARROLLADOR puede crear tantos usuarios como necesite desde el panel de **Gestión de Usuarios**.

### ❓ ¿Qué pasa si elimino todos los productos?

Los productos solo se eliminan de localStorage. Los datos originales están en `products.js`. Para restaurar:
1. Abre la consola del navegador (F12)
2. Ejecuta: `localStorage.removeItem('fitovida_products')`
3. Recarga la página

### ❓ ¿Los cambios en productos se reflejan en el sitio?

Sí, inmediatamente. El sitio principal y el panel admin comparten el mismo almacenamiento.

### ❓ ¿Puedo cambiar mi propio rol?

No directamente. Solo otro DESARROLLADOR puede cambiar roles de usuarios.

### ❓ ¿Qué navegadores son compatibles?

El sistema es compatible con:
- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ⚠️ Internet Explorer no es compatible

### ❓ ¿Cómo hago backup de los datos?

**Opción 1: Manual**
1. Abre DevTools (F12)
2. Ve a Application > Local Storage
3. Copia los valores de cada key

**Opción 2: Consola**
```javascript
// Exportar productos
console.log(localStorage.getItem('fitovida_products'));

// Exportar usuarios
console.log(localStorage.getItem('fitovida_users'));
```

### ❓ ¿Puedo subir imágenes desde mi computadora?

Actualmente solo se soportan rutas de archivos locales. Para producción, implementa:
- Servidor de archivos
- CDN (Content Delivery Network)
- Servicio de almacenamiento en la nube

---

## 🆘 Soporte

### Problemas Comunes

#### 1. No puedo iniciar sesión
- Verifica tus credenciales
- Asegúrate de que el usuario esté activo
- Limpia caché y cookies

#### 2. Los productos no aparecen
- Verifica que haya productos en localStorage
- Revisa la consola del navegador (F12) en busca de errores
- Recarga la página (Ctrl+R o Cmd+R)

#### 3. Los cambios no se guardan
- Verifica que tengas permisos para la acción
- Asegúrate de que localStorage no esté lleno
- Revisa que no haya errores en la consola

#### 4. La página no carga
- Verifica que Apache esté corriendo en XAMPP
- Comprueba la URL: `http://localhost/fitovida/admin.html`
- Limpia caché del navegador

### Contacto

Para soporte técnico o reportar bugs:
- **Email**: dev@fitovida.com
- **Teléfono**: +1 234 567 8900

---

## 📚 Recursos Adicionales

- [README Principal](README.md)
- [Documentación de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [LocalStorage API](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

---

**Última actualización**: 2025-10-01  
**Versión**: 1.0.0  
**Autor**: Equipo de Desarrollo Fitovida
