// Import i18n configuration (this will be handled by the module system)
// import { i18next, changeLanguage } from './i18n.js';

// Initialize Material Design Components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Top App Bar
    const topAppBar = document.querySelector('.mdc-top-app-bar');
    const topAppBarInstance = new mdc.topAppBar.MDCTopAppBar(topAppBar);
    
    // Initialize the drawer
    const drawerEl = document.querySelector('.mdc-drawer');
    const drawer = drawerEl ? new mdc.drawer.MDCDrawer(drawerEl) : null;
    
    // Set up the drawer toggle
    if (drawer) {
        const menuButton = document.querySelector('.mdc-top-app-bar__navigation-icon');
        if (menuButton) {
            menuButton.addEventListener('click', () => {
                drawer.open = !drawer.open;
            });
        }
        
        // Close the drawer when a link is clicked
        const drawerLinks = drawerEl.querySelectorAll('.mdc-list-item');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawer.open = false;
            });
        });
    }
    
    // Initialize the tab bar
    const tabBar = document.querySelector('.mdc-tab-bar');
    if (tabBar) {
        const tabBarInstance = new mdc.tabBar.MDCTabBar(tabBar);
        
        // Set the active tab based on current page
        const currentPath = window.location.pathname;
        const tabs = tabBar.querySelectorAll('.mdc-tab');
        tabs.forEach((tab, index) => {
            const href = tab.getAttribute('href');
            if (href) {
                // Check if the current path matches the tab's href
                // or if we're on the home page and this is the home tab
                if ((currentPath.endsWith(href) && href !== '#') || 
                    (currentPath.endsWith('/') && index === 0)) {
                    tabBarInstance.activateTab(index);
                }
            }
        });
        
        // Add click event to tabs for navigation
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const href = tab.getAttribute('href');
                if (href && href.startsWith('#')) {
                    // For anchor links, prevent default behavior and handle with smooth scroll
                    e.preventDefault();
                    if (href === '#') return;
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                // For regular links, let the default behavior work
            });
        });
    }
    
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
    
    // Initialize list items for ripple effect
    const listItems = document.querySelectorAll('.mdc-list-item');
    listItems.forEach(item => {
        new mdc.ripple.MDCRipple(item);
    });
    
    // Initialize tab items for ripple effect (if not already handled by tab bar)
    const tabItems = document.querySelectorAll('.mdc-tab');
    tabItems.forEach(item => {
        if (!item.classList.contains('mdc-ripple-upgraded')) {
            new mdc.ripple.MDCRipple(item);
        }
    });
    
    // Smooth scrolling for anchor links (non-tab links)
    document.querySelectorAll('a[href^="#"]:not(.mdc-tab)').forEach(anchor => {
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