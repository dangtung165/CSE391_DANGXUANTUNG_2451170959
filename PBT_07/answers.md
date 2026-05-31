## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const

#### 1. Dự đoán kết quả Output (Không chạy code)
* **Đoạn 1:** `undefined`
* **Đoạn 2:** `ReferenceError: Cannot access 'y' before initialization`
* **Đoạn 3:** `TypeError: Assignment to constant variable.`
* **Đoạn 4:** `[1, 2, 3, 4]`
* **Đoạn 5:**
    * `Trong block: 2`
    * `Ngoài block: 1`

#### 2. Giải thích cơ chế hoạt động
* **Đoạn 1 (Hoisting với `var`):** Biến khai báo bằng `var` được đưa lên đầu phạm vi hàm hoặc phạm vi toàn cục (hoisting) và tự động khởi tạo giá trị mặc định là `undefined`. Khi dòng lệnh `console.log(x)` chạy trước dòng gán `x = 5`, hệ thống không báo lỗi mà trả về `undefined`.
* **Đoạn 2 (Temporal Dead Zone với `let`):** Biến `let` cũng được hoisting nhưng **không** được khởi tạo giá trị ban đầu. Khoảng không gian từ đầu khối mã lệnh cho đến dòng khai báo thực tế được gọi là *Vùng chết tạm thời (TDZ - Temporal Dead Zone)*. Việc cố tình truy cập biến trong vùng này sẽ kích hoạt lỗi `ReferenceError`.
* **Đoạn 3 (Tính bất biến của `const`):** Biến khai báo bằng `const` đóng vai trò là một hằng số. Bạn không thể dùng toán tử `=` để gán lại một giá trị hoàn toàn mới cho biến sau khi đã khởi tạo.
* **Đoạn 4 (Tính tham chiếu của Array/Object):** Hằng số `const` chỉ bảo vệ liên kết/địa chỉ ô nhớ (reference) của mảng chứ không khóa các giá trị bên trong mảng đó. Do đó, các hành động làm thay đổi cấu trúc nội bộ như `.push()` vẫn hoạt động bình thường.
* **Đoạn 5 (Phạm vi khối - Block Scope):** Biến `let` có phạm vi bó hẹp bên trong cặp ngoặc nhọn `{}`. Biến `let a = 2` bên trong khối là một thực thể độc lập (shadowing), hoàn toàn không ảnh hưởng hay ghi đè lên biến `let a = 1` ở môi trường bên ngoài.

---

### Câu A2 — Data Types & Coercion

#### 1. Dự đoán kết quả biểu thức

| Biểu thức lệnh | Kết quả dự đoán | Bản chất/Kiểu dữ liệu |
| :--- | :--- | :--- |
| `typeof null` | `"object"` | Lỗi thiết kế kinh điển của JavaScript (Bug lịch sử) |
| `typeof undefined` | `"undefined"` | Kiểu nguyên thủy độc lập |
| `typeof NaN` | `"number"` | Viết tắt của "Not a Number" nhưng thuộc kiểu số |
| `"5" + 3` | `"53"` | Ưu tiên ép kiểu thành Chuỗi (String) để nối |
| `"5" - 3` | `2` | Ưu tiên ép kiểu thành Số (Number) để tính toán |
| `"5" * "3"` | `15` | Ép cả hai vế về dạng Số để thực hiện phép nhân |
| `true + true` | `2` | `true` chuyển thành số `1`, phép tính trở thành: `1 + 1` |
| `[] + []` | `""` | Mảng rỗng chuyển thành chuỗi rỗng |
| `[] + {}` | `"[object Object]"` | Chuyển mảng thành `""` và đối tượng thành chuỗi định danh |
| `{} + []` | `"[object Object]"` | Tương tự dòng trên khi nằm trong hàm `console.log()` |

#### 2. Giải thích sự khác biệt giữa `"5" + 3` và `"5" - 3`
* **Toán tử cộng (`+`):** Đóng vai trò kép trong JavaScript (vừa là toán tử số học, vừa là toán tử nối chuỗi). Khi phát hiện một trong hai vế có kiểu chuỗi, JavaScript sẽ ưu tiên chuyển vế còn lại sang kiểu chuỗi rồi thực hiện **nối chuỗi**. Kết quả: `"5" + "3"` $\rightarrow$ `"53"`.
* **Toán tử trừ (`-`):** Chỉ phục vụ duy nhất một mục đích toán học. JavaScript buộc phải chuyển đổi chuỗi `"5"` về dạng số nguyên `5` trước khi thực hiện phép tính. Kết quả: `5 - 3` $\rightarrow$ `2`.

---

### Câu A3 — So sánh == vs ===

#### 1. Dự đoán True / False
* `console.log(5 == "5");` $\rightarrow$ `true`
* `console.log(5 === "5");` $\rightarrow$ `false`
* `console.log(null == undefined);` $\rightarrow$ `true`
* `console.log(null === undefined);` $\rightarrow$ `false`
* `console.log(NaN == NaN);` $\rightarrow$ `false` *(Giá trị NaN đặc biệt không bao giờ bằng chính nó)*
* `console.log(0 == false);` $\rightarrow$ `true`
* `console.log(0 === false);` $\rightarrow$ `false`
* `console.log("" == false);` $\rightarrow$ `true`

#### 2. Quy tắc áp dụng thực tế
Luôn luôn ưu tiên tuyệt đối việc sử dụng toán tử so sánh nghiêm ngặt **`===`**.

**Tại sao?**
* Toán tử `==` (Loose Equality) tự động thực hiện ép kiểu ngầm định phức tạp trước khi đối chiếu, dễ dẫn đến những kết quả không logic gây lỗi hệ thống ngầm (ví dụ: `"" == false` ra `true`).
* Toán tử `===` (Strict Equality) yêu cầu nghiêm ngặt cả về **Giá trị** lẫn **Kiểu dữ liệu**. Nếu hai vế không đồng nhất kiểu dữ liệu, hệ thống lập tức trả về `false`, giúp mã nguồn minh bạch, an toàn và dễ kiểm soát.

---

### Câu A4 — Truthy & Falsy

#### 1. Danh sách 8 giá trị Falsy trong JavaScript:
Mọi giá trị trong JavaScript khi đưa vào điều kiện logic đều là **Truthy**, ngoại trừ chính xác 8 giá trị **Falsy** sau:
1. `false`
2. `0` (Số không)
3. `-0` (Số không âm)
4. `0n` (Kiểu BigInt không)
5. `""` hoặc `''` (Chuỗi rỗng)
6. `null`
7. `undefined`
8. `NaN`

#### 2. Kết quả in ra màn hình (Chỉ những mệnh đề Truthy mới được kích hoạt)
* `if ("0")` $\rightarrow$ **In chữ A** (Chuỗi ký tự không rỗng là Truthy)
* `if ("")` $\rightarrow$ *Không in* (Chuỗi hoàn toàn rỗng là Falsy)
* `if ([])` $\rightarrow$ **In chữ C** (Mảng rỗng bản chất là một Object, luôn luôn là Truthy)
* `if ({})` $\rightarrow$ **In chữ D** (Đối tượng rỗng là Truthy)
* `if (null)` $\rightarrow$ *Không in* (Falsy)
* `if (0)` $\rightarrow$ *Không in* (Falsy)
* `if (-1)` $\rightarrow$ **In chữ G** (Mọi số thực khác 0 đều mang giá trị Truthy)
* `if (" ")` $\rightarrow$ **In chữ H** (Chuỗi chứa ký tự khoảng trắng không phải chuỗi rỗng $\rightarrow$ Truthy)

---

### Câu A5 — Template Literals

```javascript
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
