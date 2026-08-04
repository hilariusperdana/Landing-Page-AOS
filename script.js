/* ==========================================================================
   AOS ONLINE LANDING PAGE JAVASCRIPT LOGIC
   Matching exact behaviors from https://aosonline.id/
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Dark / Light Theme Mode Switcher with localStorage persistence
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const htmlElement = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('aos-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  const toggleTheme = () => {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('aos-theme', isDark ? 'dark' : 'light');
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 4. Alpine Typewriter-equivalent Effect for Hero Headline
  // Exact phrases from aosonline.id: ['Korporasi Berkah', 'Delegasi Mudah', 'Hasil Melimpah']
  const typewriterTarget = document.getElementById('typewriter');
  if (typewriterTarget) {
    const phrases = [
      'Korporasi Berkah',
      'Delegasi Mudah',
      'Hasil Melimpah'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 300; // Pause before typing new phrase
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // 5. Smooth Navbar Shadow on Scroll
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav?.classList.add('shadow-md');
    } else {
      nav?.classList.remove('shadow-md');
    }
  });
});
