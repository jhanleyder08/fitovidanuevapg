// Admin Panel JavaScript - Fitovida

// Proteger la página
if (!auth.protectPage()) {
    throw new Error('No autorizado');
}

// Variables globales
let currentEditingProductId = null;
let currentEditingUserId = null;
let allProductsData = [];

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initAdminPanel();
    loadUserInfo();
    setupNavigation();
    setupEventListeners();
    checkPermissions();
    loadDashboard();
    
    // Cargar productos en localStorage si no existen
    initializeProducts();
});

// Inicializar productos en localStorage
function initializeProducts() {
    if (!localStorage.getItem('fitovida_products')) {
        localStorage.setItem('fitovida_products', JSON.stringify(products));
    }
    // Actualizar la variable global
    allProductsData = JSON.parse(localStorage.getItem('fitovida_products'));
}

// Obtener productos desde localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('fitovida_products')) || [];
}

// Guardar productos en localStorage
function saveProducts(productsData) {
    localStorage.setItem('fitovida_products', JSON.stringify(productsData));
    allProductsData = productsData;
}

// Inicializar panel
function initAdminPanel() {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
}

// Cargar información del usuario
function loadUserInfo() {
    const user = auth.getCurrentUser();
    if (user) {
        document.querySelector('.user-name').textContent = user.name;
        document.querySelector('.user-role').textContent = user.role;
        document.getElementById('currentRole').textContent = user.role;
        document.getElementById('lastUpdate').textContent = new Date().toLocaleDateString();
    }
}

// Configurar navegación
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Agregar active al clickeado
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            const section = this.dataset.section;
            showSection(section);
        });
    });
}

// Mostrar sección
function showSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const section = document.getElementById(`${sectionName}-section`);
    if (section) {
        section.classList.add('active');
    }
    
    // Actualizar título
    const titles = {
        'dashboard': 'Dashboard',
        'products': 'Gestión de Productos',
        'orders': 'Gestión de Pedidos',
        'users': 'Gestión de Usuarios',
        'settings': 'Configuración'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName] || sectionName;
    
    // Cargar datos según la sección
    if (sectionName === 'dashboard') {
        loadDashboard();
    } else if (sectionName === 'products') {
        loadProducts();
    } else if (sectionName === 'orders') {
        loadOrders();
    } else if (sectionName === 'users') {
        loadUsers();
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Formulario de producto
    document.getElementById('productForm').addEventListener('submit', saveProduct);
    
    // Formulario de usuario
    document.getElementById('userForm').addEventListener('submit', saveUser);
    
    // Formulario de cambio de contraseña
    document.getElementById('changePasswordForm').addEventListener('submit', changePassword);
}

// Verificar permisos
function checkPermissions() {
    const user = auth.getCurrentUser();
    
    // Si no es desarrollador, ocultar sección de usuarios
    if (!auth.isDeveloper()) {
        const usersNav = document.getElementById('usersNavItem');
        const usersStatCard = document.getElementById('usersStatCard');
        if (usersNav) usersNav.style.display = 'none';
        if (usersStatCard) usersStatCard.style.display = 'none';
    }
}

// ============ DASHBOARD ============

function loadDashboard() {
    const products = getProducts();
    const users = auth.getAllUsers();
    
    // Total productos
    document.getElementById('totalProducts').textContent = products.length;
    
    // Precio promedio
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
    document.getElementById('avgPrice').textContent = `$${avgPrice.toFixed(2)}`;
    
    // Total usuarios
    if (auth.isDeveloper()) {
        document.getElementById('totalUsers').textContent = users.length;
    }
    
    // Gráfico de categorías
    loadCategoryChart(products);
}

function loadCategoryChart(products) {
    const categories = {
        'vitaminas': 0,
        'suplementos': 0,
        'hierbas': 0,
        'aceites': 0,
        'proteinas': 0
    };
    
    products.forEach(p => {
        if (categories.hasOwnProperty(p.category)) {
            categories[p.category]++;
        }
    });
    
    const maxCount = Math.max(...Object.values(categories));
    const chartDiv = document.getElementById('categoryChart');
    chartDiv.innerHTML = '';
    
    Object.entries(categories).forEach(([cat, count]) => {
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        const bar = document.createElement('div');
        bar.className = 'category-bar';
        bar.innerHTML = `
            <div class="category-bar-label">${getCategoryName(cat)}</div>
            <div class="category-bar-wrapper">
                <div class="category-bar-fill" style="width: ${percentage}%">${count}</div>
            </div>
        `;
        chartDiv.appendChild(bar);
    });
}

function getCategoryName(category) {
    const names = {
        'vitaminas': 'Vitaminas',
        'suplementos': 'Suplementos',
        'hierbas': 'Hierbas',
        'aceites': 'Aceites',
        'proteinas': 'Proteínas'
    };
    return names[category] || category;
}

// ============ PRODUCTOS ============

let currentImageData = null; // Variable para almacenar la imagen en base64

function loadProducts() {
    const products = getProducts();
    displayProducts(products);
}

function toggleImageInput() {
    const selectedOption = document.querySelector('input[name="imageOption"]:checked').value;
    const fileContainer = document.getElementById('fileInputContainer');
    const urlContainer = document.getElementById('urlInputContainer');
    const previewContainer = document.getElementById('imagePreviewContainer');
    
    if (selectedOption === 'file') {
        fileContainer.style.display = 'block';
        urlContainer.style.display = 'none';
    } else {
        fileContainer.style.display = 'none';
        urlContainer.style.display = 'block';
        previewContainer.style.display = 'none';
    }
}

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
        showAlert('Por favor selecciona un archivo de imagen válido', 'error');
        return;
    }
    
    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showAlert('La imagen es muy grande. Máximo 5MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        currentImageData = e.target.result; // Guardar en base64
        
        // Mostrar vista previa
        const preview = document.getElementById('imagePreview');
        const previewContainer = document.getElementById('imagePreviewContainer');
        
        preview.src = currentImageData;
        previewContainer.style.display = 'block';
        
        // Actualizar el campo oculto
        document.getElementById('productImage').value = currentImageData;
    };
    
    reader.readAsDataURL(file);
}

function removeImage() {
    currentImageData = null;
    document.getElementById('productImageFile').value = '';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.getElementById('productImage').value = '';
}

function displayProducts(products) {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No hay productos</td></tr>';
        return;
    }
    
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" class="product-img" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23e8f5e9%22 width=%22100%22 height=%22100%22/></svg>'"></td>
            <td>${product.name}</td>
            <td><span class="badge badge-${product.category}">${getCategoryName(product.category)}</span></td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editProduct(${product.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteProduct(${product.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function searchAdminProducts() {
    const query = document.getElementById('searchProduct').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    
    let products = getProducts();
    
    // Filtrar por categoría
    if (category !== 'todos') {
        products = products.filter(p => p.category === category);
    }
    
    // Filtrar por búsqueda
    if (query) {
        products = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }
    
    displayProducts(products);
}

function filterAdminProducts() {
    searchAdminProducts();
}

function openProductModal(productId = null) {
    if (!auth.hasPermission('create_product')) {
        showAlert('No tienes permisos para crear productos', 'error');
        return;
    }
    
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    form.reset();
    
    // Resetear la imagen
    currentImageData = null;
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.getElementById('productImageFile').value = '';
    document.getElementById('productImage').value = '';
    
    // Resetear opciones de imagen
    document.querySelector('input[name="imageOption"][value="file"]').checked = true;
    toggleImageInput();
    
    if (productId) {
        const products = getProducts();
        const product = products.find(p => p.id === productId);
        if (product) {
            document.getElementById('productModalTitle').textContent = 'Editar Producto';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productDescription').value = product.description;
            
            // Manejar la imagen existente
            if (product.image) {
                currentImageData = product.image;
                document.getElementById('productImage').value = product.image;
                
                // Si es base64, mostrar en preview
                if (product.image.startsWith('data:image')) {
                    document.getElementById('imagePreview').src = product.image;
                    document.getElementById('imagePreviewContainer').style.display = 'block';
                } else {
                    // Si es URL, cambiar a opción URL
                    document.querySelector('input[name="imageOption"][value="url"]').checked = true;
                    toggleImageInput();
                    document.getElementById('productImageUrl').value = product.image;
                }
            }
            
            currentEditingProductId = productId;
        }
    } else {
        document.getElementById('productModalTitle').textContent = 'Nuevo Producto';
        currentEditingProductId = null;
    }
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    currentEditingProductId = null;
}

function saveProduct(e) {
    e.preventDefault();
    
    if (!auth.hasPermission('create_product')) {
        showAlert('No tienes permisos', 'error');
        return;
    }
    
    const products = getProducts();
    
    // Obtener la imagen según la opción seleccionada
    let imageValue = '';
    const selectedOption = document.querySelector('input[name="imageOption"]:checked').value;
    
    if (selectedOption === 'file') {
        imageValue = document.getElementById('productImage').value;
        if (!imageValue) {
            showAlert('Por favor selecciona una imagen', 'error');
            return;
        }
    } else {
        imageValue = document.getElementById('productImageUrl').value;
        if (!imageValue) {
            showAlert('Por favor ingresa la URL de la imagen', 'error');
            return;
        }
    }
    
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        image: imageValue,
        description: document.getElementById('productDescription').value
    };
    
    if (currentEditingProductId) {
        // Editar producto existente
        const index = products.findIndex(p => p.id === currentEditingProductId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            showAlert('Producto actualizado correctamente', 'success');
        }
    } else {
        // Crear nuevo producto
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...productData
        };
        products.push(newProduct);
        showAlert('Producto creado correctamente', 'success');
    }
    
    saveProducts(products);
    closeProductModal();
    loadProducts();
    loadDashboard();
}

function editProduct(productId) {
    if (!auth.hasPermission('edit_product')) {
        showAlert('No tienes permisos para editar productos', 'error');
        return;
    }
    openProductModal(productId);
}

function deleteProduct(productId) {
    if (!auth.hasPermission('delete_product')) {
        showAlert('No tienes permisos para eliminar productos', 'error');
        return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        const products = getProducts();
        const filtered = products.filter(p => p.id !== productId);
        saveProducts(filtered);
        showAlert('Producto eliminado correctamente', 'success');
        loadProducts();
        loadDashboard();
    }
}

// ============ USUARIOS ============

function loadUsers() {
    if (!auth.isDeveloper()) {
        showAlert('No tienes permisos para ver usuarios', 'error');
        return;
    }
    
    const users = auth.getAllUsers();
    displayUsers(users);
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem;">No hay usuarios</td></tr>';
        return;
    }
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge badge-${user.role === 'DESARROLLADOR' ? 'hierbas' : 'suplementos'}">${user.role}</span></td>
            <td><span class="badge ${user.active ? 'badge-active' : 'badge-inactive'}">${user.active ? 'Activo' : 'Inactivo'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editUser(${user.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteUser(${user.id})" title="Eliminar" ${user.id === auth.getCurrentUser().id ? 'disabled' : ''}>
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function searchUsers() {
    const query = document.getElementById('searchUser').value.toLowerCase();
    let users = auth.getAllUsers();
    
    if (query) {
        users = users.filter(u =>
            u.username.toLowerCase().includes(query) ||
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query)
        );
    }
    
    displayUsers(users);
}

function openUserModal(userId = null) {
    if (!auth.isDeveloper()) {
        showAlert('No tienes permisos', 'error');
        return;
    }
    
    const modal = document.getElementById('userModal');
    const form = document.getElementById('userForm');
    form.reset();
    
    if (userId) {
        const users = auth.getAllUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            document.getElementById('userModalTitle').textContent = 'Editar Usuario';
            document.getElementById('userId').value = user.id;
            document.getElementById('userName').value = user.username;
            document.getElementById('userFullName').value = user.name;
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userPassword').value = user.password;
            document.getElementById('userRole').value = user.role;
            document.getElementById('userActive').value = user.active.toString();
            currentEditingUserId = userId;
        }
    } else {
        document.getElementById('userModalTitle').textContent = 'Nuevo Usuario';
        currentEditingUserId = null;
    }
    
    modal.classList.add('active');
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
    currentEditingUserId = null;
}

function saveUser(e) {
    e.preventDefault();
    
    if (!auth.isDeveloper()) {
        showAlert('No tienes permisos', 'error');
        return;
    }
    
    const userData = {
        username: document.getElementById('userName').value,
        name: document.getElementById('userFullName').value,
        email: document.getElementById('userEmail').value,
        password: document.getElementById('userPassword').value,
        role: document.getElementById('userRole').value,
        active: document.getElementById('userActive').value === 'true'
    };
    
    if (currentEditingUserId) {
        // Editar
        const result = auth.updateUser(currentEditingUserId, userData);
        if (result.success) {
            showAlert('Usuario actualizado correctamente', 'success');
        } else {
            showAlert(result.message, 'error');
            return;
        }
    } else {
        // Crear
        const result = auth.createUser(userData);
        if (result.success) {
            showAlert('Usuario creado correctamente', 'success');
        } else {
            showAlert(result.message, 'error');
            return;
        }
    }
    
    closeUserModal();
    loadUsers();
    loadDashboard();
}

function editUser(userId) {
    openUserModal(userId);
}

function deleteUser(userId) {
    if (!auth.isDeveloper()) {
        showAlert('No tienes permisos', 'error');
        return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        const result = auth.deleteUser(userId);
        if (result.success) {
            showAlert('Usuario eliminado correctamente', 'success');
            loadUsers();
            loadDashboard();
        } else {
            showAlert(result.message, 'error');
        }
    }
}

// ============ CONFIGURACIÓN ============

function changePassword(e) {
    e.preventDefault();
    
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    
    if (newPass !== confirm) {
        showAlert('Las contraseñas no coinciden', 'error');
        return;
    }
    
    const result = auth.changePassword(current, newPass);
    if (result.success) {
        showAlert('Contraseña cambiada correctamente', 'success');
        document.getElementById('changePasswordForm').reset();
    } else {
        showAlert(result.message, 'error');
    }
}

// ============ UTILIDADES ============

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        auth.logout();
    }
}

function showAlert(message, type = 'success') {
    const toast = document.getElementById('alertToast');
    toast.textContent = message;
    toast.className = `alert-toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
