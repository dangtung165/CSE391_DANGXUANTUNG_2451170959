let localUsers = [];

const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Không thể tải danh sách người dùng.");
        return await response.json();
    },
    
    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error("Không thể tải thông tin chi tiết cá nhân.");
        return await response.json();
    },
    
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Lỗi khi thêm người dùng mới.");
        return await response.json();
    },
    
    async updateUser(id, data) {
        // Lưu ý: JSONPlaceholder sẽ báo lỗi 404 nếu PUT một ID ảo lớn hơn 10 (mới tạo)
        // Dưới đây là giải pháp xử lý thực tế phòng tránh crash ứng dụng khi kiểm thử:
        if (id > 10) return { id, ...data }; 

        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Lỗi khi cập nhật dữ liệu.");
        return await response.json();
    },
    
    async deleteUser(id) {
        if (id > 10) return true; // Giả lập thành công với ID ảo

        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("Lỗi khi xóa người dùng.");
        return true;
    }
};

const ui = {
    userGrid: document.getElementById('user-grid'),
    toastContainer: document.getElementById('toast-container'),

    renderUsers(users) {
        this.userGrid.innerHTML = '';
        if (users.length === 0) {
            this.userGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #718093;">Không tìm thấy người dùng phù hợp.</p>`;
            return;
        }

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.setAttribute('data-id', user.id);
            card.innerHTML = `
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p>✉️ ${user.email}</p>
                </div>
                <div class="user-card-actions">
                    <button class="btn btn-edit" onclick="handleEditClick(${user.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="handleDeleteClick(${user.id})">Xóa</button>
                </div>
            `;
            this.userGrid.appendChild(card);
        });
    },

    showLoading() {
        this.userGrid.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton-card';
            skeleton.innerHTML = `
                <div class="skeleton-line title"></div>
                <div class="skeleton-line text"></div>
                <div class="skeleton-line btn"></div>
            `;
            this.userGrid.appendChild(skeleton);
        }
    },

    hideLoading() {
    },

    showError(message) {
        this.createToast(message, 'error');
    },

    showSuccess(message) {
        this.createToast(message, 'success');
    },

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

const userModal = document.getElementById('user-modal');
const userForm = document.getElementById('user-form');
const searchInput = document.getElementById('search-input');
const openAddModalBtn = document.getElementById('open-add-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

async function initApp() {
    ui.showLoading();
    try {
        localUsers = await api.getUsers();
        ui.renderUsers(localUsers);
    } catch (error) {
        ui.showError(error.message);
    }
}

openAddModalBtn.addEventListener('click', () => {
    document.getElementById('modal-title').innerText = "Thêm người dùng mới";
    userForm.reset();
    document.getElementById('user-id').value = '';
    userModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => userModal.classList.add('hidden'));

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idValue = document.getElementById('user-id').value;
    const nameValue = document.getElementById('user-name').value;
    const emailValue = document.getElementById('user-email').value;

    const payload = { name: nameValue, email: emailValue };

    try {
        if (idValue) {
            const updatedData = await api.updateUser(idValue, payload);
            
            const index = localUsers.findIndex(u => u.id == idValue);
            if (index !== -1) localUsers[index] = { ...localUsers[index], ...updatedData };
            
            ui.showSuccess("Cập nhật thông tin thành công!");
        } else {
            const newData = await api.createUser(payload);
            
            newData.id = localUsers.length > 0 ? Math.max(...localUsers.map(u => u.id)) + 1 : 1;
            
            localUsers.push(newData);
            ui.showSuccess("Thêm người dùng mới thành công!");
        }

        userModal.classList.add('hidden');
        ui.renderUsers(localUsers);
        searchInput.value = '';
    } catch (error) {
        ui.showError(error.message);
    }
});

async function handleEditClick(id) {
    document.getElementById('modal-title').innerText = "Cập nhật người dùng";
    const user = localUsers.find(u => u.id == id);
    
    if (user) {
        document.getElementById('user-id').value = user.id;
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        userModal.classList.remove('hidden');
    }
}

async function handleDeleteClick(id) {
    const user = localUsers.find(u => u.id == id);
    if (!user) return;

    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.name}" không?`);
    if (confirmDelete) {
        try {
            await api.deleteUser(id);
            localUsers = localUsers.filter(u => u.id != id);
            ui.renderUsers(localUsers);
            ui.showSuccess("Xóa người dùng thành công!");
        } catch (error) {
            ui.showError(error.message);
        }
    }
}

searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = localUsers.filter(user => 
        user.name.toLowerCase().includes(keyword) || 
        user.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filtered);
});

document.addEventListener('DOMContentLoaded', initApp);