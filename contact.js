/* =========================================
PEDANI MIGRATION SERVICES
CONTACT FORM — FORMSUBMIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

const contactForm = document.querySelector("#contactForm");

if (!contactForm) {
return;
}

/* =========================================
ELEMENTS
========================================= */

const messageInput =
document.querySelector("#message");

const characterCount =
document.querySelector("#characterCount");

const formStatus =
document.querySelector("#formStatus");

const submitButton =
contactForm.querySelector(".submit-button");

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
ERROR HELPERS
========================================= */

const showError = (field, message) => {

const errorElement =
  document.querySelector(
    `[data-error="${field.name}"]`
  );

field.classList.add("input-error");

if (errorElement) {
  errorElement.textContent = message;
}

};

const clearError = (field) => {


const errorElement =
  document.querySelector(
    `[data-error="${field.name}"]`
  );

field.classList.remove("input-error");

if (errorElement) {
  errorElement.textContent = "";
}


};

/* =========================================
FIELD VALIDATION
========================================= */

const validateField = (field) => {

const value =
  field.value.trim();


/* Required */

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


/* Email */

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


/* Message length */

if (
  field.id === "message" &&
  value.length > 1000
) {

  showError(
    field,
    "Your message must be 1000 characters or less."
  );

  return false;
}


clearError(field);

return true;


};

/* =========================================
REQUIRED FIELDS
========================================= */

const fieldsToValidate =
contactForm.querySelectorAll(
"input[required], select[required], textarea[required]"
);

/* =========================================
LIVE VALIDATION
========================================= */

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
      field.classList.contains("input-error")
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
FORM SUBMISSION
========================================= */

contactForm.addEventListener(
"submit",
(event) => {

  let isValid = true;


  /* Validate all required fields */

  fieldsToValidate.forEach((field) => {

    if (!validateField(field)) {
      isValid = false;
    }

  });


  /* =====================================
     INVALID FORM
  ===================================== */

  if (!isValid) {

    /*
      IMPORTANT:

      Only prevent submission when the
      form is invalid.

      This allows FormSubmit to receive
      valid submissions normally.
    */

    event.preventDefault();

    if (formStatus) {

      formStatus.className =
        "form-status error";

      formStatus.textContent =
        "Please check the highlighted fields and try again.";

    }

    return;

  }


  /* =====================================
     VALID FORM
  ===================================== */

  /*
    DO NOT use:

    event.preventDefault();

    here.

    The browser must be allowed to submit
    the form directly to FormSubmit.
  */


  if (submitButton) {

    submitButton.disabled = true;

    submitButton.classList.add(
      "loading"
    );

  }


  if (formStatus) {

    formStatus.className =
      "form-status";

    formStatus.textContent =
      "Sending your message...";

  }

}

);

});
