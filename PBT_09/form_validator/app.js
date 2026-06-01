const form = document.getElementById('regForm');
const nameInp = document.getElementById('name');
const emailInp = document.getElementById('email');
const passInp = document.getElementById('password');
const confirmInp = document.getElementById('confirmPassword');
const phoneInp = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

const state = { name: false, email: false, pass: false, confirm: false, phone: false };

function validateForm() {
    submitBtn.disabled = !Object.values(state).every(v => v === true);
}

// Validate Name
nameInp.addEventListener('input', () => {
    const val = nameInp.value.trim();
    const status = nameInp.nextElementSibling;
    if(val.length >= 2 && val.length <= 50) {
        status.textContent = '✅';
        state.name = true;
    } else {
        status.textContent = '❌';
        state.name = false;
    }
    validateForm();
});

// Validate Email
emailInp.addEventListener('input', () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorSpan = emailInp.nextElementSibling;
    if(regex.test(emailInp.value)) {
        errorSpan.textContent = '';
        state.email = true;
    } else {
        errorSpan.textContent = 'Email không hợp lệ (Ví dụ: abc@gmail.com)';
        state.email = false;
    }
    validateForm();
});

// Password Strength Meter
passInp.addEventListener('input', () => {
    const val = passInp.value;
    const meter = document.getElementById('strengthMeter');
    const txt = document.getElementById('strengthText');
    
    let score = 0;
    if (val.length >= 8) {
        if (/[a-zA-Z]/.test(val) && /[0-9]/.test(val)) score = 1; // Trung bình
        if (/[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) score = 2; // Mạnh
    } else if (val.length > 0) {
        score = 0; // Yếu
    }

    if(val.length === 0) {
        meter.style.width = '0'; txt.textContent = ''; state.pass = false;
    } else if(score === 0) {
        meter.style.width = '33%'; meter.style.background = 'red'; txt.textContent = 'Yếu'; state.pass = false;
    } else if(score === 1) {
        meter.style.width = '66%'; meter.style.background = 'orange'; txt.textContent = 'Trung bình'; state.pass = true;
    } else {
        meter.style.width = '100%'; meter.style.background = 'green'; txt.textContent = 'Mạnh'; state.pass = true;
    }
    validateForm();
});

// Confirm Password
confirmInp.addEventListener('input', () => {
    const errorSpan = confirmInp.nextElementSibling;
    if(confirmInp.value === passInp.value && confirmInp.value !== '') {
        errorSpan.textContent = '';
        state.confirm = true;
    } else {
        errorSpan.textContent = 'Mật khẩu xác nhận không khớp!';
        state.confirm = false;
    }
    validateForm();
});

function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length > 7) {
        return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    if (digits.length > 4) {
        return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    }
    return digits;
}

function validatePhone() {
    const raw = phoneInp.value.replace(/\D/g, '');
    phoneInp.value = formatPhone(phoneInp.value);
    const errorSpan = phoneInp.nextElementSibling;

    if (raw.length === 0) {
        errorSpan.textContent = '';
        state.phone = false;
    } else if (raw.length === 10) {
        errorSpan.textContent = '';
        state.phone = true;
    } else {
        errorSpan.textContent = 'Số điện thoại phải đủ 10 chữ số';
        state.phone = false;
    }
    validateForm();
}

phoneInp.addEventListener('input', validatePhone);
phoneInp.addEventListener('blur', () => {
    const raw = phoneInp.value.replace(/\D/g, '');
    const errorSpan = phoneInp.nextElementSibling;
    if (raw.length > 0 && raw.length !== 10) {
        errorSpan.textContent = 'Số điện thoại phải đủ 10 chữ số';
    }
});

form.onsubmit = (e) => {
    e.preventDefault();
    alert(`Đăng ký thành công!\nTên: ${nameInp.value}\nEmail: ${emailInp.value}`);
};