### Câu A1 (5đ) — Viewport & Mobile-First

**1. Thẻ `<meta viewport>` chuẩn và ý nghĩa:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

*   **`width=device-width`**: Yêu cầu trình duyệt thiết lập chiều rộng của trang web bằng đúng chiều rộng vật lý của màn hình thiết bị (điện thoại, tablet...).
*   **`initial-scale=1.0`**: Thiết lập mức độ thu phóng (zoom) ban đầu là 100% khi trang vừa tải xong, ngăn chặn việc trình duyệt tự động phóng to hoặc thu nhỏ trang.

**2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào?**
Nếu không có thẻ meta viewport, Safari trên iPhone (và các trình duyệt di động khác) sẽ giả định trang web này được thiết kế dành riêng cho Desktop. Nó sẽ render (vẽ) trang web trên một "khung tranh ảo" có chiều rộng mặc định của Desktop (thường là 980px). Sau đó, nó sẽ **thu nhỏ toàn bộ trang web** lại để nhét vừa vào màn hình bé xíu của điện thoại. Hậu quả là nội dung, chữ viết, hình ảnh sẽ hiển thị cực kỳ nhỏ, người dùng buộc phải dùng hai ngón tay để phóng to (pinch-to-zoom) thì mới có thể đọc chữ hoặc bấm vào nút được.

**3. Sự khác nhau giữa Mobile-First và Desktop-First:**
*   **Mobile-First (Ưu tiên di động):** Viết CSS mặc định cho màn hình nhỏ (điện thoại) trước. Sau đó, dùng `@media (min-width: ...)` để bổ sung hoặc thay đổi giao diện khi không gian màn hình mở rộng ra (Tablet, PC).
*   **Desktop-First (Ưu tiên máy tính):** Viết CSS mặc định cho màn hình lớn (PC) trước. Sau đó, dùng `@media (max-width: ...)` để "bóp" giao diện lại, ẩn bớt phần tử khi màn hình thu hẹp.

**4. Ví dụ CSS với breakpoint 768px:**

```css
/* =========================================
   CÁCH 1: MOBILE-FIRST (Khuyên dùng)
========================================= */
/* Mặc định cho điện thoại (dưới 768px) */
.sidebar {
    width: 100%;
    display: block;
}

/* Áp dụng cho Tablet & PC (từ 768px trở lên) */
@media (min-width: 768px) {
    .sidebar {
        width: 250px;
        float: left;
    }
}


/* =========================================
   CÁCH 2: DESKTOP-FIRST
========================================= */
/* Mặc định cho PC (trên 768px) */
.sidebar {
    width: 250px;
    float: left;
}

/* Ép lại cho Điện thoại (dưới 768px) */
@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        display: block;
        float: none; /* Phải mất công gỡ bỏ thuộc tính float của PC */
    }
}
```

**5. Tại sao Mobile-First được khuyên dùng?**
*   **Hiệu suất (Performance):** Thiết bị di động thường có cấu hình và mạng yếu hơn PC. Với Mobile-first, điện thoại chỉ tải các CSS cốt lõi, nhẹ nhàng. Nếu dùng Desktop-first, điện thoại phải tải toàn bộ CSS nặng nề của PC, sau đó lại tốn tài nguyên để xử lý các lệnh `@media` ghi đè (override) để giấu bớt hoặc thu nhỏ giao diện.
*   **Tập trung vào tính cốt lõi (UX):** Không gian màn hình mobile rất nhỏ, buộc designer và developer phải ưu tiên hiển thị những tính năng và nội dung quan trọng nhất, loại bỏ sự rườm rà.
*   **Tốt cho SEO:** Google hiện nay áp dụng chính sách "Mobile-First Indexing" (Lập chỉ mục ưu tiên thiết bị di động). Nghĩa là Google bot sẽ đọc trang web của bạn dưới góc nhìn của một chiếc điện thoại để đánh giá thứ hạng SEO, chứ không phải góc nhìn Desktop nữa.

---

### Câu A2 (5đ) — Breakpoints

Dưới đây là các breakpoints chuẩn theo hệ thống Grid của Bootstrap 5, bao gồm kích thước, thiết bị đại diện và ví dụ ứng dụng cho lưới thẻ sản phẩm (Product Grid):

**1. X-Small (xs)**
*   **Kích thước:** Dưới 576px (`< 576px`)
*   **Thiết bị đại diện:** Điện thoại di động (Mobile - cầm dọc).
*   **Ví dụ lưới sản phẩm:** Hiển thị **1 cột** (Mỗi sản phẩm chiếm 100% chiều rộng màn hình để dễ bấm và dễ đọc chữ).

**2. Small (sm)**
*   **Kích thước:** Từ 576px trở lên (`≥ 576px`)
*   **Thiết bị đại diện:** Điện thoại di động (cầm ngang) hoặc máy tính bảng cỡ nhỏ.
*   **Ví dụ lưới sản phẩm:** Hiển thị **2 cột**.

**3. Medium (md)**
*   **Kích thước:** Từ 768px trở lên (`≥ 768px`)
*   **Thiết bị đại diện:** Máy tính bảng (Tablet - như iPad cầm dọc).
*   **Ví dụ lưới sản phẩm:** Hiển thị **3 cột**.

**4. Large (lg)**
*   **Kích thước:** Từ 992px trở lên (`≥ 992px`)
*   **Thiết bị đại diện:** Laptop hoặc máy tính bảng màn hình lớn (cầm ngang).
*   **Ví dụ lưới sản phẩm:** Hiển thị **4 cột**.

**5. Extra Large (xl)**
*   **Kích thước:** Từ 1200px trở lên (`≥ 1200px`)
*   **Thiết bị đại diện:** Máy tính để bàn (Desktop / Monitor thông thường).
*   **Ví dụ lưới sản phẩm:** Hiển thị **5 cột**.

**6. Extra Extra Large (xxl)** *(Bổ sung của Bootstrap 5)*
*   **Kích thước:** Từ 1400px trở lên (`≥ 1400px`)
*   **Thiết bị đại diện:** Màn hình PC cỡ lớn (Large Desktop / TV).
*   **Ví dụ lưới sản phẩm:** Hiển thị **6 cột** (hoặc căn giữa container và giữ nguyên 5 cột để layout không bị quá loãng).

---

### Câu A3 (5đ) — Media Queries

Đoạn CSS trên được viết theo tư duy **Mobile-First**, sử dụng `min-width` (chiều rộng tối thiểu). Khi màn hình lớn dần lên, các quy tắc `@media` ở dưới sẽ lần lượt ghi đè lên các quy tắc ở trên. 

Dưới đây là bảng kết quả kích thước `.container` tương ứng:

| Chiều rộng màn hình | `.container` width | Giải thích |
| :--- | :--- | :--- |
| **375px** (iPhone SE) | **100%** | Nhỏ hơn 576px, áp dụng rule CSS gốc ban đầu (`.container { width: 100%; }`). |
| **600px** | **540px** | Vượt qua mốc 576px nhưng chưa tới mốc 768px, áp dụng rule `@media (min-width: 576px)`. |
| **800px** | **720px** | Vượt qua mốc 768px nhưng chưa tới mốc 992px, áp dụng rule `@media (min-width: 768px)`. |
| **1000px** | **960px** | Vượt qua mốc 992px nhưng chưa tới mốc 1200px, áp dụng rule `@media (min-width: 992px)`. |
| **1400px** | **1140px** | Vượt qua mốc cao nhất 1200px, áp dụng rule cuối cùng `@media (min-width: 1200px)`. |

---

### Câu A4 (5đ) — SCSS Basics

**1. Giải thích 4 tính năng chính của SCSS (kèm ví dụ):**

*   **Variables (Biến số):** Cho phép lưu trữ các giá trị thường dùng (màu sắc, font chữ, kích thước...) vào một biến bắt đầu bằng dấu `$`. Việc này giúp đồng bộ thiết kế và dễ dàng thay đổi hàng loạt chỉ với 1 lần sửa.
    *   *Ví dụ:*
        ```scss
        $primary-color: #0d6efd;
        $spacing-large: 20px;

        .btn {
            background-color: $primary-color;
            margin-bottom: $spacing-large;
        }
        ```

*   **Nesting (Viết lồng nhau):** Cho phép viết các CSS selectors lồng vào nhau theo đúng cấu trúc phân cấp của HTML. Giúp code gọn gàng, dễ đọc và tránh phải lặp lại tên class cha nhiều lần.
    *   *Ví dụ:*
        ```scss
        nav {
            background: #333;
            ul {
                list-style: none;
            }
            a {
                color: white;
                &:hover { /* Dấu & đại diện cho phần tử cha (a) */
                    color: red;
                }
            }
        }
        ```

*   **Mixins (`@mixin`, `@include`):** Là các khối code chứa một nhóm thuộc tính CSS có thể tái sử dụng ở nhiều nơi. Mixin đặc biệt mạnh mẽ vì nó có thể nhận tham số (arguments) truyền vào giống như hàm trong lập trình.
    *   *Ví dụ:*
        ```scss
        @mixin flex-center($direction: row) {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: $direction;
        }

        .box {
            @include flex-center(column); /* Gọi mixin và truyền tham số */
            width: 200px;
        }
*   **`@extend` / Inheritance (Kế thừa):** Cho phép một class "mượn" (kế thừa) toàn bộ thuộc tính CSS của một class khác. Trình duyệt khi biên dịch sẽ tự động gộp các selector lại với nhau, giúp file CSS xuất ra nhẹ hơn so với việc dùng Mixin.
    *   *Ví dụ:*
        ```scss
        .btn-base {
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
        }

        .btn-danger {
            @extend .btn-base; /* Kế thừa toàn bộ từ .btn-base */
            background-color: red;
        }
        ```
**2. Tại sao trình duyệt KHÔNG đọc được file `.scss`?**
Trình duyệt web (Chrome, Safari, Edge...) chỉ được lập trình để hiểu 3 ngôn ngữ cốt lõi là HTML, CSS chuẩn và JavaScript. SCSS là một "ngôn ngữ tiền xử lý" (CSS Preprocessor), nó có các cú pháp lập trình nâng cao (biến, vòng lặp, hàm...) mà trình duyệt hoàn toàn không biết cách thông dịch. 

**3. Cần bước gì để chuyển SCSS → CSS?**
Để trình duyệt hiểu được, ta bắt buộc phải có một bước gọi là **Biên dịch (Compile / Transpile)**. 
Bạn phải sử dụng một công cụ biên dịch (ví dụ: cài đặt phần mềm Node Sass, Dart Sass, hoặc dùng Extension như *Live Sass Compiler* trên VS Code). Công cụ này sẽ đọc file `.scss`, xử lý các biến/logic lồng nhau, và tự động dịch (xuất ra) một file `.css` chuẩn mực để gắn vào thẻ `<link>` trong HTML.
