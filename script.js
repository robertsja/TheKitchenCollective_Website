const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const filterButtons = document.querySelectorAll(".filter-button");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const contactForm = document.querySelector("#contact-form");
const testimonialTrack = document.querySelector(".testimonial-grid");
let activeGalleryButton = null;

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("menu-open");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    filterButtons.forEach((item) => item.setAttribute("aria-pressed", "false"));
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    galleryItems.forEach((item) => {
      const shouldShow = filter === "all"
        ? item.dataset.highlight === "true"
        : item.dataset.category === filter;
      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    activeGalleryButton = item;
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    lightbox.focus();
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.classList.remove("menu-open");
  if (activeGalleryButton) {
    activeGalleryButton.focus();
  }
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const subject = formData.get("subject") || "Catering Enquiry";
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Phone: ${formData.get("phone") || ""}`,
      "",
      formData.get("message")
    ].join("\n");

    window.location.href = `mailto:hello@thekc.co.nz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

if (testimonialTrack && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  [...testimonialTrack.children].forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    testimonialTrack.appendChild(clone);
  });
}
