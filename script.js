/**
 * Harshita Agrawal - Portfolio Interactive Features
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Dark / Light Theme Toggle with LocalStorage
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('ha_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('ha_portfolio_theme', newTheme);
  });

  // ==========================================================================
  // 2. Dynamic Typing Effect for Hero Subtitle
  // ==========================================================================
  const typedTextSpan = document.getElementById('typed-text');
  const phrases = [
    "Aspiring Software Engineer",
    "1st Year B.Tech CSE @ JECRC University",
    "Front-End Web Developer (HTML / CSS / JS)",
    "C Programming & Computational Logic",
    "AI-Augmented Developer & Rapid Prototyper"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 75;
  const deletingSpeed = 40;
  const pauseBetween = 1800;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseBetween;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  if (typedTextSpan) {
    typeEffect();
  }

  // ==========================================================================
  // 3. Mobile Navigation Menu Toggle
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // 4. Active Nav Link on Scroll (Intersection Observer)
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ==========================================================================
  // 5. Project Filtering (All / Web / C)
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // 6. One-Click Copy Email to Clipboard
  // ==========================================================================
  const copyBtn = document.getElementById('copy-email-btn');
  const copyLabel = document.getElementById('copy-label');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        copyLabel.textContent = 'Copied!';
        copyBtn.style.borderColor = '#22c55e';
        copyBtn.style.color = '#22c55e';

        setTimeout(() => {
          copyLabel.textContent = 'Copy';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // ==========================================================================
  // 7. Interactive Contact Form with Validation & Feedback
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Friendly simulated submission feedback
      formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been received. You can also reach me directly at <a href="mailto:harshitaagrawal53@gmail.com" style="text-decoration: underline; color: inherit;">harshitaagrawal53@gmail.com</a>.`;
      formFeedback.classList.add('success');
      contactForm.reset();

      setTimeout(() => {
        formFeedback.classList.remove('success');
        formFeedback.style.display = 'none';
      }, 7000);
    });
  }

});
