// Mobile Hamburger Menu & Smooth navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

function toggleMenu() {
  navLinks.classList.toggle('active');
  const expanded = navLinks.classList.contains('active');
  hamburger.setAttribute('aria-expanded', expanded);
  // change icon optionally
  if (expanded) {
    hamburger.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  }
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

// Close menu when a nav link is clicked
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Smooth scroll offset handled by CSS scroll-padding, but ensure fallback for manual hash
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      // close menu after click on mobile
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Scroll reveal animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

revealElements.forEach(el => observer.observe(el));

// Contact form handler (alert simulation)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    if (!name || !message) {
      alert("Please fill in both name and message fields 💛");
      return;
    }
    alert(`✨ Thanks ${name}! We’ll reach out within 24h. Meanwhile, chat via WhatsApp for quick response.`);
    contactForm.reset();
  });
}

// Additional hover / micro interaction, ensure performance
window.addEventListener('load', () => {
  // force initial check for reveal if any section visible on load
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('revealed');
      observer.unobserve(el);
    }
  });
});