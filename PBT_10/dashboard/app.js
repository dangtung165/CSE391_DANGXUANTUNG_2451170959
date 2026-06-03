const refreshBtn = document.getElementById('refresh-btn');
const timerBadge = document.getElementById('timer-badge');
const msValue = document.getElementById('ms-value');
const statusText = document.getElementById('status-text');

const widgets = [
    document.getElementById('widget-user').querySelector('.widget-body'),
    document.getElementById('widget-weather').querySelector('.widget-body'),
    document.getElementById('widget-dog').querySelector('.widget-body')
];

function setWidgetsLoading() {
    widgets.forEach(widget => {
        widget.innerHTML = `<div class="widget-loading">⏳ Đang tải dữ liệu...</div>`;
    });
}

function handleFetch(url) {
    return fetch(url).then(res => {
        if (!res.ok) throw new Error(`Lỗi máy chủ HTTP (${res.status})`);
        return res.json();
    });
}

async function loadDashboard() {
    const startTime = Date.now();
    
    setWidgetsLoading();
    refreshBtn.disabled = true;
    statusText.innerText = "Hệ thống đang đồng bộ dữ liệu song song...";

    const apiUrls = [
        "https://randomuser.me/api/",
        "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current=temperature_2m,relative_humidity_2m&timezone=auto",
        "https://dog.ceo/api/breeds/image/random"
    ];

    const results = await Promise.allSettled(
        apiUrls.map(url => handleFetch(url))
    );

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });

    const endTime = Date.now();
    const duration = endTime - startTime;
    
    msValue.innerText = duration;
    timerBadge.classList.remove('hidden');
    statusText.innerText = "Đồng bộ dữ liệu Dashboard hoàn tất.";
    refreshBtn.disabled = false;
}

function renderWidget(index, data) {
    const container = widgets[index];
    container.innerHTML = '';

    if (index === 0) {
        const user = data.results[0];
        container.innerHTML = `
            <img src="${user.picture.medium}" class="user-avatar" alt="Avatar">
            <p class="user-name">${user.name.first} ${user.name.last}</p>
            <p class="user-email">${user.email}</p>
        `;
    } 
    else if (index === 1) {
        const current = data.current;
        container.innerHTML = `
            <div class="weather-temp">${Math.round(current.temperature_2m)}°C</div>
            <p class="weather-meta">💧 Độ ẩm không khí: ${current.relative_humidity_2m}%</p>
            <p style="font-size: 13px; color: #95a5a6; margin-top:5px;">Vị trí: Hoàn Kiếm, HN</p>
        `;
    } 
    else if (index === 2) {
        container.innerHTML = `
            <img src="${data.message}" class="dog-img" alt="Dog Random">
        `;
    }
}

function renderWidgetError(index, errorMessage) {
    const container = widgets[index];
    container.innerHTML = `
        <div class="widget-error">
            <p>❌ Lỗi nạp dữ liệu</p>
            <small style="display:block; margin-top:8px; color:#95a5a6;">(${errorMessage})</small>
        </div>
    `;
}

refreshBtn.addEventListener('click', loadDashboard);

document.addEventListener('DOMContentLoaded', loadDashboard);