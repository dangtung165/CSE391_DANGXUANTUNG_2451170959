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
