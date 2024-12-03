// Check authentication
// if (!sessionStorage.getItem('isLoggedIn')) {
//     window.location.href = 'login.html';
// }

// Navigation handling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        loadPage(page);
        
        // Update active state
        document.querySelector('.nav-link.active').classList.remove('active');
        this.classList.add('active');
    });
});

// User dropdown handlers
document.getElementById('changePasswordBtn').addEventListener('click', function(e) {
    e.preventDefault();
    loadChangePasswordPage();
});

document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = 'login.html';
});

// Page loading functions
function loadPage(page) {
    const mainContent = document.getElementById('mainContent');
    
    switch(page) {
        case 'welcome':
            loadWelcomePage();
            break;
        case 'categories':
            loadCategoriesPage();
            break;
        case 'items':
            loadItemsPage();
            break;
        case 'users':
            loadUsersPage();
            break;
    }
}

// Load categories page by default
document.querySelector('[data-page="categories"]').classList.add('active');
loadPage('categories');
