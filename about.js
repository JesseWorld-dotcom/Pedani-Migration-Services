  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const navOverlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-side-menu a");


  function openMenu() {

    navbar.classList.add("menu-open");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-bars");
  }


  function closeMenu() {

    navbar.classList.remove("menu-open");
    navOverlay.classList.remove("menu-open")

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

    const icon = menuToggle.querySelector("i");

    // icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }


  menuToggle?.addEventListener("click", () => {

    if (navbar.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }

  });


  menuClose?.addEventListener("click", closeMenu);

  navOverlay?.addEventListener("click", closeMenu);


  navLinks.forEach(link => {

    link.addEventListener("click", closeMenu);

  });


const counters = document.querySelectorAll(".stats h5");

const observers = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const suffix = counter.dataset.suffix || "";

      let current = 0;
      const duration = 1500;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        const ease = 1 - Math.pow(1 - progress, 3);

        current = Math.floor(ease * target);
        counter.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
      observer.unobserve(counter);
    });
  },
  {
    threshold: 0.5
  }
);

counters.forEach((counter) => {
  observers.observe(counter);
});