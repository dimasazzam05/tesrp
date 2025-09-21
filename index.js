document.addEventListener("DOMContentLoaded", () => {
  const lockScreen = document.getElementById("lockScreen");
  const passwordInput = document.getElementById("sitePassword");

  if (sessionStorage.getItem("isUnlocked") === "true") {
    lockScreen.style.display = "none";
  }

  passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });
});

function checkPassword() {
  const input = document.getElementById("sitePassword").value;
  const errorMsg = document.getElementById("errorMsg");
  const lockCard = document.querySelector(".lock-card");
  const lockScreen = document.getElementById("lockScreen");

  const correctPassword = "1";

  if (input === correctPassword) {
    lockScreen.style.display = "none";
    sessionStorage.setItem("isUnlocked", "true");
  } else {
    errorMsg.textContent = "Password salah, coba lagi!";
    lockCard.style.animation = "shake 0.5s";
    lockCard.addEventListener("animationend", () => {
      lockCard.style.animation = "";
    });
  }
}

// Background Canvas Stars
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.2 + 0.5,
  speedX: Math.random() * 2 + 0.5,
  speedY: Math.random() * 2 + 0.5,
  alpha: Math.random() * 0.5 + 0.5,
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();

    star.x += star.speedX;
    star.y += star.speedY;

    if (star.x > canvas.width || star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = -10;
    }
  });
}

function animateStars() {
  drawStars();
  requestAnimationFrame(animateStars);
}
animateStars();

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".banner-slide img");
  const bannerContainer = document.querySelector(".banner-container");
  const intervalTime = 5000;
  let index = 0;

  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("banner-dots");
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if(i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  bannerContainer.appendChild(dotsContainer);

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === i);
    });
    const dots = document.querySelectorAll(".banner-dots .dot");
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
    index = i;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  slides.forEach(slide => slide.style.position = "absolute"); 
  slides[0].classList.add("active");
  setInterval(nextSlide, intervalTime);
});
