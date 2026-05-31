# PHẦN A — ĐỌC HIỂU (20 điểm)

## Câu A1 (10đ) — Grid System

### Bảng mô tả Layout

| Kích thước | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
| :--- | :--- | :--- | :--- |
| **Số cột** | 1 cột (`col-12`) | 2 cột (`col-md-6`) | 4 cột (`col-lg-3`) |
| **Box layout** | Xếp chồng theo chiều dọc (1 Box/dòng). Tổng 4 dòng. | Nằm cạnh nhau 2 Box/dòng. Tổng 2 dòng. | Nằm ngang cạnh nhau cả 4 Box trên 1 dòng. |

### Câu hỏi thêm:
* **`col-md-6` nghĩa là gì?** Class này chỉ định phần tử sẽ chiếm 6/12 cột (tức 50% chiều rộng của hàng) trên các thiết bị có màn hình từ cỡ trung bình trở lên (breakpoint `md`, ≥ 768px).
* **Tại sao không cần viết `col-sm-12`?** Bootstrap áp dụng nguyên tắc **Mobile-first**. Class `col-12` (không có tiền tố) sẽ mặc định áp dụng từ màn hình nhỏ nhất trở lên. Do đó, phần tử đã chiếm 100% chiều rộng ở mọi màn hình dưới 768px (bao gồm `xs` và `sm`), việc thêm `col-sm-12` là dư thừa.

---

## Câu A2 (10đ) — Utilities & Components

### 1. Giải thích class `d-none d-md-block`
* **`d-none`**: Ẩn phần tử (`display: none`) trên mọi kích thước màn hình.
* **`d-md-block`**: Hiển thị phần tử dưới dạng block (`display: block`) bắt đầu từ breakpoint `md` (≥ 768px).
* **Kết luận**: Phần tử này sẽ **bị ẩn** trên điện thoại và chỉ **hiển thị** trên tablet, desktop.

### 2. 5 spacing utilities (margin/padding)
* **`mt-3`**: Margin Top ở mức 3 (tương đương `1rem` hoặc 16px).
* **`px-4`**: Padding trên trục X (Left và Right) ở mức 4 (tương đương `1.5rem`).
* **`mb-auto`**: Margin Bottom tự động (`auto`), thường dùng trong flexbox để đẩy các phần tử khác lên trên.
* **`pt-5`**: Padding Top ở mức 5 (mức lớn nhất mặc định, tương đương `3rem`).
* **`mx-auto`**: Margin Left và Margin Right là `auto`. Dùng để căn giữa phần tử block theo chiều ngang.

### 3. Sự khác nhau giữa các loại Container
* **`.container`**: Responsive fixed-width. Chiều rộng tối đa thay đổi theo từng breakpoint (`sm`, `md`, `lg`, `xl`, `xxl`) và luôn căn giữa màn hình.
* **`.container-fluid`**: Chiếm 100% chiều rộng của viewport ở mọi kích thước màn hình.
* **`.container-md`**: Chiếm 100% chiều rộng cho đến khi đạt breakpoint `md` (768px). Từ `md` trở lên, nó hoạt động giống hệt `.container` (có chiều rộng tối đa cố định).

---

# PHẦN C — PHÂN TÍCH (20 điểm)

## Câu C1 (10đ) — Tùy biến Bootstrap

### 1. Quy trình đổi màu `$primary` từ xanh mặc định sang `#E63946`
* **Công cụ cần thiết:** Môi trường Node.js (npm), mã nguồn SCSS của Bootstrap và trình biên dịch SASS.
* **Quy trình modify:**
  1. Tạo file SASS tùy chỉnh (VD: `custom.scss`).
  2. Ghi đè biến màu **trước** khi import Bootstrap:
     ```scss
     $primary: #E63946;
     @import "node_modules/bootstrap/scss/bootstrap";
     ```
  3. Biên dịch file `custom.scss` thành `style.css` và liên kết vào HTML.

### 2. Tại sao KHÔNG nên override trực tiếp (`.btn-primary { background: red; }`)?
Việc override CSS thuần thiếu tính đồng bộ. Biến `$primary` trong Bootstrap được sử dụng bởi hệ sinh thái hàng chục class khác nhau (như `text-primary`, `bg-primary`, `border-primary`, `btn-outline-primary`, `alert-primary`...). 
Nếu override CSS, bạn phải tự viết lại toàn bộ các class này. Khi dùng SASS variables, trình biên dịch sẽ tự động tính toán, tạo màu hover/active và cập nhật đồng loạt cho tất cả các components liên quan.

---

## Câu C2 (10đ) — So sánh Bootstrap vs CSS thuần

### 1. Bảng so sánh

| Tiêu chí | Viết bằng CSS Thuần | Sử dụng Bootstrap |
| :--- | :--- | :--- |
| **Số dòng CSS cần viết** | Rất nhiều (Cần setup Flexbox/Grid, hover states, Media Queries). | Gần như bằng 0 (Chỉ cần sử dụng class có sẵn trên HTML). |
| **Thời gian phát triển** | Chậm hơn. Phải tự thiết kế cấu trúc và test responsive. | Nhanh chóng. Tận dụng các component lắp ghép sẵn. |
| **Khả năng tùy biến** | Vô hạn (100%). Kiểm soát từng pixel. | Trung bình. Cần cấu hình SCSS hoặc ghi đè nếu muốn thay đổi diện mạo mặc định. |

### 2. Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?

**NÊN DÙNG:**
* Xây dựng nhanh các MVP, prototype, landing page cơ bản.
* Làm trang quản trị (Admin Dashboard), công cụ nội bộ không yêu cầu UI/UX quá đặc thù.
* Làm việc nhóm cần một tiêu chuẩn layout thống nhất, dễ đọc.

**KHÔNG NÊN DÙNG:**
* Dự án yêu cầu thiết kế UI/UX độc bản, phá cách nghệ thuật (Creative portfolio).
* Dự án có yêu cầu khắt khe về hiệu năng tải trang, không muốn tải framework dư thừa mã nguồn.
* Khi bản thiết kế khác hoàn toàn Bootstrap, dẫn đến việc phải ghi đè CSS quá nhiều (lúc này dùng CSS thuần hoặc Tailwind sẽ tối ưu hơn).
