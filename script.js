/* ==================== THEME (DARK/LIGHT) TOGGLE ==================== */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = 'fas fa-moon';
const sunIcon = 'fas fa-sun';

// Function to set the theme
const setTheme = (theme) => {
    body.classList.toggle('dark-mode', theme === 'dark');
    themeToggle.innerHTML = `<i class="${theme === 'dark' ? sunIcon : moonIcon}"></i>`;
    localStorage.setItem('theme', theme);
};

// Event listener for the toggle button
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    setTheme(isDarkMode ? 'light' : 'dark');
});

// Check for saved theme in localStorage on page load
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);


/* ==================== MOBILE NAV MENU ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('active'));
}
if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('active'));
}
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});


/* ==================== STICKY HEADER ON SCROLL ==================== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY >= 50);
});


/* ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== */
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Check if the target is a reveal element
            if (entry.target.classList.contains('reveal')) {
                entry.target.classList.add('visible');
            }
            // Check if the target is a metric number for count-up
            if (entry.target.classList.contains('metric-number')) {
                animateCountUp(entry.target);
            }
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe all elements with the 'reveal' class
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// Observe all elements with the 'metric-number' class
document.querySelectorAll('.metric-number').forEach(el => observer.observe(el));


/* ==================== ANIMATED COUNT-UP FUNCTION ==================== */
function animateCountUp(el) {
    const goal = parseInt(el.dataset.goal, 10);
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = goal / (duration / 16); // ~60 frames per second

    const updateCount = () => {
        current += increment;
        if (current < goal) {
            el.textContent = Math.ceil(current);
            requestAnimationFrame(updateCount);
        } else {
            el.textContent = goal;
        }
    };
    requestAnimationFrame(updateCount);
}
