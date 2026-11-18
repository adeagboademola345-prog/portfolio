/* Marque landing — small, dependency-free enhancements. */
(function () {
  'use strict';

  var header = document.querySelector('.top');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.top-nav a'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function onScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window && sections.length) {
    var visible = new Set();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        navLinks.forEach(function (link) {
          var id = link.getAttribute('href').slice(1);
          if (visible.has(id)) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // Accordion feel for the FAQ: one open answer at a time.
  var questions = Array.prototype.slice.call(document.querySelectorAll('.faq details.q'));
  questions.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      questions.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
