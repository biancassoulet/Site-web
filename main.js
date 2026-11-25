const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Le canvas prend toute la taille de la fenêtre
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const char = "?";
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

    ctx.fillStyle = "#FFD682";
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

// Effet de tremblement au clic sur le bouton
const bouton = document.getElementById('monBouton');
const cibles = document.querySelectorAll('h1, h2, h3, .galerie, .musique');

bouton.addEventListener('click', function () {
    // On ajoute la classe "tremble" : l'animation démarre
    cibles.forEach(function (el) {
        el.classList.add('tremble');
    });
    // Après 10 seconde, on la retire pour pouvoir recommencer
    setTimeout(function () {
        cibles.forEach(function (el) {
            el.classList.remove('tremble');
        });
    }, 1000);
});
