// Import i18n configuration (this will be handled by the module system)
// import { i18next, changeLanguage } from './i18n.js';

// Initialize Material Design Components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Top App Bar
    const topAppBar = document.querySelector('.mdc-top-app-bar');
    const topAppBarInstance = new mdc.topAppBar.MDCTopAppBar(topAppBar);
    
    // Initialize all buttons
    const buttons = document.querySelectorAll('.mdc-button');
    buttons.forEach(button => {
        new mdc.ripple.MDCRipple(button);
    });
    
    // Initialize all text fields
    const textFields = document.querySelectorAll('.mdc-text-field');
    textFields.forEach(textField => {
        new mdc.textField.MDCTextField(textField);
    });
    
    // Initialize card actions
    const cardPrimaryActionElements = document.querySelectorAll('.mdc-card__primary-action');
    cardPrimaryActionElements.forEach(cardPrimaryActionElement => {
        new mdc.ripple.MDCRipple(cardPrimaryActionElement);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const menuButton = document.querySelector('.mdc-top-app-bar__navigation-icon');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuButton && mainNav) {
        menuButton.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-nav-open');
        });
    }
    
    // Counter animation for stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const animateCounters = () => {
            statNumbers.forEach(counter => {
                const target = parseInt(counter.textContent, 10);
                const count = 0;
                const speed = 50;
                
                if (target > 0) {
                    const inc = Math.ceil(target / (1000 / speed));
                    
                    const updateCount = () => {
                        const currentValue = parseInt(counter.textContent, 10);
                        
                        if (currentValue < target) {
                            counter.textContent = Math.min(currentValue + inc, target) + (counter.textContent.includes('+') ? '+' : '');
                            setTimeout(updateCount, speed);
                        } else {
                            counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                        }
                    };
                    
                    updateCount();
                }
            });
        };
        
        // Use Intersection Observer to trigger counter animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the stats section
        const missionStats = document.querySelector('.mission-stats');
        if (missionStats) {
            observer.observe(missionStats);
        }
    }
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just show a success message
            alert('Thanks for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send the subscription to a server
            alert('Thanks for subscribing to our newsletter!');
            this.reset();
        });
    }
});