const kissSteps = [
    { img: "https://media.tenor.com/VcR7PqtHqkkAAAA1/besos.webp", text: "Тағы да сүйші! 😘" },
    { img: "https://media.tenor.com/8PoO4kc08gAAAAAm/dudu-kiss-dudu-kiss-hand.webp", text: "Қандай тәтті... ✨" },
    { img: "https://media.tenor.com/TReOhQcXVuEAAAAm/kiss.webp", text: "Тоқтама, ұнап жатыр! ❤️" },
    { img: "https://media.tenor.com/cCJohJfASEwAAAA1/h.webp", text: "Сені қатты жақсы көрем! 🥰" }
];

let kissIndex = 0;
const token = "8632015616:AAFSbYJClMyktInbsI5rDZekv1ezC-sQ5ik";
const chat_id = "8130655129";

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const sticker = document.getElementById('mainSticker');
const title = document.getElementById('title');
const initialButtons = document.getElementById('initial-buttons');
const feedbackBlock = document.getElementById('feedback-block');
const kissBtn = document.getElementById('kissBtn');
const sendLetterBtn = document.getElementById('sendLetterBtn');
const userMessage = document.getElementById('userMessage');

// 1. "Жоқ" батырмасы қашады
noBtn.addEventListener('mouseover', () => {
    noBtn.style.position = 'fixed';
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

// 2. "Иә" басылғанда хат блогы ашылады
// yesBtn.addEventListener ішіне осы жолдарды қос:
yesBtn.addEventListener('click', () => {
    const music = document.getElementById('bgMusic');
    
    // Музыканы қосу
    music.play().catch(error => {
        console.log("Авто-ойнатуға рұқсат берілмеді, бірақ батырма басылған соң қосылуы керек.");
    });

    // Қалған кодтарың...
    sticker.src = "https://media.tenor.com/r0VCmLiA3mEAAAAm/sseeyall-bubu-dudu.webp";
    title.innerText = "ураа енді қайталанбайды! Жаным сол... 🥰";
    initialButtons.classList.add('hidden');
    feedbackBlock.classList.remove('hidden');
    sendNotification("Батырманы басты: ИӘ ✅");
});
// 3. Сүю батырмасы
kissBtn.addEventListener('click', () => {
    createKissEffect();
    sticker.src = kissSteps[kissIndex].img;
    title.innerText = kissSteps[kissIndex].text;
    kissIndex = (kissIndex + 1) % kissSteps.length;
});

// 4. Хатты жіберу
sendLetterBtn.addEventListener('click', async () => {
    const message = userMessage.value.trim();
    if (message === "") return alert("Бос хат жіберуге болмайды 🥺");

    await sendNotification(`💌 ЖАҢА ХАТ:\n"${message}"`);
    alert("Хат жіберілді! Рахмет ❤️");
    userMessage.value = "";
});

// Telegram-ға жіберу функциясы
async function sendNotification(text) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                text: text,
                parse_mode: "Markdown"
            })
        });
    } catch (e) {
        console.error("Error sending to TG", e);
    }
}

function createKissEffect() {
    const kiss = document.createElement('div');
    kiss.className = 'intimate-kiss';
    kiss.innerText = '💋';
    document.body.appendChild(kiss);
    setTimeout(() => kiss.remove(), 1500);
}
