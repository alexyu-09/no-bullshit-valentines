const templatesEn = [
    'assets/en1.png', 'assets/en2.png', 'assets/en3.png', 'assets/en4.png', 'assets/en5.png',
    'assets/en6.png', 'assets/en7.png', 'assets/en8.png', 'assets/en9.png', 'assets/en10.png'
];

const templatesRu = [
    'assets/ru1.png', 'assets/ru2.png', 'assets/ru3.png', 'assets/ru4.png', 'assets/ru5.png',
    'assets/ru6.png', 'assets/ru7.png', 'assets/ru8.png', 'assets/ru9.png', 'assets/ru10.png',
    'assets/ru11.png', 'assets/ru12.png', 'assets/ru13.png', 'assets/ru14.png', 'assets/ru15.png',
    'assets/ru16.png'
];

const translations = {
    en: {
        title: "No Bullshit Valentines",
        labelTo: "To:",
        labelFrom: "From:",
        labelLanguage: "Language:",
        placeholderTo: "Name (e.g. Alice)",
        placeholderFrom: "Name (e.g. Bob)",
        generateBtn: "GENERATE",
        regenerateBtn: "REGENERATE",
        btnDownload: "Download PNG",
        btnCopy: "Copy to Clipboard",
        shareTelegram: "Share to Telegram",
        shareTwitter: "Share to X",
        footerText: "No Bullshit Valentines 2026. Simple honest valentines."
    },
    ru: {
        title: "Валентинки Без Буллшита",
        labelTo: "Кому:",
        labelFrom: "От кого:",
        labelLanguage: "Язьк:",
        placeholderTo: "Имя (например, Алиса)",
        placeholderFrom: "Имя (например, Боб)",
        generateBtn: "СОЗДАТЬ",
        regenerateBtn: "ПЕРЕСОЗДАТЬ",
        btnDownload: "Скачать PNG",
        btnCopy: "Скопировать",
        shareTelegram: "Отправить в Telegram",
        shareTwitter: "Отправить в X",
        footerText: "No Bullshit Valentines 2026. Простые честные валентинки."
    }
};

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    detectLanguage();
    preloadImages();

    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            updateUI();
        });
    }

    updateUI();

    document.getElementById('toInput').addEventListener('input', checkInputs);
    document.getElementById('fromInput').addEventListener('input', checkInputs);
    document.getElementById('generateBtn').addEventListener('click', generateValentine);

    checkInputs();
});

function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('ru')) {
        currentLang = 'ru';
    } else {
        currentLang = 'en';
    }
}

function checkInputs() {
    const toText = document.getElementById('toInput').value.trim();
    const fromText = document.getElementById('fromInput').value.trim();
    const btn = document.getElementById('generateBtn');

    if (toText && fromText) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function updateUI() {
    const t = translations[currentLang];
    document.querySelector('h1').textContent = t.title;
    document.getElementById('labelTo').textContent = t.labelTo;
    document.getElementById('labelFrom').textContent = t.labelFrom;

    const labelLang = document.getElementById('labelLanguage');
    if (labelLang) labelLang.textContent = t.labelLanguage;

    document.getElementById('labelCustomize').textContent = t.labelCustomize || (currentLang === 'ru' ? "Имена" : "Customize");
    document.getElementById('toInput').placeholder = t.placeholderTo;
    document.getElementById('fromInput').placeholder = t.placeholderFrom;
    document.getElementById('generateBtn').textContent = t.generateBtn;
    document.getElementById('btnDownload').textContent = t.btnDownload;
    document.getElementById('btnCopy').textContent = t.btnCopy;
    document.getElementById('shareTelegram').textContent = t.shareTelegram;
    document.getElementById('shareTwitter').textContent = t.shareTwitter;
    document.querySelector('footer p').textContent = t.footerText;
}

function preloadImages() {
    const allTemplates = [...templatesEn, ...templatesRu];
    allTemplates.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function generateValentine() {
    const canvas = document.getElementById('valentineCanvas');
    const ctx = canvas.getContext('2d');
    const toText = document.getElementById('toInput').value;
    const fromText = document.getElementById('fromInput').value;

    const finalTo = toText ? toText : (currentLang === 'ru' ? '...' : '...');
    const finalFrom = fromText ? fromText : (currentLang === 'ru' ? '...' : '...');

    const img = new Image();

    // Select template based on language
    let selectedSrc;
    if (currentLang === 'ru') {
        selectedSrc = templatesRu[Math.floor(Math.random() * templatesRu.length)];
    } else {
        selectedSrc = templatesEn[Math.floor(Math.random() * templatesEn.length)];
    }

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const referenceWidth = 800;
        const scale = canvas.width / referenceWidth;

        const fontSize = Math.round(32 * scale);
        ctx.font = `bold ${fontSize}px 'Comic Sans MS', 'Comic Sans', cursive`;
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const toX = 150 * scale;
        const toY = 328 * scale;
        const fromX = 200 * scale;
        const fromY = 400 * scale;

        // Draw To and From text
        ctx.fillText(finalTo, toX, toY);
        ctx.fillText(finalFrom, fromX, fromY);

        // Note: Phrase generation logic removed as requested.

        const dataUrl = canvas.toDataURL('image/png');
        const resultImg = document.getElementById('generatedImage');
        resultImg.src = dataUrl;

        document.getElementById('resultSection').classList.remove('hidden');

        const t = translations[currentLang];
        const genBtn = document.getElementById('generateBtn');
        genBtn.textContent = t.regenerateBtn;

        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    };

    img.onerror = (e) => {
        console.error("Error loading image:", e);
        // Fallback or alert? Just log for now, maybe the specific file is missing in docker.
        // Assuming docker build copies all existing assets correctly.
    };

    img.src = selectedSrc;
}

function downloadImage() {
    const canvas = document.getElementById('valentineCanvas');
    const link = document.createElement('a');
    link.download = 'no-bullshit-valentine.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function copyToClipboard() {
    const canvas = document.getElementById('valentineCanvas');
    canvas.toBlob(blob => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
            const btn = document.getElementById('btnCopy');
            const originalText = btn.textContent;
            btn.textContent = currentLang === 'ru' ? "Скопировано!" : "Copied!";
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Copy failed', err);
            alert('Failed to copy to clipboard');
        });
    });
}

function shareCanvas(platform) {
    const canvas = document.getElementById('valentineCanvas');
    const text = "My No Bullshit Valentine! 💛";
    const url = window.location.href;

    canvas.toBlob(blob => {
        const file = new File([blob], 'valentine.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
                title: 'No Bullshit Valentine',
                text: text,
                files: [file]
            }).catch(console.error);
        } else {
            let shareUrl = "";
            if (platform === 'telegram') {
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                alert("Image sharing is not supported on this device/browser directly. The image has been generated below - you can copy or download it manually!");
            } else if (platform === 'twitter') {
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                alert("Image sharing is not supported on this device/browser directly. The image has been generated below - you can copy or download it manually!");
            }
            if (shareUrl) window.open(shareUrl, '_blank');
        }
    });
}
