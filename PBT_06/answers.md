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
