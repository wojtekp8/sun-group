document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu-links");
  
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  });