## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const

#### 1. Dự đoán kết quả Output (Không chạy code)
* **Đoạn 1:** `undefined`
* **Đoạn 2:** `ReferenceError: Cannot access 'y' before initialization`
* **Đoạn 3:** `TypeError: Assignment to constant variable.`
* **Đoạn 4:** `[1, 2, 3, 4]`
* **Đoạn 5:**
    * `Trong block: 2`
    * `Ngoài block: 1`

#### 2. Giải thích cơ chế hoạt động
* **Đoạn 1 (Hoisting với `var`):** Biến khai báo bằng `var` được đưa lên đầu phạm vi hàm hoặc phạm vi toàn cục (hoisting) và tự động khởi tạo giá trị mặc định là `undefined`. Khi dòng lệnh `console.log(x)` chạy trước dòng gán `x = 5`, hệ thống không báo lỗi mà trả về `undefined`.
* **Đoạn 2 (Temporal Dead Zone với `let`):** Biến `let` cũng được hoisting nhưng **không** được khởi tạo giá trị ban đầu. Khoảng không gian từ đầu khối mã lệnh cho đến dòng khai báo thực tế được gọi là *Vùng chết tạm thời (TDZ - Temporal Dead Zone)*. Việc cố tình truy cập biến trong vùng này sẽ kích hoạt lỗi `ReferenceError`.
* **Đoạn 3 (Tính bất biến của `const`):** Biến khai báo bằng `const` đóng vai trò là một hằng số. Bạn không thể dùng toán tử `=` để gán lại một giá trị hoàn toàn mới cho biến sau khi đã khởi tạo.
* **Đoạn 4 (Tính tham chiếu của Array/Object):** Hằng số `const` chỉ bảo vệ liên kết/địa chỉ ô nhớ (reference) của mảng chứ không khóa các giá trị bên trong mảng đó. Do đó, các hành động làm thay đổi cấu trúc nội bộ như `.push()` vẫn hoạt động bình thường.
* **Đoạn 5 (Phạm vi khối - Block Scope):** Biến `let` có phạm vi bó hẹp bên trong cặp ngoặc nhọn `{}`. Biến `let a = 2` bên trong khối là một thực thể độc lập (shadowing), hoàn toàn không ảnh hưởng hay ghi đè lên biến `let a = 1` ở môi trường bên ngoài.

---
