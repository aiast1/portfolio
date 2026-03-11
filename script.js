// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Scroll fade-in animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-in to sections and cards
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(
    '.project-card, .skill-category, .pub-item, .award-item, .highlight-card, ' +
    '.about-text, .project-detail-body, .project-detail-image, .project-detail-gallery, ' +
    '.timeline-item, .contact-text, .contact-links'
  );

  elements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Click-drag scroll + auto-scroll for project galleries
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-detail-gallery').forEach(gallery => {
    const images = gallery.querySelectorAll('img');
    if (images.length === 0) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollId = null;
    let paused = false;

    // Click-drag
    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      gallery.classList.add('dragging');
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
      isDown = false;
      gallery.classList.remove('dragging');
    });

    gallery.addEventListener('mouseup', () => {
      isDown = false;
      gallery.classList.remove('dragging');
    });

    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });

    // Auto-scroll for galleries with more than 3 images
    if (images.length > 3) {
      let direction = 1;
      const speed = 0.5; // px per frame

      function autoScroll() {
        if (!paused) {
          gallery.scrollLeft += speed * direction;
          const maxScroll = gallery.scrollWidth - gallery.clientWidth;
          if (gallery.scrollLeft >= maxScroll) {
            direction = -1;
          } else if (gallery.scrollLeft <= 0) {
            direction = 1;
          }
        }
        autoScrollId = requestAnimationFrame(autoScroll);
      }

      // Pause on hover and drag
      gallery.addEventListener('mouseenter', () => { paused = true; });
      gallery.addEventListener('mouseleave', () => { if (!isDown) paused = false; });
      gallery.addEventListener('touchstart', () => { paused = true; });
      gallery.addEventListener('touchend', () => { paused = false; });

      autoScrollId = requestAnimationFrame(autoScroll);
    }
  });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.style.background = 'rgba(10, 10, 11, 0.95)';
  } else {
    navbar.style.background = 'rgba(10, 10, 11, 0.85)';
  }
  lastScroll = currentScroll;
});
