# Fitovida - Tienda Naturista E-commerce

![Fitovida Logo](https://img.shields.io/badge/Fitovida-Tienda%20Naturista-2d6a4f)

## 📋 Descripción

Fitovida es una tienda e-commerce moderna y elegante especializada en productos naturistas. El sitio web ofrece una experiencia de usuario profesional con un catálogo completo de vitaminas, suplementos, hierbas medicinales, aceites naturales y proteínas.

## ✨ Características

### Funcionalidades Principales

- **Catálogo de Productos**: 48 productos naturistas organizados por categorías
- **Carrito de Compras**: Sistema completo con persistencia en localStorage
- **Filtrado por Categorías**: 
  - Todos
  - Vitaminas
  - Suplementos
  - Hierbas
  - Aceites
  - Proteínas
- **Búsqueda en Tiempo Real**: Búsqueda instantánea de productos
- **Ordenamiento**: Por precio (menor/mayor) y nombre alfabético
- **Modal de Producto**: Vista detallada de cada producto
- **Diseño Responsive**: Optimizado para móviles, tablets y desktop
- **Carrito Lateral**: Panel deslizante con resumen de compra
- **Notificaciones**: Feedback visual al agregar productos

### Secciones del Sitio

1. **Header**: Navegación principal con logo, menú y carrito
2. **Hero**: Banner principal con llamado a la acción
3. **Categorías**: Tarjetas interactivas para filtrar productos
4. **Productos**: Grid de productos con información y precios
5. **Sobre Nosotros**: Información de la empresa y valores
6. **Contacto**: Formulario y datos de contacto
7. **Footer**: Enlaces, newsletter y redes sociales

## 🛍️ Funcionalidades del Carrito de Compras

### Carrito Lateral Deslizante
- Panel lateral elegante que se desliza desde la derecha
- Vista completa de productos añadidos
- Imágenes miniatura de cada producto
- Precio unitario y total por producto

### Gestión de Productos
- **Agregar al carrito**: Click en botón "Agregar al Carrito"
- **Ajustar cantidad**: Botones +/- para incrementar o decrementar
- **Eliminar producto**: Botón de eliminar individual
- **Vaciar carrito**: Opción para eliminar todos los productos

### Proceso de Checkout Completo

#### 1. Información del Cliente
- Nombre completo
- Email de contacto
- Teléfono
- Dirección de envío
- Ciudad y código postal

#### 2. Métodos de Pago
- 💳 Tarjeta de crédito/débito
- 💰 PayPal
- 🏦 Transferencia bancaria

#### 3. Cálculo de Costos
- **Subtotal**: Suma de todos los productos
- **Envío**: $5.00 (fijo)
- **Descuento**: Según código promocional
- **Total**: Cálculo automático final

#### 4. Códigos Promocionales
Sistema de descuentos con códigos válidos:
- `FITOVIDA10`: 10% de descuento
- `BIENVENIDO`: $5 de descuento
- `NATURAL20`: 20% de descuento

#### 5. Resumen del Pedido
- Vista previa de todos los productos
- Cantidades y precios
- Resumen de costos
- Método de pago seleccionado

#### 6. Confirmación
- Validación de formulario completa
- Generación de número de pedido único
- Guardado en localStorage
- Modal de confirmación con detalles
- Email de confirmación (simulado)

### Persistencia de Datos
- Los productos del carrito se guardan en localStorage
- Los pedidos completados se almacenan localmente
- Historial de compras disponible

### Notificaciones
- Alertas elegantes para acciones importantes
- Confirmación al agregar productos
- Validación de códigos promocionales
- Errores descriptivos

## 🔐 Sistema de Administración

### Roles de Usuario

El sistema cuenta con dos roles con diferentes permisos:

#### 1. **DESARROLLADOR** 
- Acceso completo a todas las funcionalidades
- Gestión de productos (crear, editar, eliminar)
- Gestión de usuarios (crear, editar, eliminar)
- Modificación de precios
- Acceso a todas las configuraciones

#### 2. **ADMINISTRADOR**
- Gestión de productos (crear, editar, eliminar)
- Modificación de precios
- Subir nuevos productos
- Ver estadísticas del dashboard
- Sin acceso a gestión de usuarios

### Credenciales por Defecto

```
Desarrollador:
Usuario: desarrollador
Contraseña: dev123

Administrador:
Usuario: admin
Contraseña: admin123
```

### Acceso al Panel

1. Haz clic en el ícono de administrador (escudo) en el header del sitio
2. O accede directamente a: `http://localhost/fitovida/login.html`
3. Ingresa tus credenciales
4. Serás redirigido al panel de administración

### Funcionalidades del Panel

#### Dashboard
- Estadísticas de productos totales
- Precio promedio de productos
- Total de usuarios (solo DESARROLLADOR)
- Gráfico de productos por categoría

#### Gestión de Productos
- **Crear**: Agregar nuevos productos con nombre, categoría, precio, imagen y descripción
- **Subir Imágenes**: Seleccionar imágenes desde tu PC local o usar URLs
- **Vista Previa**: Ver la imagen antes de guardar el producto
- **Editar**: Modificar información de productos existentes
- **Eliminar**: Remover productos del catálogo
- **Búsqueda**: Filtrar productos por nombre o descripción
- **Filtrado**: Por categorías (vitaminas, suplementos, hierbas, aceites, proteínas)

#### Gestión de Usuarios (Solo DESARROLLADOR)
- **Crear**: Agregar nuevos usuarios con roles específicos
- **Editar**: Modificar información de usuarios
- **Eliminar**: Remover usuarios (excepto el propio)
- **Estado**: Activar/desactivar usuarios

#### Gestión de Pedidos
- **Vista completa**: Tabla con todos los pedidos realizados
- **Estadísticas**: Total pedidos, pendientes, ingresos, valor promedio
- **Búsqueda**: Por número de pedido, nombre o email del cliente
- **Filtrado**: Por estado (Pendientes, En Proceso, Completados, Cancelados)
- **Filtrado por archivo**: Activos, Archivados o Todos
- **Detalles completos**: Modal con toda la información del pedido
  - Información del cliente
  - Dirección de envío
  - Productos ordenados con cantidades
  - Resumen de costos y descuentos
  - Método de pago
- **Gestión de estados**: Cambiar estado del pedido (Completar/Cancelar)
- **Archivar**: Mover pedidos completados/cancelados a archivo
- **Restaurar**: Recuperar pedidos archivados a activos
- **Imprimir**: Generar PDF/Impresión del pedido
- **Exportar**: Descargar todos los pedidos en formato CSV
- **Búsqueda**: Filtrar usuarios por nombre, usuario o email

#### Configuración
- Cambiar contraseña del usuario actual
- Ver información del sistema
- Visualizar rol actual

## 🎨 Diseño Moderno y Vibrante

### Paleta de Colores
- **Verde Mint** `#00b894` - Color primario
- **Cyan Turquesa** `#00cec9` - Color secundario
- **Rosa Pastel** `#fd79a8` - Accent
- **Peach** `#fab1a0` - Accent alternativo
- **Lavanda** `#a29bfe` - Accent purple
- **Golden** `#fdcb6e` - Warning
- **Coral** `#ff7675` - Danger

### Responsive Design
El diseño es 100% responsive con 5 breakpoints optimizados:

**Desktop Grande (>1200px)**
- Grid de productos: 3-4 columnas automáticas
- Imágenes: 280px de altura
- Gap: 2rem entre elementos

**Desktop/Tablet (968-1200px)**
- Grid de productos: 3 columnas automáticas
- Imágenes: 260px de altura
- Gap: 1.5rem

**Tablet (768-968px)**
- Grid de productos: 2-3 columnas automáticas
- Imágenes: 240px de altura
- Categorías: 3 columnas

**Mobile (480-768px)**
- Grid de productos: 2 columnas automáticas
- Imágenes: 220px de altura
- Texto y espaciado optimizados

**Mobile Pequeño (<480px)**
- Grid de productos: 1 columna ancho completo
- Imágenes: 280px de altura (óptimo vertical)
- Categorías: 2 columnas compactas

### Características del Diseño
✨ Gradientes modernos en botones y headers
✨ Efectos hover con elevación 3D
✨ Íconos con colores gradiente
✨ Sombras coloridas con efecto glow
✨ Animaciones suaves y fluidas
✨ Tarjetas con bordes animados
✨ Transiciones cubic-bezier
✨ Design system consistente

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS personalizadas
  - Flexbox y Grid Layout
  - Animaciones y transiciones
  - Diseño responsive con media queries
- **JavaScript Vanilla**: 
  - Manipulación del DOM
  - LocalStorage API
  - Sistema de carrito de compras
  - Filtros y búsqueda
- **Font Awesome 6.0**: Iconografía profesional

## 📁 Estructura del Proyecto

```
fitovida/
│
├── index.html          # Página principal
├── login.html          # Página de login
├── admin.html          # Panel de administración
├── styles.css          # Estilos del sitio principal
├── admin.css           # Estilos del panel admin
├── script.js           # Funcionalidad del sitio principal
├── admin.js            # Funcionalidad del panel admin
├── products.js         # Base de datos de productos
├── auth.js             # Sistema de autenticación
└── README.md           # Documentación
```

## 🚀 Instalación y Uso

### Requisitos Previos

- Servidor web local (XAMPP, WAMP, LAMP, o Live Server)
- Navegador web moderno

### Instalación

1. Clona o descarga el proyecto en tu directorio de servidor web:
   ```bash
   c:/xampp/htdocs/fitovida/
   ```

2. Asegúrate de que las imágenes estén en la ruta correcta:
   ```
   C:/Users/jhanl/Downloads/img/
   ```

3. Inicia tu servidor web (Apache en XAMPP)

4. Abre tu navegador y visita:
   ```
   http://localhost/fitovida
   ```

## 💡 Uso del Sitio

### Para Usuarios

1. **Explorar Productos**: Navega por las categorías o usa la búsqueda
2. **Ver Detalles**: Haz clic en cualquier producto para ver más información
3. **Agregar al Carrito**: Usa el botón "Agregar" en cada producto
4. **Gestionar Carrito**: 
   - Abre el carrito haciendo clic en el icono superior derecho
   - Ajusta cantidades con los botones +/-
   - Elimina productos si es necesario
5. **Finalizar Compra**: Haz clic en "Finalizar Compra" cuando estés listo

### Para Desarrolladores

#### Agregar Nuevos Productos

Edita `products.js` y agrega un nuevo objeto al array:

```javascript
{
    id: 49,
    name: "Nombre del Producto",
    category: "categoria",
    price: 29.99,
    image: "ruta/a/imagen.jpg",
    description: "Descripción del producto"
}
```

#### Modificar Estilos

Las variables CSS principales están en `:root` en `styles.css`:

```css
--primary-color: #2d6a4f;
--secondary-color: #52b788;
--accent-color: #95d5b2;
```

## 🎨 Paleta de Colores

- **Primary**: `#2d6a4f` - Verde oscuro
- **Secondary**: `#52b788` - Verde medio
- **Accent**: `#95d5b2` - Verde claro
- **Dark**: `#1b4332` - Verde muy oscuro
- **Light**: `#d8f3dc` - Verde pastel

## 📱 Responsive Design

El sitio está optimizado para:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔧 Funcionalidades Técnicas

### LocalStorage

El carrito se guarda automáticamente en localStorage:
```javascript
localStorage.setItem('fitovida_cart', JSON.stringify(cart));
```

### Búsqueda

Búsqueda en tiempo real que filtra por:
- Nombre del producto
- Descripción
- Categoría

### Ordenamiento

- Precio: Menor a Mayor
- Precio: Mayor a Menor
- Nombre: A-Z

## 🌟 Características Destacadas

- ✅ 100% Responsive
- ✅ Sin dependencias externas (excepto Font Awesome)
- ✅ Código limpio y comentado
- ✅ Performance optimizado
- ✅ UX/UI moderna y profesional
- ✅ Persistencia de datos
- ✅ Animaciones suaves
- ✅ Accesibilidad

## 📝 Notas de Desarrollo

### Mejoras Futuras

- [ ] Integración con pasarela de pago
- [ ] Sistema de reportes y analytics avanzados
- [ ] Base de datos backend (MySQL/PostgreSQL)
- [ ] Sistema de reviews y calificaciones
- [ ] Wishlist (lista de deseos)
- [ ] Comparador de productos
- [ ] Filtros avanzados (precio, marca, etc.)
- [ ] Múltiples imágenes por producto
- [ ] Sistema de descuentos y cupones
- [ ] Notificaciones por email
- [ ] Sistema de roles más granular
- [ ] Historial de cambios (audit log)
- [ ] Exportación de datos (CSV, PDF)
- [ ] Sistema de inventario

## 👥 Créditos

**Desarrollado para**: Fitovida - Tienda Naturista  
**Año**: 2025  
**Tecnología**: HTML, CSS, JavaScript

## 📄 Licencia

Este proyecto es de uso educativo y comercial para Fitovida.

## 📞 Contacto

- **Email**: info@fitovida.com
- **Teléfono**: +1 234 567 8900
- **Ubicación**: Calle Principal #123, Ciudad

---

**Fitovida** - Tu salud es nuestra prioridad 🌿
