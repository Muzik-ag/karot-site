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