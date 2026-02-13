const templates = [
    'assets/template1.png'
];

const phrases = {
    en: [
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
    ],
    ru: [
        "Ты согрела мой холодный кошелёк",
        "Готов заклеймить тебя даже с комиссией в 5 TON",
        "С тобой я на луне, даже когда TON по $1.39",
        "При виде тебя мой пул ликвидности наполняется",
        "Хочу отММить тебя без проскальзывания",
        "Закинем нашу любовь в LP и застейкаем навечно?",
        "Мой TVL растёт при мысли о тебе",
        "Я бы отфармил тебя даже с 0% APY",
        "Ради тебя я готов пройти KYC",
        "Давай построим мост между нашими сердцами?",
        "Ты вызываешь у меня instant finality",
        "У меня есть сид-фраза от твоего сердца",
        "Давай сделаем hard fork прямо здесь?",
        "Хочу от тебя 100 детей",
        "Давай заменим одну букву в слове DEX?",
        "Не бойся, мой дружок не квадратный",
        "Хочу попробовать твой ханипот",
        "Хочу входить в тебя постепенно, DCA ордером",
        "Хочешь, я лично проверю твою ликвидность?"
    ],
    zh: [
        "你温暖了我冰冷的钱包",
        "有你在，我就像在月球，即使TON只有$1.39",
        "让我们把爱放入LP并永远质押？",
        "想到你，我的TVL就在增长",
        "为了你，我愿意通过KYC",
        "让我们在心之间架起一座桥梁？",
        "我有你心中的助记词",
        "让我们改掉DEX里的一个字母？",
        "我想尝尝你的蜜罐",
        "想让我亲自检查你的流动性吗？"
    ]
};

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
    },
    zh: {
        title: "拒绝废话情人节",
        labelTo: "给:",
        labelFrom: "来自:",
        labelLanguage: "语言:",
        placeholderTo: "名字 (例如: Alice)",
        placeholderFrom: "名字 (例如: Bob)",
        generateBtn: "生成",
        regenerateBtn: "重新生成",
        btnDownload: "下载 PNG",
        btnCopy: "复制到剪贴板",
        shareTelegram: "分享到 Telegram",
        shareTwitter: "分享到 X",
        footerText: "No Bullshit Valentines 2026. 简单诚实的情人节."
    }
};

let currentLang = 'en';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    detectLanguage();
    preloadImages();

    // Update dropdown to match detected logic
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = currentLang;
        // Language Switcher Listener
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            updateUI();
        });
    }

    updateUI();

    // Input validation listeners
    document.getElementById('toInput').addEventListener('input', checkInputs);
    document.getElementById('fromInput').addEventListener('input', checkInputs);

    // Generate Button Listener
    document.getElementById('generateBtn').addEventListener('click', generateValentine);

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

    const labelLang = document.getElementById('labelLanguage');
    if (labelLang) labelLang.textContent = t.labelLanguage;

    document.getElementById('labelCustomize').textContent = t.labelCustomize || (currentLang === 'ru' ? "Имена" : (currentLang === 'zh' ? "定制" : "Customize"));
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
    // Only one template now
    const selectedSrc = templates[0];

    // Select phrase list based on language (default to English if not found)
    const langPhrases = phrases[currentLang] || phrases['en'];
    // Random phrase
    const randomPhrase = langPhrases[Math.floor(Math.random() * langPhrases.length)];

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
        // User adjusted: +20px down from original (Original Ref To: 280, From: 380)
        // Adjusting to user's latest preference if any, maintaining ~300/400 range
        const toX = 150 * scale;
        const toY = 328 * scale;
        const fromX = 200 * scale;
        const fromY = 415 * scale;

        // Draw "To: [Name]" value only
        ctx.fillText(finalTo, toX, toY);

        // Draw "From: [Name]" value only
        ctx.fillText(finalFrom, fromX, fromY);

        // Draw Random Phrase with Wrapping
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const phraseFontSize = Math.round(40 * scale);
        ctx.font = `bold ${phraseFontSize}px 'Comic Sans MS', 'Comic Sans', cursive`;

        const phraseX = canvas.width / 2;
        // User requested 100px from top
        let phraseY = 130 * scale;
        // User requested 50px total padding (25px each side)
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
