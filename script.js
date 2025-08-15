// Matrix Effect for Background
class MatrixEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrixBg = document.getElementById('matrixBg');
        
        if (this.matrixBg) {
            this.matrixBg.appendChild(this.canvas);
            this.init();
        }
    }
    
    init() {
        this.resize();
        this.createRain();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(0);
    }
    
    createRain() {
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ff0080';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
    
    animate() {
        this.createRain();
        setTimeout(() => this.animate(), 50);
    }
}

// Advanced Cursor System
class AdvancedCursor {
    constructor() {
        this.trail = document.getElementById('cursorTrail');
        this.followers = [
            document.getElementById('follower1'),
            document.getElementById('follower2'),
            document.getElementById('follower3'),
            document.getElementById('follower4'),
            document.getElementById('follower5')
        ];
        this.mouseX = 0;
        this.mouseY = 0;
        this.trailX = 0;
        this.trailY = 0;
        this.followerPositions = Array(5).fill().map(() => ({ x: 0, y: 0 }));
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            if (this.trail) {
                this.trail.classList.add('active');
            }
        });
        
        document.addEventListener('mouseleave', () => {
            if (this.trail) {
                this.trail.classList.remove('active');
            }
        });
        
        // Add hover detection for different elements
        this.setupHoverDetection();
        this.animate();
    }
    
    setupHoverDetection() {
        // Buttons
        const buttons = document.querySelectorAll('.cta-btn, .submit-btn, .fab-main, .fab-item');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.trail.className = 'cursor-trail active hover-button';
            });
            btn.addEventListener('mouseleave', () => {
                this.trail.className = 'cursor-trail active';
            });
        });
        
        // Project cards
        const projects = document.querySelectorAll('.project-card');
        projects.forEach(project => {
            project.addEventListener('mouseenter', () => {
                this.trail.className = 'cursor-trail active hover-project';
            });
            project.addEventListener('mouseleave', () => {
                this.trail.className = 'cursor-trail active';
            });
        });
        
        // Skills
        const skills = document.querySelectorAll('.skill-item');
        skills.forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                this.trail.className = 'cursor-trail active hover-skill';
            });
            skill.addEventListener('mouseleave', () => {
                this.trail.className = 'cursor-trail active';
            });
        });
        
        // Links
        const links = document.querySelectorAll('a, .nav-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.trail.className = 'cursor-trail active hover-link';
            });
            link.addEventListener('mouseleave', () => {
                this.trail.className = 'cursor-trail active';
            });
        });
    }
    
    animate() {
        // Main cursor trail
        this.trailX += (this.mouseX - this.trailX) * 0.1;
        this.trailY += (this.mouseY - this.trailY) * 0.1;
        
        if (this.trail) {
            this.trail.style.transform = `translate(${this.trailX - 10}px, ${this.trailY - 10}px)`;
        }
        
        // Followers
        this.followers.forEach((follower, index) => {
            if (follower) {
                const delay = (index + 1) * 0.02;
                this.followerPositions[index].x += (this.trailX - this.followerPositions[index].x) * delay;
                this.followerPositions[index].y += (this.trailY - this.followerPositions[index].y) * delay;
                
                follower.style.transform = `translate(${this.followerPositions[index].x - 4}px, ${this.followerPositions[index].y - 4}px)`;
                follower.style.opacity = 0.6 - (index * 0.1);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Language Switching
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'pl';
        this.elements = document.querySelectorAll('[data-pl][data-en][data-de]');
        this.switcher = document.getElementById('languageSwitcher');
        this.dropdown = document.getElementById('langDropdown');
        this.currentDisplay = document.getElementById('langCurrent');
        this.flags = {
            pl: '🇵🇱',
            en: '🇺🇸', 
            de: '🇩🇪'
        };
        this.init();
    }
    
    init() {
        if (this.switcher) {
            // Toggle dropdown on click
            this.currentDisplay.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
            
            // Handle language option clicks
            const langOptions = this.dropdown.querySelectorAll('.lang-option');
            langOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.dataset.lang;
                    this.switchLanguage(lang);
                    this.closeDropdown();
                });
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                this.closeDropdown();
            });
            
            // Load saved language
            const savedLang = localStorage.getItem('preferredLanguage') || 'pl';
            this.switchLanguage(savedLang);
        }
    }
    
    toggleDropdown() {
        this.switcher.classList.toggle('open');
    }
    
    closeDropdown() {
        this.switcher.classList.remove('open');
    }
    
    updateCurrentDisplay() {
        const flag = this.currentDisplay.querySelector('.flag');
        const code = this.currentDisplay.querySelector('.lang-code');
        
        if (flag && code) {
            flag.textContent = this.flags[this.currentLang];
            code.textContent = this.currentLang.toUpperCase();
        }
        
        // Update active option
        const options = this.dropdown.querySelectorAll('.lang-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === this.currentLang);
        });
    }
    
    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        
        // Update display
        this.updateCurrentDisplay();
        
        // Update text content
        this.elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Update document language
        document.documentElement.lang = lang;
        
        // Save preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
}

// Navigation
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        // Epic Mobile Menu
        this.epicMenuTrigger = document.getElementById('epicMenuTrigger');
        this.epicMenuOverlay = document.getElementById('epicMenuOverlay');
        this.menuClose = document.getElementById('menuClose');
        this.epicNavLinks = document.querySelectorAll('.epic-nav .nav-link');
        
        this.init();
    }
    
    init() {
        // Epic Mobile Menu Event Listeners
        if (this.epicMenuTrigger && this.epicMenuOverlay) {
            this.epicMenuTrigger.addEventListener('click', (e) => {
                this.createRippleEffect(e);
                this.openEpicMenu();
            });
        }
        
        if (this.menuClose) {
            this.menuClose.addEventListener('click', () => this.closeEpicMenu());
        }
        
        // Close menu when clicking outside
        if (this.epicMenuOverlay) {
            this.epicMenuOverlay.addEventListener('click', (e) => {
                if (e.target === this.epicMenuOverlay) {
                    this.closeEpicMenu();
                }
            });
        }
        
        // Epic nav links
        this.epicNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.closeEpicMenu();
                this.smoothScroll(e);
            });
        });
        
        // Desktop nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.smoothScroll(e);
            });
        });
        
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveLink();
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    openEpicMenu() {
        if (this.epicMenuOverlay && this.epicMenuTrigger) {
            // Add opening animation to trigger
            this.epicMenuTrigger.classList.add('opening');
            
            // After opening animation, set to active state
            setTimeout(() => {
                this.epicMenuTrigger.classList.remove('opening');
                this.epicMenuTrigger.classList.add('active');
                
                // Add epic screen flash effect
                this.createScreenFlash('#00ffff', 0.1);
            }, 600);
            
            // Open overlay with slight delay for dramatic effect
            setTimeout(() => {
                this.epicMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // GTM Event - Mobile Menu Open
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'mobile_menu_open', {
                        'event_category': 'Navigation',
                        'event_label': 'Epic Mobile Menu Opened'
                    });
                }
                
                // DataLayer push for GTM
                if (typeof window !== 'undefined' && window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'mobile_menu_interaction',
                        'interaction_type': 'open',
                        'menu_type': 'epic_mobile_menu'
                    });
                }
                
                // Animate menu items
                const navItems = this.epicMenuOverlay.querySelectorAll('.nav-item');
                navItems.forEach((item, index) => {
                    item.style.animationDelay = `${(index + 1) * 0.1}s`;
                });
            }, 300);
        }
    }
    
    closeEpicMenu() {
        if (this.epicMenuOverlay && this.epicMenuTrigger) {
            // Close overlay first
            this.epicMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Add closing animation to trigger
            this.epicMenuTrigger.classList.remove('active');
            this.epicMenuTrigger.classList.add('closing');
            
            // After closing animation, remove all classes
            setTimeout(() => {
                this.epicMenuTrigger.classList.remove('closing');
                
                // Add epic screen flash effect
                this.createScreenFlash('#ff0080', 0.05);
            }, 400);
        }
    }
    
    closeMobileMenu() {
        this.closeEpicMenu();
    }
    
    createScreenFlash(color, opacity) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: ${color};
            opacity: ${opacity};
            z-index: 9999;
            pointer-events: none;
            animation: epicScreenFlash 0.4s ease-out forwards;
        `;
        
        document.body.appendChild(flash);
        
        // Remove flash after animation
        setTimeout(() => {
            if (flash.parentNode) {
                flash.remove();
            }
        }, 400);
    }
    
    createRippleEffect(e) {
        const trigger = this.epicMenuTrigger;
        if (!trigger) return;
        
        const rect = trigger.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(255,0,128,0.4) 50%, transparent 100%);
            transform: scale(0);
            animation: epicRipple 0.8s linear;
            pointer-events: none;
            z-index: 1000;
            width: 200px;
            height: 200px;
            left: 50%;
            top: 50%;
            margin-left: -100px;
            margin-top: -100px;
        `;
        
        trigger.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 800);
    }
    
    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    handleScroll() {
        if (this.navbar) {
            const scrolled = window.scrollY > 50;
            this.navbar.style.background = scrolled 
                ? 'rgba(10, 10, 10, 0.95)' 
                : 'rgba(10, 10, 10, 0.9)';
        }
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        this.addAnimationClasses();
        this.observeElements();
    }
    
    addAnimationClasses() {
        // Section headers
        document.querySelectorAll('.section-header').forEach(header => {
            header.classList.add('fade-in');
        });
        
        // About section
        const aboutText = document.querySelector('.about-content .text-block');
        const aboutVisual = document.querySelector('.about-visual');
        if (aboutText) aboutText.classList.add('slide-in-left');
        if (aboutVisual) aboutVisual.classList.add('slide-in-right');
        
        // Skills
        document.querySelectorAll('.skills-category').forEach((category, index) => {
            category.classList.add('scale-in');
            category.style.transitionDelay = `${index * 0.2}s`;
        });
        
        // Projects
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Contact
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form-container');
        if (contactInfo) contactInfo.classList.add('slide-in-left');
        if (contactForm) contactForm.classList.add('slide-in-right');
    }
    
    observeElements() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skills-category')) {
                    this.animateSkillBars(entry.target);
                }
                
                // Animate stats
                if (entry.target.classList.contains('hero-stats')) {
                    this.animateStats();
                }
                
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateSkillBars(skillsCategory) {
        const skillBars = skillsCategory.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }, index * 100);
        });
    }
    
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            this.animateNumber(stat, 0, target, 2000);
        });
    }
    
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * this.easeOutCubic(progress));
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }
    
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.isSubmitting = false;
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearErrors(input));
            });
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Prevent double submission
        const submitBtn = this.form.querySelector('.submit-btn');
        if (submitBtn.disabled || this.isSubmitting) {
            console.log('🚫 Form already submitting, ignoring duplicate submission');
            return;
        }
        
        this.isSubmitting = true;
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company') || 'Nie podano',
            service: formData.get('service'),
            message: formData.get('message'),
            budget: formData.get('budget') || 'Nie podano',
            timeline: formData.get('timeline') || 'Nie podano'
        };
        
        if (!this.validateForm(data)) {
            this.isSubmitting = false;
            return;
        }
        
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        // GTM Event - Form Start
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit_start', {
                'event_category': 'Contact Form',
                'event_label': 'Form Submission Started',
                'service_type': data.service || 'unknown',
                'custom_parameter_1': 'contact_form_codingmaks'
            });
        }
        
        // DataLayer push for GTM
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                'event': 'contact_form_submit',
                'form_name': 'contact_form',
                'service_selected': data.service || 'unknown',
                'form_fields_filled': Object.keys(data).filter(key => data[key] && data[key] !== 'Nie podano').length,
                'user_name': data.name || 'anonymous',
                'user_email': data.email || 'no_email',
                'has_company': data.company !== 'Nie podano',
                'has_budget': data.budget !== 'Nie podano',
                'has_timeline': data.timeline !== 'Nie podano'
            });
        }

        // Show loading state
        submitBtn.querySelector('.btn-text').textContent = this.getCurrentLanguage() === 'pl' ? 'Wysyłanie...' : 'Sending...';
        submitBtn.disabled = true;
        
        // Submit to Web3Forms
        this.submitToWeb3Forms(formData, submitBtn, originalText, data);
    }
    
    async submitToWeb3Forms(formData, submitBtn, originalText, data) {
        try {
            console.log('🚀 Submitting to Web3Forms API...');
            console.log('📝 Form data:', Object.fromEntries(formData));
            
            // Convert FormData to JSON for Web3Forms
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });
            
            const result = await response.json();
            console.log('📡 Web3Forms response:', response.status, result);
            
            if (response.status === 200) {
                // Success
                console.log('✅ Form submitted successfully to Web3Forms!');
                
                // GTM Event - Form Success
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit_success', {
                        'event_category': 'Contact Form',
                        'event_label': 'Web3Forms Success',
                        'service_type': data.service || 'unknown',
                        'custom_parameter_1': 'web3forms_success',
                        'value': 1
                    });
                }
                
                // DataLayer push for successful submission
                if (typeof window !== 'undefined' && window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'contact_form_success',
                        'form_name': 'contact_form',
                        'conversion_value': 1,
                        'service_type': data.service || 'unknown'
                    });
                }
                
                this.showSuccess();
                this.form.reset();
                
                // Clear labels
                const labels = this.form.querySelectorAll('label');
                labels.forEach(label => {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-muted)';
                });
                
            } else {
                console.error('❌ Web3Forms error:', result);
                throw new Error(`Web3Forms error: ${result.message || 'Unknown error'}`);
            }
            
        } catch (error) {
            console.error('❌ Form submission error:', error);
            this.showError('form', this.getCurrentLanguage() === 'pl' 
                ? 'Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub napisz na zabavchukmaks21@gmail.com' 
                : 'An error occurred while sending. Please try again or email zabavchukmaks21@gmail.com');
        } finally {
            // Reset button state
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
            this.isSubmitting = false;
        }
    }
    
    createEmailContent(data) {
        const serviceNames = {
            'onepage': 'One Page Website',
            'static': 'Strona Statyczna (Multi-page)',
            'wordpress': 'WordPress CMS',
            'ecommerce': 'Sklep E-commerce',
            'webapp': 'Aplikacja Web',
            'other': 'Projekt Indywidualny'
        };
        
        return `
NOWE ZAPYTANIE O PROJEKT - codingmaks.com

👤 KLIENT:
Imię: ${data.name}
Email: ${data.email}
Firma: ${data.company}

🎯 PROJEKT:
Typ strony: ${serviceNames[data.service] || data.service}
Budżet: ${data.budget}
Termin: ${data.timeline}

📝 OPIS PROJEKTU:
${data.message}

---
Wysłane z formularza kontaktowego na codingmaks.com
        `.trim();
    }
    
    validateForm(data) {
        let isValid = true;
        
        if (!data.name || data.name.trim().length < 2) {
            this.showError('name', this.getCurrentLanguage() === 'pl' 
                ? 'Imię musi mieć co najmniej 2 znaki' 
                : 'Name must be at least 2 characters');
            isValid = false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            this.showError('email', this.getCurrentLanguage() === 'pl' 
                ? 'Podaj poprawny adres email' 
                : 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!data.service) {
            this.showError('service', this.getCurrentLanguage() === 'pl' 
                ? 'Wybierz rodzaj strony internetowej' 
                : 'Please select a website type');
            isValid = false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            this.showError('message', this.getCurrentLanguage() === 'pl' 
                ? 'Wiadomość musi mieć co najmniej 10 znaków' 
                : 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(input) {
        const value = input.value.trim();
        const name = input.name;
        
        this.clearErrors(input);
        
        if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(name, this.getCurrentLanguage() === 'pl' 
                    ? 'Podaj poprawny adres email' 
                    : 'Please enter a valid email address');
            }
        }
    }
    
    showError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) {
            console.warn(`Field with name "${fieldName}" not found`);
            return;
        }
        
        // Try different container structures
        let container = field.closest('.form-group');
        if (!container) {
            container = field.closest('.service-selection');
        }
        if (!container) {
            container = field.closest('.service-option');
        }
        if (!container) {
            console.warn(`Container for field "${fieldName}" not found`);
            return;
        }
        
        const existingError = container.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff0080;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            font-family: var(--font-mono);
            animation: fadeIn 0.3s ease;
        `;
        
        container.appendChild(errorElement);
        
        // Only style border for input fields, not radio buttons
        if (field.type !== 'radio') {
            field.style.borderBottomColor = '#ff0080';
        }
    }
    
    clearErrors(input) {
        if (!input) {
            console.warn('Input element not provided to clearErrors');
            return;
        }
        
        // Try different container structures
        let container = input.closest('.form-group');
        if (!container) {
            container = input.closest('.service-selection');
        }
        if (!container) {
            container = input.closest('.service-option');
        }
        if (!container) {
            console.warn('Container not found for input', input);
            return;
        }
        
        const errorMessage = container.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        // Only style border for input fields, not radio buttons
        if (input.type !== 'radio') {
            input.style.borderBottomColor = '';
        }
    }
    
    showSuccess() {
        const message = this.getCurrentLanguage() === 'pl' 
            ? '✅ Wiadomość została wysłana pomyślnie!' 
            : '✅ Message sent successfully!';
        
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            background: linear-gradient(135deg, #00ff41, #00ffff);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            font-family: var(--font-mono);
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
            z-index: 1000;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    getCurrentLanguage() {
        return document.documentElement.lang || 'pl';
    }
}

// Glitch Effect for Hero Title
class GlitchEffect {
    constructor() {
        this.glitchElement = document.querySelector('.glitch');
        this.init();
    }
    
    init() {
        if (this.glitchElement) {
            setInterval(() => {
                this.triggerGlitch();
            }, 3000 + Math.random() * 5000);
        }
    }
    
    triggerGlitch() {
        this.glitchElement.style.animation = 'none';
        setTimeout(() => {
            this.glitchElement.style.animation = 'glitch 0.3s';
        }, 10);
    }
}

// Typing Effect for Terminal
class TypingEffect {
    constructor() {
        this.terminalLines = document.querySelectorAll('.terminal-line');
        this.currentLine = 0;
        this.liveTyping = document.getElementById('liveTyping');
        this.gitOutput = document.getElementById('gitOutput');
        this.commands = [
            'git status',
            'npm run build',
            'git add .',
            'git commit -m "✨ Added magic"',
            'git push origin main',
            'echo "Ready to create magic!"'
        ];
        this.currentCommand = 0;
        this.init();
    }
    
    init() {
        if (this.terminalLines.length > 0) {
            this.hideAllLines();
            this.typeLines();
            
            // Start live typing after initial terminal animation
            setTimeout(() => {
                this.startLiveTyping();
            }, 8000);
        }
    }
    
    hideAllLines() {
        this.terminalLines.forEach(line => {
            line.style.opacity = '0';
        });
    }
    
    typeLines() {
        if (this.currentLine < this.terminalLines.length) {
            const line = this.terminalLines[this.currentLine];
            line.style.opacity = '1';
            
            const command = line.querySelector('.command:not(.typing-live)');
            if (command) {
                this.typeText(command, command.textContent, () => {
                    this.currentLine++;
                    setTimeout(() => this.typeLines(), 500);
                });
            } else {
                this.currentLine++;
                setTimeout(() => this.typeLines(), 300);
            }
        }
    }
    
    typeText(element, text, callback) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                callback();
            }
        };
        
        type();
    }
    
    startLiveTyping() {
        if (!this.liveTyping) return;
        
        this.typeLiveCommand();
    }
    
    typeLiveCommand() {
        const command = this.commands[this.currentCommand];
        this.liveTyping.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < command.length) {
                this.liveTyping.textContent += command.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                
                // Show output for git status
                if (command === 'git status' && this.gitOutput) {
                    setTimeout(() => {
                        this.gitOutput.style.display = 'block';
                        this.gitOutput.style.opacity = '0';
                        setTimeout(() => {
                            this.gitOutput.style.transition = 'opacity 0.5s ease';
                            this.gitOutput.style.opacity = '1';
                        }, 100);
                    }, 1000);
                }
                
                // Move to next command
                setTimeout(() => {
                    this.currentCommand = (this.currentCommand + 1) % this.commands.length;
                    if (this.currentCommand === 0 && this.gitOutput) {
                        // Hide git output when cycling back
                        this.gitOutput.style.opacity = '0';
                        setTimeout(() => {
                            this.gitOutput.style.display = 'none';
                        }, 500);
                    }
                    setTimeout(() => this.typeLiveCommand(), 1000);
                }, 3000);
            }
        }, 100);
    }
}

// Interactive Elements
class InteractiveElements {
    constructor() {
        this.init();
    }
    
    init() {
        this.addHoverEffects();
        this.addClickEffects();
        this.addParallaxEffect();
    }
    
    addHoverEffects() {
        // Project cards hover
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Skill items hover
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(255, 0, 128, 0.1)';
                item.style.borderColor = '#ff0080';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'rgba(255, 255, 255, 0.05)';
                item.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });
        });
    }
    
    addClickEffects() {
        const buttons = document.querySelectorAll('.cta-btn, .submit-btn, .project-link');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }
    
    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.section-number');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateX(-50%) translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Floating Action Button
class FloatingActionButton {
    constructor() {
        this.fabContainer = document.getElementById('fabContainer');
        this.fabMain = document.getElementById('fabMain');
        this.fabMenu = document.getElementById('fabMenu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.fabMain) {
            this.fabMain.addEventListener('click', () => this.toggleMenu());
            
            // Setup action handlers
            this.setupActions();
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.fabContainer.contains(e.target) && this.isOpen) {
                    this.closeMenu();
                }
            });
        }
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.fabContainer.classList.add('active');
        this.isOpen = true;
        
        // GTM Event - FAB Open
        if (typeof gtag !== 'undefined') {
            gtag('event', 'fab_open', {
                'event_category': 'User Interface',
                'event_label': 'Floating Action Button Opened'
            });
        }
        
        // DataLayer push for GTM
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                'event': 'fab_interaction',
                'interaction_type': 'open',
                'ui_element': 'floating_action_button'
            });
        }
        
        // Animate items
        const items = this.fabMenu.querySelectorAll('.fab-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    closeMenu() {
        this.fabContainer.classList.remove('active');
        this.isOpen = false;
    }
    
    setupActions() {
        const items = this.fabMenu.querySelectorAll('.fab-item');
        
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = item.getAttribute('data-action');
                this.executeAction(action);
                this.closeMenu();
            });
        });
    }
    
    executeAction(action) {
        switch (action) {
            case 'scroll-top':
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                break;
                
            case 'toggle-theme':
                this.toggleTheme();
                break;
                
            case 'contact':
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
                
            case 'portfolio':
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
        }
    }
    
    toggleTheme() {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme');
        
        if (currentTheme === 'blue') {
            root.setAttribute('data-theme', 'purple');
            this.showNotification('Motyw: Fioletowy', 'Theme: Purple');
        } else if (currentTheme === 'purple') {
            root.setAttribute('data-theme', 'green');
            this.showNotification('Motyw: Zielony', 'Theme: Green');
        } else if (currentTheme === 'green') {
            root.removeAttribute('data-theme');
            this.showNotification('Motyw: Domyślny', 'Theme: Default');
        } else {
            root.setAttribute('data-theme', 'blue');
            this.showNotification('Motyw: Niebieski', 'Theme: Blue');
        }
    }
    
    showNotification(textPL, textEN) {
        const currentLang = document.documentElement.lang || 'pl';
        const text = currentLang === 'pl' ? textPL : textEN;
        
        const notification = document.createElement('div');
        notification.textContent = text;
        notification.style.cssText = `
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            background: var(--gradient-primary);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-family: var(--font-mono);
            font-size: 0.9rem;
            z-index: 1003;
            animation: slideInUp 0.3s ease, fadeOut 0.3s ease 2s forwards;
            box-shadow: 0 0 20px rgba(255, 0, 128, 0.4);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 2500);
    }
}

// Performance Monitor
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeImages();
        this.preloadCriticalResources();
        this.setupIntersectionObserver();
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
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
    }
    
    preloadCriticalResources() {
        // Preload critical fonts
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap',
            'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
        ];
        
        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'style';
            link.onload = function() { this.rel = 'stylesheet'; };
            document.head.appendChild(link);
        });
    }
    
    setupIntersectionObserver() {
        // Optimize scroll events
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// Creative Loading Screen
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressPercent = document.getElementById('progressPercent');
        this.currentProgress = 0;
        this.targetProgress = 100;
        this.loadingSteps = [
            { text: 'Inicjalizacja...', progress: 20 },
            { text: 'Ładowanie komponentów...', progress: 40 },
            { text: 'Przygotowywanie animacji...', progress: 60 },
            { text: 'Kompilowanie kreatywności...', progress: 80 },
            { text: 'Gotowe!', progress: 100 }
        ];
        this.currentStep = 0;
        
        this.init();
    }
    
    init() {
        if (this.loadingScreen) {
            // Start progress animation
            setTimeout(() => {
                this.animateProgress();
            }, 2500); // Start after code animation
            
            // Hide loading screen after animation
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 4000);
        }
    }
    
    animateProgress() {
        const step = this.loadingSteps[this.currentStep];
        if (!step) return;
        
        const progressInterval = setInterval(() => {
            if (this.currentProgress < step.progress) {
                this.currentProgress += 2;
                if (this.progressPercent) {
                    this.progressPercent.textContent = this.currentProgress;
                }
            } else {
                clearInterval(progressInterval);
                this.currentStep++;
                
                if (this.currentStep < this.loadingSteps.length) {
                    setTimeout(() => {
                        this.animateProgress();
                    }, 300);
                }
            }
        }, 50);
    }
    
    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
            
            // Remove from DOM after transition
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                document.body.classList.add('loaded');
                
                // Initialize main components after loading
                this.initMainComponents();
            }, 1000);
        }
    }
    
    initMainComponents() {
        // Core functionality
        const matrixEffect = new MatrixEffect();
        const advancedCursor = new AdvancedCursor();
        // Language switcher removed - Polish only
        const navigation = new Navigation();
        const scrollAnimations = new ScrollAnimations();
        const contactForm = new ContactForm();
        const floatingActionButton = new FloatingActionButton();
        
        // Visual effects
        const glitchEffect = new GlitchEffect();
        const typingEffect = new TypingEffect();
        const interactiveElements = new InteractiveElements();
        const performanceOptimizer = new PerformanceOptimizer();
        
        // Add hero stats observer
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scrollAnimations.animateStats();
                        statsObserver.unobserve(entry.target);
                    }
                });
            });
            statsObserver.observe(heroStats);
        }
        
        // Trigger entrance animations
        this.triggerEntranceAnimations();
    }
    
    triggerEntranceAnimations() {
        // Add entrance animations to hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 500);
        }
        
        // Animate navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                navbar.style.transition = 'transform 0.8s ease';
                navbar.style.transform = 'translateY(0)';
            }, 800);
        }
        
        // Animate language toggle
        const langToggle = document.querySelector('.language-toggle');
        if (langToggle) {
            langToggle.style.opacity = '0';
            langToggle.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                langToggle.style.transition = 'all 0.6s ease';
                langToggle.style.opacity = '1';
                langToggle.style.transform = 'translateY(0)';
            }, 1000);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading only on hard refresh (when no session flag exists or performance navigation type is reload)
    const isHardRefresh = !sessionStorage.getItem('codingmaks_visited') || 
                         (performance.navigation && performance.navigation.type === 1) ||
                         (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]?.type === 'reload');
    
    if (isHardRefresh) {
        sessionStorage.setItem('codingmaks_visited', 'true');
        const loadingScreen = new LoadingScreen();
    } else {
        // Skip loading animation and initialize directly
        const loadingScreenEl = document.getElementById('loadingScreen');
        if (loadingScreenEl) {
            loadingScreenEl.style.display = 'none';
        }
        
        // Initialize all components immediately
        const matrixEffect = new MatrixEffect();
        const advancedCursor = new AdvancedCursor();
        // Language switcher removed - Polish only
        const navigation = new Navigation();
        const scrollAnimations = new ScrollAnimations();
        const contactForm = new ContactForm();
        const floatingActionButton = new FloatingActionButton();
        
        // Track project clicks
        const projectLinks = document.querySelectorAll('.project-card .project-link');
        projectLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                const projectCard = link.closest('.project-card');
                const projectName = projectCard.querySelector('h3')?.textContent || `Project ${index + 1}`;
                const projectUrl = link.href;
                
                // GTM Event - Project Click
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'project_click', {
                        'event_category': 'Portfolio',
                        'event_label': projectName,
                        'project_name': projectName,
                        'project_url': projectUrl,
                        'project_position': index + 1,
                        'outbound_link': true
                    });
                }
                
                // DataLayer push for GTM
                if (typeof window !== 'undefined' && window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'project_interaction',
                        'interaction_type': 'click',
                        'project_name': projectName,
                        'project_url': projectUrl,
                        'project_position': index + 1,
                        'link_type': 'external'
                    });
                }
            });
        });
        
        // Cookie Management
        const cookieManager = new CookieManager();
        
        // Visual effects
        const glitchEffect = new GlitchEffect();
        const typingEffect = new TypingEffect();
        const interactiveElements = new InteractiveElements();
        const performanceOptimizer = new PerformanceOptimizer();
        
        // Trigger entrance animations for main content
        setTimeout(() => {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.opacity = '1';
                heroSection.style.transform = 'translateY(0)';
            }
        }, 100);
    }
});

// Cookie Management System
class CookieManager {
    constructor() {
        this.cookieBanner = document.getElementById('cookieBanner');
        this.cookieModal = document.getElementById('cookieModal');
        this.preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false
        };
        
        this.init();
    }
    
    init() {
        // Check if user has already made cookie choices
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            console.log('No cookie consent found, showing banner');
            this.showBanner();
        } else {
            console.log('Cookie consent found, applying preferences');
            this.preferences = JSON.parse(cookieConsent);
            this.applyPreferences();
        }
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Banner buttons
        const acceptAll = document.getElementById('acceptAllCookies');
        const cookieSettings = document.getElementById('cookieSettings');
        const rejectCookies = document.getElementById('rejectCookies');
        
        if (acceptAll) {
            acceptAll.addEventListener('click', () => this.acceptAll());
        }
        
        if (cookieSettings) {
            cookieSettings.addEventListener('click', () => this.showModal());
        }
        
        if (rejectCookies) {
            rejectCookies.addEventListener('click', () => this.rejectAll());
        }
        
        // Modal buttons
        const closeCookieModal = document.getElementById('closeCookieModal');
        const saveCookieSettings = document.getElementById('saveCookieSettings');
        
        if (closeCookieModal) {
            closeCookieModal.addEventListener('click', () => this.hideModal());
        }
        
        if (saveCookieSettings) {
            saveCookieSettings.addEventListener('click', () => this.saveSettings());
        }
        
        // Modal backdrop click
        if (this.cookieModal) {
            this.cookieModal.addEventListener('click', (e) => {
                if (e.target === this.cookieModal) {
                    this.hideModal();
                }
            });
        }
    }
    
    showBanner() {
        if (this.cookieBanner) {
            const hasVisited = localStorage.getItem('hasVisited');
            
            if (hasVisited === 'true') {
                // Returning user - show immediately
                setTimeout(() => {
                    this.cookieBanner.classList.add('show');
                    console.log('Cookie banner displayed for returning user');
                }, 500);
            } else {
                // New user - show after loading animation completes
                setTimeout(() => {
                    this.cookieBanner.classList.add('show');
                    console.log('Cookie banner displayed after loading animation');
                }, 4500); // 4.5s - after 3s loading + 1.5s transition
            }
        } else {
            console.error('Cookie banner element not found!');
        }
    }
    
    hideBanner() {
        if (this.cookieBanner) {
            this.cookieBanner.classList.remove('show');
        }
    }
    
    showModal() {
        if (this.cookieModal) {
            // Set current preferences in modal
            this.updateModalSettings();
            this.cookieModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    hideModal() {
        if (this.cookieModal) {
            this.cookieModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    updateModalSettings() {
        const analyticsToggle = document.getElementById('analytics');
        const marketingToggle = document.getElementById('marketing');
        const preferencesToggle = document.getElementById('preferences');
        
        if (analyticsToggle) analyticsToggle.checked = this.preferences.analytics;
        if (marketingToggle) marketingToggle.checked = this.preferences.marketing;
        if (preferencesToggle) preferencesToggle.checked = this.preferences.preferences;
    }
    
    acceptAll() {
        this.preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
        };
        
        this.savePreferences();
        this.hideBanner();
        this.applyPreferences();
        
        // GTM Event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cookie_consent', {
                'event_category': 'Privacy',
                'event_label': 'Accept All Cookies'
            });
        }
    }
    
    rejectAll() {
        this.preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false
        };
        
        this.savePreferences();
        this.hideBanner();
        this.applyPreferences();
        
        // GTM Event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cookie_consent', {
                'event_category': 'Privacy',
                'event_label': 'Reject All Cookies'
            });
        }
    }
    
    saveSettings() {
        const analyticsToggle = document.getElementById('analytics');
        const marketingToggle = document.getElementById('marketing');
        const preferencesToggle = document.getElementById('preferences');
        
        this.preferences.analytics = analyticsToggle ? analyticsToggle.checked : false;
        this.preferences.marketing = marketingToggle ? marketingToggle.checked : false;
        this.preferences.preferences = preferencesToggle ? preferencesToggle.checked : false;
        
        this.savePreferences();
        this.hideModal();
        this.hideBanner();
        this.applyPreferences();
        
        // GTM Event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cookie_consent', {
                'event_category': 'Privacy',
                'event_label': 'Custom Cookie Settings',
                'analytics_consent': this.preferences.analytics,
                'marketing_consent': this.preferences.marketing,
                'preferences_consent': this.preferences.preferences
            });
        }
    }
    
    savePreferences() {
        localStorage.setItem('cookieConsent', JSON.stringify(this.preferences));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
    }
    
    applyPreferences() {
        // Apply analytics preferences
        if (this.preferences.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }
        
        // Apply marketing preferences
        if (this.preferences.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
        
        // Apply preferences cookies
        if (this.preferences.preferences) {
            this.enablePreferences();
        }
    }
    
    enableAnalytics() {
        // Enable Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }
    
    disableAnalytics() {
        // Disable Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }
    
    enableMarketing() {
        // Enable marketing cookies
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
    }
    
    disableMarketing() {
        // Disable marketing cookies
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
    }
    
    enablePreferences() {
        // Enable preferences cookies (theme, language, etc.)
        // Already handled by existing localStorage usage
    }
    
    // Method to check if specific cookie category is allowed
    isAllowed(category) {
        return this.preferences[category] || false;
    }
    
    // Method to reset for testing (call from console)
    resetForTesting() {
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieConsentDate');
        localStorage.removeItem('hasVisited');
        localStorage.removeItem('firstVisit');
        console.log('All localStorage cleared - refresh page to test first visit experience');
    }
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .loaded {
        animation: fadeIn 0.8s ease;
    }
    
    .menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Main Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components...');
    
    // Check if user is returning visitor
    const hasVisited = localStorage.getItem('hasVisited');
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!hasVisited) {
        // First time visitor - show loading screen
        console.log('First time visitor - showing loading screen');
        localStorage.setItem('hasVisited', 'true');
        localStorage.setItem('firstVisit', new Date().toISOString());
        
        // Hide loading screen after animation
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }
        }, 3000); // Show for 3 seconds
    } else {
        // Returning visitor - hide loading screen immediately
        console.log('Returning visitor - skipping loading screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
    
    // Initialize Cookie Manager
    const cookieManager = new CookieManager();
    console.log('Cookie Manager initialized');
    
    // Make reset method available globally for testing
    window.resetForTesting = () => cookieManager.resetForTesting();
    
    // Initialize other components
    const navigation = new Navigation();
    const contactForm = new ContactForm();
    const floatingActionButton = new FloatingActionButton();
    const advancedCursor = new AdvancedCursor();
    const languageSwitcher = new LanguageSwitcher();
    
    console.log('All components initialized');
});