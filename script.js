const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const container = document.querySelector('.container');

let yesBtnSize = 1.5; // Taille initiale en em
let clickCount = 0;

// Fonction pour créer des particules de cœur
function createHeartParticle(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.textContent = '💕';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Quand on clique sur OUI
yesBtn.addEventListener('click', function() {
    celebration.classList.remove('hidden');
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    // Créer des particules de cœur (optimisé pour mobile)
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createHeartParticle(x, y);
        }, i * particleDelay);
    }
});

// Détecter si on est sur mobile (amélioré)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                 window.innerWidth <= 768 || 
                 ('ontouchstart' in window) || 
                 (navigator.maxTouchPoints > 0);

// Réduire les particules sur mobile pour de meilleures performances
const particleCount = isMobile ? 10 : 20;
const particleDelay = isMobile ? 150 : 100;

// Quand on clique sur NON
noBtn.addEventListener('click', function() {
    clickCount++;
    
    // Faire grandir le bouton OUI
    yesBtnSize += 0.2;
    if (!isMobile) {
        yesBtn.style.fontSize = yesBtnSize + 'em';
        yesBtn.style.padding = `${20 + clickCount * 5}px ${50 + clickCount * 10}px`;
    }
    yesBtn.classList.add('grow');
    
    // Créer quelques particules
    const rect = yesBtn.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createHeartParticle(
                rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
                rect.top + rect.height / 2 + (Math.random() - 0.5) * 100
            );
        }, i * 50);
    }
    
    // Retirer la classe grow après l'animation
    setTimeout(() => {
        yesBtn.classList.remove('grow');
    }, 300);
    
    // Sur mobile, limiter le mouvement du bouton NON pour qu'il reste visible
    if (isMobile) {
        // Sur mobile, le bouton reste dans le buttons-container
        const buttonsContainer = document.querySelector('.buttons-container');
        if (buttonsContainer) {
            const containerRect = buttonsContainer.getBoundingClientRect();
            const noBtnRect = noBtn.getBoundingClientRect();
            
            // Calculer les limites dans le container des boutons
            const maxX = containerRect.width - noBtnRect.width - 5;
            const maxY = containerRect.height - noBtnRect.height - 5;
            
            const randomX = Math.max(0, Math.min(maxX, Math.random() * maxX));
            const randomY = Math.max(0, Math.min(maxY, Math.random() * maxY));
            
            // Positionner par rapport au buttons-container
            noBtn.style.position = 'absolute';
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
            noBtn.style.marginTop = '0';
            noBtn.style.marginLeft = '0';
            noBtn.style.width = noBtnRect.width + 'px'; // Garder la largeur actuelle
        }
    } else {
        // Sur desktop, comportement original
        const maxX = window.innerWidth - noBtn.offsetWidth - 20;
        const maxY = window.innerHeight - noBtn.offsetHeight - 20;
        
        const randomX = Math.max(20, Math.min(maxX, Math.random() * maxX));
        const randomY = Math.max(20, Math.min(maxY, Math.random() * maxY));
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }
    
    noBtn.style.transition = 'all 0.3s ease';
    
    // Message amusant après plusieurs clics
    if (clickCount >= 3) {
        noBtn.textContent = 'Tu es sûr(e) ? 😢';
    }
    if (clickCount >= 5) {
        noBtn.textContent = 'S\'il te plaît... 💔';
    }
    if (clickCount >= 7) {
        noBtn.textContent = 'Clique sur OUI ! ❤️';
    }
});

// Empêcher le bouton NON de sortir de l'écran au survol (desktop seulement)
if (!isMobile) {
    noBtn.addEventListener('mouseenter', function() {
        if (clickCount > 0) {
            const maxX = window.innerWidth - noBtn.offsetWidth - 20;
            const maxY = window.innerHeight - noBtn.offsetHeight - 20;
            
            const randomX = Math.max(20, Math.min(maxX, Math.random() * maxX));
            const randomY = Math.max(20, Math.min(maxY, Math.random() * maxY));
            
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
        }
    });
}

// Empêcher le zoom sur double-tap sur mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
