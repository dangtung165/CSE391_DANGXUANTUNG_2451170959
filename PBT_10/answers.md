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

### Câu A2 (5đ) — Fetch API

```javascript
async function getData() {
    try {
        const response = await fetch("[https://api.example.com/data](https://api.example.com/data)");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

* **`await fetch(...)` trả về gì? Tại sao cần `await`?**
  * `fetch()` trả về một **Promise** chứa đối tượng `Response` (mới chỉ có HTTP Headers, chưa có Body).
  * Cần `await` vì đây là tác vụ gọi mạng (Network I/O) tốn thời gian. `await` tạm dừng hàm `async` chờ tới khi lấy được response, giúp code dễ đọc như đồng bộ.
* **`response.ok` — Khi nào `false`? Liệt kê 3 status codes:**
  * `response.ok` là `false` khi HTTP status code nằm ngoài khoảng `200 - 299`.
  * 3 status codes ví dụ: `404` (Not Found), `500` (Internal Server Error), `401` (Unauthorized).
* **`response.json()` — Tại sao cần `await` lần nữa?**
  * Vì dữ liệu Body đang truyền về dưới dạng Data Stream. Phương thức `.json()` cần thời gian để đọc hết stream đó và parse thành Object JS. Việc này trả về 1 Promise nên cần `await`.
* **`try...catch` — Catch những lỗi gì?**
  * **Network error:** (Mất mạng, DNS lỗi) -> Có catch. `fetch` tự reject.
  * **404/500 Error:** Có catch (Nhờ ta chủ động viết `if(!response.ok) throw new Error...`). Nếu không có dòng này, `fetch` vẫn resolve 404.
  * **JSON parse error:** Có catch. Nếu server trả về HTML thay vì JSON, `.json()` sẽ lỗi và rơi vào catch.

---
