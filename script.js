document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     MOBILE NAVBAR
  ================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav ul li a");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("menu-open");

      menuToggle.setAttribute("aria-expanded", isOpen);

      // Change hamburger ↔ X
      const icon = menuToggle.querySelector("i");

      if (isOpen) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close menu when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("menu-open");

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });


  /* ================================
     DESTINATION SLIDER
  ================================= */

  const destinationContainer =
    document.querySelector(".img-container");

  const destinationItems =
    document.querySelectorAll(".img-container .img-item");

  let destinationIndex = 0;
  let destinationTimer = null;

  const mobileBreakpoint = 700;


  function createDestinationControls() {

    // Don't create controls twice
    if (document.querySelector(".destination-controls")) {
      return;
    }

    const controls = document.createElement("div");

    controls.className = "destination-controls";

    controls.innerHTML = `
      <button class="destination-prev" aria-label="Previous destination">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <div class="destination-dots"></div>

      <button class="destination-next" aria-label="Next destination">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;

    destinationContainer.after(controls);


    // Create dots
    const dotsContainer =
      controls.querySelector(".destination-dots");

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

      dotsContainer.appendChild(dot);
    });


    controls
      .querySelector(".destination-prev")
      .addEventListener("click", () => {

        destinationIndex--;

        if (destinationIndex < 0) {
          destinationIndex = destinationItems.length - 1;
        }

        showDestination(destinationIndex);
        restartDestinationTimer();
      });


    controls
      .querySelector(".destination-next")
      .addEventListener("click", () => {

        destinationIndex++;

        if (destinationIndex >= destinationItems.length) {
          destinationIndex = 0;
        }

        showDestination(destinationIndex);
        restartDestinationTimer();
      });
  }


  function showDestination(index) {

    if (window.innerWidth > mobileBreakpoint) {
      return;
    }

    destinationItems.forEach((item, i) => {

      item.classList.toggle(
        "active",
        i === index
      );

    });


    // Update dots
    const dots =
      document.querySelectorAll(".destination-dot");

    dots.forEach((dot, i) => {
      dot.classList.toggle(
        "active",
        i === index
      );
    });
  }


  function startDestinationSlider() {

    if (window.innerWidth > mobileBreakpoint) {
      return;
    }

    createDestinationControls();

    showDestination(destinationIndex);

    destinationTimer = setInterval(() => {

      destinationIndex++;

      if (destinationIndex >= destinationItems.length) {
        destinationIndex = 0;
      }

      showDestination(destinationIndex);

    }, 4000);
  }


  function stopDestinationSlider() {

    clearInterval(destinationTimer);

    destinationTimer = null;

    destinationItems.forEach(item => {
      item.classList.remove("active");
    });
  }


  function restartDestinationTimer() {

    clearInterval(destinationTimer);

    destinationTimer = setInterval(() => {

      destinationIndex++;

      if (destinationIndex >= destinationItems.length) {
        destinationIndex = 0;
      }

      showDestination(destinationIndex);

    }, 4000);
  }


  /* ================================
     TESTIMONIAL SLIDER
  ================================= */

  const testimonialContainer =
    document.querySelector(".testimonial-grid");

  const testimonials =
    document.querySelectorAll(".testimonial-card");

  let testimonialIndex = 0;
  let testimonialTimer = null;


  function createTestimonialControls() {

    if (document.querySelector(".testimonial-controls")) {
      return;
    }

    const controls = document.createElement("div");

    controls.className = "testimonial-controls";

    controls.innerHTML = `
      <button class="testimonial-prev" aria-label="Previous testimonial">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <div class="testimonial-dots"></div>

      <button class="testimonial-next" aria-label="Next testimonial">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;

    testimonialContainer.after(controls);


    const dotsContainer =
      controls.querySelector(".testimonial-dots");


    testimonials.forEach((_, index) => {

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

      dotsContainer.appendChild(dot);
    });


    controls
      .querySelector(".testimonial-prev")
      .addEventListener("click", () => {

        testimonialIndex--;

        if (testimonialIndex < 0) {
          testimonialIndex = testimonials.length - 1;
        }

        showTestimonial(testimonialIndex);

        restartTestimonialTimer();

      });


    controls
      .querySelector(".testimonial-next")
      .addEventListener("click", () => {

        testimonialIndex++;

        if (testimonialIndex >= testimonials.length) {
          testimonialIndex = 0;
        }

        showTestimonial(testimonialIndex);

        restartTestimonialTimer();

      });
  }


  function showTestimonial(index) {

    if (window.innerWidth > mobileBreakpoint) {
      return;
    }

    testimonials.forEach((card, i) => {

      card.classList.toggle(
        "active",
        i === index
      );

    });


    const dots =
      document.querySelectorAll(".testimonial-dot");

    dots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === index
      );

    });
  }


  function startTestimonialSlider() {

    if (window.innerWidth > mobileBreakpoint) {
      return;
    }

    createTestimonialControls();

    showTestimonial(testimonialIndex);

    testimonialTimer = setInterval(() => {

      testimonialIndex++;

      if (testimonialIndex >= testimonials.length) {
        testimonialIndex = 0;
      }

      showTestimonial(testimonialIndex);

    }, 5000);
  }


  function stopTestimonialSlider() {

    clearInterval(testimonialTimer);

    testimonialTimer = null;

    testimonials.forEach(card => {
      card.classList.remove("active");
    });
  }


  function restartTestimonialTimer() {

    clearInterval(testimonialTimer);

    testimonialTimer = setInterval(() => {

      testimonialIndex++;

      if (testimonialIndex >= testimonials.length) {
        testimonialIndex = 0;
      }

      showTestimonial(testimonialIndex);

    }, 5000);
  }


  /* ================================
     TOUCH / SWIPE SUPPORT
  ================================= */

  let touchStartX = 0;
  let touchEndX = 0;


  // Destination swipe
  if (destinationContainer) {

    destinationContainer.addEventListener(
      "touchstart",
      e => {

        touchStartX = e.changedTouches[0].screenX;

      },
      { passive: true }
    );


    destinationContainer.addEventListener(
      "touchend",
      e => {

        touchEndX = e.changedTouches[0].screenX;

        handleDestinationSwipe();

      },
      { passive: true }
    );
  }


  function handleDestinationSwipe() {

    const distance =
      touchStartX - touchEndX;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {

      // Swipe left
      destinationIndex++;

      if (destinationIndex >= destinationItems.length) {
        destinationIndex = 0;
      }

    } else {

      // Swipe right
      destinationIndex--;

      if (destinationIndex < 0) {
        destinationIndex = destinationItems.length - 1;
      }
    }

    showDestination(destinationIndex);

    restartDestinationTimer();
  }


  // Testimonial swipe
  if (testimonialContainer) {

    testimonialContainer.addEventListener(
      "touchstart",
      e => {

        touchStartX = e.changedTouches[0].screenX;

      },
      { passive: true }
    );


    testimonialContainer.addEventListener(
      "touchend",
      e => {

        touchEndX = e.changedTouches[0].screenX;

        handleTestimonialSwipe();

      },
      { passive: true }
    );
  }


  function handleTestimonialSwipe() {

    const distance =
      touchStartX - touchEndX;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {

      testimonialIndex++;

      if (testimonialIndex >= testimonials.length) {
        testimonialIndex = 0;
      }

    } else {

      testimonialIndex--;

      if (testimonialIndex < 0) {
        testimonialIndex = testimonials.length - 1;
      }
    }

    showTestimonial(testimonialIndex);

    restartTestimonialTimer();
  }


  /* ================================
     RESPONSIVE INITIALIZATION
  ================================= */

  function handleResponsiveSliders() {

    if (window.innerWidth <= mobileBreakpoint) {

      if (!destinationTimer) {
        startDestinationSlider();
      }

      if (!testimonialTimer) {
        startTestimonialSlider();
      }

    } else {

      stopDestinationSlider();

      stopTestimonialSlider();

    }
  }


  // Initial check
  handleResponsiveSliders();


  // Handle resizing
  window.addEventListener(
    "resize",
    handleResponsiveSliders
  );

});