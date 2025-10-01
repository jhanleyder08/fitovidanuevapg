// Sistema de Autenticación - Fitovida
// Roles: DESARROLLADOR (permisos completos) y ADMINISTRADOR (gestión de productos)

class AuthSystem {
    constructor() {
        this.init();
    }

    init() {
        // Crear usuarios por defecto si no existen
        if (!localStorage.getItem('fitovida_users')) {
            const defaultUsers = [
                {
                    id: 1,
                    username: 'desarrollador',
                    password: 'dev123',
                    role: 'DESARROLLADOR',
                    name: 'Desarrollador Principal',
                    email: 'dev@fitovida.com',
                    active: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    username: 'admin',
                    password: 'admin123',
                    role: 'ADMINISTRADOR',
                    name: 'Administrador',
                    email: 'admin@fitovida.com',
                    active: true,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('fitovida_users', JSON.stringify(defaultUsers));
        }
    }

    // Login de usuario
    login(username, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            if (!user.active) {
                return { success: false, message: 'Usuario inactivo' };
            }
            
            // Guardar sesión
            const session = {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
                email: user.email,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('fitovida_session', JSON.stringify(session));
            return { success: true, user: session };
        }
        
        return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    // Logout
    logout() {
        localStorage.removeItem('fitovida_session');
        window.location.href = 'login.html';
    }

    // Verificar si hay sesión activa
    isAuthenticated() {
        const session = localStorage.getItem('fitovida_session');
        return session !== null;
    }

    // Obtener sesión actual
    getCurrentUser() {
        const session = localStorage.getItem('fitovida_session');
        return session ? JSON.parse(session) : null;
    }

    // Verificar permisos
    hasPermission(permission) {
        const user = this.getCurrentUser();
        if (!user) return false;

        // DESARROLLADOR tiene todos los permisos
        if (user.role === 'DESARROLLADOR') return true;

        // ADMINISTRADOR tiene permisos específicos
        if (user.role === 'ADMINISTRADOR') {
            const adminPermissions = [
                'create_product',
                'edit_product',
                'delete_product',
                'view_products',
                'edit_prices'
            ];
            return adminPermissions.includes(permission);
        }

        return false;
    }

    // Verificar si es desarrollador
    isDeveloper() {
        const user = this.getCurrentUser();
        return user && user.role === 'DESARROLLADOR';
    }

    // Verificar si es administrador
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'ADMINISTRADOR';
    }

    // Obtener todos los usuarios
    getAllUsers() {
        const users = localStorage.getItem('fitovida_users');
        return users ? JSON.parse(users) : [];
    }

    // Crear usuario (solo DESARROLLADOR)
    createUser(userData) {
        if (!this.hasPermission('create_user') && !this.isDeveloper()) {
            return { success: false, message: 'No tienes permisos' };
        }

        const users = this.getAllUsers();
        
        // Verificar si el usuario ya existe
        if (users.find(u => u.username === userData.username)) {
            return { success: false, message: 'El usuario ya existe' };
        }

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            username: userData.username,
            password: userData.password,
            role: userData.role,
            name: userData.name,
            email: userData.email,
            active: true,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('fitovida_users', JSON.stringify(users));
        
        return { success: true, user: newUser };
    }

    // Actualizar usuario
    updateUser(userId, updates) {
        if (!this.isDeveloper()) {
            return { success: false, message: 'No tienes permisos' };
        }

        const users = this.getAllUsers();
        const index = users.findIndex(u => u.id === userId);
        
        if (index === -1) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        users[index] = { ...users[index], ...updates };
        localStorage.setItem('fitovida_users', JSON.stringify(users));
        
        return { success: true, user: users[index] };
    }

    // Eliminar usuario
    deleteUser(userId) {
        if (!this.isDeveloper()) {
            return { success: false, message: 'No tienes permisos' };
        }

        const currentUser = this.getCurrentUser();
        if (currentUser.id === userId) {
            return { success: false, message: 'No puedes eliminar tu propio usuario' };
        }

        const users = this.getAllUsers();
        const filteredUsers = users.filter(u => u.id !== userId);
        localStorage.setItem('fitovida_users', JSON.stringify(filteredUsers));
        
        return { success: true };
    }

    // Cambiar contraseña
    changePassword(oldPassword, newPassword) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            return { success: false, message: 'No hay sesión activa' };
        }

        const users = this.getAllUsers();
        const user = users.find(u => u.id === currentUser.id);
        
        if (!user || user.password !== oldPassword) {
            return { success: false, message: 'Contraseña actual incorrecta' };
        }

        user.password = newPassword;
        localStorage.setItem('fitovida_users', JSON.stringify(users));
        
        return { success: true };
    }

    // Proteger página (redirigir si no está autenticado)
    protectPage() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// Instancia global del sistema de autenticación
const auth = new AuthSystem();
