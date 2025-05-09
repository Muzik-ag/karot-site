
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrolling();
    initFAQ();
    initTestimonialCarousel();
    initPortfolioFilter();
    initContactForm();
    initBackToTop();
});

// Obsługa menu mobilnego
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        const navLinks = document.querySelectorAll('#nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Płynne przewijanie i nagłówek
function initScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }
}

// FAQ
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling?.classList.remove('active');
                }
            });
            question.classList.toggle('active');
            question.nextElementSibling?.classList.toggle('active');
        });
    });
}

// Karuzela opinii
function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    if (track && prevBtn && nextBtn && dotsContainer) {
        const testimonials = track.querySelectorAll('.testimonial');
        let currentIndex = 0;
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        function goToSlide(index) {
            if (index < 0) index = testimonials.length - 1;
            if (index >= testimonials.length) index = 0;
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            currentIndex = index;
        }
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        let interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
        track.addEventListener('mouseenter', () => clearInterval(interval));
        track.addEventListener('mouseleave', () => {
            clearInterval(interval);
            interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
        });
    }
}

// Filtrowanie portfolio
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Formularz kontaktowy
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';
            setTimeout(() => {
                alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
}

// Przycisk powrót do góry
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) backToTopBtn.classList.add('active');
            else backToTopBtn.classList.remove('active');
        });
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Klikalność kafelków
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card[data-link], .portfolio-item[data-link], .blog-post[data-link]')
        .forEach(card => {
            card.addEventListener('click', function (e) {
                if (!e.target.closest('a')) {
                    window.location.href = this.getAttribute('data-link');
                }
            });
        });

    document.querySelectorAll('.portfolio-item a, .blog-post a').forEach(el => {
        const container = el.closest('.portfolio-item, .blog-post');
        if (container && !container.dataset.link) {
            container.setAttribute('data-link', el.getAttribute('href'));
        }
    });

    document.querySelectorAll('.service-card').forEach(card => {
        if (!card.dataset.link) {
            const a = card.querySelector('a[href]');
            if (a) card.dataset.link = a.getAttribute('href');
        }
    });
});
