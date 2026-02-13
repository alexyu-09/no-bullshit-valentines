const templates = [
    'assets/template1.png'
];

const phrases = [
    "You warmed up my cold wallet",
    "With you I'm on the moon, even when TON is at $1.39",
    "Let's put our love in LP and stake forever?",
    "My TVL grows when I think of you",
    "For you I'm ready to go through KYC",
    "Let's build a bridge between our hearts?",
    "I have the seed phrase to your heart",
    "Let's change one letter in the word DEX?",
    "I want to taste your honeypot",
    "Want me to check your liquidity personally?"
];

// ... translations ...

function generateValentine() {
    const canvas = document.getElementById('valentineCanvas');
    const ctx = canvas.getContext('2d');
    const toText = document.getElementById('toInput').value;
    const fromText = document.getElementById('fromInput').value;

    // Default text if empty
    const finalTo = toText ? toText : (currentLang === 'ru' ? '...' : '...');
    const finalFrom = fromText ? fromText : (currentLang === 'ru' ? '...' : '...');

    const img = new Image();
    const selectedSrc = templates[0]; // Always use the first one

    // Random phrase
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    img.onload = () => {
        // Set canvas to match the original image dimensions exactly
        canvas.width = img.width;
        canvas.height = img.height;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Calculate scale factor relative to our reference width of 800px
        const referenceWidth = 800;
        const scale = canvas.width / referenceWidth;

        // Define text style with Comic Sans
        const fontSize = Math.round(32 * scale);
        ctx.font = `bold ${fontSize}px 'Comic Sans MS', 'Comic Sans', cursive`;
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        // Coordinates (Reference based on 800x800)
        // Ref To: 300
        // Ref From: 415 

        const toX = 150 * scale;
        const toY = 328 * scale;
        const fromX = 200 * scale;
        const fromY = 415 * scale;

        // Draw "To: [Name]" value only
        ctx.fillText(finalTo, toX, toY);

        // Draw "From: [Name]" value only
        ctx.fillText(finalFrom, fromX, fromY);

        // Draw Random Phrase
        // Center it at the bottom? Let's try Y=650 based on 800px height
        ctx.textAlign = "center";
        // Make phrase slightly larger?
        const phraseFontSize = Math.round(40 * scale);
        ctx.font = `bold ${phraseFontSize}px 'Comic Sans MS', 'Comic Sans', cursive`;

        // Wrap text if too long? 
        // For simplicity, let's assume short phrases fit. 
        // But some are long: "With you I'm on the moon, even when TON is at $1.39"
        // Let's implement simple wrapping or just ensure max width

        const phraseX = canvas.width / 2;
        const phraseY = 650 * scale;

        // Simple shadow for readability
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        ctx.lineWidth = 3;
        ctx.strokeText(randomPhrase, phraseX, phraseY);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "white";
        ctx.fillText(randomPhrase, phraseX, phraseY);


        // Show result
        const dataUrl = canvas.toDataURL('image/png');
        const resultImg = document.getElementById('generatedImage');
        resultImg.src = dataUrl;

        document.getElementById('resultSection').classList.remove('hidden');

        // Rename button to REGENERATE
        const t = translations[currentLang];
        const genBtn = document.getElementById('generateBtn');
        genBtn.textContent = t.regenerateBtn;

        // Scroll to result
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    };

    img.onerror = (e) => {
        console.error("Error loading image:", e);
        alert("Error loading template image.");
    };

    img.src = selectedSrc;
}

const translations = {
    en: {
        title: "No Bullshit Valentines",
        labelTo: "To:",
        labelFrom: "From:",
        labelTemplate: "Template:",
        labelChooseStyle: "What you can get",
        labelCustomize: "Customize",
        placeholderTo: "Name (e.g. Alice)",
        placeholderFrom: "Name (e.g. Bob)",
        generateBtn: "GENERATE",
        regenerateBtn: "REGENERATE",
        btnDownload: "Download PNG",
        btnCopy: "Copy to Clipboard",
        shareTelegram: "Share to Telegram",
        shareTwitter: "Share to X",
        footerText: "No Bullshit Valentines 2026. Simple honest valentines.",
        templateOptions: ["Template 1 - Flowers", "Template 2 - Heart", "Template 3 - Cool", "Template 4 - Honest"]
    },
    ru: {
        title: "Валентинки Без Буллшита",
        labelTo: "Кому:",
        labelFrom: "От кого:",
        labelTemplate: "Шаблон:",
        labelChooseStyle: "Что ты можешь получить",
        labelCustomize: "Имена",
        placeholderTo: "Имя (например, Алиса)",
        placeholderFrom: "Имя (например, Боб)",
        generateBtn: "СОЗДАТЬ",
        regenerateBtn: "ПЕРЕСОЗДАТЬ",
        btnDownload: "Скачать PNG",
        btnCopy: "Скопировать",
        shareTelegram: "Отправить в Telegram",
        shareTwitter: "Отправить в X",
        footerText: "No Bullshit Valentines 2026. Простые честные валентинки.",
        templateOptions: ["Шаблон 1 - Цветы", "Шаблон 2 - Сердце", "Шаблон 3 - Крутой", "Шаблон 4 - Честный"]
    },
    zh: {
        title: "拒绝废话情人节",
        labelTo: "给:",
        labelFrom: "来自:",
        labelTemplate: "模板:",
        labelChooseStyle: "你能得到什么",
        labelCustomize: "定制",
        placeholderTo: "名字 (例如: Alice)",
        placeholderFrom: "名字 (例如: Bob)",
        generateBtn: "生成",
        regenerateBtn: "重新生成",
        btnDownload: "下载 PNG",
        btnCopy: "复制到剪贴板",
        shareTelegram: "分享到 Telegram",
        shareTwitter: "分享到 X",
        footerText: "No Bullshit Valentines 2026. 简单诚实的情人节.",
        templateOptions: ["模板 1 - 花", "模板 2 - 心", "模板 3 - 酷", "模板 4 - 诚实"]
    }
};

let currentLang = 'en';

// Initialize
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    detectLanguage();
    preloadImages();
    updateUI();

    // Input validation listeners
    document.getElementById('toInput').addEventListener('input', checkInputs);
    document.getElementById('fromInput').addEventListener('input', checkInputs);
    checkInputs(); // Initial check
});

function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('ru')) {
        currentLang = 'ru';
    } else if (userLang.startsWith('zh')) {
        currentLang = 'zh';
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
    document.getElementById('labelChooseStyle').textContent = t.labelChooseStyle;
    document.getElementById('labelCustomize').textContent = t.labelCustomize;
    // document.getElementById('labelTemplate').textContent = t.labelTemplate;
    document.getElementById('toInput').placeholder = t.placeholderTo;
    document.getElementById('fromInput').placeholder = t.placeholderFrom;
    document.getElementById('generateBtn').textContent = t.generateBtn;
    document.getElementById('btnDownload').textContent = t.btnDownload;
    document.getElementById('btnCopy').textContent = t.btnCopy;
    document.getElementById('shareTelegram').textContent = t.shareTelegram;
    document.getElementById('shareTwitter').textContent = t.shareTwitter;
    document.querySelector('footer p').textContent = t.footerText;

    // Select removed
}

function preloadImages() {
    templates.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function generateValentine() {
    const canvas = document.getElementById('valentineCanvas');
    const ctx = canvas.getContext('2d');
    const toText = document.getElementById('toInput').value;
    const fromText = document.getElementById('fromInput').value;

    // Default text if empty
    const finalTo = toText ? toText : (currentLang === 'ru' ? '...' : '...');
    const finalFrom = fromText ? fromText : (currentLang === 'ru' ? '...' : '...');

    const img = new Image();
    // Randomly select a template
    const randomIndex = Math.floor(Math.random() * templates.length);
    const selectedSrc = templates[randomIndex];

    img.onload = () => {
        // Set canvas to match the original image dimensions exactly
        canvas.width = img.width;
        canvas.height = img.height;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Calculate scale factor relative to our reference width of 800px
        // This ensures text looks the same size relative to the image, even if image is 2000px or 4000px
        const referenceWidth = 800;
        const scale = canvas.width / referenceWidth;

        // Define text style with scaled font size
        const fontSize = Math.round(32 * scale);
        ctx.font = `bold ${fontSize}px 'Comic Sans MS', 'Comic Sans', cursive`;
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        // Coordinates (Reference based on 800x800)
        // Ref To: 280 -> Moved DOWN to 300 (User request +20px again)
        // Ref From: 380 -> Moved DOWN to 400 (User request +20px again)

        const toX = 150 * scale;
        const toY = 328 * scale;
        const fromX = 200 * scale;
        const fromY = 410 * scale;

        // Draw "To: [Name]" value only
        ctx.fillText(finalTo, toX, toY);

        // Draw "From: [Name]" value only
        ctx.fillText(finalFrom, fromX, fromY);

        // Random phrase
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

        // Draw Random Phrase with Wrapping
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const phraseFontSize = Math.round(40 * scale);
        ctx.font = `bold ${phraseFontSize}px 'Comic Sans MS', 'Comic Sans', cursive`;

        const phraseX = canvas.width / 2;
        let phraseY = 100 * scale;
        const maxWidth = canvas.width - (50 * scale);
        const lineHeight = phraseFontSize * 1.2;

        const words = randomPhrase.split(' ');
        let line = '';

        // Shadow for better visibility
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 4;
        ctx.lineWidth = 3;
        ctx.fillStyle = "white";

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
                // Draw current line
                ctx.strokeText(line, phraseX, phraseY);
                ctx.fillText(line, phraseX, phraseY);

                // Move down
                line = words[i] + ' ';
                phraseY += lineHeight;
            } else {
                line = testLine;
            }
        }
        // Draw last line
        ctx.strokeText(line, phraseX, phraseY);
        ctx.fillText(line, phraseX, phraseY);

        // Reset baseline
        ctx.textBaseline = "middle";

        // Show result
        const dataUrl = canvas.toDataURL('image/png');
        const resultImg = document.getElementById('generatedImage');
        resultImg.src = dataUrl;

        document.getElementById('resultSection').classList.remove('hidden');

        // Rename button to REGENERATE
        const t = translations[currentLang];
        const genBtn = document.getElementById('generateBtn');
        genBtn.textContent = t.regenerateBtn;

        // Scroll to result
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    };

    img.onerror = (e) => {
        console.error("Error loading image:", e);
        alert("Error loading template image. Please try using a local server (localhost) instead of opening file directly.");
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

        // Try Native Share (Mobile/Safari)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
                title: 'No Bullshit Valentine',
                text: text,
                files: [file]
            }).catch(console.error);
        } else {
            // Fallback for Desktop/Unsupported browsers
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

function updateShareLinks(dataUrl) {
    // Deprecated: logic moved to shareCanvas() called on click
}
