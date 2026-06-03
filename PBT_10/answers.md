## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Sync vs Async

#### 1. Thứ tự output chính xác:
1. `1 - Start`
2. `4 - End`
3. `3 - Promise`
4. `6 - Promise 2`
5. `2 - Timeout 0ms`
6. `7 - Nested timeout`
7. `5 - Timeout 100ms`

#### 2. Giải thích Event Loop, Microtask Queue, Macrotask Queue:
* **Call Stack (Luồng đồng bộ - Sync):** JS chạy đơn luồng, các lệnh đồng bộ (`1 - Start`, `4 - End`) được đưa vào Call Stack và chạy ngay. Các hàm bất đồng bộ được đẩy ra Web APIs xử lý.
* **Microtask Queue (Hàng đợi ưu tiên cao):** Chứa callback của Promise (`then`, `catch`), `async/await`. Ngay khi Call Stack trống, Event Loop sẽ ưu tiên quét sạch **toàn bộ** Microtask Queue. 
  * Do đó, `3 - Promise` và `6 - Promise 2` chạy tiếp theo. 
  * Trong lúc `6 - Promise 2` chạy, nó sinh ra thêm `7 - Nested timeout` (đẩy vào Macrotask).
* **Macrotask Queue (Hàng đợi tác vụ lớn):** Chứa callback của `setTimeout`, `setInterval`. Event Loop chỉ lấy **từng tác vụ một** từ đây lên chạy khi Microtask Queue đã hoàn toàn trống.
  * `2 - Timeout 0ms` chạy trước vì nó đã nằm sẵn trong hàng đợi từ đầu.
  * Kế đến là `7 - Nested timeout` (delay 0ms) được bốc lên chạy.
  * Cuối cùng là `5 - Timeout 100ms` do phải đợi đủ tối thiểu 100ms mới được vào hàng đợi.

---
