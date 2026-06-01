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

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

#### 1. Các lỗi nghiêm trọng đã được tìm thấy và sửa đổi
1. **Lỗi cú pháp đăng ký sự kiện**: `addEventListener("onclick", ...)` -> Phải đổi thành `'click'` (loại bỏ chữ `on` phía trước).
2. **Lỗi ghi đè biến DOM**: `countDisplay = count;` -> Gán trực tiếp giá trị số vào biến element làm hỏng tham chiếu DOM ban đầu của `countDisplay`. Phải sửa thành `countDisplay.textContent = count;`.
3. **Lỗi không thực thi hàm**: `item.remove;` -> Thiếu dấu đóng mở ngoặc để kích hoạt method, khiến các phần tử lịch sử không bị xóa khi click nút clear. Sửa thành `item.remove();`.
4. **Lỗi kiểu dữ liệu LocalStorage**: `count = localStorage.getItem("count")` -> Dữ liệu lấy từ kho lưu trữ luôn có kiểu chuỗi (string). Khi thực hiện phép toán `count++` ở các bước sau sẽ dẫn đến sai lệch tính toán logic. Cần ép kiểu về số nguyên bằng `parseInt()`.
5. **Lỗi logic khôi phục dữ liệu**: Khi tải trang (`window.load`), code cũ chỉ nạp lại biến số `count` mà hoàn toàn bỏ quên việc khôi phục mã HTML của `historyList` từ `localStorage`, dẫn đến mất lịch sử hiển thị trên giao diện sau khi refresh.
6. **Lỗi rò rỉ bộ nhớ (Memory Leak)**: Việc tạo sự kiện lắng nghe riêng lẻ trực tiếp trên từng thẻ `li` qua `createElement` cực kỳ tốn tài nguyên RAM khi số lượng thao tác tăng cao. Đã tối ưu bằng giải pháp **Event Delegation** trên thẻ cha `#history`.
7. **Lỗi gán giá trị rỗng cho DOM**: `historyList.innerHTML = null;` -> Chuẩn nhất đối với dọn dẹp nội dung DOM nên dùng chuỗi rỗng `""`.

#### 2. Đoạn mã hoàn chỉnh sau khi Refactor

```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// Hàm cập nhật giao diện hiển thị số đếm
function updateDisplay() {
    countDisplay.textContent = count;
}

// 1. Increment
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    updateDisplay();
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

// 2. Decrement - Sửa "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    updateDisplay();
});

// 3. Reset - Sửa lỗi phá vỡ biến countDisplay và đổi null thành ""
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    updateDisplay();
    historyList.innerHTML = "";
});

// 4. Xóa từng item - Tối ưu bằng Event Delegation trên thẻ cha thay vì bind lẻ tẻ
historyList.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.remove();
    }
});

// 5. Clear tất cả history - Sửa lỗi thực thi hàm thành item.remove()
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); 
    });
});

// 6. Lưu dữ liệu vào LocalStorage trước khi đóng trang
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// 7. Khôi phục dữ liệu khi tải lại trang - Ép kiểu số và render lại danh sách lịch sử cũ
window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count"), 10) || 0;
    updateDisplay();
    
    const savedHistory = localStorage.getItem("history");
    if(savedHistory) {
        historyList.innerHTML = savedHistory;
    }
});
```

---
