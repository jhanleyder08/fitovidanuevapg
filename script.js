// Estado global de la aplicación
let cart = [];
let currentFilter = 'todos';
let currentSort = 'default';

// Inicializar la aplicación cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCartFromStorage();
    updateCartUI();
    
    // Cerrar modal al hacer clic fuera
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Prevenir envío de formularios
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
        });
    });
});

// Cargar y mostrar productos
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productsToShow = getAllProducts();
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    
    card.innerHTML = `
        <div class="product-image-wrapper" onclick="openProductModal(${product.id})">
            <img class="product-image" src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23e8f5e9%22 width=%22400%22 height=%22300%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%232d6a4f%22>${product.name}</text></svg>'">
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${truncateText(product.description, 80)}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Agregar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Obtener nombre de categoría
function getCategoryName(category) {
    const categories = {
        'todos': 'Todos',
        'vitaminas': 'Vitaminas',
        'suplementos': 'Suplementos',
        'hierbas': 'Hierbas',
        'aceites': 'Aceites',
        'proteinas': 'Proteínas'
    };
    return categories[category] || category;
}

// Truncar texto
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Filtrar por categoría
function filterByCategory(category) {
    currentFilter = category;
    applyFiltersAndSort();
}

// Ordenar productos
function sortProducts() {
    const select = document.getElementById('sortSelect');
    currentSort = select.value;
    applyFiltersAndSort();
}

// Aplicar filtros y ordenamiento
function applyFiltersAndSort() {
    let products = getProductsByCategory(currentFilter);
    
    // Ordenar
    if (currentSort === 'price-low') {
        products.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        products.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Mostrar productos
    displayProducts(products);
}

// Mostrar productos
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem; color: #6c757d;">No se encontraron productos.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Buscar productos
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query === '') {
        applyFiltersAndSort();
        return;
    }
    
    const results = searchProductsByName(query);
    displayProducts(results);
}

// Abrir/cerrar búsqueda
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.add('active');
    document.getElementById('searchInput').focus();
});

function closeSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.remove('active');
    document.getElementById('searchInput').value = '';
    applyFiltersAndSort();
}

// Scroll a productos
function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

// Modal de producto
function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23e8f5e9%22 width=%22400%22 height=%22300%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%232d6a4f%22>${product.name}</text></svg>'">
        <div class="modal-info">
            <div class="modal-category">${getCategoryName(product.category)}</div>
            <h2>${product.name}</h2>
            <div class="modal-price">$${product.price.toFixed(2)}</div>
            <p class="modal-description">${product.description}</p>
            <button class="btn-primary" onclick="addToCart(${product.id}); closeModal();">
                <i class="fas fa-cart-plus"></i> Agregar al Carrito
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Funciones del carrito
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    showNotification('Producto agregado al carrito');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCartToStorage();
        updateCartUI();
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    
    // Actualizar items del carrito
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23e8f5e9%22 width=%22100%22 height=%22100%22/></svg>'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Checkout functionality
let shippingCost = 5.00;
let discountAmount = 0;
let discountCode = '';

const promoCodes = {
    'FITOVIDA10': 10, // 10% descuento
    'BIENVENIDO': 5,  // $5 descuento
    'NATURAL20': 20   // 20% descuento
};

function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }

    // Cerrar el carrito
    toggleCart();

    // Abrir modal de checkout
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.add('active');

    // Cargar resumen de productos
    loadCheckoutSummary();

    // Resetear formulario
    document.getElementById('checkoutForm').reset();
    document.getElementById('promoCode').value = '';
    discountAmount = 0;
    discountCode = '';
}

function loadCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = '';

    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="summary-item-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23e8f5e9%22 width=%22100%22 height=%22100%22/></svg>'">
            <div class="summary-item-info">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-quantity">Cantidad: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        checkoutItems.appendChild(summaryItem);
    });

    updateCheckoutTotals();
}

function updateCheckoutTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calcular descuento
    let discount = 0;
    if (discountCode) {
        const promoValue = promoCodes[discountCode];
        if (promoValue > 100) {
            // Es un descuento fijo
            discount = promoValue;
        } else {
            // Es un porcentaje
            discount = (subtotal * promoValue) / 100;
        }
    }

    const total = subtotal + shippingCost - discount;

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById('checkoutDiscount').textContent = discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00';
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function applyPromoCode() {
    const code = document.getElementById('promoCode').value.trim().toUpperCase();

    if (!code) {
        showNotification('Ingresa un código de descuento', 'error');
        return;
    }

    if (promoCodes[code]) {
        discountCode = code;
        discountAmount = promoCodes[code];
        updateCheckoutTotals();
        showNotification(`¡Código aplicado! Descuento de ${promoCodes[code] > 100 ? '$' + promoCodes[code] : promoCodes[code] + '%'}`, 'success');
    } else {
        showNotification('Código de descuento inválido', 'error');
    }
}

function confirmOrder() {
    const form = document.getElementById('checkoutForm');

    // Validar formulario
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Obtener datos del formulario
    const orderData = {
        customer: {
            name: document.getElementById('checkoutName').value,
            email: document.getElementById('checkoutEmail').value,
            phone: document.getElementById('checkoutPhone').value,
            address: document.getElementById('checkoutAddress').value,
            city: document.getElementById('checkoutCity').value,
            zip: document.getElementById('checkoutZip').value
        },
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        notes: document.getElementById('checkoutNotes').value,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        shipping: shippingCost,
        discount: discountAmount,
        discountCode: discountCode,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + shippingCost - discountAmount,
        date: new Date().toISOString(),
        orderNumber: generateOrderNumber()
    };

    // Guardar pedido en localStorage
    let orders = JSON.parse(localStorage.getItem('fitovida_orders')) || [];
    orders.push(orderData);
    localStorage.setItem('fitovida_orders', JSON.stringify(orders));

    // Cerrar checkout modal
    closeCheckout();

    // Mostrar modal de éxito
    showSuccessModal(orderData.orderNumber);

    // Limpiar carrito
    cart = [];
    saveCartToStorage();
    updateCartUI();
}

function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `#${timestamp}${random}`.slice(0, 10);
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function showSuccessModal(orderNumber) {
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('successModal').classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}

// Notification system
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Agregar al body
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Almacenamiento local
function saveCartToStorage() {
    localStorage.setItem('fitovida_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const stored = localStorage.getItem('fitovida_cart');
    if (stored) {
        cart = JSON.parse(stored);
    }
}

// Notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #52b788;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Menú móvil
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
