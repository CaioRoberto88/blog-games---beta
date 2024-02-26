const useValidationForm = () => {
  (() => {
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
};

export default useValidationForm;
