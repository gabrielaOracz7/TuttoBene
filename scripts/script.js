//home hero section animation
const hero = document.querySelector(".hero-section");
if (hero) {
  const heroLeft = document.querySelector(".hero-content");
  const heroRight = document.querySelector(".hero-image");
  const heroMiddle = hero.offsetHeight / 2;

  window.addEventListener("scroll", () => {
    if (window.scrollY < heroMiddle) {
      heroLeft.classList.remove("hide-left");
      heroRight.classList.remove("hide-right");
    } else {
      heroLeft.classList.add("hide-left");
      heroRight.classList.add("hide-right");
    }
  });
}

//home offer section heading animation
const offerHeading = document.querySelector(".offer-heading h2");

if (offerHeading) {
  const observer = new IntersectionObserver(
    (entires) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          offerHeading.classList.add("show");
        } else {
          offerHeading.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.25,
    },
  );
  observer.observe(offerHeading);
}

//home offer section images animation
const images = document.querySelectorAll(".auto-rotate");

if (images.length > 0) {
  function rotateImages() {
    images.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

      const rotation = Math.max(0, Math.min(1, progress)) * 180;

      image.style.transform = `rotate(${rotation}deg)`;
    });
  }

  window.addEventListener("scroll", rotateImages, { passive: true });
  window.addEventListener("resize", rotateImages);

  rotateImages();
}

//hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector("#main-nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("open");
  });

  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      menu.classList.remove("open");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hamburger.classList.remove("active");
      menu.classList.remove("open");
    }
  });
});
