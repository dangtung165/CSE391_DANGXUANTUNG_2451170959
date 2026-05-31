## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

**1. Ba cách viết hàm:**
```javascript
// 1. Function Declaration
function tinhThueBaoHiem1(luong) {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong, thuc_nhan: luong - thuong };
}

// 2. Function Expression
const tinhThueBaoHiem2 = function(luong) {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong, thuc_nhan: luong - thuong };
};

// 3. Arrow Function
const tinhThueBaoHiem3 = (luong) => {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong, thuc_nhan: luong - thuong };
};
```

**2. Sự khác nhau về Hoisting:**
Có sự khác biệt rất lớn về hoisting giữa 3 cách trên:
* **Function Declaration:** Được hoisting toàn bộ (cả tên hàm và nội dung). Bạn có thể gọi hàm trước khi khai báo.
* **Function Expression & Arrow Function (dùng let/const):** Chỉ hoisting phần khai báo biến, không hoisting giá trị hàm. Chúng rơi vào vùng chết tạm thời (TDZ - Temporal Dead Zone). Nếu gọi trước khi khởi tạo sẽ gây lỗi `ReferenceError`.

**Ví dụ Code minh họa:**
```javascript
console.log(funcDecl()); // Chạy bình thường, trả về "Hello"
function funcDecl() { return "Hello"; }

console.log(funcExpr()); // Lỗi: ReferenceError: Cannot access 'funcExpr' before initialization
const funcExpr = function() { return "Hi"; };

console.log(funcArrow()); // Lỗi: ReferenceError: Cannot access 'funcArrow' before initialization
const funcArrow = () => "Hey";
```

---
