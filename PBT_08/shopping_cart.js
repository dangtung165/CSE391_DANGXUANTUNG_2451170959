function createCart() {
    let items = [];
    let currentDiscountCode = null;
    
    return {
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) item.quantity = newQuantity;
        },
        
        applyDiscount(code) {
            currentDiscountCode = code;
        },
        
        getTotal() {
            let subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (currentDiscountCode === "SALE10") subtotal *= 0.9;
            else if (currentDiscountCode === "SALE20") subtotal *= 0.8;
            else if (currentDiscountCode === "FREESHIP") subtotal -= 30000;
            
            return Math.max(0, subtotal);
        },
        
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        
        clearCart() {
            items = [];
            currentDiscountCode = null;
        },
        
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm        │ SL │ Đơn giá      │ Tổng         │");
            
            items.forEach((item, index) => {
                const name = item.name.padEnd(15, ' ');
                const qty = String(item.quantity).padStart(2, ' ');
                const price = item.price.toLocaleString('vi-VN').padStart(12, ' ');
                const total = (item.price * item.quantity).toLocaleString('vi-VN').padStart(12, ' ');
                console.log(`│ ${index + 1} │ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            const finalTotal = this.getTotal().toLocaleString('vi-VN') + "đ";
            console.log(`│ Tổng cộng: ${finalTotal.padStart(33, ' ')} │`);
            console.log("└──────────────────────────────────────────────┘");
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();
// Kỳ vọng:
// ┌──────────────────────────────────────────────┐
// │ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │
// │ 1 │ iPhone 16      │  2 │ 25.990.000  │ 51.980.000  │
// │ 2 │ AirPods Pro    │  2 │  6.990.000  │ 13.980.000  │
// ├──────────────────────────────────────────────┤
// │ Tổng cộng:                       65.960.000đ │
// └──────────────────────────────────────────────┘

cart.applyDiscount("SALE10");
cart.printCart();
// → Tổng: 59.364.000đ (giảm 10%)

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2