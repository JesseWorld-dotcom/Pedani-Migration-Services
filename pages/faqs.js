/* =========================================
   FAQ PAGE
========================================= */

const html = document.documentElement;

const themeToggle =
  document.querySelector(".theme-toggle");

const themeIcon =
  themeToggle.querySelector("i");


/* =========================================
   THEME
========================================= */

const savedTheme =
  localStorage.getItem("pedani-theme");

const systemPrefersDark =
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;


function setTheme(theme) {

  html.dataset.theme = theme;

  localStorage.setItem(
    "pedani-theme",
    theme
  );

  const isDark =
    theme === "dark";

  themeToggle.setAttribute(
    "aria-pressed",
    isDark
  );

  themeToggle.setAttribute(
    "aria-label",
    isDark
      ? "Switch to light theme"
      : "Switch to dark theme"
  );

  themeIcon.className =
    isDark
      ? "fa-solid fa-sun"
      : "fa-solid fa-moon";
}


setTheme(
  savedTheme ||
  (systemPrefersDark ? "dark" : "light")
);


themeToggle.addEventListener(
  "click",
  () => {

    const currentTheme =
      html.dataset.theme;

    setTheme(
      currentTheme === "dark"
        ? "light"
        : "dark"
    );

  }
);


/* =========================================
   FAQ SEARCH
========================================= */

const searchInput =
  document.querySelector("#faqSearch");

const faqItems =
  [...document.querySelectorAll(".faq-item")];

const filterButtons =
  [...document.querySelectorAll(".filter-btn")];

const noResults =
  document.querySelector("#noResults");


let activeCategory = "all";


function filterFAQs() {

  const searchTerm =
    searchInput.value
      .trim()
      .toLowerCase();


  let visibleCount = 0;


  faqItems.forEach(item => {

    const category =
      item.dataset.category;

    const searchableText =
      item.dataset.search.toLowerCase();


    const matchesCategory =
      activeCategory === "all" ||
      category === activeCategory;


    const matchesSearch =
      searchableText.includes(searchTerm);


    const shouldShow =
      matchesCategory &&
      matchesSearch;


    item.classList.toggle(
      "is-hidden",
      !shouldShow
    );


    if (shouldShow) {
      visibleCount++;
    }

  });


  noResults.hidden =
    visibleCount !== 0;

}


searchInput.addEventListener(
  "input",
  filterFAQs
);


/* =========================================
   CATEGORY FILTER
========================================= */

filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filterButtons.forEach(
        btn =>
          btn.classList.remove("active")
      );


      button.classList.add("active");


      activeCategory =
        button.dataset.category;


      filterFAQs();

    }
  );

});


/* =========================================
   CTRL + K SEARCH
========================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      searchInput.focus();

    }

  }
);


/* =========================================
   CLOSE OTHER FAQ WHEN OPENING ONE
========================================= */

const details =
  [...document.querySelectorAll(
    ".faq-item details"
  )];


details.forEach(current => {

  current.addEventListener(
    "toggle",
    () => {

      if (!current.open) return;


      details.forEach(other => {

        if (
          other !== current &&
          other.open
        ) {

          other.open = false;

        }

      });

    }
  );

});


/* =========================================
   INTERSECTION OBSERVER
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add(
          "visible"
        );

        revealObserver.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px"
    }
  );


revealElements.forEach(
  element =>
    revealObserver.observe(element)
);


/* =========================================
   STAGGER FAQ CARDS
========================================= */

faqItems.forEach(
  (item, index) => {

    item.style.transitionDelay =
      `${Math.min(index * 40, 300)}ms`;

  }
);


/* =========================================
   SMOOTH ANCHOR FALLBACK
========================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const target =
          document.querySelector(
            link.getAttribute("href")
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });