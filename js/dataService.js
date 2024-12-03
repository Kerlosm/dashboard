// Data Service for managing CRUD operations using localStorage

class DataService {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Initialize data if not exists
        if (!localStorage.getItem('categories')) {
            localStorage.setItem('categories', JSON.stringify([]));
        }
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify([]));
        }
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }

    // Generic CRUD operations
    getAll(type) {
        return JSON.parse(localStorage.getItem(type)) || [];
    }

    getById(type, id) {
        const items = this.getAll(type);
        return items.find(item => item.id === id);
    }

    add(type, item) {
        const items = this.getAll(type);
        item.id = Date.now(); // Simple way to generate unique ID
        items.push(item);
        localStorage.setItem(type, JSON.stringify(items));
        return item;
    }

    update(type, id, updatedItem) {
        const items = this.getAll(type);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem, id };
            localStorage.setItem(type, JSON.stringify(items));
            return items[index];
        }
        return null;
    }

    delete(type, id) {
        const items = this.getAll(type);
        const filteredItems = items.filter(item => item.id !== id);
        localStorage.setItem(type, JSON.stringify(filteredItems));
        return true;
    }

    // Specific queries
    getCategoriesForSelect() {
        const categories = this.getAll('categories');
        return categories.map(cat => ({
            id: cat.id,
            name: cat.name
        }));
    }

    getItemsByCategory(categoryId) {
        const items = this.getAll('items');
        return items.filter(item => item.categoryId === categoryId);
    }
}

// Create a single instance to be used throughout the application
const dataService = new DataService();
