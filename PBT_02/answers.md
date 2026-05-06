# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 (5đ) — Input Types

1. **type="email"** → Ô nhập text (bàn phím có @) → Tự động kiểm tra định dạng email (phải có @ và domain) → Dùng cho form đăng ký/đăng nhập.
2. **type="password"** → Ô nhập text (ký tự bị che giấu bằng dấu •) → Không tự động (phụ thuộc vào pattern/minlength) → Dùng cho nhập mật khẩu tài khoản.
3. **type="number"** → Ô nhập số (có mũi tên tăng/giảm) → Chỉ cho phép nhập số, tự kiểm tra giới hạn min/max → Dùng để điều chỉnh số lượng sản phẩm trong giỏ hàng.
4. **type="tel"** → Ô nhập text (trên điện thoại hiện bàn phím số) → Không tự động (cần dùng thêm regex) → Dùng để nhập số điện thoại nhận hàng.
5. **type="radio"** → Nút tròn nhỏ → Ép buộc chỉ được chọn 1 lựa chọn duy nhất trong nhóm → Dùng để chọn phương thức thanh toán (ví dụ: COD hoặc Thẻ).
6. **type="checkbox"** → Nút hình vuông (tick chọn) → Kiểm tra bắt buộc chọn nếu có thuộc tính `required` → Dùng cho mục "Đồng ý với điều khoản dịch vụ".
7. **type="date"** → Ô văn bản có icon lịch (bật popup chọn ngày) → Ép buộc nhập đúng định dạng ngày tháng năm hợp lệ → Dùng để chọn ngày mong muốn nhận hàng.
8. **type="search"** → Ô nhập text (có dấu X để xóa nhanh chữ) → Không có validation đặc biệt → Dùng cho thanh tìm kiếm sản phẩm ở Header.
9. **type="url"** → Ô nhập text (bàn phím có sẵn / và .com) → Tự động bắt lỗi nếu link thiếu http:// hoặc https:// → Dùng cho các nhà bán hàng (Seller) nhập link shop của họ.
10. **type="file"** → Nút "Choose File" kèm tên tệp → Sẽ chặn các đuôi file không hợp lệ nếu có thuộc tính `accept` → Dùng để khách hàng tải ảnh lên khi yêu cầu đổi/trả sản phẩm.
## Câu A2 (5đ) — Validation Attributes

### 1. Dự đoán và Giải thích kết quả Validation

*   **Trường hợp 1:** `<input type="text" required value="">`
    *   **Dự đoán:** Trình duyệt sẽ chặn không cho Submit form và hiện thông báo lỗi (ví dụ: *"Please fill out this field"* hoặc *"Vui lòng điền vào trường này"*).
    *   **Tại sao:** Thuộc tính `required` bắt buộc người dùng không được để trống ô nhập liệu. Vì `value=""` (rỗng), điều kiện này bị vi phạm.

*   **Trường hợp 2:** `<input type="email" value="abc">`
    *   **Dự đoán:** Trình duyệt chặn Submit và báo lỗi định dạng (ví dụ: *"Please include an '@' in the email address"*).
    *   **Tại sao:** Thuộc tính `type="email"` tự động kích hoạt bộ kiểm tra định dạng email của trình duyệt. Chuỗi "abc" thiếu ký tự bắt buộc `@` và tên miền nên không hợp lệ.

*   **Trường hợp 3:** `<input type="number" min="1" max="10" value="15">`
    *   **Dự đoán:** Trình duyệt chặn Submit và báo lỗi vượt ngưỡng (ví dụ: *"Value must be less than or equal to 10"*).
    *   **Tại sao:** Thẻ quy định giá trị số lớn nhất được phép nhập là `max="10"`. Giá trị người dùng nhập là `15` đã vượt quá giới hạn này.

*   **Trường hợp 4:** `<input type="text" pattern="[0-9]{10}" value="abc123">`
    *   **Dự đoán:** Trình duyệt chặn Submit và yêu cầu nhập đúng định dạng (ví dụ: *"Please match the requested format"*).
    *   **Tại sao:** Thuộc tính `pattern="[0-9]{10}"` sử dụng Biểu thức chính quy (Regex) ép buộc chuỗi nhập vào phải có **đúng 10 ký tự** và **tất cả đều phải là số** từ 0 đến 9. Chuỗi "abc123" chứa chữ cái và mới chỉ có 6 ký tự nên vi phạm.

*   **Trường hợp 5:** `<input type="password" minlength="8" value="123">`
    *   **Dự đoán:** Trình duyệt chặn Submit và yêu cầu nhập thêm ký tự (ví dụ: *"Please lengthen this text to 8 characters or more"*).
    *   **Tại sao:** Thuộc tính `minlength="8"` quy định độ dài tối thiểu của chuỗi là 8 ký tự. Chuỗi "123" mới chỉ có độ dài là 3 nên không đủ điều kiện.

---

### 2. File kiểm thử `validation_test.html` và So sánh

*(Ghi chú: Em đã tạo file `validation_test.html` để chạy thử nghiệm các trường hợp trên. Kết quả thực tế khi bấm Submit hoàn toàn trùng khớp với các dự đoán lý thuyết ở phần 1. Thông báo lỗi sẽ bật ra ngay tại ô input đầu tiên bị lỗi).*

**Screenshot kết quả validation thực tế:**
![Kết quả Validation thực tế](./screenshots/A2_validation.png)
![Kết quả Validation thực tế](./screenshots/A2_validation1.png)
![Kết quả Validation thực tế](./screenshots/A2_validation2.png)
![Kết quả Validation thực tế](./screenshots/A2_validation3.png)
![Kết quả Validation thực tế](./screenshots/A2_validation4.png)
![Kết quả Validation thực tế](./screenshots/A2_validation5.png)
