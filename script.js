// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        follower.style.left = e.clientX - 10 + 'px';
        follower.style.top = e.clientY - 10 + 'px';
    }, 100);
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 50;
    const symbols = ['⚡', '✨', '💫', '🌟', '⭐', '🔷', '🔶'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Window load events
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    createParticles();

    document.querySelectorAll('.interactive-badge').forEach(badge => {
        badge.style.animationDelay = `${Math.random() * 4}s`;
    });
});

// Intersection Observer for scroll-based animations
const animatedElements = document.querySelectorAll('.section, .timeline-item, .skill-card');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.classList.contains('skill-card')) {
               const delay = entry.target.dataset.index * 100;
               entry.target.style.transitionDelay = `${delay}ms`;
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.skills-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
        card.dataset.index = index;
    });
});

animatedElements.forEach(el => {
    observer.observe(el);
});


// Parallax effect with zoom on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-animation');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0001})`;
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).closest('.section');
        const nextSection = currentSection?.nextElementSibling;
        if (nextSection && nextSection.classList.contains('section')) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp') {
        const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).closest('.section');
        const prevSection = currentSection?.previousElementSibling;
        if (prevSection && prevSection.classList.contains('section')) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Easter egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            alert('🎉 Congratulations! You found the secret! Welcome to the Matrix! 🎉');
            document.body.style.animation = 'glitch 0.3s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
