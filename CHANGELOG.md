# Changelog - Fitovida

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [2.4.0] - 2025-10-01

### 🎬 Login con Slideshow de Productos

- **Eliminado: Credenciales de Prueba**
  - Removida sección con usuarios y contraseñas visibles
  - Login más limpio y profesional
  - Mayor seguridad al no exponer credenciales

- **Slideshow Circular en Login**
  - Contenedor circular de 250px (200px en móvil)
  - 5 imágenes de productos rotando
  - Transición cada 5 segundos
  - Efecto zoom sutil durante visualización

- **Diseño Visual**
  - Border-radius: 50% (círculo perfecto)
  - Box-shadow dramática
  - Border blanco semi-transparente (5px)
  - Overlay radial gradient para profundidad

- **Animación CSS**
  ```css
  @keyframes slideZoom {
    0%, 20%   → opacity: 0, scale: 1
    25%, 45%  → opacity: 1, scale: 1.05
    50%, 100% → opacity: 0, scale: 1.1
  }
  ```

- **Productos en Slideshow**
  1. PHOTO-2025-06-24-16-41-57.jpg
  2. PHOTO-2025-06-24-16-44-04.jpg
  3. PHOTO-2025-06-24-16-44-05.jpg
  4. PHOTO-2025-06-24-16-44-09.jpg
  5. PHOTO-2025-06-24-16-44-10.jpg
  
  Ruta: C:/Users/jhanl/Downloads/img/

- **Efectos Visuales**
  - Fade in/out suave (1s)
  - Zoom progresivo (1 → 1.1)
  - Overlay radial desde centro
  - Background-size: cover
  - Background-position: center

- **JavaScript**
  - Control automático del slideshow
  - Cambio cada 5 segundos
  - Loop infinito
  - Clase 'active' para slide visible

- **Responsive**
  - Desktop: 250x250px
  - Mobile: 200x200px
  - Mantiene proporción circular
  - Border y sombras adaptativas

### 🎨 Mejoras Visuales
- ✨ Reemplaza ícono estático por contenido dinámico
- ✨ Muestra productos reales de la tienda
- ✨ Crea conexión visual con el catálogo
- ✨ Animación profesional y suave
- ✨ Overlay para mejor legibilidad del texto

---

## [2.3.0] - 2025-10-01

### 🎨 Navbar Premium Rediseñado

- **Tipografía Mejorada**
  - Texto en mayúsculas (text-transform: uppercase)
  - Font-weight: 600 para mayor legibilidad
  - Letter-spacing: 0.5px para mejor espaciado
  - Font-family: Segoe UI optimizada
  - Color blanco sobre gradiente

- **Enlaces Interactivos**
  - Hover con elevación (-2px translateY)
  - Underline animado con gradiente rosa-naranja
  - Animación desde el centro (transform: translateX(-50%))
  - Borde redondeado (border-radius: 10px)
  - Color hover: verde claro (#55efc4)

- **Íconos Circulares Modernos**
  - Background semi-transparente con blur
  - Bordes glassmorphism
  - Tamaño consistente: 45x45px
  - Border-radius: 50% (círculos perfectos)
  - Backdrop-filter: blur(10px)

- **Efectos Hover en Íconos**
  - Background blanco sólido
  - Color verde primario
  - Elevación 3D (-3px + scale 1.05)
  - Box-shadow dramática
  - Transform en el ícono interno (scale 1.1)

- **Badge de Carrito Animado**
  - Gradiente rosa-naranja
  - Animación pulse continua (2s infinite)
  - Box-shadow con glow rosa
  - Font-weight: 700
  - Posicionamiento optimizado

- **Mobile Menu Button**
  - Glassmorphism effect
  - Border-radius: 12px (redondeado)
  - Hover con inversión de colores
  - Transform scale en hover
  - Backdrop-filter

### 🎯 Características Visuales

**Enlaces:**
```
INICIO  PRODUCTOS  SOBRE NOSOTROS  CONTACTO
  ═══                              (underline animado)
```

**Íconos:**
```
┌─────┐  ┌─────┐  ┌─────┐
│  🔍 │  │  🛒3│  │  👤 │  Circulares con blur
└─────┘  └─────┘  └─────┘
```

**Efectos:**
- ✨ Glassmorphism en botones
- ✨ Elevación 3D en hover
- ✨ Animación pulse en badge
- ✨ Underline gradiente animado
- ✨ Transform suave en todos los elementos

### 🔧 Técnicas CSS
- rgba() para transparencias
- backdrop-filter para blur
- text-transform para mayúsculas
- letter-spacing para legibilidad
- @keyframes para animación pulse
- transform múltiples (translateY + scale)
- box-shadow con colores
- gradient en underline

---

## [2.2.0] - 2025-10-01

### 🖼️ Imágenes Adaptativas con Aspect Ratio

- **Nuevo Sistema de Imágenes Fluidas**
  - Padding-top con porcentaje (75%) para mantener aspect ratio
  - Wrapper contenedor (.product-image-wrapper)
  - Imagen absolute positioned para fill completo
  - Sin alturas fijas, totalmente adaptativo

- **Estructura HTML Mejorada**
  ```html
  <div class="product-image-wrapper">
      <img class="product-image" src="..." alt="...">
  </div>
  ```

- **Aspect Ratio Consistente**
  - 4:3 ratio (75% padding-top) en todos los dispositivos
  - Las imágenes escalan proporcionalmente
  - object-fit: cover para rellenar sin distorsión
  - Background placeholder mientras carga

- **Ventajas del Nuevo Sistema**
  - ✅ Imágenes siempre proporcionales
  - ✅ No hay saltos de layout (CLS)
  - ✅ Responsive sin media queries para imágenes
  - ✅ Performance optimizada
  - ✅ Consistencia visual perfecta

- **Grid Mejorado**
  - auto-fit en lugar de auto-fill
  - minmax ajustado por breakpoint
  - align-items: start para mejor alineación
  - Sin espacios vacíos

- **Transiciones**
  - Hover scale más dramático (1.15x)
  - Transform suave en la card
  - Overflow hidden en wrapper
  - Z-index perfecto para layers

### 🎯 Compatibilidad
Las imágenes ahora se adaptan perfectamente a:
- Cualquier resolución de pantalla
- Cualquier tamaño de imagen original
- Cualquier orientación (portrait/landscape)
- Retina y pantallas 4K

---

## [2.1.0] - 2025-10-01

### 📱 OPTIMIZACIÓN MOBILE-FIRST Completa

- **Responsive Design 100% Móvil**
  - Breakpoints optimizados: 1200px, 968px, 768px, 480px, 360px
  - Grid adaptativo para todos los dispositivos
  - Imágenes con aspect ratio perfecto

- **Tarjetas de Productos Responsivas**
  - **Desktop (>1200px)**: 3-4 columnas, 280px mínimo
  - **Tablet (768-968px)**: 2 columnas, gap 1rem
  - **Mobile (480-768px)**: 1 columna, ancho completo
  - **Mobile pequeño (<360px)**: 1 columna, altura 200px
  - Imágenes adaptativas: 250px → 220px → 180px → 250px → 200px

- **Categorías Adaptadas**
  - **Desktop**: Grid auto-fit
  - **Tablet**: 2 columnas
  - **Mobile**: 2 columnas
  - **Mobile pequeño**: 1 columna
  - Íconos escalados: 4rem → 3rem → 2.5rem → 2rem

- **Textos Escalados**
  - Hero h1: 4rem → 2.8rem → 2.2rem → 1.8rem → 1.5rem
  - Section titles: 3rem → 2.5rem → 2rem → 1.6rem → 1.4rem
  - Productos: Ajustados por breakpoint

- **Padding y Márgenes Optimizados**
  - Container: 20px → 15px → 10px
  - Cards: 2.5rem → 1.5rem → 1.2rem
  - Gaps: 2rem → 1.5rem → 1rem → 0.8rem

- **Imágenes Optimizadas**
  - object-fit: cover en todas las imágenes
  - Alturas específicas por dispositivo
  - Transiciones suaves en hover
  - Zoom effect mantenido en desktop

- **Botones Responsivos**
  - Padding ajustado por pantalla
  - Font-size adaptativo
  - Touch-friendly en móviles (44px mínimo)

- **Modal Adaptado**
  - Desktop: 90% ancho máximo
  - Mobile: 95-98% ancho
  - Altura máxima: 90vh
  - Márgenes reducidos

- **Carrito en Móvil**
  - Ancho: 100% en pantallas pequeñas
  - Deslizamiento suave
  - Botones táctiles grandes

### 🎯 Compatibilidad
- ✅ iPhone SE (320px)
- ✅ iPhone 12/13 (390px)
- ✅ iPhone 14 Pro Max (430px)
- ✅ Android pequeño (360px)
- ✅ Android estándar (411px)
- ✅ Tablets (768px)
- ✅ iPad (1024px)
- ✅ Desktop (1200px+)

### ⚡ Performance Móvil
- Grid con auto-fill para mejor performance
- Imágenes con tamaño específico
- Transiciones optimizadas
- Sin overflow horizontal
- Touch events optimizados

---

## [2.0.0] - 2025-10-01

### 🎨 ACTUALIZACIÓN MAYOR - Rediseño Completo Moderno y Vibrante

- **Paleta de Colores Vibrantes**
  - Verde brillante primario: #00b894 (mint)
  - Verde cyan secundario: #00cec9 (turquesa)
  - Rosa accent: #fd79a8 (pink pastel)
  - Naranja accent: #fab1a0 (peach)
  - Púrpura accent: #a29bfe (lavanda)
  - Amarillo warning: #fdcb6e (golden)
  - Rojo danger: #ff7675 (coral)

- **Gradientes Modernos**
  - Gradiente primario: verde a cyan
  - Gradiente accent: rosa a naranja
  - Gradiente purple: púrpura a azul claro
  - Aplicados en botones, headers, íconos y elementos

- **Header Renovado**
  - Fondo con gradiente vibrante
  - Backdrop filter con efecto blur
  - Logo animado con efecto pulse
  - Sombras coloridas con glow effect
  - Scroll effect suave

- **Botones Mejorados**
  - Efecto de brillo deslizante al hover
  - Sombras con color según el gradiente
  - Animación de elevación 3D
  - Border radius más redondeados (24px)
  - Transiciones suaves cubic-bezier

- **Tarjetas de Productos**
  - Borde superior animado con gradiente
  - Efecto de zoom en imagen al hover
  - Elevación y scale al pasar el mouse
  - Categorías con gradientes únicos y sombras
  - Precios con símbolo $ estilizado
  - Bordes con efecto glow

- **Tarjetas de Categorías**
  - Cada categoría con gradiente único
  - Íconos con texto gradiente (background-clip)
  - Efecto de onda circular al hover
  - Rotación sutil en hover
  - 6 combinaciones de colores diferentes

- **Hero Section**
  - Overlay con gradiente multi-color vibrante
  - Texto con sombras dramáticas
  - Animaciones escalonadas (stagger)
  - Tamaño de fuente más impactante

- **Títulos de Sección**
  - Texto con gradiente aplicado
  - Línea decorativa debajo con gradiente accent
  - Font-weight más bold (800)
  - Tamaño aumentado a 3rem

- **Footer**
  - Gradiente oscuro de fondo
  - Barra superior con gradiente de color
  - Enlaces sociales circulares con gradientes
  - Efecto hover con elevación
  - Colores más vibrantes en links

- **Carrito de Compras**
  - Header con gradiente vibrante
  - Botón cerrar circular con efecto rotate
  - Sombras coloridas
  - Transiciones mejoradas

- **Efectos Globales**
  - Transiciones con easing cubic-bezier
  - Sombras con colores según contexto
  - Border radius consistente (12px, 16px, 24px)
  - Box-shadow con glow effects
  - Hover states más dramáticos

### 🔧 Técnicas Aplicadas
- CSS Variables para colores dinámicos
- Gradientes lineales en múltiples direcciones
- Background-clip para texto gradiente
- Transform 3D para elevaciones
- Animaciones @keyframes
- Pseudo-elementos ::before y ::after
- Box-shadow multi-capa
- Backdrop-filter para blur
- Cubic-bezier timing functions

### 🎯 Resultado
- Aspecto profesional y moderno
- Colores vibrantes y llamativos
- Interacciones fluidas y agradables
- Consistencia visual en todo el sitio
- Mayor engagement visual
- Experiencia premium

---

## [1.3.2] - 2025-10-01

### 🎨 Añadido - Slideshow Animado en Hero

- **Fondo Dinámico con Productos**
  - Slideshow automático de 6 imágenes de productos
  - Transición suave cada 5 segundos
  - Efecto de zoom sutil durante la visualización
  - Duración total del ciclo: 30 segundos

- **Efectos Visuales**
  - Animación de fade in/out entre imágenes
  - Efecto de zoom (scale) para dinamismo
  - Overlay verde semi-transparente para mantener legibilidad
  - Transiciones fluidas sin cortes bruscos

- **Optimización**
  - Imágenes de productos reales de la tienda
  - Posicionamiento centrado de imágenes
  - Compatible con diferentes tamaños de pantalla

### 🔧 Modificado
- `index.html` - Hero section con estructura de slideshow
- `styles.css` - Animaciones y estilos del slideshow

### 🎭 Técnica
- CSS Animations con @keyframes
- Z-index para capas correctas
- Background-size: cover para imágenes responsive

---

## [1.3.1] - 2025-10-01

### 🎉 Añadido - Sistema de Archivo de Pedidos

- **Funcionalidad de Archivar/Restaurar**
  - Botón para archivar pedidos completados o cancelados
  - Botón para restaurar pedidos archivados
  - Icono de archivo 📦 en pedidos archivados
  - Confirmación antes de archivar o restaurar

- **Filtrado por Estado de Archivo**
  - Selector con opciones: Activos, Archivados, Todos
  - Permite mantener organizados los pedidos históricos
  - Filtrado en tiempo real

- **Visual Diferenciado**
  - Pedidos archivados con opacidad reducida
  - Badge "📦 Archivado" visible en la lista
  - Indicador especial en el modal de detalles
  - Fondo gris claro para pedidos archivados

- **Botones Contextuales**
  - Archivar: Solo visible en pedidos completados/cancelados no archivados
  - Restaurar: Solo visible en pedidos archivados
  - Desactivación de acciones de estado en pedidos archivados

### 🔧 Modificado
- `admin.html` - Agregado selector de filtro de archivo
- `admin.css` - Estilos para pedidos archivados y badges
- `orders.js` - Funciones de archivo y filtrado actualizado
- Modal de detalles con indicador de archivo

### 💾 Datos
- Timestamp de archivo guardado (`archivedAt`)
- Flag de archivo persistente en localStorage
- Restauración que elimina datos de archivo

---

## [1.3.0] - 2025-10-01

### 🎉 Añadido - Sistema de Gestión de Pedidos

- **Sección completa de Pedidos en el Admin Panel**
  - Vista de tabla con todos los pedidos
  - Ordenados por fecha (más recientes primero)
  - Información resumida: número, cliente, fecha, items, total, estado

- **Estadísticas de Pedidos**
  - Total de pedidos realizados
  - Pedidos pendientes
  - Ingresos totales generados
  - Valor promedio por pedido

- **Sistema de Búsqueda y Filtrado**
  - Búsqueda por número de pedido, nombre o email
  - Filtrado por estado: Todos, Pendientes, En Proceso, Completados, Cancelados
  - Actualización en tiempo real

- **Modal de Detalles Completos**
  - Información del pedido (número, fecha, estado, método pago)
  - Datos del cliente (nombre, email, teléfono, dirección completa)
  - Lista de productos con imágenes, cantidades y precios
  - Resumen financiero (subtotal, envío, descuentos, total)
  - Notas del pedido (si existen)

- **Gestión de Estados de Pedidos**
  - Botones para marcar como Completado
  - Opción para Cancelar pedidos
  - Actualización automática en la lista

- **Sistema de Impresión**
  - Generar vista de impresión optimizada
  - Incluye toda la información del pedido
  - Logo y formato profesional
  - Botón de imprimir integrado

- **Exportación de Datos**
  - Exportar todos los pedidos a CSV
  - Incluye: número, cliente, email, fecha, items, total, estado, método pago
  - Nombre de archivo con fecha actual

- **Badges Visuales**
  - Estados con colores diferenciados (Pendiente: amarillo, En Proceso: azul, Completado: verde, Cancelado: rojo)
  - Métodos de pago con iconos (💳 Tarjeta, 💰 PayPal, 🏦 Transferencia)

### 📁 Archivos Nuevos
- `orders.js` - Lógica completa para gestión de pedidos

### 🔧 Modificado
- `admin.html` - Agregada sección de pedidos y modal de detalles
- `admin.css` - Estilos para tabla de pedidos, badges y modal
- `admin.js` - Integración de carga de pedidos en navegación

### 🎨 Interfaz
- Diseño consistente con el resto del panel admin
- Tabla responsive con scroll horizontal
- Modal de dos columnas para detalles
- Miniaturas de productos en lista de items
- Acciones contextuales según el estado

---

## [1.2.0] - 2025-10-01

### 🎉 Añadido - Sistema de Checkout Completo
- **Modal de checkout profesional** con diseño de 2 columnas
  - Formulario de información del cliente
  - Resumen del pedido con vista previa
  - Selección de método de pago
  - Campo de notas opcionales

- **Sistema de códigos promocionales**
  - `FITOVIDA10`: 10% de descuento
  - `BIENVENIDO`: $5 de descuento  
  - `NATURAL20`: 20% de descuento
  - Validación y aplicación en tiempo real

- **Cálculo automático de costos**
  - Subtotal de productos
  - Costo de envío ($5.00)
  - Descuentos aplicados
  - Total final actualizado dinámicamente

- **Sistema de notificaciones elegante**
  - Notificaciones deslizantes desde la derecha
  - Tipos: éxito y error
  - Auto-ocultar después de 3 segundos
  - Iconos y colores diferenciados

- **Modal de confirmación de pedido**
  - Animación de check bouncing
  - Número de pedido único generado
  - Mensaje de confirmación
  - Botón para continuar comprando

- **Almacenamiento de pedidos**
  - Pedidos guardados en localStorage
  - Historial completo con todos los detalles
  - Datos del cliente, productos, totales, método de pago

### 🔧 Modificado
- Mejorado el flujo del carrito de compras
- Función `checkout()` completamente reescrita
- Validación de formularios mejorada
- UX del proceso de compra optimizada

### 📚 Documentación
- Actualizado README.md con sección completa del carrito
- Agregado CHANGELOG con mejoras del checkout

### 🎨 Interfaz
- Modal de checkout con diseño responsive
- Selección visual de métodos de pago
- Área de código promocional destacada
- Botón de confirmar pedido con gradiente
- Indicador de compra segura
- Animaciones smooth en todos los modales

---

## [1.1.0] - 2025-10-01

### 🎉 Añadido
- **Sistema de carga de imágenes desde PC local**
  - Selector de archivos integrado en el formulario de productos
  - Vista previa de imágenes antes de guardar
  - Validación de formato y tamaño (máximo 5MB)
  - Conversión automática a Base64 para almacenamiento
  
- **Opción dual para imágenes**
  - Seleccionar desde PC (recomendado)
  - Usar URL externa o ruta de archivo

- **Mejoras en el formulario de productos**
  - Interfaz más intuitiva con radio buttons
  - Área de arrastrar y soltar para imágenes
  - Botón para remover imágenes
  - Vista previa automática al seleccionar

### 🔧 Modificado
- Actualizado `admin.html` con nuevo componente de carga de imágenes
- Actualizado `admin.css` con estilos para el uploader
- Actualizado `admin.js` con nuevas funciones:
  - `toggleImageInput()` - Alternar entre opciones de imagen
  - `previewImage()` - Mostrar vista previa
  - `removeImage()` - Remover imagen seleccionada
  - `saveProduct()` - Manejar ambos tipos de imagen
  - `openProductModal()` - Cargar imagen correctamente al editar

### 📚 Documentación
- Actualizado `README.md` con información de carga de imágenes
- Actualizado `ADMIN_GUIDE.md` con instrucciones detalladas
- Añadido este archivo CHANGELOG.md

### 🎨 Interfaz
- Nuevo diseño para el selector de imágenes
- Área de carga con efecto hover
- Preview container con estilos elegantes
- Botón de remover con confirmación visual

---

## [1.0.0] - 2025-10-01

### 🎉 Lanzamiento Inicial

#### Sitio Web E-commerce
- Página principal con diseño profesional
- Catálogo de 48 productos naturistas
- Sistema de carrito de compras
- Búsqueda y filtrado de productos
- Diseño 100% responsive
- Animaciones y transiciones suaves

#### Sistema de Administración
- Panel de administración completo
- Sistema de autenticación con roles
- 2 roles: DESARROLLADOR y ADMINISTRADOR
- Dashboard con estadísticas
- CRUD completo de productos
- CRUD completo de usuarios (solo DESARROLLADOR)
- Gestión de permisos por rol

#### Características Técnicas
- HTML5, CSS3, JavaScript Vanilla
- LocalStorage para persistencia
- Sin dependencias externas (excepto Font Awesome)
- Código limpio y documentado

#### Documentación
- README.md completo
- ADMIN_GUIDE.md detallado
- Comentarios en código

---

## Formato del Changelog

Este proyecto sigue [Semantic Versioning](https://semver.org/).

Tipos de cambios:
- **Añadido** - Para nuevas funcionalidades
- **Modificado** - Para cambios en funcionalidades existentes
- **Obsoleto** - Para funcionalidades que serán removidas
- **Removido** - Para funcionalidades removidas
- **Corregido** - Para corrección de bugs
- **Seguridad** - Para vulnerabilidades de seguridad
