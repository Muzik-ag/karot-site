// Inicjalizacja Vue.js dla interaktywnych elementów
const app = new Vue({
    el: '#app',
    data: {
        isMenuOpen: false,
        currentSection: 'start',
        isBackToTopVisible: false
    },
    methods: {
        scrollToSection(sectionId) {
            this.isMenuOpen = false;
            document.body.style.overflow = '';
            const section = document.getElementById(sectionId);
            if (section) {
                const headerHeight = document.querySelector('.sticky-header').offsetHeight;
                const sectionTop = section.offsetTop - headerHeight;
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
                this.currentSection = sectionId;
            }
        },
        handleScroll() {
            // Obsługa przycisku "powrót do góry"
            this.isBackToTopVisible = window.scrollY > 300;
            // Aktualizacja aktywnej sekcji podczas przewijania
            const sections = document.querySelectorAll('section');
            const headerHeight = document.querySelector('.sticky-header').offsetHeight;
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.id;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    this.currentSection = sectionId;
                }
            });
        }
    },
    mounted() {
        // Nasłuchiwanie zdarzenia przewijania
        window.addEventListener('scroll', this.handleScroll);
        // Inicjalizacja formularza kontaktowego
        initContactForm();
        // Inicjalizacja mapy Google (można zastąpić rzeczywistym API)
        initMap();
    },
    beforeDestroy() {
        // Usunięcie nasłuchiwania zdarzenia przewijania
        window.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
        isBackToTopVisible(visible) {
            const backToTopButton = document.getElementById('back-to-top');
            if (backToTopButton) {
                backToTopButton.classList.toggle('visible', visible);
            }
        }
    }
});

// Obsługa menu hamburger za pomocą czystego JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('open');
            document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Nowa implementacja akordeonu FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Zamknij wszystkie inne elementy
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const toggle = otherItem.querySelector('.faq-toggle i');
                    if (toggle) toggle.className = 'fas fa-plus';
                }
            });
            // Przełącz stan aktualnego elementu
            item.classList.toggle('active');
            // Zmień ikonę
            const toggle = item.querySelector('.faq-toggle i');
            if (toggle) {
                toggle.className = item.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
            }
        });
    });

    // Obsługa przycisku powrotu do góry
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Formularz kontaktowy
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Walidacja formularza
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            if (!name || !email || !subject || !message) {
                alert('Proszę wypełnić wszystkie wymagane pola.');
                return;
            }
            // Symulacja wysyłania formularza
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Wysyłanie...';
            // Symulacja opóźnienia wysyłki
            setTimeout(() => {
                alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }
}

// Obsługa animacji przy przewijaniu
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card');
    // Funkcja sprawdzająca, czy element jest widoczny w oknie przeglądarki
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    // Funkcja dodająca klasę animate do widocznych elementów
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animate')) {
                element.classList.add('animate');
            }
        });
    }
    // Nasłuchiwanie zdarzenia przewijania
    window.addEventListener('scroll', handleScroll);
    // Wywołanie funkcji przy załadowaniu strony
    handleScroll();
});

// Obsługa newslettera
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            if (!email) {
                alert('Proszę podać adres email.');
                return;
            }
            // Symulacja zapisania do newslettera
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Zapisywanie...';
            setTimeout(() => {
                alert('Dziękujemy za zapisanie się do newslettera!');
                newsletterForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1000);
        });
    }
});

// Kod dla wyświetlania opinii w siatce
document.addEventListener('DOMContentLoaded', function() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    // Dodanie klasy animate do elementów opinii
    testimonialItems.forEach((item, index) => {
        // Dodanie opóźnienia animacji w zależności od indeksu
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 200);
    });
});
