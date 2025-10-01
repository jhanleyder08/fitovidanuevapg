// ============ PEDIDOS ============

let allOrdersData = [];

function loadOrders() {
    const orders = getOrders();
    allOrdersData = orders;
    displayOrders(orders);
    updateOrdersStats(orders);
}

function getOrders() {
    const orders = localStorage.getItem('fitovida_orders');
    return orders ? JSON.parse(orders) : [];
}

function displayOrders(orders) {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">No hay pedidos</td></tr>';
        return;
    }
    
    // Ordenar por fecha (más recientes primero)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const status = order.status || 'pending';
        const isArchived = order.archived || false;
        const statusBadge = getStatusBadge(status);
        const paymentBadge = getPaymentBadge(order.paymentMethod);
        
        // Agregar clase si está archivado
        if (isArchived) {
            row.classList.add('order-archived');
        }
        
        row.innerHTML = `
            <td><strong>${order.orderNumber}</strong> ${isArchived ? '<span class="badge badge-archived">📦 Archivado</span>' : ''}</td>
            <td>
                <div>${order.customer.name}</div>
                <small style="color: var(--gray);">${order.customer.email}</small>
            </td>
            <td>${formattedDate}</td>
            <td>${order.items.length}</td>
            <td><strong>$${order.total.toFixed(2)}</strong></td>
            <td>${paymentBadge}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn-icon" onclick="viewOrderDetails('${order.orderNumber}')" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon btn-print" onclick="printOrder('${order.orderNumber}')" title="Imprimir">
                    <i class="fas fa-print"></i>
                </button>
                ${!isArchived ? `
                    <button class="btn-icon" onclick="archiveOrder('${order.orderNumber}')" title="Archivar">
                        <i class="fas fa-archive"></i>
                    </button>
                ` : `
                    <button class="btn-icon" onclick="unarchiveOrder('${order.orderNumber}')" title="Restaurar">
                        <i class="fas fa-undo"></i>
                    </button>
                `}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getStatusBadge(status) {
    const statusLabels = {
        pending: 'Pendiente',
        processing: 'En Proceso',
        completed: 'Completado',
        cancelled: 'Cancelado'
    };
    return `<span class="badge badge-${status}">${statusLabels[status]}</span>`;
}

function getPaymentBadge(method) {
    const methodLabels = {
        card: '💳 Tarjeta',
        paypal: '💰 PayPal',
        transfer: '🏦 Transferencia'
    };
    return `<span class="badge badge-${method}">${methodLabels[method] || method}</span>`;
}

function updateOrdersStats(orders) {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => (o.status || 'pending') === 'pending').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    document.getElementById('avgOrderValue').textContent = `$${avgOrderValue.toFixed(2)}`;
}

function searchOrders() {
    const searchTerm = document.getElementById('searchOrder').value.toLowerCase();
    const filtered = allOrdersData.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm) ||
        order.customer.name.toLowerCase().includes(searchTerm) ||
        order.customer.email.toLowerCase().includes(searchTerm)
    );
    displayOrders(filtered);
}

function filterOrders() {
    const statusFilter = document.getElementById('filterOrderStatus').value;
    const archiveFilter = document.getElementById('filterOrderArchive').value;
    
    let filtered = allOrdersData;
    
    // Filtrar por estado
    if (statusFilter !== 'all') {
        filtered = filtered.filter(order => (order.status || 'pending') === statusFilter);
    }
    
    // Filtrar por archivo
    if (archiveFilter === 'active') {
        filtered = filtered.filter(order => !order.archived);
    } else if (archiveFilter === 'archived') {
        filtered = filtered.filter(order => order.archived);
    }
    // Si es 'all', no filtramos
    
    displayOrders(filtered);
}

function viewOrderDetails(orderNumber) {
    const orders = getOrders();
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
        showAlert('Pedido no encontrado', 'error');
        return;
    }
    
    const modal = document.getElementById('orderModal');
    const modalBody = document.getElementById('orderModalBody');
    
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const status = order.status || 'pending';
    
    modalBody.innerHTML = generateOrderDetailsHTML(order, formattedDate, status);
    modal.classList.add('active');
}

function generateOrderDetailsHTML(order, formattedDate, status) {
    return `
        <div class="order-details-grid">
            <div class="order-info-section">
                ${generateOrderInfoSection(order, formattedDate, status)}
                ${generateCustomerInfoSection(order)}
                ${generateProductsSection(order)}
            </div>
            ${generateSummarySection(order, status)}
        </div>
    `;
}

function generateOrderInfoSection(order, formattedDate, status) {
    return `
        <h3><i class="fas fa-info-circle"></i> Información del Pedido</h3>
        <div class="order-info-grid">
            <div class="order-info-item">
                <strong>Número de Pedido</strong>
                <span>${order.orderNumber}</span>
            </div>
            <div class="order-info-item">
                <strong>Fecha</strong>
                <span>${formattedDate}</span>
            </div>
            <div class="order-info-item">
                <strong>Estado</strong>
                <span>${getStatusBadge(status)}</span>
            </div>
            <div class="order-info-item">
                <strong>Método de Pago</strong>
                <span>${getPaymentBadge(order.paymentMethod)}</span>
            </div>
        </div>
    `;
}

function generateCustomerInfoSection(order) {
    return `
        <h3><i class="fas fa-user"></i> Información del Cliente</h3>
        <div class="order-info-grid">
            <div class="order-info-item">
                <strong>Nombre</strong>
                <span>${order.customer.name}</span>
            </div>
            <div class="order-info-item">
                <strong>Email</strong>
                <span>${order.customer.email}</span>
            </div>
            <div class="order-info-item">
                <strong>Teléfono</strong>
                <span>${order.customer.phone}</span>
            </div>
            <div class="order-info-item">
                <strong>Ciudad</strong>
                <span>${order.customer.city}</span>
            </div>
        </div>
        <div class="order-info-item" style="grid-column: 1/-1;">
            <strong>Dirección de Envío</strong>
            <span>${order.customer.address}, ${order.customer.city}, CP: ${order.customer.zip}</span>
        </div>
        ${order.notes ? `
        <div class="order-info-item" style="grid-column: 1/-1;">
            <strong>Notas del Pedido</strong>
            <span>${order.notes}</span>
        </div>
        ` : ''}
    `;
}

function generateProductsSection(order) {
    return `
        <h3><i class="fas fa-box"></i> Productos</h3>
        <div class="order-items-list">
            ${order.items.map(item => `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23e8f5e9%22 width=%22100%22 height=%22100%22/></svg>'">
                    <div class="order-item-details">
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-quantity">Cantidad: ${item.quantity} x $${item.price.toFixed(2)}</div>
                    </div>
                    <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function generateSummarySection(order, status) {
    const isArchived = order.archived || false;
    
    return `
        <div class="order-summary-section">
            <h3><i class="fas fa-receipt"></i> Resumen</h3>
            <div class="order-summary-row">
                <span>Subtotal:</span>
                <span>$${order.subtotal.toFixed(2)}</span>
            </div>
            <div class="order-summary-row">
                <span>Envío:</span>
                <span>$${order.shipping.toFixed(2)}</span>
            </div>
            ${order.discount > 0 ? `
            <div class="order-summary-row">
                <span>Descuento:</span>
                <span style="color: var(--success-color);">-$${order.discount.toFixed(2)}</span>
            </div>
            ${order.discountCode ? `
            <div class="order-summary-row">
                <span>Código usado:</span>
                <span><strong>${order.discountCode}</strong></span>
            </div>
            ` : ''}
            ` : ''}
            <div class="order-summary-row total">
                <span>Total:</span>
                <span>$${order.total.toFixed(2)}</span>
            </div>
            
            ${isArchived ? `
                <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin: 1rem 0;">
                    <i class="fas fa-archive" style="font-size: 2rem; color: #6c757d;"></i>
                    <p style="margin-top: 0.5rem; color: #6c757d; font-weight: 600;">Pedido Archivado</p>
                </div>
            ` : ''}
            
            <div class="order-status-actions">
                ${!isArchived && (status === 'pending' || status === 'processing') ? `
                    <button class="btn-complete" onclick="updateOrderStatus('${order.orderNumber}', 'completed')">
                        <i class="fas fa-check"></i> Completar
                    </button>
                ` : ''}
                ${!isArchived && status !== 'cancelled' ? `
                    <button class="btn-cancel" onclick="updateOrderStatus('${order.orderNumber}', 'cancelled')">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                ` : ''}
                <button class="btn-print" onclick="printOrder('${order.orderNumber}')">
                    <i class="fas fa-print"></i> Imprimir
                </button>
            </div>
            
            ${!isArchived && (status === 'completed' || status === 'cancelled') ? `
                <button class="btn-archive" onclick="archiveOrderFromModal('${order.orderNumber}')" style="width: 100%; margin-top: 1rem; padding: 0.8rem; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-archive"></i> Archivar Pedido
                </button>
            ` : ''}
            
            ${isArchived ? `
                <button class="btn-unarchive" onclick="unarchiveOrderFromModal('${order.orderNumber}')" style="width: 100%; margin-top: 1rem; padding: 0.8rem; background: #17a2b8; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-undo"></i> Restaurar Pedido
                </button>
            ` : ''}
        </div>
    `;
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}

function updateOrderStatus(orderNumber, newStatus) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
    
    if (orderIndex === -1) {
        showAlert('Pedido no encontrado', 'error');
        return;
    }
    
    orders[orderIndex].status = newStatus;
    localStorage.setItem('fitovida_orders', JSON.stringify(orders));
    
    showAlert(`Pedido actualizado a: ${newStatus}`, 'success');
    closeOrderModal();
    loadOrders();
}

function printOrder(orderNumber) {
    const orders = getOrders();
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
        showAlert('Pedido no encontrado', 'error');
        return;
    }
    
    // Crear ventana de impresión
    const printWindow = window.open('', '_blank');
    printWindow.document.write(generatePrintHTML(order));
    printWindow.document.close();
}

function generatePrintHTML(order) {
    const orderDate = new Date(order.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Pedido ${order.orderNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info-section { margin-bottom: 20px; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .info-item { margin-bottom: 10px; }
                .info-item strong { display: block; color: #2d6a4f; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background: #2d6a4f; color: white; }
                .total { font-size: 1.2em; font-weight: bold; text-align: right; margin-top: 20px; }
                @media print { button { display: none; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🌿 Fitovida</h1>
                <h2>Pedido ${order.orderNumber}</h2>
                <p>${orderDate}</p>
            </div>
            
            <div class="info-section">
                <h3>Cliente</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Nombre:</strong> ${order.customer.name}
                    </div>
                    <div class="info-item">
                        <strong>Email:</strong> ${order.customer.email}
                    </div>
                    <div class="info-item">
                        <strong>Teléfono:</strong> ${order.customer.phone}
                    </div>
                    <div class="info-item">
                        <strong>Dirección:</strong> ${order.customer.address}, ${order.customer.city}, CP: ${order.customer.zip}
                    </div>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div style="text-align: right;">
                <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
                <p>Envío: $${order.shipping.toFixed(2)}</p>
                ${order.discount > 0 ? `<p>Descuento: -$${order.discount.toFixed(2)}</p>` : ''}
                <p class="total">Total: $${order.total.toFixed(2)}</p>
            </div>
            
            <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background: #2d6a4f; color: white; border: none; cursor: pointer;">
                Imprimir
            </button>
        </body>
        </html>
    `;
}

function exportOrders() {
    const orders = getOrders();
    
    if (orders.length === 0) {
        showAlert('No hay pedidos para exportar', 'error');
        return;
    }
    
    // Crear CSV
    let csv = 'Pedido,Cliente,Email,Fecha,Items,Total,Estado,Método Pago\n';
    
    orders.forEach(order => {
        const date = new Date(order.date).toLocaleDateString('es-ES');
        const status = order.status || 'pending';
        csv += `"${order.orderNumber}","${order.customer.name}","${order.customer.email}","${date}",${order.items.length},$${order.total.toFixed(2)},"${status}","${order.paymentMethod}"\n`;
    });
    
    // Descargar archivo
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitovida_pedidos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showAlert('Pedidos exportados correctamente', 'success');
}

// Funciones de Archivo
function archiveOrder(orderNumber) {
    if (!confirm('¿Archivar este pedido? Se moverá a la sección de archivados.')) {
        return;
    }
    
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
    
    if (orderIndex === -1) {
        showAlert('Pedido no encontrado', 'error');
        return;
    }
    
    orders[orderIndex].archived = true;
    orders[orderIndex].archivedAt = new Date().toISOString();
    localStorage.setItem('fitovida_orders', JSON.stringify(orders));
    
    showAlert('Pedido archivado correctamente', 'success');
    loadOrders();
}

function unarchiveOrder(orderNumber) {
    if (!confirm('¿Restaurar este pedido? Volverá a la lista de activos.')) {
        return;
    }
    
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
    
    if (orderIndex === -1) {
        showAlert('Pedido no encontrado', 'error');
        return;
    }
    
    orders[orderIndex].archived = false;
    delete orders[orderIndex].archivedAt;
    localStorage.setItem('fitovida_orders', JSON.stringify(orders));
    
    showAlert('Pedido restaurado correctamente', 'success');
    loadOrders();
}

function archiveOrderFromModal(orderNumber) {
    archiveOrder(orderNumber);
    closeOrderModal();
}

function unarchiveOrderFromModal(orderNumber) {
    unarchiveOrder(orderNumber);
    closeOrderModal();
}
