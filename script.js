// Product data
const products = [
    { name: "Apple", image: "images/apple.jpg", price: "120/kg", category: "fruit" },
    { name: "Banana", image: "images/banana.jpg", price: "45/dozen", category: "fruit" },
    { name: "Carrot", image: "images/carrot.jpg", price: "40/kg", category: "vegetable" },
    { name: "Potato", image: "images/potato.jpg", price: "25/kg", category: "vegetable" },
    { name: "Tomato", image: "images/tomato.jpg", price: "30/kg", category: "vegetable" },
    { name: "Onion", image: "images/onion.jpg", price: "35/kg", category: "vegetable" },
    { name: "Orange", image: "images/orange.jpg", price: "80/kg", category: "fruit" },
    { name: "Spinach", image: "images/spinach.jpg", price: "20/bunch", category: "vegetable" },
    { name: "Brinjal", image: "images/brinjal.jpg", price: "40/kg", category: "vegetable" }
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
    setupBulkCalculator();
    setupMultiItemCalculator();
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
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="item-info">
                <h3>${product.name}</h3>
                <div class="price">₹${product.price}</div>
                <button class="compare-btn" data-item="${product.name}">Compare Prices</button>
                <button class="bulk-btn" data-item="${product.name}">Bulk Calculate</button>
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

    // Filter functionality
    document.querySelectorAll('.filter-content a').forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            
            document.querySelectorAll('.filter-content a').forEach(link => {
                link.classList.remove('active-filter');
            });
            this.classList.add('active-filter');
            
            document.querySelector('.filter-btn').textContent = 
                `Filter: ${this.textContent} ▼`;
            
            filterProducts(category);
        });
    });
}

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const activeFilter = document.querySelector('.filter-content a.active-filter') || 
                        document.querySelector('.filter-content a[data-category="all"]');
    const category = activeFilter.dataset.category;
    
    const items = document.querySelectorAll('.item-card');
    
    items.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        const product = products.find(p => p.name.toLowerCase() === itemName);
        
        const matchesSearch = itemName.includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        
        item.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
    });
}

// Filter products by category
function filterProducts(category) {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.item-card');
    
    items.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        const product = products.find(p => p.name.toLowerCase() === itemName);
        
        const matchesSearch = itemName.includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        
        item.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
    });
}

// Highlight comparison row
function highlightComparison(itemName) {
    document.querySelectorAll('#priceTable tr').forEach(row => {
        row.style.backgroundColor = '';
    });

    const matchingRow = document.querySelector(`#priceTable tr[data-item="${itemName}"]`);
    if (matchingRow) {
        matchingRow.style.backgroundColor = '#e8f5e9';
        document.getElementById('compare').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            matchingRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
}

// Bulk Calculator Functionality
function setupBulkCalculator() {
    const modal = document.getElementById("bulkModal");
    const span = document.querySelector("#bulkModal .close");
    
    document.querySelectorAll('.bulk-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.dataset.item;
            document.getElementById('bulkItemName').textContent = `Item: ${itemName}`;
            modal.style.display = "block";
        });
    });

    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    document.getElementById('calculateBulk').addEventListener('click', calculateBulkPrice);
}

function calculateBulkPrice() {
    const itemName = document.getElementById('bulkItemName').textContent.replace('Item: ', '');
    const quantity = parseFloat(document.getElementById('bulkQuantity').value);
    
    if (!quantity || quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }

    const prices = priceComparison[itemName];
    let resultsHTML = `<h4>Total for ${quantity} units:</h4><ul>`;
    
    for (const [store, priceStr] of Object.entries(prices)) {
        const price = parseFloat(priceStr.match(/₹(\d+)/)[1]);
        const total = price * quantity;
        resultsHTML += `<li><strong>${store}:</strong> ₹${total.toFixed(2)}</li>`;
    }
    
    resultsHTML += '</ul>';
    document.getElementById('bulkResults').innerHTML = resultsHTML;
}

// Multi-Item Calculator Functions
function addItemRow() {
    const container = document.getElementById("multiItemsContainer");
    const row = document.createElement("div");
    row.className = "multi-item-row";
    
    const select = document.createElement("select");
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name;
        option.textContent = product.name;
        select.appendChild(option);
    });
    
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.placeholder = "Quantity";
    input.value = "1";
    
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-item-btn";
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.addEventListener("click", function() {
        row.remove();
    });
    
    row.appendChild(select);
    row.appendChild(input);
    row.appendChild(removeBtn);
    container.appendChild(row);
}

function calculateMultiTotal() {
    const rows = document.querySelectorAll(".multi-item-row");
    const resultsDiv = document.getElementById("multiBulkResults");
    
    if (rows.length === 0) {
        resultsDiv.innerHTML = "<p>Please add at least one item</p>";
        return;
    }
    
    let totals = { store1: 0, store2: 0, store3: 0 };
    let hasValidItems = false;
    
    rows.forEach(row => {
        const select = row.querySelector("select");
        const input = row.querySelector("input");
        
        const itemName = select.value;
        const quantity = parseFloat(input.value) || 0;
        
        if (quantity > 0 && priceComparison[itemName]) {
            hasValidItems = true;
            const prices = priceComparison[itemName];
            
            // Calculate totals for each store
            totals.store1 += getPriceValue(prices.store1) * quantity;
            totals.store2 += getPriceValue(prices.store2) * quantity;
            totals.store3 += getPriceValue(prices.store3) * quantity;
        }
    });
    
    if (!hasValidItems) {
        resultsDiv.innerHTML = "<p>Please enter valid quantities</p>";
        return;
    }
    
    // Display results
    resultsDiv.innerHTML = `
        <h4>Total at each store:</h4>
        <ul>
            <li><strong>Store 1:</strong> ₹${totals.store1.toFixed(2)}</li>
            <li><strong>Store 2:</strong> ₹${totals.store2.toFixed(2)}</li>
            <li><strong>Store 3:</strong> ₹${totals.store3.toFixed(2)}</li>
        </ul>
    `;
}

function getPriceValue(priceStr) {
    const priceMatch = priceStr.match(/₹(\d+)/);
    return priceMatch ? parseFloat(priceMatch[1]) : 0;
}

function setupMultiItemCalculator() {
    const modal = document.getElementById("multiBulkModal");
    const openBtn = document.getElementById("openMultiCalculatorTop");
    
    // Open modal
    openBtn.addEventListener("click", function() {
        document.getElementById("multiItemsContainer").innerHTML = "";
        addItemRow();
        modal.style.display = "block";
    });
    
    // Close modal
    document.querySelector("#multiBulkModal .close").addEventListener("click", function() {
        modal.style.display = "none";
    });
    
    // Add item button
    document.getElementById("addAnotherItem").addEventListener("click", function() {
        addItemRow();
        document.querySelector(".modal-scrollable").scrollTop = document.querySelector(".modal-scrollable").scrollHeight;
    });
    
    // Calculate button
    document.getElementById("calculateMultiBulk").addEventListener("click", calculateMultiTotal);
    
    // Close when clicking outside modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}