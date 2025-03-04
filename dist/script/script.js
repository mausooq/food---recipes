const navBtn = document.querySelector(".nav-btn");
const navLinks = document.querySelector(".nav-links");

navBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  document.body.classList.toggle("menu-open");

});

document.querySelector(".nav-btn").addEventListener("click", function () {
  document.body.classList.toggle("menu-open");
});


document.addEventListener("click", function (event) {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(event.target) &&
    !navBtn.contains(event.target)
  ) {
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});
