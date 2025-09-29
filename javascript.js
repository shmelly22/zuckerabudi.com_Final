document.addEventListener('DOMContentLoaded', function () {
// Footer year auto update
var yearEl = document.getElementById('year');
if (yearEl) yearEl.innerText = new Date().getFullYear();

// Mobile hamburger button
var toggle = document.querySelector('.mobile-toggle');
// nav open/closed on mobile
var menu   = document.getElementById('mobile-menu');
// hide/show header on scroll
var head   = document.querySelector('.site-header');


// First load at <=768px, keep the menu hidden
// Until the user taps the hamburger. On desktop, let CSS do layout
if (menu && window.innerWidth <= 768) {
  menu.style.display = 'none';
}

// Track the last Y position to know if user is scrolling up or down
// If scroll down hide the header
// If scroll up show it again
var lastY   = window.pageYOffset || 0;
var hideAmt = 20;
var showAmt = 8;

// Give the hamburger button animation for when it slides out
if (toggle) {
  toggle.style.transition = 'transform 0.3s, opacity 0.2s';
}

// Toggles the mobile nav open/closed updates ARIA state for screen readers and ensures the header is visible when the menu opens
if (toggle && menu && head) {
  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.contains('open');

    if (isOpen) {
      // close
      menu.classList.remove('open');
      menu.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      // open
      menu.classList.add('open');
      menu.style.display = 'flex';
      toggle.setAttribute('aria-expanded', 'true');

      // Ensure header is visible when opening the menu
      head.classList.remove('hide');

      // Reset from the scroll hide animation
      toggle.style.transform = '';
      toggle.style.opacity = '';
      toggle.style.pointerEvents = '';
    }
  });
}

// Hides header when scrolling down
// shows it when scrolling up
window.addEventListener('scroll', function () {
  var nowY = window.pageYOffset || 0;  // <-- define nowY

  if (nowY <= 0) {
    // At the very top of the page always show header and hamburger
    head.classList.remove('hide');
    toggle.style.transform = '';
    toggle.style.opacity = '';
    toggle.style.pointerEvents = '';
  } else if (nowY - lastY > hideAmt) {
    // Scrolled down more than hideAmt hide header and move hamburger offscreen
    head.classList.add('hide');
    toggle.style.transform = 'translateY(-110%)';
    toggle.style.opacity = '0';
    toggle.style.pointerEvents = 'none';
  } else if (lastY - nowY > showAmt) {
    // Scrolled up more than showAmt show header and restore hamburger
    head.classList.remove('hide');
    toggle.style.transform = '';
    toggle.style.opacity = '';
    toggle.style.pointerEvents = '';

    // If the menu was already open keep visable
    if (menu.classList.contains('open')) {
      menu.style.display = 'flex';
    }
  }

  // Update last position
  lastY = nowY;
});

// Keep mobile menu open after tapping a nav link
var links = document.querySelectorAll('.main-nav a');
if (links && menu) {
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      if (menu.classList.contains('open')) {
        // Keep visible so users can tap multiple links without re-opening
        menu.style.display = 'flex';
      }
    });
  }
}

// When crossing the 768px breakpoint:
// On desktop clear inline styles so CSS can manage layout
// On mobile keep menu hidden unless opened by user
window.addEventListener('resize', function () {
  // Ensure elements exist
  if (!menu || !toggle) return;

  if (window.innerWidth > 768) {
    // Desktop mode resets to CSS defaults
    menu.classList.remove('open');
    menu.style.display = '';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.style.transform = '';
    toggle.style.opacity = '';
    toggle.style.pointerEvents = '';
  } else {
    // Mobile mode if not explicitly open keep it hidden
    if (!menu.classList.contains('open')) {
      menu.style.display = 'none';
    }
  }
});

// Works whether you add id="contactForm" or keep class="contact-form".
// Alerts the user that their mail client will open
var contactForm = document.getElementById('contactForm') || document.querySelector('form.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function () {
    alert('Your email client will open to send the message.');
  });
}

// If bootstrap’s carousel plugin is available, initialize the notes carousel with friendly defaults
(function initNotesCarousel() {
  // Make sure jQuery exists
  if (!window.jQuery) return;

  var $ = window.jQuery;
  var $carousel = $('#notesCarousel');

  // If the carousel element isn’t found or plugin isn’t available do nothing
  if (!$carousel.length || typeof $carousel.carousel !== 'function') return;

  // Initialize with defaults:
  // - interval: time between automatic slide transitions
  // - pause: 'hover' pauses cycling when mouse is over the carousel
  // - wrap: true loops from the last slide to the first
  // - keyboard: allow left/right arrows to navigate
  $carousel.carousel({
    interval: 6000,
    pause: 'hover', 
    wrap: true,
    keyboard: true
  });
})();
});
