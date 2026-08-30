/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

  const messageInput = document.querySelector("#message");
  const characterCount = document.querySelector("#characterCount");
  const formStatus = document.querySelector("#formStatus");
  const submitButton = contactForm.querySelector(".submit-button");


  /* -----------------------------------------
     Character Counter
  ----------------------------------------- */

  if (messageInput && characterCount) {

    const updateCharacterCount = () => {
      characterCount.textContent =
        `${messageInput.value.length} / ${messageInput.maxLength}`;
    };

    messageInput.addEventListener("input", updateCharacterCount);

    updateCharacterCount();
  }


  /* -----------------------------------------
     Validation Helpers
  ----------------------------------------- */

  const showError = (field, message) => {

    const errorElement = document.querySelector(
      `[data-error="${field.name}"]`
    );

    field.classList.add("input-error");

    if (errorElement) {
      errorElement.textContent = message;
    }
  };


  const clearError = (field) => {

    const errorElement = document.querySelector(
      `[data-error="${field.name}"]`
    );

    field.classList.remove("input-error");

    if (errorElement) {
      errorElement.textContent = "";
    }
  };


  const validateField = (field) => {

    const value = field.value.trim();

    if (field.hasAttribute("required") && !value) {
      showError(field, "This field is required.");
      return false;
    }


    if (
      field.type === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      showError(field, "Please enter a valid email address.");
      return false;
    }


    clearError(field);

    return true;
  };


  /* -----------------------------------------
     Validate While Typing
  ----------------------------------------- */

  const fieldsToValidate = contactForm.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  fieldsToValidate.forEach((field) => {

    field.addEventListener("blur", () => {
      validateField(field);
    });

    field.addEventListener("input", () => {

      if (field.classList.contains("input-error")) {
        validateField(field);
      }

    });

    field.addEventListener("change", () => {
      validateField(field);
    });

  });


  /* -----------------------------------------
     Submit Form
  ----------------------------------------- */

  contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    formStatus.className = "form-status";
    formStatus.textContent = "";


    let isValid = true;

    fieldsToValidate.forEach((field) => {

      if (!validateField(field)) {
        isValid = false;
      }

    });


    if (!isValid) {

      formStatus.className = "form-status error";
      formStatus.textContent =
        "Please check the highlighted fields and try again.";

      return;
    }


    /* -----------------------------------------
       Loading State
    ----------------------------------------- */

    submitButton.disabled = true;
    submitButton.classList.add("loading");


    /*
      This is where your backend/email service
      will be connected.

      For now, we simulate a short request so
      the UI can be tested properly.
    */

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });


    /* -----------------------------------------
       Success
    ----------------------------------------- */

    submitButton.disabled = false;
    submitButton.classList.remove("loading");

    formStatus.className = "form-status success";

    formStatus.textContent =
      "Thanks for contacting PEDANI. Your message has been received and our team will get back to you soon.";


    contactForm.reset();


    if (characterCount) {
      characterCount.textContent = "0 / 1000";
    }


    /* Remove old validation states */

    fieldsToValidate.forEach((field) => {
      clearError(field);
    });

  });

}
