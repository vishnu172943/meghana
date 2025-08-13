// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    let followerX = 0, followerY = 0;
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        followerX = e.clientX - 10;
        followerY = e.clientY - 10;
    });

    function updateFollower() {
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(updateFollower);
    }
    updateFollower();
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    particlesContainer.innerHTML = '';
    const particleCount = 50;
    const symbols = ['⚡', '✨', '💫', '🌟', '⭐', '🔷', '🔶'];
    const symbolsLength = symbols.length;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        particle.textContent = symbols[Math.floor(Math.random() * symbolsLength)];
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
document.querySelectorAll('.skills-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
        card.dataset.index = index;
    });
});

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

animatedElements.forEach(el => {
    observer.observe(el);
});


// Parallax effect with zoom on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    lastScroll = window.pageYOffset;
    requestAnimationFrame(() => {
        const parallax = document.querySelector('.bg-animation');
        if (parallax) {
            parallax.style.transform = `translateY(${lastScroll * 0.4}px) scale(${1 + lastScroll * 0.0001})`;
        }
    });
});

// Keyboard navigation and Easter egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    // Keyboard navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).closest('.section');
        if (currentSection) {
            const nextSection = e.key === 'ArrowDown' ? currentSection.nextElementSibling : currentSection.previousElementSibling;
            if (nextSection && nextSection.classList.contains('section')) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Easter egg
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
