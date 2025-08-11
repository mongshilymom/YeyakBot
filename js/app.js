// YEYAKBOT Web Application JavaScript
// Handles UTM tracking, header effects, and form URL management

(function() {
    'use strict';

    // UTM parameter handling
    const UTMManager = {
        // Extract UTM parameters from URL
        extractUTMParams: function() {
            const urlParams = new URLSearchParams(window.location.search);
            const utmParams = {};
            
            // Common UTM parameters
            const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
            
            utmKeys.forEach(key => {
                const value = urlParams.get(key);
                if (value) {
                    utmParams[key] = value;
                }
            });
            
            return utmParams;
        },

        // Save UTM parameters to localStorage
        saveUTMParams: function() {
            const utmParams = this.extractUTMParams();
            
            if (Object.keys(utmParams).length > 0) {
                localStorage.setItem('yeyakbot_utm', JSON.stringify(utmParams));
                console.log('UTM parameters saved:', utmParams);
            }
        },

        // Get saved UTM parameters from localStorage
        getSavedUTMParams: function() {
            const saved = localStorage.getItem('yeyakbot_utm');
            return saved ? JSON.parse(saved) : {};
        },

        // Build UTM query string
        buildUTMQueryString: function() {
            const utmParams = this.getSavedUTMParams();
            const queryString = new URLSearchParams(utmParams).toString();
            return queryString ? '?' + queryString : '';
        }
    };

    // Header scroll effects
    const HeaderManager = {
        init: function() {
            this.header = document.getElementById('header');
            if (!this.header) return;

            // Add scroll event listener with throttling
            let isScrolling = false;
            
            window.addEventListener('scroll', () => {
                if (!isScrolling) {
                    window.requestAnimationFrame(() => {
                        this.updateHeaderOnScroll();
                        isScrolling = false;
                    });
                    isScrolling = true;
                }
            });
        },

        updateHeaderOnScroll: function() {
            const scrollY = window.scrollY;
            
            if (scrollY > 10) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }
    };

    // Form URL management
    const FormManager = {
        init: function() {
            this.updateBookingFormURL();
            this.updateCalendlyURL();
            this.attachUTMToLinks();
        },

        // Update booking form URL with UTM parameters
        updateBookingFormURL: function() {
            const bookingForm = document.getElementById('booking-form');
            if (!bookingForm) return;

            const baseUrl = bookingForm.src;
            if (baseUrl && baseUrl !== 'REPLACE_FORM_URL') {
                const utmQuery = UTMManager.buildUTMQueryString();
                const separator = baseUrl.includes('?') ? '&' : '?';
                bookingForm.src = baseUrl + (utmQuery ? separator + utmQuery.substring(1) : '');
            }
        },

        // Update Calendly URL with UTM parameters
        updateCalendlyURL: function() {
            const calendlyWidget = document.querySelector('.calendly-inline-widget');
            if (!calendlyWidget) return;

            const baseUrl = calendlyWidget.getAttribute('data-url');
            if (baseUrl && baseUrl !== 'REPLACE_CALENDLY_URL') {
                const utmQuery = UTMManager.buildUTMQueryString();
                const separator = baseUrl.includes('?') ? '&' : '?';
                calendlyWidget.setAttribute('data-url', baseUrl + (utmQuery ? separator + utmQuery.substring(1) : ''));
            }
        },

        // Attach UTM parameters to CTA links
        attachUTMToLinks: function() {
            const ctaLinks = document.querySelectorAll('a[href="booking.html"], a[href="demo.html"]');
            const utmQuery = UTMManager.buildUTMQueryString();
            
            if (utmQuery) {
                ctaLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.setAttribute('href', href + utmQuery);
                });
            }
        }
    };

    // Performance optimizations
    const PerformanceManager = {
        init: function() {
            // Preload critical resources
            this.preloadCriticalResources();
            
            // Add intersection observer for lazy loading if needed
            this.setupIntersectionObserver();
        },

        preloadCriticalResources: function() {
            // Preload logo SVG
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = 'assets/logo.svg';
            link.as = 'image';
            link.type = 'image/svg+xml';
            document.head.appendChild(link);
        },

        setupIntersectionObserver: function() {
            if (!('IntersectionObserver' in window)) return;

            // Observe sections for potential animations or lazy loading
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px 0px'
            });

            // Observe benefit cards and feature items
            const animatableElements = document.querySelectorAll('.benefit-card, .feature-item, .pricing-card');
            animatableElements.forEach(el => observer.observe(el));
        }
    };

    // Accessibility enhancements
    const AccessibilityManager = {
        init: function() {
            this.handleKeyboardNavigation();
            this.improveScreenReaderExperience();
        },

        handleKeyboardNavigation: function() {
            // Enhanced focus management for CTA buttons
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        },

        improveScreenReaderExperience: function() {
            // Add skip navigation link
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = '본문으로 바로가기';
            skipLink.className = 'sr-only';
            skipLink.style.cssText = `
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            
            skipLink.addEventListener('focus', function() {
                this.style.cssText = `
                    position: absolute;
                    left: 6px;
                    top: 7px;
                    z-index: 999999;
                    text-decoration: none;
                    padding: 8px 16px;
                    background: #000;
                    color: #fff;
                    width: auto;
                    height: auto;
                    overflow: visible;
                `;
            });
            
            skipLink.addEventListener('blur', function() {
                this.style.cssText = `
                    position: absolute;
                    left: -10000px;
                    top: auto;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                `;
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);

            // Add main content ID
            const main = document.querySelector('main');
            if (main && !main.id) {
                main.id = 'main-content';
            }
        }
    };

    // Error handling
    const ErrorManager = {
        init: function() {
            // Global error handler
            window.addEventListener('error', (e) => {
                console.error('JavaScript Error:', e.error);
                // In production, you might want to send this to an analytics service
            });

            // Handle form loading errors
            this.handleFormErrors();
        },

        handleFormErrors: function() {
            const bookingForm = document.getElementById('booking-form');
            if (bookingForm) {
                bookingForm.addEventListener('error', () => {
                    this.showFormError('booking');
                });
            }

            // Handle Calendly loading errors
            if (typeof Calendly !== 'undefined') {
                // Calendly error handling would go here
            }
        },

        showFormError: function(formType) {
            const errorMessage = formType === 'booking' 
                ? '예약 폼을 불러오는 중 문제가 발생했습니다. 페이지를 새로고침해 주세요.'
                : '데모 예약을 불러오는 중 문제가 발생했습니다. 페이지를 새로고침해 주세요.';
            
            console.error(errorMessage);
            
            // Show user-friendly error message
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                background: #f8d7da;
                color: #721c24;
                padding: 16px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
                border: 1px solid #f5c6cb;
            `;
            errorDiv.textContent = errorMessage;
            
            const container = document.querySelector('.form-container, .calendly-container');
            if (container) {
                container.appendChild(errorDiv);
            }
        }
    };

    // Analytics helper (for future use)
    const AnalyticsManager = {
        init: function() {
            // Track CTA clicks
            this.trackCTAClicks();
        },

        trackCTAClicks: function() {
            const ctaButtons = document.querySelectorAll('a[href*="booking.html"], a[href*="demo.html"]');
            
            ctaButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const buttonText = button.textContent.trim();
                    const destination = button.getAttribute('href');
                    
                    // Log for now, replace with actual analytics in production
                    console.log('CTA Click:', {
                        button: buttonText,
                        destination: destination,
                        timestamp: new Date().toISOString()
                    });
                    
                    // If you're using Google Analytics, GTM, or other analytics:
                    // gtag('event', 'click', {
                    //     event_category: 'CTA',
                    //     event_label: buttonText,
                    //     value: destination
                    // });
                });
            });
        }
    };

    // Initialize everything when DOM is ready
    function initialize() {
        // Save UTM parameters from current URL
        UTMManager.saveUTMParams();
        
        // Initialize all managers
        HeaderManager.init();
        FormManager.init();
        PerformanceManager.init();
        AccessibilityManager.init();
        ErrorManager.init();
        AnalyticsManager.init();
        
        console.log('YEYAKBOT application initialized successfully');
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Add keyboard navigation styles
    const keyboardStyles = document.createElement('style');
    keyboardStyles.textContent = `
        .keyboard-navigation .btn:focus,
        .keyboard-navigation a:focus {
            outline: 3px solid #007bff !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardStyles);

})();
