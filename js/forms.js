// Form templates for CRUD operations

function getCategoryForm(data = null) {
    return `
        <form id="categoryForm" class="needs-validation" novalidate>
            <div class="mb-3">
                <label for="categoryName" class="form-label">Name</label>
                <input type="text" class="form-control" id="categoryName" required 
                    value="${data ? data.name : ''}">
            </div>
            <div class="mb-3">
                <label for="categoryDescription" class="form-label">Description</label>
                <textarea class="form-control" id="categoryDescription" rows="3">${data ? data.description : ''}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" onclick="loadPage('categories')">Cancel</button>
        </form>
    `;
}

function getItemForm(data = null) {
    return `
        <form id="itemForm" class="needs-validation" novalidate>
            <div class="mb-3">
                <label for="itemName" class="form-label">Name</label>
                <input type="text" class="form-control" id="itemName" required 
                    value="${data ? data.name : ''}">
            </div>
            <div class="mb-3">
                <label for="itemCategory" class="form-label">Category</label>
                <select class="form-select" id="itemCategory" required>
                    <option value="">Select Category</option>
                    <option value="1" ${data && data.category === 'Category 1' ? 'selected' : ''}>Category 1</option>
                    <option value="2" ${data && data.category === 'Category 2' ? 'selected' : ''}>Category 2</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="itemDescription" class="form-label">Description</label>
                <textarea class="form-control" id="itemDescription" rows="3">${data ? data.description : ''}</textarea>
            </div>
            <div class="mb-3">
                <label for="itemPrice" class="form-label">Price</label>
                <input type="number" class="form-control" id="itemPrice" required step="0.01" min="0"
                    value="${data ? data.price.replace('$', '') : ''}">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" onclick="loadPage('items')">Cancel</button>
        </form>
    `;
}

function getUserForm(data = null) {
    return `
        <form id="userForm" class="needs-validation" novalidate>
            <div class="mb-3">
                <label for="userName" class="form-label">Name</label>
                <input type="text" class="form-control" id="userName" required 
                    value="${data ? data.name : ''}">
            </div>
            <div class="mb-3">
                <label for="userEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="userEmail" required 
                    value="${data ? data.email : ''}">
            </div>
            <div class="mb-3">
                <label for="userType" class="form-label">Type</label>
                <select class="form-select" id="userType" required>
                    <option value="">Select Type</option>
                    <option value="admin" ${data && data.type === 'Admin' ? 'selected' : ''}>Admin</option>
                    <option value="user" ${data && data.type === 'User' ? 'selected' : ''}>User</option>
                </select>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="userActive" 
                        ${data && data.isActive ? 'checked' : ''}>
                    <label class="form-check-label" for="userActive">
                        Active
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" onclick="loadPage('users')">Cancel</button>
        </form>
    `;
}

// Form submission handlers
function setupCategoryForm(data = null) {
    const form = document.getElementById('categoryForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (form.checkValidity()) {
            const formData = {
                name: document.getElementById('categoryName').value,
                description: document.getElementById('categoryDescription').value
            };
            // Here you would typically make an API call to save the data
            alert('Category saved successfully!');
            loadPage('categories');
        }
        form.classList.add('was-validated');
    });
}

function setupItemForm(data = null) {
    const form = document.getElementById('itemForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (form.checkValidity()) {
            const formData = {
                name: document.getElementById('itemName').value,
                category: document.getElementById('itemCategory').value,
                description: document.getElementById('itemDescription').value,
                price: document.getElementById('itemPrice').value
            };
            // Here you would typically make an API call to save the data
            alert('Item saved successfully!');
            loadPage('items');
        }
        form.classList.add('was-validated');
    });
}

function setupUserForm(data = null) {
    const form = document.getElementById('userForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (form.checkValidity()) {
            const formData = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                type: document.getElementById('userType').value,
                isActive: document.getElementById('userActive').checked
            };
            // Here you would typically make an API call to save the data
            alert('User saved successfully!');
            loadPage('users');
        }
        form.classList.add('was-validated');
    });
}
