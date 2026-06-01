## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree & querySelector

#### 1. Sơ đồ cây DOM (DOM Tree)

```text
div#app
├── header
│   ├── h1
│   │   └── "Todo App" (TextNode)
│   └── nav
│       ├── a.active
│       │   └── "All" (TextNode)
│       ├── a
│       │   └── "Active" (TextNode)
│       └── a
│           └── "Completed" (TextNode)
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add" (TextNode)
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML" (TextNode)
        └── li.todo-item.completed
            └── "Learn CSS" (TextNode)
```

#### 2. Các querySelector tương ứng

* **Chọn thẻ `<h1>`:**
  ```javascript
  document.querySelector('h1')
  ```
* **Chọn input trong form:**
  ```javascript
  document.querySelector('#todoForm input')
  ```
* **Chọn tất cả `.todo-item`:**
  ```javascript
  document.querySelectorAll('.todo-item')
  ```
* **Chọn link đang active:**
  ```javascript
  document.querySelector('nav a.active')
  ```
* **Chọn `<li>` đầu tiên trong `#todoList`:**
  ```javascript
  document.querySelector('#todoList li:first-child')
  ```
* **Chọn tất cả `<a>` bên trong `<nav> `:**
  ```javascript
  document.querySelectorAll('nav a')
  ```

---
