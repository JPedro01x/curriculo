document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initScrollEffects();
    initAnimations();
    initSkillBars();
    initCounters();
    initProgressBars();
    initBackToTop();
    initSmoothScroll();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
  
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navClose = document.getElementById('nav-close');
    
    menuToggle.addEventListener('click', openNav);
    navClose.addEventListener('click', closeNav);
    navOverlay.addEventListener('click', closeNav);
 
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeNav();
        }
    });
}

function openNav() {
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    
    navMenu.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function initScrollEffects() {
    const sections = document.querySelectorAll('.section-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                animateChildElements(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function animateChildElements(section) {
    const stats = section.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        animateCounter(stat);
    });
    
    const skillBars = section.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const skill = bar.getAttribute('data-skill');
        setTimeout(() => {
            bar.style.width = skill + '%';
        }, 300);
    });
  
    const progressBars = section.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500);
    });
}

function initAnimations() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
}

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                entry.target.style.width = skillLevel + '%';
                const skillItem = entry.target.closest('.skill-item');
                const skillName = skillItem.querySelector('.skill-name');
                if (!skillName.querySelector('.skill-percentage')) {
                    const percentage = document.createElement('span');
                    percentage.className = 'skill-percentage';
                    percentage.textContent = ` (${skillLevel}%)`;
                    percentage.style.color = 'var(--text-light)';
                    percentage.style.fontSize = '0.8rem';
                    skillName.appendChild(percentage);
                }
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}
function initCounters() {
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                setTimeout(() => {
                    entry.target.style.width = progress + '%';
                }, 300);
            }
        });
    }, { threshold: 0.3 });
    
    progressBars.forEach(bar => observer.observe(bar));
}
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                closeNav();
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.content-card, .timeline-content, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
function createParticles() {
    const header = document.querySelector('.header');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
    
    header.appendChild(particlesContainer);
}
window.addEventListener('load', createParticles);
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});
function isMobile() {
    return window.innerWidth <= 768;
}
if (isMobile()) {
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                this.style.boxShadow = '0 0 0 2px var(--accent-color)';
            });
            
            el.addEventListener('blur', function() {
                this.style.boxShadow = '';
            });
        });
    }
});

console.log('🚀 Currículo Interativo carregado com sucesso!');
console.log('💼 João Pedro de Carvalho Bernardo - Desenvolvedor Frontend');