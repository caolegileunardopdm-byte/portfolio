/* ---------- Back to top button ---------- */
const toTop = document.querySelector(".to-top");
const toggleToTop = () => toTop.classList.toggle("show", window.scrollY > 400);
window.addEventListener("scroll", toggleToTop, { passive: true });
toggleToTop();
