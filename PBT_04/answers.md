## Câu A1 — 5 Loại Positioning

**1. Bảng so sánh 5 loại Positioning:**

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí (Mốc tọa độ) | Cuộn theo trang? | Use case (Khi nào dùng) |
| :--- | :--- | :--- | :--- | :--- |
| **static** | Có (Mặc định) | Không áp dụng (Tuân theo luồng chảy tự nhiên của HTML). | Có | Dùng làm giá trị mặc định cho mọi phần tử khi không cần định vị đặc biệt. |
| **relative** | Có | Tham chiếu vào **vị trí ban đầu của chính nó** trước khi bị dịch chuyển. | Có | Dịch chuyển nhẹ phần tử mà không làm hỏng bố cục xung quanh; tạo mốc tham chiếu (hệ quy chiếu) cho phần tử con `absolute`. |
| **absolute** | Không (Bị nhấc khỏi luồng HTML) | Tham chiếu vào **phần tử cha/tổ tiên gần nhất có position khác static** (Nearest positioned ancestor). | Có | Làm Tooltip, Dropdown menu, nút "X" ở góc popup, nhãn dán "Sale" góc hình ảnh. |
| **fixed** | Không (Bị nhấc khỏi luồng HTML) | Tham chiếu vào **Viewport** (Cửa sổ hiển thị của trình duyệt). | Không (Đứng im một chỗ) | Làm thanh điều hướng (Navbar) luôn nổi trên cùng, nút "Back to top", khung chat góc dưới màn hình. |
| **sticky** | Có | Tham chiếu vào **Viewport** (trình duyệt) VÀ **Phần tử chứa nó** (Container). | CÓ, cho đến khi đạt điểm ngưỡng (threshold) thì KHÔNG (dính lại). | Làm Header của bảng, thanh mục lục (TOC) trượt dọc theo bài viết, tiêu đề danh bạ chữ cái. |

---

**2. Giải đáp câu hỏi thêm:**

*   **Khi nào `absolute` tham chiếu `body` (tài liệu HTML)?**
    Thẻ có `position: absolute` sẽ tham chiếu đến `body` (mốc viewport ban đầu) khi và chỉ khi trên cây gia phả của nó (từ cha, ông, cố...) **KHÔNG CÓ** bất kỳ phần tử nào được gán thuộc tính `position` khác `static`.

*   **Khi nào tham chiếu parent (phần tử cha)?**
    Nó sẽ tham chiếu parent khi phần tử parent đó được thiết lập một thuộc tính `position` khác với `static` (thường người ta sẽ dùng `position: relative` cho phần tử cha để làm mốc).

*   **Giải thích khái niệm "nearest positioned ancestor" (Tổ tiên được định vị gần nhất):**
    Khi bạn gắn `position: absolute` cho một phần tử, trình duyệt sẽ không ngay lập tức lấy thẻ cha trực tiếp làm mốc. Thay vào đó, nó sẽ dò tìm ngược lên trên cây DOM (từ cha -> ông -> cụ -> kị...). 
    Phần tử **đầu tiên** mà nó gặp trên đường đi có thiết lập `position` là `relative`, `absolute`, `fixed`, hoặc `sticky` sẽ được chọn làm mốc tọa độ (gốc tọa độ 0,0 cho top, right, bottom, left). Nếu dò lên đến tận cùng (thẻ `<html>`) mà không thấy ai, nó sẽ lấy cửa sổ tài liệu (body) làm mốc.
