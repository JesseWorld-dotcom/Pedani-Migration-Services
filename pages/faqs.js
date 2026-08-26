const faqItems = document.querySelectorAll(".faq-item");
const questions = document.querySelectorAll(".faq-question");

const searchInput = document.querySelector("#faqSearch");
const noResults = document.querySelector("#noResults");

const categoryButtons = document.querySelectorAll(".category");

const themeToggle = document.querySelector(".theme-toggle");


/*
  FAQ accordion
*/

questions.forEach((question) => {

  question.addEventListener("click", () => {

    const currentItem = question.closest(".faq-item");

    faqItems.forEach((item) => {

      if (item !== currentItem) {
        item.classList.remove("open");
      }

    });

    currentItem.classList.toggle("open");

  });

});


/*
  Search FAQs
*/

let activeCategory = "all";


function filterFAQs() {

  const searchTerm = searchInput.value
    .trim()
    .toLowerCase();

  let visibleCount = 0;


  faqItems.forEach((item) => {

    const question =
      item.querySelector(".faq-question")
        .textContent
        .toLowerCase();

    const answer =
      item.querySelector(".faq-answer")
        .textContent
        .toLowerCase();

    const category =
      item.dataset.category;


    const matchesSearch =
      question.includes(searchTerm) ||
      answer.includes(searchTerm);


    const matchesCategory =
      activeCategory === "all" ||
      category === activeCategory;


    const shouldShow =
      matchesSearch && matchesCategory;


    item.classList.toggle(
      "filtered",
      !shouldShow
    );


    if (shouldShow) {
      visibleCount++;
    }

  });


  noResults.hidden = visibleCount !== 0;

}


searchInput.addEventListener(
  "input",
  filterFAQs
);


/*
  Category filtering
*/

categoryButtons.forEach((button) => {

  button.addEventListener("click", () => {

    categoryButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    activeCategory =
      button.dataset.category;

    filterFAQs();

  });

});


/*
  Keyboard shortcut for search
*/

document.addEventListener("keydown", (event) => {

  const isShortcut =
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "k";


  if (isShortcut) {

    event.preventDefault();

    searchInput.focus();

  }

});


/*
  Theme switcher
*/

const savedTheme =
  localStorage.getItem("pedani-theme");


if (savedTheme === "dark") {

  document.body.classList.add("dark");

}


function updateThemeIcon() {

  const icon =
    themeToggle.querySelector("i");


  const darkMode =
    document.body.classList.contains("dark");


  icon.className = darkMode
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";


  themeToggle.setAttribute(
    "aria-label",
    darkMode
      ? "Switch to light theme"
      : "Switch to dark theme"
  );

}


themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");


  const currentTheme =
    document.body.classList.contains("dark")
      ? "dark"
      : "light";


  localStorage.setItem(
    "pedani-theme",
    currentTheme
  );


  updateThemeIcon();

});


updateThemeIcon();


/*
  Scroll reveal animation
*/

const animatedElements = document.querySelectorAll(
  ".faq-item, .sidebar-card, .section-heading, .category-list"
);


const observer = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);

    });

  },
  {
    threshold: 0.12
  }
);


animatedElements.forEach((element) => {

  observer.observe(element);

});