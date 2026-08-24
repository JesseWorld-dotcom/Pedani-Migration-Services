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

// For testimonial (Improved Accessibility)

// Testimonial — Modern CSS + JavaScript Fallback

document.addEventListener("DOMContentLoaded", () => {
  const testimonialSection = document.querySelector("#testimonial");
  const slider = testimonialSection?.querySelector(".testimonial-slider");
  const controls = testimonialSection?.querySelector(
    ".testimonial-fallback-controls"
  );

  if (!testimonialSection || !slider || !controls) return;

  const cards = [
    ...slider.querySelectorAll(".testimonials-card")
  ];

  if (!cards.length) return;


  /* =========================================
     CHECK MODERN CSS SUPPORT
  ========================================= */

  const supportsScrollMarkers =
    CSS.supports("scroll-marker-group: after") &&
    CSS.supports(
      "selector(.testimonials-card::scroll-marker)"
    );

  const supportsScrollButtons =
    CSS.supports(
      "selector(.testimonial-slider::scroll-button(left))"
    ) &&
    CSS.supports(
      "selector(.testimonial-slider::scroll-button(right))"
    );

  const supportsModernTestimonials =
    supportsScrollMarkers &&
    supportsScrollButtons;


  /* =========================================
     MODERN BROWSER
     
     Let CSS handle the controls.
  ========================================= */

  if (supportsModernTestimonials) {
    return;
  }


  /* =========================================
     FALLBACK
  ========================================= */

  testimonialSection.classList.add("js-fallback");


  /* =========================================
     PREVIOUS BUTTON
  ========================================= */

  const previousButton = document.createElement("button");

  previousButton.type = "button";
  previousButton.className =
    "testimonial-fallback-prev";

  previousButton.setAttribute(
    "aria-label",
    "Previous testimonial"
  );

  previousButton.textContent = "←";


  /* =========================================
     NEXT BUTTON
  ========================================= */

  const nextButton = document.createElement("button");

  nextButton.type = "button";
  nextButton.className =
    "testimonial-fallback-next";

  nextButton.setAttribute(
    "aria-label",
    "Next testimonial"
  );

  nextButton.textContent = "→";


  /* =========================================
     DOTS
  ========================================= */

  const dotsContainer = document.createElement("div");

  dotsContainer.className =
    "testimonial-fallback-dots";

  dotsContainer.setAttribute(
    "role",
    "group"
  );

  dotsContainer.setAttribute(
    "aria-label",
    "Choose a testimonial"
  );


  const dots = cards.map((card, index) => {

    const dot = document.createElement("button");

    dot.type = "button";

    dot.className =
      "testimonial-fallback-dot";

    dot.setAttribute(
      "aria-label",
      `Go to testimonial ${index + 1}`
    );

    dot.setAttribute(
      "aria-current",
      index === 0 ? "true" : "false"
    );

    dot.addEventListener("click", () => {
      goToSlide(index);
    });

    dotsContainer.appendChild(dot);

    return dot;
  });


  /* =========================================
     INSERT CONTROLS
  ========================================= */

  controls.append(
    previousButton,
    dotsContainer,
    nextButton
  );


  /* =========================================
     STATE
  ========================================= */

  let currentIndex = 0;


  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================
     GO TO SLIDE
  ========================================= */

  function goToSlide(index) {

    currentIndex = Math.max(
      0,
      Math.min(index, cards.length - 1)
    );

    cards[currentIndex].scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start"
    });

    updateControls();
  }


  /* =========================================
     UPDATE CONTROLS
  ========================================= */

  function updateControls() {

    previousButton.disabled =
      currentIndex === 0;

    nextButton.disabled =
      currentIndex === cards.length - 1;


    dots.forEach((dot, index) => {

      dot.setAttribute(
        "aria-current",
        index === currentIndex
          ? "true"
          : "false"
      );

    });
  }


  /* =========================================
     PREVIOUS
  ========================================= */

  previousButton.addEventListener("click", () => {

    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }

  });


  /* =========================================
     NEXT
  ========================================= */

  nextButton.addEventListener("click", () => {

    if (currentIndex < cards.length - 1) {
      goToSlide(currentIndex + 1);
    }

  });


  /* =========================================
     MANUAL SCROLL
  ========================================= */

  let scrollTimeout;

  slider.addEventListener(
    "scroll",
    () => {

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {

        const sliderLeft =
          slider.getBoundingClientRect().left;

        let closestIndex = 0;
        let closestDistance = Infinity;


        cards.forEach((card, index) => {

          const distance = Math.abs(
            card.getBoundingClientRect().left -
            sliderLeft
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }

        });


        currentIndex = closestIndex;

        updateControls();

      }, 100);

    },
    { passive: true }
  );


  /* =========================================
     KEYBOARD
  ========================================= */

  slider.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

      event.preventDefault();

      if (currentIndex < cards.length - 1) {
        goToSlide(currentIndex + 1);
      }

    }


    if (event.key === "ArrowLeft") {

      event.preventDefault();

      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }

    }

  });


  /* =========================================
     INITIAL STATE
  ========================================= */

  updateControls();

});