// year for footer
document.getElementById("year").innerText = new Date().getFullYear();

// mobile menu toggle
var toggle = document.querySelector(".mobile-toggle");
var menu = document.getElementById("mobile-menu");
var head = document.querySelector(".site-header");

// start menu hidden  
if (menu) {
  menu.style.display = "none";
}

// scroll variables
var lastY = window.pageYOffset;
var hideAmt = 20;
var showAmt = 8;

// toggle button transition
if (toggle) {
  toggle.style.transition = "transform 0.3s, opacity 0.2s";
}

// click the hamburger
if (toggle) {
  toggle.addEventListener("click", function() {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      menu.style.display = "none";
      toggle.setAttribute("aria-expanded", "false");
    } else {
      menu.classList.add("open");
      menu.style.display = "flex";
      toggle.setAttribute("aria-expanded", "true");
      head.classList.remove("hide");
      toggle.style.transform = "";
      toggle.style.opacity = "";
      toggle.style.pointerEvents = "";
    }
  });
}

// scroll up and down
window.addEventListener("scroll", function() {
  var nowY = window.pageYOffset;

  if (nowY <= 0) {
    head.classList.remove("hide");
    toggle.style.transform = "";
    toggle.style.opacity = "";
    toggle.style.pointerEvents = "";
  } else if (nowY - lastY > hideAmt) {
    head.classList.add("hide");
    toggle.style.transform = "translateY(-110%)";
    toggle.style.opacity = "0";
    toggle.style.pointerEvents = "none";
  } else if (lastY - nowY > showAmt) {
    head.classList.remove("hide");
    toggle.style.transform = "";
    toggle.style.opacity = "";
    toggle.style.pointerEvents = "";
    if (menu.classList.contains("open")) {
      menu.style.display = "flex";
    }
  }

  lastY = nowY;
});

// keep menu open if nav link clicked
var links = document.querySelectorAll(".main-nav a");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function() {
    if (menu.classList.contains("open")) {
      menu.style.display = "flex";
    }
  });
}

// resize reset
window.addEventListener("resize", function() {
  if (window.innerWidth > 768) {
    menu.classList.remove("open");
    menu.style.display = "";
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.style.transform = "";
      toggle.style.opacity = "";
      toggle.style.pointerEvents = "";
    }
  }

//email
const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      alert("Your email client will open to send the message.");
  });
}

});
