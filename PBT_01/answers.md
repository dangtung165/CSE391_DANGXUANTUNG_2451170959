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

### 2. Tab Network trong DevTools cho thấy thông tin gì?

*Nguồn: Chương 01 — Phần 2, Phần 3*

Tab **Network** hiển thị toàn bộ hoạt động giao tiếp giữa Client và Server, bao gồm:

- Danh sách tất cả HTTP Request và Response
- Các tài nguyên được tải (HTML, CSS, JS, hình ảnh, font…)
- Phương thức HTTP (GET, POST, PUT, DELETE)
- HTTP Status Code (200, 404, 500…)
- Thời gian tải và dung lượng của từng request

![Tab Network trong DevTools](screenshots/screenshot-tabNetwork.png)
Hình: Minh họa tab Network trong trình duyệt

---

## Câu A2 — Semantic HTML

### 1. Tại sao trang web bị Google đánh giá SEO thấp?

*(Nguồn: Chương 04 — Phần 1, Phần 3)*
Trang web trên mắc lỗi **"Div Soup"** (lạm dụng thẻ `<div>`). Thẻ `<div>` là thẻ không mang ý nghĩa ngữ nghĩa, khiến Google và trình đọc màn hình không thể hiểu cấu trúc trang (header, menu, nội dung chính, footer), dẫn đến SEO và Accessibility kém.

=> Việc sử dụng Semantic HTML giúp công cụ tìm kiếm hiểu rõ cấu trúc trang, từ đó cải thiện SEO và khả năng truy cập.

### 2. Liệt kê 4 lỗi semantic cụ thể:

- **Lỗi 1 (Layout):** Dùng `<div>` thay cho `<header>`, `<main>`, `<footer>`
- **Lỗi 2:** Không dùng `<nav>` cho menu điều hướng
- **Lỗi 3:** Không dùng `<article>` và thẻ heading (`<h1>`) cho sản phẩm
- **Lỗi 4:** Ảnh thiếu thuộc tính `alt`

### 3. Code HTML sửa lại chuẩn Semantic:**
```html
<header>
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
</footer>
```    
---

## Câu A3 — Block vs Inline

### 1. Kết quả hiển thị (Text Art)
```txt
+------------------------+
| Hộp 1                  |
+------------------------+

Text A Text B

+------------------------+
| Hộp 2                  |
+------------------------+

Text C Text D

+------------------------+
| Hộp 3                  |
+------------------------+
```
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

## Câu A4 — Table
### 1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`

*Nguồn: Chương 05 — Phần 3, 8*

Ba thẻ này được dùng để phân chia cấu trúc ngữ nghĩa của một bảng dữ liệu:

- **`<thead>` (Table Head):**  
  Phần đầu bảng, chứa các hàng tiêu đề cột (thường dùng `<th>`). Trình duyệt thường hiển thị nội dung in đậm và căn giữa.

- **`<tbody>` (Table Body):**  
  Phần thân bảng, chứa toàn bộ dữ liệu chính. Một bảng có thể có nhiều `<tbody>` để nhóm dữ liệu.

- **`<tfoot>` (Table Foot):**  
  Phần chân bảng, thường chứa tổng kết hoặc ghi chú cho dữ liệu phía trên.

**Lợi ích kỹ thuật:**  
Giúp Screen Reader đọc bảng chính xác hơn. Trình duyệt có thể render `<tfoot>` sớm ngay cả khi `<tbody>` chưa tải xong. Ngoài ra, CSS dễ dàng áp dụng style riêng cho từng phần.

### 2. Tại sao KHÔNG NÊN dùng table để tạo layout trang web?

*Nguồn: Chương 05 — Phần 0, 1, 5, 7*

1. **Sai ngữ nghĩa & ảnh hưởng Accessibility:**  
   `<table>` chỉ dùng cho dữ liệu dạng bảng. Nếu dùng để layout, Google sẽ hiểu sai nội dung, còn Screen Reader sẽ đọc trang như bảng dữ liệu → rất khó sử dụng.

2. **Khó bảo trì & không responsive:**  
   Layout bằng table rất cứng nhắc, khó hiển thị tốt trên mobile.  
   Giải pháp hiện đại là dùng **Flexbox** hoặc **Grid**.

3. **Gây xung đột với chức năng bảng:**  
   Khi cần dùng các tính năng như sort, resize cột…, việc dùng table cho layout sẽ làm giao diện dễ bị lỗi hoặc vỡ cấu trúc

---

## Bài B3 — Debug HTML

Danh sách 11 lỗi (Syntax và Semantic) được tìm thấy:

**Lỗi 1: Dòng 1** — Khai báo DOCTYPE sai cú pháp (thiếu chữ `html`). — *Cách sửa:* Sửa `<!DOCTYPE>` thành `<!DOCTYPE html>`.

**Lỗi 2: Dòng 2** — Thẻ `<title>` chưa được đóng. — *Cách sửa:* Thêm thẻ đóng thành `<title>Trang web</title>`.

**Lỗi 3: Dòng 3** — Thuộc tính charset viết sai chuẩn (thiếu dấu gạch ngang). — *Cách sửa:* Sửa `"utf8"` thành `"UTF-8"`.

**Lỗi 4: Dòng 5** — Thẻ đóng heading sai cú pháp (thiếu dấu `/`). — *Cách sửa:* Sửa `<h1>` ở cuối câu thành `</h1>`. Ngoài ra, `<header>` nên bao bọc luôn thẻ `<h1>` này.

**Lỗi 5: Dòng 9** — Thẻ đóng hyperlink sai cú pháp (thiếu dấu `/`). — *Cách sửa:* Sửa `<a>` ở cuối dòng thành `</a>`.

**Lỗi 6: Dòng 16** — Lỗi semantic về phân cấp Heading (nhảy cóc từ `<h1>` xuống `<h3>` bỏ qua `<h2>`). — *Cách sửa:* Đổi thẻ `<h3>` thành `<h2>`.

**Lỗi 7: Dòng 17** — Thuộc tính `src` thiếu dấu ngoặc kép và thẻ `<img>` thiếu thuộc tính bắt buộc `alt`. — *Cách sửa:* Sửa thành `<img src="iphone.jpg" alt="Mô tả ảnh">`.

**Lỗi 8: Dòng 19** — Lỗi syntax về chồng chéo thẻ (thẻ `<b>` mở bên trong `<p>` nhưng lại đóng bên ngoài). — *Cách sửa:* Đảo lại thứ tự thẻ đóng và thay `<b>` bằng `<strong>` cho chuẩn semantic: `<p>Giá: <strong>25.990.000đ</strong></p>`.

**Lỗi 9: Dòng 26, 27** — Lỗi semantic ở tiêu đề bảng (dùng thẻ dữ liệu `<td>` thay vì thẻ tiêu đề `<th>`). — *Cách sửa:* Đổi `<td` thành `<th`. (Và nên bọc thêm `<thead>`, `<tbody>`).

**Lỗi 10: Dòng 37** — Lỗi semantic nghiêm trọng: Một trang web chỉ được phép có duy nhất 1 thẻ `<main>` hoạt động. Đồng thời nội dung là "Sidebar" thì nên dùng thẻ khác. — *Cách sửa:* Đổi thẻ `<main>` thứ hai thành thẻ `<aside>`.

**Lỗi 11: Dòng 42** — Thẻ đoạn văn `<p>` bị thiếu thẻ đóng. — *Cách sửa:* Thêm thẻ đóng thành `<p>Copyright 2026</p>`.

---

## Bài B4 — Phân tích trang web thật

**Trang web chọn:** `thegioididong.com`

### 1. Phân tích thẻ Semantic HTML5
*(Ảnh minh họa tab Elements trên trang chủ Thế Giới Di Động)*
![Thẻ Semantic HTML5](screenshots/b4_semantic.png)

**3 thẻ semantic mà trang sử dụng (Rất tốt):**
1. **`<header>`**: Bao bọc toàn bộ khu vực đầu trang chứa Logo, Thanh tìm kiếm và Menu địa chỉ.
2. **`<footer>`**: Nằm ở dưới đáy trang web, chứa các thông tin liên kết như "Tích điểm Quà tặng VIP", "Lịch sử mua hàng", "Chính sách bảo hành".
3. **`<section>`**: Sử dụng để chia bố cục các khu vực lớn ở trang chủ như khu vực khuyến mãi "Tuần lễ Apple" hay "Điện thoại nổi bật".

**2 thẻ mà trang sử dụng CHƯA chuẩn Semantic (Lỗi Div Soup):**
1. **Thẻ sản phẩm dùng `<div>`**: Mỗi chiếc điện thoại trong danh sách là một thành phần độc lập (có tên, giá, ảnh), đáng lẽ nên được bọc bằng thẻ `<article>`, nhưng trang lại bọc bằng các thẻ `<li>` hoặc `<div>` (như `<div class="item">`).
2. **Menu phụ không dùng `<nav>`**: Một số cụm menu hoặc danh mục bên dưới dùng cấu trúc `<div class="menu">` thay vì sử dụng thẻ chuyên dụng `<nav>`.

### 2. Phân tích thẻ `<table>` (Sự vắng mặt của thẻ Table)
*(Ảnh chụp tab Elements trên trang chủ Thế Giới Di Động)*
![thẻ table HTML](screenshots/b4_table.png)
- **Table đó hiển thị nội dung gì?** Em đã kiểm tra phần "Cấu hình điện thoại" (hoặc Thông số kỹ thuật) - nơi đúng ra phải sử dụng cấu trúc bảng.
- **Có dùng `<thead>`, `<tbody>` không?** - **KHÔNG.** Thực tế là trang web này **không hề sử dụng thẻ `<table>`** nào cho phần dữ liệu dạng bảng (Tabular data) của họ. 
  - Thay vào đó, họ lạm dụng các thẻ `<ul>, <li>` hoặc các thẻ `<div>` (ví dụ: `<div class="parameter">` hoặc `<ul class="parameter">`) kết hợp với CSS để dàn trang trông giống như một cái bảng.
  - **Đánh giá Semantic:** Đây chính là lỗi **"Div Soup" (Anti-pattern)** điển hình được nhắc đến trong lý thuyết. Việc không dùng thẻ `<table>` cho dữ liệu bảng khiến cấu trúc mất đi ý nghĩa (Semantic)


### 3. Phân tích thẻ `<form>`
*(Ảnh chụp tab Elements trên trang chủ Thế Giới Di Động)*
![thẻ form HTML](screenshots/b4_form.png)

- **Form đó là gì?** Đây là Form tìm kiếm sản phẩm nằm ở Header.
- **Action và Method:**
  - **`action`**: Thuộc tính này thường được đặt là URL trang kết quả tìm kiếm (Ví dụ: `action="/tim-kiem"`). Khi submit form, nó sẽ đưa người dùng đến trang này.
  - **`method`**: Sử dụng method `GET`. (Vì thao tác tìm kiếm chỉ là lấy dữ liệu từ Server về để xem, từ khóa sẽ được đẩy lên thẳng thanh URL, ví dụ: `?key=iphone`).
- **Input types được dùng:**
  - **`<input type="text">`**: Đây là ô nhập liệu chính để người dùng gõ từ khóa tìm kiếm (Placeholder: "Bạn tìm gì...").

  ---