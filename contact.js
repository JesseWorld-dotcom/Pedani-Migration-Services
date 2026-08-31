/* =========================================
   PEDANI MIGRATION SERVICES
   CONTACT FORM
   PHP + RESEND
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const contactForm = document.querySelector("#contactForm");

  if (!contactForm) {
    return;
  }


  const messageInput =
    contactForm.querySelector("#message");

  const characterCount =
    contactForm.querySelector("#characterCount");

  const formStatus =
    contactForm.querySelector("#formStatus");

  const submitButton =
    contactForm.querySelector(".submit-button");

  const buttonText =
    submitButton?.querySelector(".button-text");


  /* =========================================
     CHARACTER COUNTER
  ========================================= */

  if (messageInput && characterCount) {

    const updateCharacterCount = () => {

      characterCount.textContent =
        `${messageInput.value.length} / ${messageInput.maxLength}`;

    };

    messageInput.addEventListener(
      "input",
      updateCharacterCount
    );

    updateCharacterCount();
  }


  /* =========================================
     VALIDATION
  ========================================= */

  const showError = (field, message) => {

    const errorElement =
      contactForm.querySelector(
        `[data-error="${field.name}"]`
      );

    field.classList.add("input-error");

    if (errorElement) {
      errorElement.textContent = message;
    }
  };


  const clearError = (field) => {

    const errorElement =
      contactForm.querySelector(
        `[data-error="${field.name}"]`
      );

    field.classList.remove("input-error");

    if (errorElement) {
      errorElement.textContent = "";
    }
  };


  const validateField = (field) => {

    const value =
      field.value.trim();


    if (
      field.hasAttribute("required") &&
      !value
    ) {

      showError(
        field,
        "This field is required."
      );

      return false;
    }


    if (
      field.type === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {

      showError(
        field,
        "Please enter a valid email address."
      );

      return false;
    }


    clearError(field);

    return true;
  };


  const fieldsToValidate =
    contactForm.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );


  fieldsToValidate.forEach((field) => {

    field.addEventListener(
      "blur",
      () => {
        validateField(field);
      }
    );


    field.addEventListener(
      "input",
      () => {

        if (
          field.classList.contains(
            "input-error"
          )
        ) {

          validateField(field);

        }

      }
    );


    field.addEventListener(
      "change",
      () => {
        validateField(field);
      }
    );

  });


  /* =========================================
     STATUS
  ========================================= */

  const setStatus = (
    type,
    message
  ) => {

    if (!formStatus) {
      return;
    }

    formStatus.className =
      `form-status ${type}`;

    formStatus.textContent =
      message;

  };


  /* =========================================
     SUBMIT
  ========================================= */

  contactForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      setStatus(
        "",
        ""
      );


      /* -------------------------------
         Validate
      ------------------------------- */

      let isValid = true;


      fieldsToValidate.forEach(
        (field) => {

          if (
            !validateField(field)
          ) {

            isValid = false;

          }

        }
      );


      if (!isValid) {

        setStatus(
          "error",
          "Please check the highlighted fields and try again."
        );

        return;
      }


      /* -------------------------------
         Loading state
      ------------------------------- */

      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.classList.add(
          "loading"
        );

      }


      if (buttonText) {

        buttonText.textContent =
          "Sending...";

      }


      try {

        const formData =
          new FormData(contactForm);


        const response =
          await fetch(
            contactForm.action || "/contact.php",
            {
              method: "POST",

              body: formData,

              headers: {
                "Accept": "application/json"
              }
            }
          );


        let result;


        try {

          result =
            await response.json();

        } catch {

          throw new Error(
            "The server returned an invalid response."
          );

        }


        if (
          !response.ok ||
          !result.success
        ) {

          throw new Error(
            result.message ||
            "Unable to send your message."
          );

        }


        /* -------------------------------
           Success
        ------------------------------- */

        setStatus(
          "success",
          result.message ||
          "Thanks for contacting PEDANI. Your message has been received."
        );


        contactForm.reset();


        if (characterCount) {

          characterCount.textContent =
            "0 / 1000";

        }


        fieldsToValidate.forEach(
          (field) => {
            clearError(field);
          }
        );


      } catch (error) {

        console.error(
          "Contact form error:",
          error
        );


        setStatus(
          "error",
          error.message ||
          "Something went wrong. Please try again later."
        );

      } finally {

        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.classList.remove(
            "loading"
          );

        }


        if (buttonText) {

          buttonText.textContent =
            "Send Message";

        }

      }

    }
  );

});