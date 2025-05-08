// Funkcja inicjalizująca wszystkie skrypty po załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    // Obsługa menu mobilnego
    initMobileMenu();
    
    // Obsługa przewijania strony
    initScrolling();
    
    // Obsługa FAQ
    initFAQ();
    
    // Obsługa karuzeli z opiniami
    initTestimonialCarousel();
    
    // Obsługa filtrowania portfolio
    initPortfolioFilter();
    
    // Obsługa formularza kontaktowego
    initContactForm();
    
    // Obsługa przycisku "Back to top"
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
        
        // Zamykanie menu po kliknięciu w link
        const navLinks = document.querySelectorAll('#nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Obsługa przewijania strony
function initScrolling() {
    // Efekt płynnego przewijania dla linków nawigacyjnych
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Zmiana stylu nagłówka przy przewijaniu
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Obsługa FAQ
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Zamknij wszystkie inne odpowiedzi
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
            
            // Przełącz aktualną odpowiedź
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
}

// Obsługa karuzeli z opiniami
function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    
    if (track && prevBtn && nextBtn && dotsContainer) {
        const testimonials = track.querySelectorAll('.testimonial');
        let currentIndex = 0;
        
        // Tworzenie kropek nawigacyjnych
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        
        // Funkcja przejścia do konkretnego slajdu
        function goToSlide(index) {
            if (index < 0) index = testimonials.length - 1;
            if (index >= testimonials.length) index = 0;
            
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Aktualizacja kropek
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        // Obsługa przycisków nawigacyjnych
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        // Automatyczne przewijanie co 5 sekund
        let interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
        
        // Zatrzymanie automatycznego przewijania po najechaniu myszką
        track.addEventListener('mouseenter', () => clearInterval(interval));
        track.addEventListener('mouseleave', () => {
            clearInterval(interval);
            interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
        });
    }
}

// Obsługa filtrowania portfolio
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Usuń klasę active ze wszystkich przycisków
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Dodaj klasę active do klikniętego przycisku
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtruj elementy portfolio
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

// Obsługa formularza kontaktowego
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Symulacja wysyłania formularza
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';
            
            // Symulacja opóźnienia sieciowego
            setTimeout(() => {
                alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
}

// Obsługa przycisku "Back to top"
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animacje przy przewijaniu (opcjonalnie)
function revealOnScroll() {
    const elements = document.querySelectorAll('.service-item, .process-step, .portfolio-item, .testimonial-card, .pricing-plan');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// Inicjalizacja animacji przy przewijaniu
window.addEventListener('load', () => {
    // Dodaj klasę dla animacji
    document.querySelectorAll('.service-item, .process-step, .portfolio-item, .testimonial-card, .pricing-plan').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Wywołaj funkcję po załadowaniu strony
    revealOnScroll();
    
    // Dodaj nasłuchiwanie na przewijanie
    window.addEventListener('scroll', revealOnScroll);
});



  // Klikalność kafelków
  document.querySelectorAll('.service-card[data-link], .portfolio-item[data-link], .blog-post[data-link]')
    .forEach(card => {
      card.addEventListener('click', function (e) {
        if (!e.target.closest('a')) {
          window.location.href = this.getAttribute('data-link');
        }
      });
    });

  // Automatyczne przypisanie data-link z pierwszego <a>
  document.querySelectorAll('.portfolio-item a, .blog-post a').forEach(el => {
    const container = el.closest('.portfolio-item, .blog-post');
    if (container && !container.dataset.link) {
      container.setAttribute('data-link', el.getAttribute('href'));
    }
  });


/**
 * Obsługa klikalnych kafelków: .service-card, .portfolio-item, .blog-post
 * Kliknięcie w dowolne miejsce kafelka (poza <a>) przekierowuje na stronę z atrybutu data-link.
 */

// Klikalność kafelków z przypisanym data-link
document.querySelectorAll('.service-card[data-link], .portfolio-item[data-link], .blog-post[data-link]')
  .forEach(card => {
    card.addEventListener('click', function (e) {
      if (!e.target.closest('a')) {
        window.location.href = this.getAttribute('data-link');
      }
    });
  });

/**
 * Automatyczne przypisanie data-link do .portfolio-item i .blog-post
 * Jeśli nie ustawiono data-link, pobierany jest z pierwszego <a href="..."> wewnątrz.
 */
document.querySelectorAll('.portfolio-item a, .blog-post a').forEach(el => {
  const container = el.closest('.portfolio-item, .blog-post');
  if (container && !container.dataset.link) {
    container.setAttribute('data-link', el.getAttribute('href'));
  }
});

/**
 * Automatyczne przypisanie data-link do .service-card
 * Działa analogicznie jak powyżej, na wypadek brakującego atrybutu.
 */
document.querySelectorAll('.service-card').forEach(card => {
  if (!card.dataset.link) {
    const a = card.querySelector('a[href]');
    if (a) {
      card.dataset.link = a.getAttribute('href');
    }
  }
});