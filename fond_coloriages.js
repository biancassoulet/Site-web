const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Le canvas prend toute la taille de la fenêtre
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const char = "<3";
const fontSize = 50;
const columns = canvas.width / fontSize;

// Position verticale de chaque colonne de coeurs
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    // Rectangle violet très transparent : crée l'effet de traînée
    ctx.fillStyle = "rgba(255, 246, 176, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#F5B0E9";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Quand un coeur arrive en bas, il repart en haut au hasard
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Lance l'animation environ 1 fois par seconde
setInterval(draw, 100);