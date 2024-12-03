// CRUD Operations for Categories, Items, and Users

function loadCategoriesPage() {
    const mainContent = document.getElementById('mainContent');
    const categories = dataService.getAll('categories');
    
    mainContent.innerHTML = generateCrudTable('categories', ['Name', 'Description'], categories);
}

function loadItemsPage() {
    const mainContent = document.getElementById('mainContent');
    const items = dataService.getAll('items');
    
    mainContent.innerHTML = generateCrudTable('items', ['Name', 'Category', 'Description', 'Price'], items);
}

function loadUsersPage() {
    const mainContent = document.getElementById('mainContent');
    const users = dataService.getAll('users');
    
    mainContent.innerHTML = generateCrudTable('users', ['Name', 'Email', 'Type', 'Status'], users);
}

function generateCrudTable(type, headers, data) {
    return `
        <div class="d-flex justify-content-between mb-3">
            <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <button class="btn btn-new" onclick="showCreateForm('${type}')">
                <i class="bi bi-plus-circle"></i> New ${type.slice(0, -1)}
            </button>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        ${headers.map(header => `<th>${header}</th>`).join('')}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                        <tr>
                            ${getTableCells(type, item)}
                            <td class="table-actions">
                                <button class="btn btn-show btn-sm" onclick="showItem('${type}', ${item.id})">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn btn-edit btn-sm" onclick="editItem('${type}', ${item.id})">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-delete btn-sm" onclick="deleteItem('${type}', ${item.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        ${data.length === 0 ? '<p class="text-center">No data available</p>' : ''}
    `;
}

function getTableCells(type, item) {
    switch(type) {
        case 'categories':
            return `
                <td>${item.name}</td>
                <td>${item.description}</td>
            `;
        case 'items':
            const category = dataService.getById('categories', item.categoryId);
            return `
                <td>${item.name}</td>
                <td>${category ? category.name : 'N/A'}</td>
                <td>${item.description}</td>
                <td>$${item.price}</td>
            `;
        case 'users':
            return `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.type}</td>
                <td>${item.isActive ? 'Active' : 'Inactive'}</td>
            `;
        default:
            return '';
    }
}

// CRUD Operations
function showCreateForm(type) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">Create New ${type.slice(0, -1)}</h3>
                        ${type === 'categories' ? getCategoryForm() :
                          type === 'items' ? getItemForm() :
                          type === 'users' ? getUserForm() : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupFormHandlers(type);
}

function showItem(type, id) {
    const mainContent = document.getElementById('mainContent');
    const data = dataService.getById(type, id);
    
    if (!data) {
        loadPage(type);
        return;
    }
    
    mainContent.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">View ${type.slice(0, -1)}</h3>
                        <div class="view-form">
                            ${type === 'categories' ? getCategoryForm(data) :
                              type === 'items' ? getItemForm(data) :
                              type === 'users' ? getUserForm(data) : ''}
                        </div>
                        <button class="btn btn-secondary" onclick="loadPage('${type}')">Back</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Disable all form inputs for view mode
    document.querySelectorAll('.view-form input, .view-form textarea, .view-form select').forEach(el => {
        el.disabled = true;
    });
    document.querySelector('.view-form button[type="submit"]').style.display = 'none';
}

function editItem(type, id) {
    const mainContent = document.getElementById('mainContent');
    const data = dataService.getById(type, id);
    
    if (!data) {
        loadPage(type);
        return;
    }
    
    mainContent.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">Edit ${type.slice(0, -1)}</h3>
                        ${type === 'categories' ? getCategoryForm(data) :
                          type === 'items' ? getItemForm(data) :
                          type === 'users' ? getUserForm(data) : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupFormHandlers(type, id);
}

function deleteItem(type, id) {
    if (confirm('Are you sure you want to delete this ' + type.slice(0, -1) + '?')) {
        dataService.delete(type, id);
        loadPage(type);
    }
}

function setupFormHandlers(type, id = null) {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Handle checkbox for user form
        if (type === 'users') {
            data.isActive = form.querySelector('#isActive').checked;
        }
        
        // Handle price for item form
        if (type === 'items') {
            data.price = parseFloat(data.price);
            data.categoryId = parseInt(data.categoryId);
        }
        
        if (id) {
            dataService.update(type, id, data);
        } else {
            dataService.add(type, data);
        }
        
        loadPage(type);
    });
}

function getCategoryForm(data = {}) {
    return `
        <form>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" id="name" name="name" value="${data.name || ''}">
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea class="form-control" id="description" name="description">${data.description || ''}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `;
}

function getItemForm(data = {}) {
    return `
        <form>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" id="name" name="name" value="${data.name || ''}">
            </div>
            <div class="form-group">
                <label for="categoryId">Category:</label>
                <select class="form-control" id="categoryId" name="categoryId">
                    <option value="">Select Category</option>
                    ${dataService.getAll('categories').map(category => `
                        <option value="${category.id}" ${data.categoryId === category.id ? 'selected' : ''}>${category.name}</option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea class="form-control" id="description" name="description">${data.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="text" class="form-control" id="price" name="price" value="${data.price || ''}">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `;
}

function getUserForm(data = {}) {
    return `
        <form>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" id="name" name="name" value="${data.name || ''}">
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" name="email" value="${data.email || ''}">
            </div>
            <div class="form-group">
                <label for="type">Type:</label>
                <select class="form-control" id="type" name="type">
                    <option value="">Select Type</option>
                    <option value="Admin" ${data.type === 'Admin' ? 'selected' : ''}>Admin</option>
                    <option value="User" ${data.type === 'User' ? 'selected' : ''}>User</option>
                </select>
            </div>
            <div class="form-group">
                <label for="isActive">Active:</label>
                <input type="checkbox" id="isActive" name="isActive" ${data.isActive ? 'checked' : ''}>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `;
}

function loadPage(type) {
    if (type === 'categories') loadCategoriesPage();
    else if (type === 'items') loadItemsPage();
    else if (type === 'users') loadUsersPage();
}
