const cards = document.querySelectorAll('.img-card');
const palette = document.getElementById('palette');
const paletteInp = document.getElementById('paletteInput');
const commandList = document.getElementById('commandList');
let idx = 0;
let isPlaying = false;
let slideInterval;

function setActiveImg(i) {
    cards.forEach(c => c.classList.remove('active'));
    idx = (i + cards.length) % cards.length;
    cards[idx].classList.add('active');
    cards[idx].focus();
}
setActiveImg(0);

window.addEventListener('keydown', (e) => {
    if (document.activeElement === paletteInp) {
        if(e.key === 'Escape') { palette.classList.add('hidden'); cards[idx].focus(); }
        return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        palette.classList.remove('hidden');
        paletteInp.focus();
    }

    if (e.key === 'ArrowRight') setActiveImg(idx + 1);
    
    if (e.key === 'ArrowLeft') setActiveImg(idx - 1);

    if (['1', '2', '3'].includes(e.key)) {
        setActiveImg(parseInt(e.key) - 1);
    }

    if (e.key === ' ') {
        e.preventDefault();
        if(isPlaying) {
            clearInterval(slideInterval);
            isPlaying = false;
        } else {
            slideInterval = setInterval(() => setActiveImg(idx + 1), 1500);
            isPlaying = true;
        }
    }
});

commandList.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const commandText = document.activeElement.textContent;
        if(commandText.includes('Dark Mode')) document.body.classList.toggle('dark');
        if(commandText.includes('Alert')) alert('Hello Command!');
        if(commandText.includes('Reset')) setActiveImg(0);
        palette.classList.add('hidden');
        cards[idx].focus();
    }
});