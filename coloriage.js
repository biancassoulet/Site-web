// ---------- 1. Les éléments de la page dont on a besoin ----------
const toile = document.getElementById('toile');
const boutonsPersonnages = document.querySelectorAll('#personnages button');
const boutonsCouleurs = document.querySelectorAll('#palette .couleur');

// ---------- 2. La variable qui retient la couleur choisie ----------
let couleurActive = '#e63946';   // la même que le premier bouton (rouge)

// ---------- 3. Choisir une couleur ----------
function choisirCouleur(bouton) {
  couleurActive = bouton.dataset.couleur;       // lit le data-couleur du bouton

  // on retire "selectionnee" de tous, puis on la met sur celui cliqué
  boutonsCouleurs.forEach(b => b.classList.remove('selectionnee'));
  bouton.classList.add('selectionnee');

  majCurseur();
}

boutonsCouleurs.forEach(bouton => {
  bouton.addEventListener('click', () => choisirCouleur(bouton));
});

// ---------- 4. Le curseur prend la couleur choisie (bonus) ----------
function majCurseur() {
  // un petit rond SVG dessiné "à la volée" avec la couleur active
  const rond = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'>
    <circle cx='16' cy='16' r='11' fill='${couleurActive}' stroke='black' stroke-width='3'/>
  </svg>`;
  toile.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(rond)}") 16 16, pointer`;
}
majCurseur();   // on l'applique une première fois au chargement

// ---------- 5. Afficher le dessin choisi ----------
// DESSINS vient du fichier dessins.js (chargé avant celui-ci)
function afficherDessin(nom, bouton) {
  // Si dessins.js n'a pas été trouvé par la page, DESSINS n'existe pas
  if (typeof DESSINS === 'undefined') {
    toile.innerHTML = '<p class="message">Le fichier dessins.js n\'est pas chargé.<br>' +
      'Vérifie qu\'il est dans le même dossier que coloriage.html, qu\'il ne s\'appelle pas ' +
      '"dessins.js.txt", et que la ligne &lt;script src="dessins.js"&gt; est bien dans le HTML, ' +
      'avant coloriage.js.</p>';
    return;
  }
  const svg = DESSINS[nom];                  // récupère le code SVG du dessin choisi
  if (!svg) {
    toile.innerHTML = '<p class="message">Oups, ce dessin est introuvable : ' + nom + '</p>';
    return;
  }
  toile.innerHTML = svg;                     // injecte le SVG dans la toile

  // met en évidence la miniature choisie
  boutonsPersonnages.forEach(b => b.classList.remove('selectionnee'));
  bouton.classList.add('selectionnee');
}

boutonsPersonnages.forEach(bouton => {
  bouton.addEventListener('click', () => afficherDessin(bouton.dataset.dessin, bouton));
});

// ---------- 6. Colorier une zone ----------
// Un seul écouteur sur la toile entière (délégation d'événements)
toile.addEventListener('click', (evenement) => {
  const cible = evenement.target;                 // l'élément réellement cliqué
  if (cible.classList.contains('zone')) {         // seulement si c'est une zone
    cible.style.fill = couleurActive;
  }
});