// Gestion du diaporama avec effet de fondu
let slideIndex = 1;
let autoplay = true;
let autoplayInterval;

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[slideIndex - 1].classList.add("active");
}

function startAutoplay() {
    autoplayInterval = setInterval(function() {
        plusSlides(1);
    }, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function toggleAutoplay() {
    if (autoplay) {
        stopAutoplay();
        document.getElementById("toggle-autoplay").textContent = "Démarrer le défilement automatique";
    } else {
        startAutoplay();
        document.getElementById("toggle-autoplay").textContent = "Arrêter le défilement automatique";
    }
    autoplay = !autoplay;
}

startAutoplay();

// Script pour le formulaire
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageText = document.getElementById('message-text').value;
    if (name && email && messageText) {
        document.getElementById('message').style.display = 'block';
        this.reset();
        setTimeout(() => {
            document.getElementById('message').style.display = 'none';
        }, 3000);
    }
});

// Animation des sections et images au scroll
const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('.section img');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

images.forEach(image => {
    observer.observe(image);
});

// Bouton Retour en haut
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mode sombre
const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    toggleThemeButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Charger le thème sauvegardé
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleThemeButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Compteur animé pour les statistiques
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const endValue = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, 0, endValue, 2000);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Cacher le loader une fois la page chargée
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});
