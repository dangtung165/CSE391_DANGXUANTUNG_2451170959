const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung S24 Ultra", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 3, name: "MacBook Air M3", price: 27490000, category: "laptop", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 13", price: 34990000, category: "laptop", image: "https://placehold.co/200", rating: 4.5, inStock: false },
    { id: 5, name: "iPad Pro M4", price: 26190000, category: "tablet", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 6, name: "Galaxy Tab S9", price: 16490000, category: "tablet", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 7, name: "AirPods Pro 2", price: 5690000, category: "accessories", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 8, name: "Sony WH-1000XM5", price: 6990000, category: "accessories", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 9, name: "Xiaomi 14 Ultra", price: 21990000, category: "phone", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 10, name: "Asus ROG Zephyrus", price: 45990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 11, name: "Apple Watch Ultra 2", price: 20990000, category: "accessories", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 12, name: "Lenovo Legion 5", price: 24990000, category: "laptop", image: "https://placehold.co/200", rating: 4.2, inStock: false }
];

let cartCount = 0;
let activeCategory = 'all';
let searchQuery = '';
let sortBy = 'default';

// Khởi tạo khung ứng dụng bằng DOM cơ bản
const body = document.body;
const header = document.createElement('div'); header.className = 'header-actions';
const controls = document.createElement('div'); controls.className = 'controls';
const grid = document.createElement('div'); grid.className = 'grid';

body.append(header, controls, grid);

// Render các thành phần điều khiển
header.innerHTML = `
    <h2>Product Catalog</h2>
    <div>Giỏ hàng <span class="badge" id="cartBadge">0</span></div>
`;

const toggleModeBtn = document.createElement('button');
toggleModeBtn.textContent = '🌙 Dark Mode';
toggleModeBtn.onclick = () => {
    body.classList.toggle('dark-mode');
    toggleModeBtn.textContent = body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
};
header.appendChild(toggleModeBtn);

controls.innerHTML = `
    <input type="text" id="search" placeholder="Tìm sản phẩm...">
    <select id="sort">
        <option value="default">Mặc định</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
        <option value="name-asc">Tên A-Z</option>
        <option value="rating-desc">Đánh giá cao nhất</option>
    </select>
    <div id="catBtns">
        <button data-cat="all">Tất cả</button>
        <button data-cat="phone">Điện thoại</button>
        <button data-cat="laptop">Laptop</button>
        <button data-cat="tablet">Máy tính bảng</button>
        <button data-cat="accessories">Phụ kiện</button>
    </div>
`;

function renderProducts() {
    grid.innerHTML = '';
    
    let filtered = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeCategory !== 'all') filtered = filtered.filter(p => p.category === activeCategory);

    if (sortBy === 'price-asc') filtered.sort((a,b) => a.price - b.price);
    else if (sortBy === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    else if (sortBy === 'name-asc') filtered.sort((a,b) => a.name.localeCompare(b.name));
    else if (sortBy === 'rating-desc') filtered.sort((a,b) => b.rating - a.rating);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p style="color: red; font-weight: bold;">${product.price.toLocaleString()}đ</p>
            <p>⭐ ${product.rating}</p>
            <button class="add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Thêm giỏ' : 'Hết hàng'}
            </button>
        `;
        
        card.addEventListener('click', (e) => {
            if(e.target.className === 'add-to-cart-btn') {
                cartCount++;
                document.getElementById('cartBadge').textContent = cartCount;
            } else {
                showModal(product);
            }
        });
        grid.appendChild(card);
    });
}

function showModal(product) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${product.name}</h3>
            <img src="${product.image}" style="width:150px">
            <p>Danh mục: ${product.category.toUpperCase()}</p>
            <p>Giá tiền: ${product.price.toLocaleString()}đ</p>
            <p>Trạng thái: ${product.inStock ? 'Còn hàng' : 'Hết hàng'}</p>
            <button class="close-btn">Đóng</button>
        </div>
    `;
    modal.querySelector('.close-btn').onclick = () => modal.remove();
    body.appendChild(modal);
}

// Gán Event Listeners
document.getElementById('search').addEventListener('input', (e) => { searchQuery = e.target.value; renderProducts(); });
document.getElementById('sort').addEventListener('change', (e) => { sortBy = e.target.value; renderProducts(); });
document.getElementById('catBtns').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        activeCategory = e.target.dataset.cat;
        renderProducts();
    }
});

renderProducts();