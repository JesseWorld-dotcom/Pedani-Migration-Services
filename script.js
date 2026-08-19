document.addEventListener("DOMContentLoaded", () => {

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

    icon.classList.remove("fa-xmark");
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


  /* =====================================================
     DESTINATION SLIDER
  ===================================================== */

  const destinationContainer =
    document.querySelector(".destination .img-container");

  const destinationItems =
    document.querySelectorAll(".destination .img-item");

  const destinationPrev =
    document.querySelector(".destination-prev");

  const destinationNext =
    document.querySelector(".destination-next");

  const destinationDots =
    document.querySelector(".destination-dots");


  let destinationIndex = 0;

  let destinationTimer;


  /* Create destination dots */

  if (destinationDots) {

    destinationItems.forEach((_, index) => {

      const dot = document.createElement("button");

      dot.className = "destination-dot";

      dot.setAttribute(
        "aria-label",
        `Go to destination ${index + 1}`
      );

      dot.addEventListener("click", () => {

        destinationIndex = index;

        showDestination(destinationIndex);

        restartDestinationTimer();

      });

      destinationDots.appendChild(dot);

    });

  }


  function showDestination(index) {

    if (!destinationContainer) return;

    const isMobile = window.innerWidth <= 700;

    if (!isMobile) return;


    const slideWidth =
      destinationContainer.clientWidth;

    destinationContainer.scrollTo({

      left: slideWidth * index,

      behavior: "smooth"

    });


    updateDestinationDots();

  }


  function updateDestinationDots() {

    const dots =
      document.querySelectorAll(".destination-dot");

    dots.forEach((dot, index) => {

      dot.classList.toggle(
        "active",
        index === destinationIndex
      );

    });

  }


  function nextDestination() {

    destinationIndex++;

    if (
      destinationIndex >=
      destinationItems.length
    ) {

      destinationIndex = 0;

    }

    showDestination(destinationIndex);

  }


  function previousDestination() {

    destinationIndex--;

    if (destinationIndex < 0) {

      destinationIndex =
        destinationItems.length - 1;

    }

    showDestination(destinationIndex);

  }


  destinationNext?.addEventListener(
    "click",
    () => {

      nextDestination();

      restartDestinationTimer();

    }
  );


  destinationPrev?.addEventListener(
    "click",
    () => {

      previousDestination();

      restartDestinationTimer();

    }
  );


  function startDestinationTimer() {

    if (window.innerWidth > 700) return;

    clearInterval(destinationTimer);

    destinationTimer =
      setInterval(nextDestination, 4000);

  }


  function restartDestinationTimer() {

    clearInterval(destinationTimer);

    startDestinationTimer();

  }


  /* =====================================================
     TESTIMONIAL SLIDER
  ===================================================== */

  const testimonialContainer =
    document.querySelector(".testimonial-grid");

  const testimonialCards =
    document.querySelectorAll(".testimonial-card");

  const testimonialPrev =
    document.querySelector(".testimonial-prev");

  const testimonialNext =
    document.querySelector(".testimonial-next");

  const testimonialDots =
    document.querySelector(".testimonial-dots");


  let testimonialIndex = 0;

  let testimonialTimer;


  /* Create testimonial dots */

  if (testimonialDots) {

    testimonialCards.forEach((_, index) => {

      const dot = document.createElement("button");

      dot.className = "testimonial-dot";

      dot.setAttribute(
        "aria-label",
        `Go to testimonial ${index + 1}`
      );

      dot.addEventListener("click", () => {

        testimonialIndex = index;

        showTestimonial(testimonialIndex);

        restartTestimonialTimer();

      });

      testimonialDots.appendChild(dot);

    });

  }


  function showTestimonial(index) {

    if (!testimonialContainer) return;

    const isMobile =
      window.innerWidth <= 700;

    if (!isMobile) return;


    const slideWidth =
      testimonialContainer.clientWidth;

    testimonialContainer.scrollTo({

      left: slideWidth * index,

      behavior: "smooth"

    });


    updateTestimonialDots();

  }


  function updateTestimonialDots() {

    const dots =
      document.querySelectorAll(".testimonial-dot");

    dots.forEach((dot, index) => {

      dot.classList.toggle(
        "active",
        index === testimonialIndex
      );

    });

  }


  function nextTestimonial() {

    testimonialIndex++;

    if (
      testimonialIndex >=
      testimonialCards.length
    ) {

      testimonialIndex = 0;

    }

    showTestimonial(testimonialIndex);

  }


  function previousTestimonial() {

    testimonialIndex--;

    if (testimonialIndex < 0) {

      testimonialIndex =
        testimonialCards.length - 1;

    }

    showTestimonial(testimonialIndex);

  }


  testimonialNext?.addEventListener(
    "click",
    () => {

      nextTestimonial();

      restartTestimonialTimer();

    }
  );


  testimonialPrev?.addEventListener(
    "click",
    () => {

      previousTestimonial();

      restartTestimonialTimer();

    }
  );


  function startTestimonialTimer() {

    if (window.innerWidth > 700) return;

    clearInterval(testimonialTimer);

    testimonialTimer =
      setInterval(nextTestimonial, 5000);

  }


  function restartTestimonialTimer() {

    clearInterval(testimonialTimer);

    startTestimonialTimer();

  }


  /* =====================================================
     RESPONSIVE SETUP
  ===================================================== */

  function setupSliders() {

    if (window.innerWidth <= 700) {

      showDestination(destinationIndex);

      showTestimonial(testimonialIndex);

      startDestinationTimer();

      startTestimonialTimer();

    } else {

      clearInterval(destinationTimer);

      clearInterval(testimonialTimer);

    }

  }


  setupSliders();


  window.addEventListener(
    "resize",
    setupSliders
  );


  /* =====================================================
     SWIPE SUPPORT
  ===================================================== */

  let destinationStartX = 0;
  let testimonialStartX = 0;


  destinationContainer?.addEventListener(
    "touchstart",
    event => {

      destinationStartX =
        event.touches[0].clientX;

    },
    { passive: true }
  );


  destinationContainer?.addEventListener(
    "touchend",
    event => {

      const endX =
        event.changedTouches[0].clientX;

      const distance =
        destinationStartX - endX;


      if (Math.abs(distance) < 50) return;


      if (distance > 0) {

        nextDestination();

      } else {

        previousDestination();

      }

      restartDestinationTimer();

    },
    { passive: true }
  );


  testimonialContainer?.addEventListener(
    "touchstart",
    event => {

      testimonialStartX =
        event.touches[0].clientX;

    },
    { passive: true }
  );


  testimonialContainer?.addEventListener(
    "touchend",
    event => {

      const endX =
        event.changedTouches[0].clientX;

      const distance =
        testimonialStartX - endX;


      if (Math.abs(distance) < 50) return;


      if (distance > 0) {

        nextTestimonial();

      } else {

        previousTestimonial();

      }

      restartTestimonialTimer();

    },
    { passive: true }
  );

});

// Counter Effect
  const counters = document.querySelectorAll(".stat strong");
  const analytics = document.querySelector(".analytics");

  function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOut * target);

      // Special formatting for 5000 → 5K+
      if (suffix === "K+") {
        counter.textContent =
          (currentValue / 1000).toFixed(currentValue >= 1000 ? 1 : 0) + "K+";
      } else {
        counter.textContent = currentValue + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Make sure the final number is exact
        if (suffix === "K+") {
          counter.textContent = (target) + "K+";
        } else {
          counter.textContent = target + suffix;
        }
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Start animation when analytics enters the screen
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          counters.forEach(counter => {
            animateCounter(counter);
          });

          // Prevent animation from running again
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  observer.observe(analytics);
