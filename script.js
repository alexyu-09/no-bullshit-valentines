const templates = [
    'assets/template1.png',
    'assets/template2.png',
    'assets/template3.png',
    'assets/template4.png'
];

const translations = {
    en: {
        title: "No Bullshit Valentines",
        subtitle: "Simple. Honest. Direct.",
        labelTo: "To:",
        labelFrom: "From:",
        labelTemplate: "Template:",
        placeholderTo: "Name (e.g. Alice)",
        placeholderFrom: "Name (e.g. Bob)",
        generateBtn: "GENERATE",
        btnDownload: "Download PNG",
        btnCopy: "Copy to Clipboard",
        shareTelegram: "Share to Telegram",
        shareTwitter: "Share to X",
        footerText: "No Bullshit Valentines 2026. Simple honest valentines.",
        templateOptions: ["Template 1 - Flowers", "Template 2 - Heart", "Template 3 - Cool", "Template 4 - Honest"]
    },
    ru: {
        title: "Валентинки Без Буллшита",
        subtitle: "Просто. Честно. Прямо.",
        labelTo: "Кому:",
        labelFrom: "От кого:",
        labelTemplate: "Шаблон:",
        placeholderTo: "Имя (например, Алиса)",
        placeholderFrom: "Имя (например, Боб)",
        generateBtn: "СОЗДАТЬ",
        btnDownload: "Скачать PNG",
        btnCopy: "Скопировать",
        shareTelegram: "Отправить в Telegram",
        shareTwitter: "Отправить в X",
        footerText: "No Bullshit Valentines 2026. Простые честные валентинки.",
        templateOptions: ["Шаблон 1 - Цветы", "Шаблон 2 - Сердце", "Шаблон 3 - Крутой", "Шаблон 4 - Честный"]
    }
};

let currentLang = 'en';
let selectedTemplateIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    detectLanguage();
    preloadImages();
    updateUI();
});

function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('ru')) {
        currentLang = 'ru';
    } else {
        currentLang = 'en';
    }
}

function updateUI() {
    const t = translations[currentLang];
    document.querySelector('h1').textContent = t.title;
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('labelTo').textContent = t.labelTo;
    document.getElementById('labelFrom').textContent = t.labelFrom;
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

function selectTemplate(index) {
    selectedTemplateIndex = index;
    // document.getElementById('templateSelect').value = index;
    updatePreviewSelection();
}

function updatePreviewSelection() {
    // const index = parseInt(document.getElementById('templateSelect').value);
    // selectedTemplateIndex = index;

    document.querySelectorAll('.preview-thumb').forEach((thumb, i) => {
        if (i === selectedTemplateIndex) {
            thumb.classList.add('selected');
        } else {
            thumb.classList.remove('selected');
        }
    });

    // If result is already shown, regenerate to show new template preview? 
    // Or just clear it? Let's just keep it simple and wait for Generate click.
    // Ideally we could auto-update if already generated, but the prompt says "Generate button uses Canvas..."
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
    // img.crossOrigin = "Anonymous"; // Removed to fix local file loading. Not needed for same-origin.

    img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(img, 0, 0, 800, 600);

        // Define text style
        ctx.font = "bold 32px 'Manrope', sans-serif";
        ctx.fillStyle = "white"; // Or maybe match the text color on image? White usually looks good on orange/red.
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        // ctx.lineWidth = 4;
        // ctx.strokeStyle = "black"; 
        // Removing stroke for cleaner look if aiming for "DeDust" style, or keep it if needed for contrast. 
        // The original requirement had black stroke. Let's keep it but maybe thinner or remove if it clashes.
        // Let's try without stroke first as it might look cleaner on the new templates.

        // Coordinates need adjustment based on visual inspection of new templates.
        // "TO:" is roughly at y=380? 
        // "FROM:" is roughly at y=480?
        // Left alignment 'x' should be after the "TO: " text.
        // Let's guess x=200 for now. The "TO:" label is short.

        const toX = 160;
        const toY = 395; // Adjusted down to align with TO:
        const fromX = 210;
        const fromY = 495; // Adjusted down to align with FROM:

        // Draw "To: [Name]" value only (Label is on image)
        // ctx.strokeText(finalTo, toX, toY);
        ctx.fillText(finalTo, toX, toY);

        // Draw "From: [Name]" value only (Label is on image)
        // ctx.strokeText(finalFrom, fromX, fromY);
        ctx.fillText(finalFrom, fromX, fromY);

        // Show result
        const dataUrl = canvas.toDataURL('image/png');
        const resultImg = document.getElementById('generatedImage');
        resultImg.src = dataUrl;

        document.getElementById('resultSection').classList.remove('hidden');

        // Update share links
        updateShareLinks(dataUrl);

        // Scroll to result
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    };

    img.onerror = (e) => {
        console.error("Error loading image:", e);
        alert("Error loading template image. Please try using a local server (localhost) instead of opening file directly.");
    };

    img.src = templates[selectedTemplateIndex];
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
