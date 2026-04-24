## Câu A1 — HTTP & Browser

### 1. Trình tự các bước khi gõ https://shopee.vn và nhấn Enter

*Nguồn: Chương 01 — Phần 0,2,3*

Dựa trên quy trình hoạt động của Web, dưới đây là 5 bước chính theo đúng thứ tự:

- **Bước 1 – DNS Lookup & Request:**  
  Trình duyệt phân giải tên miền thành địa chỉ IP. Sau đó gửi HTTP Request từ thiết bị qua mạng Internet đến server.

- **Bước 2 – Server xử lý & Response:**  
  Server nhận request, xử lý và trả về HTTP Response (ví dụ: `200 OK`) kèm các file HTML, CSS, JS.

- **Bước 3 – Parse HTML & CSS:**  
  Trình duyệt phân tích HTML để tạo DOM Tree và CSS để tạo CSSOM Tree.

- **Bước 4 – Thực thi JavaScript:**  
  JavaScript được chạy để xử lý logic và có thể thay đổi DOM/CSS.

- **Bước 5 – Render (Layout & Paint):**  
  Trình duyệt tính toán layout và vẽ giao diện hoàn chỉnh lên màn hình.

---

### 2. Tab Network trong DevTools cho thấy thông tin gì?

*Nguồn: Chương 01 — Phần 2, Phần 3*

Tab **Network** hiển thị toàn bộ hoạt động giao tiếp giữa Client và Server, bao gồm:

- Danh sách tất cả HTTP Request và Response
- Các tài nguyên được tải (HTML, CSS, JS, hình ảnh, font…)
- Phương thức HTTP (GET, POST, PUT, DELETE)
- HTTP Status Code (200, 404, 500…)
- Thời gian tải và dung lượng của từng request

---

![Tab Network trong DevTools](images/screenshot-tabNetwork.png)
Hình: Minh họa tab Network trong trình duyệt

## Câu A2 — Semantic HTML

### 1. Tại sao trang web bị Google đánh giá SEO thấp?

Trang web trên mắc lỗi **"Div Soup"** (lạm dụng thẻ `<div>`). Thẻ `<div>` là thẻ không mang ý nghĩa ngữ nghĩa, khiến Google và trình đọc màn hình không thể hiểu cấu trúc trang (header, menu, nội dung chính, footer), dẫn đến SEO và Accessibility kém.

=> Việc sử dụng Semantic HTML giúp công cụ tìm kiếm hiểu rõ cấu trúc trang, từ đó cải thiện SEO và khả năng truy cập.

*(Nguồn: Chương 04 — Phần 1, Phần 3)*

---

### 2. Liệt kê 4 lỗi semantic cụ thể:

- **Lỗi 1 (Layout):** Dùng `<div>` thay cho `<header>`, `<main>`, `<footer>`
- **Lỗi 2:** Không dùng `<nav>` cho menu điều hướng
- **Lỗi 3:** Không dùng `<article>` và thẻ heading (`<h1>`) cho sản phẩm
- **Lỗi 4:** Ảnh thiếu thuộc tính `alt`

---

### 3. Code HTML sửa lại chuẩn Semantic:**
<!-- <header>
    <div class="logo">ShopTLU</div>

    <nav class="menu">
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h1 class="title">iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>

        <figure class="image">
            <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro" loading="lazy">
        </figure>
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>-->
    
## Câu A3 — Block vs Inline

### 1. Kết quả hiển thị (Text Art)
+----------------------+
| Hộp 1                |
+----------------------+

Text A Text B

+----------------------+
| Hộp 2                |
+----------------------+

Text C Text D

+----------------------+
| Hộp 3                |
+----------------------+

### 2. Giải thích

Kết quả hiển thị trên bị chi phối bởi tính chất hiển thị mặc định của các thẻ HTML (Block-level và Inline-level):

**`<div>` là phần tử Block-level (khối):**  
  Các thẻ `<div>Hộp 1</div>`, `<div>Hộp 2</div>`, và `<div>Hộp 3</div>` mặc định chiếm 100% chiều rộng của phần tử cha.  
  Do đó, mỗi khi xuất hiện `<div>`, trình duyệt sẽ tự động ngắt dòng trước và sau nó.

**`<span>` là phần tử Inline-level (nội dòng):**  
  Các thẻ `<span>Text A</span>`, `<span>Text B</span>`, `<span>Text C</span>` chỉ chiếm không gian vừa đủ với nội dung.  
  Chúng không tạo dòng mới mà sẽ nằm nối tiếp nhau trên cùng một dòng.

**`<strong>` cũng là phần tử Inline-level:**  
  Thẻ `<strong>Text D</strong>` hoạt động giống `<span>` về bố cục, nhưng có thêm định dạng in đậm.  
  Nó nằm cùng dòng với "Text C".

---

## Câu A4 (5đ) — Table
### 1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`

*Nguồn: Chương 05 — Phần 3, Phần 8*

Ba thẻ này được dùng để phân chia cấu trúc ngữ nghĩa của một bảng dữ liệu:

- **`<thead>` (Table Head):**  
  Phần đầu bảng, chứa các hàng tiêu đề cột (thường dùng `<th>`). Trình duyệt thường hiển thị nội dung in đậm và căn giữa.

- **`<tbody>` (Table Body):**  
  Phần thân bảng, chứa toàn bộ dữ liệu chính. Một bảng có thể có nhiều `<tbody>` để nhóm dữ liệu.

- **`<tfoot>` (Table Foot):**  
  Phần chân bảng, thường chứa tổng kết hoặc ghi chú cho dữ liệu phía trên.

**Lợi ích kỹ thuật:**  
Giúp Screen Reader đọc bảng chính xác hơn. Trình duyệt có thể render `<tfoot>` sớm ngay cả khi `<tbody>` chưa tải xong. Ngoài ra, CSS dễ dàng áp dụng style riêng cho từng phần.

---

### 2. Tại sao KHÔNG NÊN dùng table để tạo layout trang web?

*Nguồn: Chương 05 — Phần 0, 1, 5, 7*

Việc dùng `<table>` để layout là một **anti-pattern** từ thời HTML4.

1. **Sai ngữ nghĩa & ảnh hưởng Accessibility:**  
   `<table>` chỉ dùng cho dữ liệu dạng bảng. Nếu dùng để layout, Google sẽ hiểu sai nội dung, còn Screen Reader sẽ đọc trang như bảng dữ liệu → rất khó sử dụng.

2. **Khó bảo trì & không responsive:**  
   Layout bằng table rất cứng nhắc, khó hiển thị tốt trên mobile.  
   Giải pháp hiện đại là dùng **Flexbox** hoặc **Grid**.

3. **Gây xung đột với chức năng bảng:**  
   Khi cần dùng các tính năng như sort, resize cột…, việc dùng table cho layout sẽ làm giao diện dễ bị l