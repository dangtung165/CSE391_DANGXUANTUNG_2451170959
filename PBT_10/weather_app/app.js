const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const historyList = document.getElementById('history-list');

const stateLoading = document.getElementById('state-loading');
const stateSuccess = document.getElementById('state-success');
const stateError = document.getElementById('state-error');

const weatherCity = document.getElementById('weather-city');
const weatherIcon = document.getElementById('weather-icon');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherHumidity = document.getElementById('weather-humidity');
const errorText = document.getElementById('error-text');

function switchState(state) {
    stateLoading.classList.add('hidden');
    stateSuccess.classList.add('hidden');
    stateError.classList.add('hidden');

    if (state === 'loading') stateLoading.classList.remove('hidden');
    if (state === 'success') stateSuccess.classList.remove('hidden');
    if (state === 'error') stateError.classList.remove('hidden');
}

function getWeatherDetails(code) {
    const mapping = {
        0: { emoji: '☀️', desc: 'Trời quang đãng' },
        1: { emoji: '🌤️', desc: 'Ít mây' },
        2: { emoji: '⛅', desc: 'Mây rải rác' },
        3: { emoji: '☁️', desc: 'Nhiều mây, u ám' },
        45: { emoji: '🌫️', desc: 'Có sương mù' },
        48: { emoji: '🌫️', desc: 'Sương mù đóng băng' },
        51: { emoji: '🌧️', desc: 'Mưa phùn nhẹ' },
        53: { emoji: '🌧️', desc: 'Mưa phùn vừa' },
        55: { emoji: '🌧️', desc: 'Mưa phùn dày đặc' },
        61: { emoji: '🌧️', desc: 'Mưa rào nhẹ' },
        63: { emoji: '🌧️', desc: 'Mưa vừa' },
        65: { emoji: '🌧️', desc: 'Mưa lớn' },
        71: { emoji: '❄️', desc: 'Tuyết rơi nhẹ' },
        73: { emoji: '❄️', desc: 'Tuyết rơi vừa' },
        75: { emoji: '❄️', desc: 'Tuyết rơi dày' },
        80: { emoji: '🌧️', desc: 'Mưa kèm giông nhẹ' },
        81: { emoji: '🌧️', desc: 'Mưa giông mạnh' },
        82: { emoji: '⛈️', desc: 'Mưa xối xả' },
        95: { emoji: '⛈️', desc: 'Có sấm sét, giông bão' }
    };
    return mapping[code] || { emoji: '✨', desc: 'Thời tiết ổn định' };
}

async function fetchWeather(cityName) {
    if (!cityName.trim()) return;

    switchState('loading');

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=vi&format=json`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) throw new Error("Không thể kết nối dịch vụ định vị.");
        
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Thành phố không tồn tại.");
        }

        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        const fullCityName = `${location.name}, ${location.country}`;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) throw new Error("Không thể lấy dữ liệu thời tiết.");

        const weatherData = await weatherResponse.json();

        displayWeather(weatherData, fullCityName);
        saveToHistory(cityName);

    } catch (error) {
        console.error(error);
        if (!navigator.onLine) {
            errorText.innerText = "Mất mạng internet. Vui lòng kiểm tra kết nối.";
        } else {
            errorText.innerText = error.message || "Đã xảy ra lỗi hệ thống.";
        }
        switchState('error');
    }
}

function displayWeather(data, fullCityName) {
    const current = data.current;
    const weatherDetails = getWeatherDetails(current.weather_code);

    weatherCity.innerText = fullCityName;
    weatherTemp.innerText = `${Math.round(current.temperature_2m)}°C`;
    weatherHumidity.innerText = current.relative_humidity_2m;
    weatherDesc.innerText = weatherDetails.desc;
    weatherIcon.innerText = weatherDetails.emoji;

    switchState('success');
}

function getHistory() {
    const history = localStorage.getItem('weather_history');
    return history ? JSON.parse(history) : [];
}

function saveToHistory(city) {
    let history = getHistory();
    const formattedCity = city.trim().replace(/\b\w/g, c => c.toUpperCase());

    history = history.filter(item => item.toLowerCase() !== formattedCity.toLowerCase());
    
    history.unshift(formattedCity);

    if (history.length > 5) {
        history.pop();
    }

    localStorage.setItem('weather_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    const history = getHistory();

    history.forEach(city => {
        const btn = document.createElement('button');
        btn.classList.add('history-item');
        btn.innerText = city;
        
        btn.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });

        historyList.appendChild(btn);
    });
}

searchBtn.addEventListener('click', () => {
    fetchWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather(cityInput.value);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderHistory();
});