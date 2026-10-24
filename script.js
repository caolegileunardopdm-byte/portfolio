// Caole | Student Portfolio
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close the menu after choosing a link, pressing Escape, or resizing to desktop
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  /* ---------- Highlight the nav link of the section in view ---------- */
  const links = [...menu.querySelectorAll("a[href^='#']")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s));

    /* ---------- Animate skill bars once ---------- */
    const skills = document.getElementById("skills");
    const skillObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skills.classList.add("in-view");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    skillObserver.observe(skills);
  } else {
    document.getElementById("skills").classList.add("in-view");
  }

  /* ---------- Hide broken images so the gradient placeholder shows ---------- */
  document.querySelectorAll(".photo-frame img, .thumb img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
  });

  /* ---------- Contact form: opens the visitor's email app ---------- */
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = [form.name, form.email, form.message];
    let valid = true;

    fields.forEach((field) => {
      const ok = field.value.trim() !== "" && field.checkValidity();
      field.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      note.textContent = "Please fill in your name, a valid email, and a message.";
      note.className = "form-note error";
      return;
    }

    const subject = encodeURIComponent("Portfolio message from " + form.name.value.trim());
    const body = encodeURIComponent(
      form.message.value.trim() + "\n\nFrom: " + form.name.value.trim() + " (" + form.email.value.trim() + ")"
    );

    window.location.href = "mailto:studentinfo@pdm.com?subject=" + subject + "&body=" + body;
    note.textContent = "Opening your email app to send the message.";
    note.className = "form-note";
    form.reset();
  });
});
