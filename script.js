// Product data
const products = [
    { name: "Apple", image: "apple.jpg", price: "120/kg" },
    { name: "Banana", image: "banana.jpg", price: "45/dozen" },
    { name: "Carrot", image: "carrot.jpg", price: "40/kg" },
    { name: "Potato", image: "potato.jpg", price: "25/kg" },
    { name: "Tomato", image: "tomato.jpg", price: "30/kg" },
    { name: "Onion", image: "onion.jpg", price: "35/kg" },
    { name: "Orange", image: "orange.jpg", price: "80/kg" },
    { name: "Spinach", image: "spinach.jpg", price: "20/bunch" },
    { name: "Brinjal", image: "brinjal.jpg", price: "40/kg" }
];

// Price comparison data
const priceComparison = {
    "Apple": { store1: "₹120/kg", store2: "₹110/kg", store3: "₹130/kg" },
    "Banana": { store1: "₹45/dozen", store2: "₹40/dozen", store3: "₹50/dozen" },
    "Carrot": { store1: "₹40/kg", store2: "₹35/kg", store3: "₹45/kg" },
    "Potato": { store1: "₹25/kg", store2: "₹22/kg", store3: "₹28/kg" },
    "Tomato": { store1: "₹30/kg", store2: "₹25/kg", store3: "₹35/kg" },
    "Onion": { store1: "₹35/kg", store2: "₹30/kg", store3: "₹40/kg" },
    "Orange": { store1: "₹80/kg", store2: "₹75/kg", store3: "₹85/kg" },
    "Spinach": { store1: "₹20/bunch", store2: "₹18/bunch", store3: "₹22/bunch" },
    "Brinjal": { store1: "₹40/kg", store2: "₹35/kg", store3: "₹45/kg" }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadPriceTable();
    setupEventListeners();
});

// Load products into the grid
function loadProducts() {
    const itemsGrid = document.getElementById('itemsGrid');
    itemsGrid.innerHTML = '';

    products.forEach(product => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <div class="item-image">
                <img src="images/${product.image}" alt="${product.name}">
            </div>
            <div class="item-info">
                <h3>${product.name}</h3>
                <div class="price">₹${product.price}</div>
                <button class="compare-btn" data-item="${product.name}">Compare Prices</button>
            </div>
        `;
        itemsGrid.appendChild(itemCard);
    });
}

// Load price comparison table
function loadPriceTable() {
    const priceTable = document.getElementById('priceTable');
    priceTable.innerHTML = '';

    for (const [item, prices] of Object.entries(priceComparison)) {
        const row = document.createElement('tr');
        row.dataset.item = item;
        row.innerHTML = `
            <td>${item}</td>
            <td>${prices.store1}</td>
            <td>${prices.store2}</td>
            <td>${prices.store3}</td>
        `;
        priceTable.appendChild(row);
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // Compare button functionality
    document.getElementById('itemsGrid').addEventListener('click', function(e) {
        if (e.target.classList.contains('compare-btn')) {
            const itemName = e.target.dataset.item;
            highlightComparison(itemName);
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.item-card');

    items.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = itemName.includes(searchTerm) ? 'block' : 'none';
    });
}

// Highlight comparison row
function highlightComparison(itemName) {
    // Remove previous highlights
    document.querySelectorAll('#priceTable tr').forEach(row => {
        row.style.backgroundColor = '';
    });

    // Find and highlight the matching row
    const matchingRow = document.querySelector(`#priceTable tr[data-item="${itemName}"]`);
    if (matchingRow) {
        matchingRow.style.backgroundColor = '#e8f5e9';
        
        // Scroll to the comparison section and center the row
        document.getElementById('compare').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            matchingRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
}