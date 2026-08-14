// Highlights the active tab in the sticky folder navigation
// based on which section is currently in view.

(function () {
  const tabs = Array.from(document.querySelectorAll('.tab-nav__tab'));
  const sections = tabs
    .map((tab) => document.querySelector(tab.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    tabs.forEach((tab) => {
      tab.classList.toggle('is-active', tab.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setActive(tab.getAttribute('href').slice(1)));
  });
})();
