// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading animation
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Hide loading overlay after 2 seconds or when page is loaded, whichever comes first
    const hideLoader = () => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    };

    // Hide loader after 2 seconds maximum
    setTimeout(hideLoader, 2000);

    // Also hide loader when page is fully loaded
    window.addEventListener('load', hideLoader);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });

        card.addEventListener('mouseleave', (e) => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const updateCounter = () => {
            current += increment;
            counter.textContent = Math.round(current);

            if (current < target) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });

    // Typing effect for hero text
    const heroText = document.querySelector('.hero h1');
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(heroText);

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Email handling function
    function sendMail(event) {
        event.preventDefault();

        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const params = {
            to_name: "BMR Manpower",
            from_name: document.getElementById('name').value,
            reply_to: document.getElementById('email').value,
            phone_number: document.getElementById('phone').value,
            job_category: document.getElementById('job_category').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_ruhaanim', 'template_uwmxknh', params)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('contactForm').reset();
                // Fix thank you page redirect with correct path
                window.location.href = 'https://satisoff.github.io/ProjectBMR/thank-you.html';
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                alert('Failed to send message. Please try again.');
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });

        return false;
    }

    // Remove the form event listeners that were preventing submission
});
