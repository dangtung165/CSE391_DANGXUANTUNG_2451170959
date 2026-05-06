# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (5đ) — 3 Cách nhúng CSS

**1. Inline CSS (Nhúng trực tiếp vào thẻ HTML)**
*   **Ví dụ code:**
    ```html
    <p style="color: red; font-size: 16px;">Đoạn văn này màu đỏ</p>
    ```
*   **Ưu điểm:** Nhanh chóng, áp dụng trực tiếp và có độ ưu tiên cao nhất, ghi đè được các thiết lập CSS khác.
*   **Nhược điểm:** Khó bảo trì, không thể tái sử dụng cho các thẻ khác, làm mã HTML trở nên rối rắm và khó đọc.
*   **Khi nào nên dùng:** Khi cần test/debug nhanh trên trình duyệt, tạo template cho Email (HTML Email), hoặc khi dùng JavaScript để thay đổi style động.

**2. Internal CSS (Nhúng bên trong thẻ `<style>` của `<head>`)**
*   **Ví dụ code:**
    ```html
    <head>
        <style>
            p { color: blue; font-size: 18px; }
        </style>
    </head>
    ```
*   **Ưu điểm:** Gom toàn bộ code CSS của một trang vào một chỗ, không cần tạo thêm file bên ngoài.
*   **Nhược điểm:** Không thể tái sử dụng đoạn CSS này cho các trang web (file HTML) khác. Tăng dung lượng của file HTML.
*   **Khi nào nên dùng:** Dùng cho các trang web chỉ có 1 trang duy nhất (Single Page), hoặc khi trang đó có một giao diện đặc thù hoàn toàn khác biệt so với phần còn lại của website.

**3. External CSS (Nhúng từ file `.css` bên ngoài)**
*   **Ví dụ code:**
    ```html
    <!-- Trong file index.html -->
    <head>
        <link rel="stylesheet" href="style.css">
    </head>
    ```
    ```css
    /* Trong file style.css */
    p { color: green; font-size: 20px; }
    ```
*   **Ưu điểm:** Tách biệt hoàn toàn code giao diện (CSS) và cấu trúc (HTML). Dễ bảo trì, tái sử dụng được cho hàng trăm trang HTML khác nhau. Giúp trang tải nhanh hơn vì trình duyệt sẽ lưu cache file CSS này.
*   **Nhược điểm:** Tốn thêm 1 request (yêu cầu) tải file từ trình duyệt lên server (tuy nhiên nhược điểm này rất nhỏ so với lợi ích mang lại).
*   **Khi nào nên dùng:** Đây là **Best Practice** (Tiêu chuẩn tốt nhất). Luôn luôn ưu tiên dùng cách này cho mọi dự án thực tế.

---

**Câu hỏi thêm: Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao.**

*   **Cách "thắng":** **Inline CSS** sẽ là cách chiến thắng và được áp dụng cuối cùng.
*   **Giải thích:** Trong CSS có một quy tắc gọi là **Tính đặc thù (CSS Specificity) / Độ ưu tiên**. Trình duyệt sẽ tính điểm ưu tiên để quyết định style nào được áp dụng. 
    *   Inline CSS (thuộc tính `style="..."`) có điểm đặc thù cao nhất (1000 điểm).
    *   Internal và External CSS sử dụng các selector (id, class, thẻ) có điểm thấp hơn. 
    *   *(Lưu ý: Giữa Internal và External, cái nào được khai báo sau cùng trong thẻ `<head>` thì cái đó sẽ thắng, nhưng cả hai đều sẽ bị Inline CSS ghi đè).*
