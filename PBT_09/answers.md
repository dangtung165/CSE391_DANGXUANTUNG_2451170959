## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree & querySelector

#### 1. Sơ đồ cây DOM (DOM Tree)

```text
div#app
├── header
│   ├── h1
│   │   └── "Todo App" (TextNode)
│   └── nav
│       ├── a.active
│       │   └── "All" (TextNode)
│       ├── a
│       │   └── "Active" (TextNode)
│       └── a
│           └── "Completed" (TextNode)
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add" (TextNode)
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML" (TextNode)
        └── li.todo-item.completed
            └── "Learn CSS" (TextNode)
```

#### 2. Các querySelector tương ứng

* **Chọn thẻ `<h1>`:**
  ```javascript
  document.querySelector('h1')
  ```
* **Chọn input trong form:**
  ```javascript
  document.querySelector('#todoForm input')
  ```
* **Chọn tất cả `.todo-item`:**
  ```javascript
  document.querySelectorAll('.todo-item')
  ```
* **Chọn link đang active:**
  ```javascript
  document.querySelector('nav a.active')
  ```
* **Chọn `<li>` đầu tiên trong `#todoList`:**
  ```javascript
  document.querySelector('#todoList li:first-child')
  ```
* **Chọn tất cả `<a>` bên trong `<nav> `:**
  ```javascript
  document.querySelectorAll('nav a')
  ```

---

### Câu A2 (5đ) — innerHTML vs textContent

#### 1. Sự khác nhau & Trường hợp sử dụng
* **`innerHTML`**: Trả về hoặc thiết lập toàn bộ cú pháp HTML bên trong một phần tử. Trình duyệt sẽ phân tích (parse) chuỗi truyền vào thành các thẻ DOM thực sự và render lên màn hình.
    * *Khi nào dùng*: Khi cần chủ động chèn hoặc thay thế một cấu trúc HTML phức tạp (đã được kiểm soát dữ liệu đầu vào hoàn toàn an toàn).
* **`textContent`**: Chỉ trả về hoặc thiết lập nội dung văn bản thuần túy (plain text) bên trong phần tử. Mọi ký tự đặc biệt của HTML (như `<`, `>`) sẽ được tự động mã hóa (escape) thành text an toàn, không thể chạy như code.
    * *Khi nào dùng*: Khi cập nhật nội dung chữ thông thường (tiêu đề, nhãn nút, hiển thị số lượng) hoặc hiển thị bất kỳ dữ liệu thô nào do người dùng nhập vào.

#### 2. Câu hỏi bảo mật (XSS)
`innerHTML` gây ra lỗ hổng **XSS (Cross-Site Scripting)** vì nó chấp nhận và cho phép trình duyệt thực thi các đoạn mã kịch bản (script) nằm trong chuỗi ký tự được truyền vào. 

Trong ví dụ đề bài, khi kẻ tấn công cố tình nhập thẻ `<img>` kèm lỗi tải ảnh cố ý (`src=x`), trình duyệt parse đoạn này thành mã HTML thật, ngay lập tức kích hoạt sự kiện `onerror` và chạy hàm `alert('Hacked!')`. Kẻ xấu có thể lợi dụng điều này để chạy các đoạn script nguy hiểm nhằm đánh cắp token, session hoặc cookie của người dùng.

#### Cách khắc phục:
Thay thế hoàn toàn `innerHTML` bằng `textContent` để triệt tiêu khả năng biên dịch cấu trúc HTML từ dữ liệu đầu vào:

```javascript
const userInput = document.querySelector("#search").value;
// Sửa đổi: textContent biến thẻ <img> thành văn bản thuần túy không gây hại
document.querySelector("#result").textContent = userInput; 
```

---

### Câu A3 (5đ) — Event Bubbling

* **Khi chưa bỏ comment (Mặc định):** Sự kiện click từ button sẽ nổi bọt (bubbling) lần lượt từ phần tử đích qua các thẻ cha bọc ngoài nó.
  ```text
  BUTTON
  INNER
  OUTER
  ```
* **Khi uncomment `e.stopPropagation()`:** Hàm này chặn đứng sự lan truyền (nổi bọt) của sự kiện lên các lớp cha phía trên cây DOM.
  ```text
  BUTTON
  ```

---
