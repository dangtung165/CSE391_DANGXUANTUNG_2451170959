let currentPage = 1;
const limit = 20;
let isLoading = false;
let hasMore = true;

const galleryGrid = document.getElementById('gallery-grid');
const loadTrigger = document.getElementById('load-trigger');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            
            img.onload = () => {
                img.classList.add('loaded');
            };

            observer.unobserve(img);
        }
    });
}, {
    rootMargin: "0px 0px 200px 0px"
});

async function loadMorePhotos() {
    if (isLoading || !hasMore) return;
    
    isLoading = true;
    loadTrigger.classList.remove('hidden');

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`);
        const photos = await response.json();

        if (photos.length < limit) {
            hasMore = false;
            loadTrigger.innerHTML = "<span>🎉 Đã tải hết tất cả hình ảnh có sẵn.</span>";
        }

        if (photos.length > 0) {
            renderPhotos(photos);
            currentPage++;
        }
    } catch (error) {
        console.error("Lỗi khi tải ảnh:", error);
        loadTrigger.innerHTML = "<span style='color: #e74c3c;'>❌ Lỗi kết nối mạng dữ liệu. Vui lòng kiểm tra lại!</span>";
    } finally {
        isLoading = false;
    }
}

function renderPhotos(photos) {
    photos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        item.innerHTML = `
            <img data-src="${photo.url}" alt="${photo.title}" class="lazy-img">
        `;

        item.addEventListener('click', () => openLightbox(photo.url, photo.title));

        const img = item.querySelector('.lazy-img');
        lazyImageObserver.observe(img);

        galleryGrid.appendChild(item);
    });
}

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, {
    threshold: 0.1
});

observer.observe(document.querySelector("#load-trigger"));

function openLightbox(url, title) {
    lightboxImg.src = url;
    lightboxCaption.innerText = title;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
    }
});