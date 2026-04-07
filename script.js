document.addEventListener("DOMContentLoaded", () => {
    // Page switching function
    window.showPage = function(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page + '-page').classList.add('active');
        
        // Update nav active
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        if (page === 'home') {
            document.querySelector('a[onclick*="home"]').classList.add('active');
        } else if (page === 'america') {
            document.querySelector('a[onclick*="america"]').classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Re-observe hidden elements for animations
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach(el => {
            el.classList.remove('show');
            observer.observe(el);
        });
    };

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once it's shown
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Typing effect for long texts on mobile fallback
    const typingElement = document.querySelector('.typing-text');
    if (typingElement && window.innerWidth <= 768) {
        typingElement.style.whiteSpace = 'normal';
        typingElement.style.borderRight = 'none';
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if open
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
});