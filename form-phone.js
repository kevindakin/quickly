function phoneNumber() {
  const forms = document.querySelectorAll(".form_wrapper");

  forms.forEach((form) => {
    const phone = form.querySelector(".form_input.is-phone");
    const dialCode = form.querySelector(".dialCode");
    const errorMsg = form.querySelector(".phone_error");
    const submitBtn = form.querySelector(".form_submit");

    if (!phone || !dialCode || !errorMsg || !submitBtn) return;

    var iti = intlTelInput(phone, {
      initialCountry: "ca",
      placeholderNumberType: "MOBILE",
    });

    function updateDialCode() {
      dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
    }

    function validatePhone() {
      const isValid = iti.isValidNumber();

      if (phone.value.trim()) {
        if (isValid) {
          phone.classList.remove("is-error");
          errorMsg.classList.add("is-hidden");
          submitBtn.disabled = false; // Enable button
        } else {
          phone.classList.add("is-error");
          errorMsg.classList.remove("is-hidden");
          submitBtn.disabled = true; // Disable button
        }
      } else {
        submitBtn.disabled = true; // Disable button if empty
      }
    }

    phone.addEventListener("input", updateDialCode);
    phone.addEventListener("countrychange", updateDialCode);
    phone.addEventListener("blur", validatePhone); // Validate only on blur

    form.addEventListener("submit", function (event) {
      if (!iti.isValidNumber()) {
        phone.classList.add("is-error");
        errorMsg.classList.remove("is-hidden");
        submitBtn.disabled = true;
        event.preventDefault(); // Stop form submission
      }
    });

    // Initial state: Disable button if phone is empty
    submitBtn.disabled = true;
  });
}

phoneNumber();