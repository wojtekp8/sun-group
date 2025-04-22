document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu-links");
  const form = document.querySelector(".form");

  // MENU
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // VALIDATION
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");
    const agree = document.getElementById("agree");

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneValid = (phone) => /^(\+\d{1,3}\s)?\d{9}$/.test(phone);
    const isTextValid = (text) =>
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\- ]{2,}$/.test(text);

    // name
    if (!isTextValid(name.value.trim())) {
      showError("name", "Podaj poprawne imię (min. 2 litery)");
      isValid = false;
    } else clearError("name");

    // surname
    if (!isTextValid(surname.value.trim())) {
      showError("surname", "Podaj poprawne nazwisko (min. 2 litery)");
      isValid = false;
    } else clearError("surname");

    // e-mail
    if (!isEmailValid(email.value.trim())) {
      showError("email", "Podaj poprawny adres email");
      isValid = false;
    } else clearError("email");

    // phone
    if (!isPhoneValid(phone.value.trim())) {
      showError("phone", "Podaj poprawny numer telefonu (9 cyfr)");
      isValid = false;
    } else clearError("phone");

    // message
    if (message.value.trim().length < 5) {
      showError("message", "Wiadomość musi mieć min. 5 znaków");
      isValid = false;
    } else clearError("message");

    // agree
    if (!agree.checked) {
      showError(
        "agree",
        "Musisz zaakceptować regulamin, aby wysłać wiadomość."
      );
      isValid = false;
    } else clearError("agree");

    if (isValid) {
      form.reset();
      document
        .querySelectorAll(".filled")
        .forEach((el) => el.classList.remove("filled"));
      alert("Formularz został poprawnie wysłany!");
    }
  });

  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const wrapper = input.parentElement;
    const row = wrapper.closest(".row");

    wrapper.classList.add("error");

    if (row) row.classList.add("has-error");

    let errorElem = wrapper.querySelector(".error-message");
    if (!errorElem) {
      errorElem = document.createElement("span");
      errorElem.classList.add("error-message");
      wrapper.appendChild(errorElem);
    }
    errorElem.textContent = message;
  }

  function clearError(inputId) {
    const input = document.getElementById(inputId);
    const wrapper = input.parentElement;
    const row = wrapper.closest(".row");

    wrapper.classList.remove("error");

    if (row && !row.querySelector(".input-wrapper.error")) {
      row.classList.remove("has-error");
    }

    const errorElem = wrapper.querySelector(".error-message");
    if (errorElem) errorElem.remove();
  }

  document
    .querySelectorAll(
      ".form .input-wrapper input, .form .input-wrapper textarea"
    )
    .forEach((input) => {
      input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
          input.parentElement.classList.add("filled");
          clearError(input.id);
        } else {
          input.parentElement.classList.remove("filled");
        }
      });

      input.addEventListener("focus", () => {
        clearError(input.id);
      });
    });

  // TESTIMONIALS
  const testimonials = [
    {
      text: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.",
      author: "Jan Kowalski",
      company: "Firma Jana Kowalskiego",
    },
    {
      text: "Projekt został zrealizowany przed czasem, dokładnie tak jak oczekiwaliśmy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus efficitur nulla sed ligula cursus, at accumsan metus egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Anna Nowak",
      company: "Nowak Consulting",
    },
    {
      text: "Wysoka jakość usług, a przy tym miła i bezproblemowa współpraca. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus efficitur nulla sed ligula cursus, at accumsan metus egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Michał Zieliński",
      company: "Z-Tech Solutions",
    },
  ];

  let current = 0;

  const textEl = document.getElementById("testimonial-text");
  const authorEl = document.getElementById("testimonial-author");
  const companyEl = document.getElementById("testimonial-company");

  const prevButtons = document.querySelectorAll(".testimonial-prev");
  const nextButtons = document.querySelectorAll(".testimonial-next");

  prevButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      current = (current - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(current);
    });
  });

  nextButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      current = (current + 1) % testimonials.length;
      updateTestimonial(current);
    });
  });

  function updateTestimonial(index) {
    textEl.classList.remove("show");
    authorEl.classList.remove("show");
    companyEl.classList.remove("show");

    // oczekiwanie aż elementy znikną
    setTimeout(() => {
      const t = testimonials[index];
      textEl.textContent = t.text;
      authorEl.textContent = t.author;
      companyEl.textContent = t.company;

      textEl.classList.add("show");
      authorEl.classList.add("show");
      companyEl.classList.add("show");
    }, 300);
  }

  updateTestimonial(current);
});
