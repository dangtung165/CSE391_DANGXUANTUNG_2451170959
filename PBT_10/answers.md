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

### Câu A3 (5đ) — Promise States

#### 1. Sơ đồ 3 trạng thái của Promise
```text
               +-------------------+
               |      PENDING      |
               +---------+---------+
                         |
        +----------------+----------------+
        |                                 |
  resolve()                         reject()
        |                                 |
        v                                 v
+---------------+                 +---------------+
|   FULFILLED   |                 |   REJECTED    |
| (Thành công)  |                 |  (Thất bại)   |
+---------------+                 +---------------+
```

#### 2. Callback Hell & Refactor
* **Callback Hell là gì?** Là tình trạng lồng ghép quá nhiều hàm callback vào nhau để xử lý các tác vụ bất đồng bộ liên tiếp, khiến code phình to theo hình kim tự tháp ngang, cực kỳ khó đọc và bảo trì.

**Ví dụ 4 cấp callback hell:**
```javascript
getUser(1, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            writeLog(comments[0].text, (status) => {
                console.log("Done: " + status);
            });
        });
    });
});
```

**Refactor thành async/await:**
```javascript
async function handleData() {
    try {
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const status = await writeLog(comments[0].text);
        console.log("Done: " + status);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Error Handling Strategy

**Chiến lược thiết kế xử lý lỗi:**
1. **Network errors (Mất mạng):** Dùng `catch` bắt lỗi, hiện thông báo cho user "Mất kết nối", đồng thời dùng hàm Retry (thử lại) vài lần trước khi bỏ cuộc.
2. **API errors:** Phân tích `response.status`:
   * `404`: Báo "Dữ liệu không tồn tại".
   * `429 (Too Many Requests)`: Báo user chờ hoặc tự động ngưng gọi API một khoảng thời gian (Backoff) rồi thử lại.
   * `500`: Báo "Lỗi server, vui lòng quay lại sau".
3. **Timeout:** Gắn `AbortController` vào request. Nếu quá thời gian (VD: 10s) mà server chưa phản hồi thì tự động ngắt kết nối để giải phóng tài nguyên.

**Viết code:**

```javascript
// 1. fetchWithTimeout - Xử lý API chậm > 10s
async function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error(`Timeout: API không phản hồi sau ${ms}ms`);
        }
        throw error;
    }
}

// 2. fetchWithRetry - Xử lý Retry 3 lần & Rate Limit 429
async function fetchWithRetry(url, maxRetries = 3) {
    let delay = 1000; // Khởi tạo chờ 1s
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetchWithTimeout(url, 10000);
            
            // Nếu dính 429, chủ động chờ lâu hơn rồi retry
            if (response.status === 429) {
                console.warn(`Lỗi 429. Đang chờ ${delay}ms để thử lại...`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2; // Tăng gấp đôi thời gian chờ cho lần sau
                continue;
            }

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
            
        } catch (error) {
            if (i === maxRetries - 1) {
                throw new Error(`Thất bại sau ${maxRetries} lần thử: ${error.message}`);
            }
            console.log(`Lỗi mạng. Thử lại lần ${i + 1}...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
}
```

---

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

#### 1. Bảng so sánh

| Method | Khi nào resolve? | Khi nào reject? | Use case |
| :--- | :--- | :--- | :--- |
| **`.all()`** | Khi **tất cả** Promises thành công. | Khi **1** Promise bất kỳ thất bại (Reject ngay lập tức). | Tải trang giỏ hàng cần gọi cả API user và API items. Thiếu 1 trong 2 là báo lỗi cả trang. |
| **`.allSettled()`**| Khi **tất cả** Promises hoàn thành (dù pass/fail).| **Không bao giờ** reject. | Dashboard gọi 5 API độc lập. 1 API lỗi thì widget đó hiện error, 4 widget kia vẫn hiển thị bình thường. |
| **`.race()`** | Khi **1** Promise bất kỳ chạy xong đầu tiên. | Khi Promise xong đầu tiên bị lỗi. | Giới hạn thời gian (Timeout request) hoặc đua tốc độ ping 2 server CDN xem server nào trả về nhanh hơn. |
| **`.any()`** | Khi **1** Promise **thành công đầu tiên**. | Khi **tất cả** Promises đều thất bại. | Cơ chế Fallback: Gọi cổng thanh toán A, nếu lỗi tự nhảy qua gọi cổng B. Cổng nào thành công trước lấy cổng đó. |

#### 2. Ví dụ Code thực tế

```javascript
// --- 1. Promise.all() ---
// Use case: Bắt buộc lấy đủ thông tin mới render được page.
async function loadCheckoutPage(userId) {
    try {
        const [user, cart] = await Promise.all([
            fetch(`/api/user/${userId}`).then(r => r.json()),
            fetch(`/api/cart/${userId}`).then(r => r.json())
        ]);
        console.log("Render Checkout:", user, cart);
    } catch (err) {
        console.error("Lỗi: Không thể hiển thị trang thanh toán", err);
    }
}

// --- 2. Promise.allSettled() ---
// Use case: Gửi email marketing cho nhiều user, lỗi một người không ảnh hưởng người khác.
async function sendMassEmails(emails) {
    const promises = emails.map(email => 
        fetch('/api/send', { method: 'POST', body: JSON.stringify({ email }) })
    );
    
    const results = await Promise.allSettled(promises);
    
    const success = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    console.log(`Đã gửi: ${success} thành công, ${failed} thất bại.`);
}

// --- 3. Promise.race() ---
// Use case: Tranh đua tốc độ. Lấy dữ liệu từ CDN nào phản hồi nhanh nhất.
async function getFastestImage() {
    try {
        const fastestImg = await Promise.race([
            fetch('[https://cdn-asia.example.com/image.jpg](https://cdn-asia.example.com/image.jpg)').then(r => r.blob()),
            fetch('[https://cdn-us.example.com/image.jpg](https://cdn-us.example.com/image.jpg)').then(r => r.blob())
        ]);
        console.log("Đã tải xong ảnh từ server nhanh nhất!");
    } catch (err) {
        console.error("Server phản hồi đầu tiên bị lỗi mạng.");
    }
}

// --- 4. Promise.any() ---
// Use case: Cổng thanh toán dự phòng. Chỉ cần 1 cổng thành công là được.
async function processPayment(order) {
    try {
        const result = await Promise.any([
            fetch('/api/payment-momo', { method: 'POST', body: order }), // Cổng 1
            fetch('/api/payment-vnpay', { method: 'POST', body: order }) // Cổng 2
        ]);
        console.log("Thanh toán thành công qua 1 trong các cổng:", result);
    } catch (err) {
        console.error("Tất cả các cổng thanh toán đều đang bị lỗi hệ thống!", err.errors);
    }
}
```
