## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1 (5đ) — Input Types

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
