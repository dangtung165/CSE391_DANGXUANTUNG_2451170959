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

## Câu A2 (5đ) — Scope & Closure

**Dự đoán Output:**
* **Đoạn 1:**
    * `console.log(c.increment());` → **1**
    * `console.log(c.increment());` → **2**
    * `console.log(c.increment());` → **3**
    * `console.log(c.decrement());` → **2**
    * `console.log(c.getCount());`  → **2**

* **Đoạn 2 (Output sau 200ms):**
    * `var: 3`, `var: 3`, `var: 3`
    * `let: 0`, `let: 1`, `let: 2`

**Giải thích chi tiết (var vs let trong setTimeout):**
* **`var`:** Có scope theo hàm (function scope) hoặc global. Khi vòng lặp chạy xong, biến `i` duy nhất đó đã tăng lên `3`. Lúc `setTimeout` thực thi callback sau 100ms, nó nhìn vào cùng một biến `i` duy nhất trong bộ nhớ, nên in ra toàn số 3.
* **`let`:** Có scope theo block (block scope). Mỗi vòng lặp sẽ tạo ra một môi trường từ vựng (lexical environment) hoàn toàn mới, giữ lại giá trị riêng biệt của `j` cho từng vòng lặp. Khi callback của `setTimeout` chạy, nó truy cập đúng giá trị `j` đã được "chốt" tại vòng lặp đó.

---
