/**
 * Vertex Point - Main JavaScript
 */

(function() {
  'use strict';

  // ==========================================================================
  // Mobile Navigation Toggle
  // ==========================================================================

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // Smooth Scrolling for Anchor Links
  // ==========================================================================

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // Contact Form Handling (Formspree)
  // ==========================================================================

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Thank you! Your message has been sent successfully.';
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Oops! There was a problem sending your message. Please try again or email us directly.';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }

  // ==========================================================================
  // Header Background on Scroll
  // ==========================================================================

  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
      } else {
        header.style.background = 'rgba(0, 0, 0, 0.85)';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

})();
