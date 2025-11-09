// ========================================
// UKIRA ENGINEERING SOLUTIONS LTD.
// Professional Engineering Website Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const header = document.getElementById('main-header');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
            document.body.style.overflow = mobileNav.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('is-open') &&
                !mobileNav.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                mobileNav.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- 2. HEADER SCROLL EFFECT ---
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // --- 3. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 4. STATS COUNTER ANIMATION ---
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statsAnimated = true;
                    stats.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 60fps
                        let current = 0;

                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                stat.textContent = Math.floor(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                stat.textContent = target;
                            }
                        };

                        updateCounter();
                    });
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    };

    animateStats();

    // --- 5. SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty anchors
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. ACTIVE NAVIGATION HIGHLIGHTING ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

    const highlightNavigation = () => {
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);

    // --- 7. BACK TO TOP BUTTON ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
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

    // --- 8. HERO SCROLL INDICATOR ---
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about-summary');
            if (aboutSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // --- 9. LAZY LOADING IMAGES ---
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // --- 10. FORM VALIDATION (If you add a contact form later) ---
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const name = contactForm.querySelector('[name="name"]').value.trim();
            const email = contactForm.querySelector('[name="email"]').value.trim();
            const message = contactForm.querySelector('[name="message"]').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // If validation passes, submit the form
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for contacting us! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // --- 11. PRELOADER (Optional - add if needed) ---
    const preloader = document.querySelector('.preloader');

    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // --- 12. PARALLAX EFFECT (Subtle) ---
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // --- 13. WHATSAPP BUTTON ANALYTICS (Optional) ---
    const whatsappButton = document.querySelector('.whatsapp-float');

    if (whatsappButton) {
        whatsappButton.addEventListener('click', () => {
            // Track WhatsApp click (if you have analytics)
            console.log('WhatsApp button clicked');
            
            // You can add Google Analytics or other tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'WhatsApp Button'
                });
            }
        });
    }

    // --- 14. CONSOLE BRANDING ---
    console.log('%cUKIRA ENGINEERING SOLUTIONS LTD.', 'color: #002366; font-size: 24px; font-weight: bold;');
    console.log('%c"Visioning Your Dreams Into Reality"', 'color: #D32F2F; font-size: 16px; font-style: italic;');
    console.log('%cWebsite developed with excellence | Contact: ukiraengineeringsolutions12@gmail.com', 'color: #666; font-size: 12px;');

});

// --- 15. PERFORMANCE OPTIMIZATION ---
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-intensive functions
window.addEventListener('scroll', debounce(() => {
    // Your scroll functions here (already applied above)
}, 10));
