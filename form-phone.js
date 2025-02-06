function phoneNumber() {
    const forms = document.querySelectorAll(".form_wrapper");
  
    forms.forEach((form) => {
      const phone = document.querySelector(".form_input.is-phone");
  
      if (!phone) {
        return;
      }
  
      var input = document.querySelector(".form_input.is-phone"),
        dialCode = document.querySelector(".dialCode"),
        errorMsg = document.querySelector(".phone_error");
  
      var iti = intlTelInput(input, {
        initialCountry: "ca",
        placeholderNumberType: "FIXED_LINE",
      });
  
      var updateInputValue = function (event) {
        dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
      };
      input.addEventListener("input", updateInputValue, false);
      input.addEventListener("countrychange", updateInputValue, false);
  
      var reset = function () {
        input.classList.remove("is-error");
        errorMsg.classList.add("is-hidden");
      };
  
      input.addEventListener("blur", function () {
        reset();
        if (input.value.trim()) {
          if (iti.isValidNumber()) {
          } else {
            input.classList.add("is-error");
            errorMsg.classList.remove("is-hidden");
          }
        }
      });
  
      input.addEventListener("change", reset);
      input.addEventListener("keyup", reset);
    });
  }
  
  phoneNumber();  