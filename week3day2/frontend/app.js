// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggleIcon');
const toggleCircle = document.getElementById('toggleCircle');
const body = document.body;

// Image mapping for light/dark modes
const imageMap = {
  logoIcon: {
    dark: './assets/logo.png',
    light: './assets/light-mode-logo.png'
  },
  instagramIcon: {
    dark: './assets/instagram.png',
    light: './assets/light-mode-instagram.png'
  },
  figmaIcon: {
    dark: './assets/figma.png',
    light: './assets/light-mode-figma.png'
  },
  linkedinIcon: {
    dark: './assets/linkedin.png',
    light: './assets/light-mode-linkedin.png'
  },
  twitterIcon: {
    dark: './assets/twitter.png',
    light: './assets/light-mode-twitter.png'
  },
  telegramIcon: {
    dark: './assets/telegram.png',
    light: './assets/light-mode-telegram.png'
  },
  socialIcon: {
    dark: './assets/social-networks.png',
    light: './assets/light-mode-social.png'
  },
  starIcon: {
    dark: './assets/star.png',
    light: './assets/light-mode-star.png'
  }
};

// Get current theme from localStorage or default to 'dark'
let currentTheme = localStorage.getItem('theme') || 'dark';

// Apply theme on page load
function applyTheme(theme) {
  if (theme === 'light') {
    // Light Mode
    body.classList.remove('bg-black', 'text-white');
    body.classList.add('bg-white', 'text-black');
    
    // Update nav colors
    document.querySelector('nav').classList.remove('text-white');
    document.querySelector('nav').classList.add('text-black');
    
    // Update toggle button
    themeToggle.classList.remove('bg-[#FFEC70]');
    themeToggle.classList.add('bg-[#505050]');
    toggleCircle.classList.remove('bg-[#FFFDED]');
    toggleCircle.classList.add('bg-gray-300');
    
    // Update toggle icon to sun
    toggleIcon.src = './assets/sun-toggle.png';
    toggleIcon.alt = 'sun';
    
    // Move circle to the right (light mode)
    toggleCircle.style.order = '2';
    toggleIcon.style.order = '1';
    
    // Update social icons to light mode
    Object.keys(imageMap).forEach(iconId => {
      const element = document.getElementById(iconId);
      if (element) {
        element.src = imageMap[iconId].light;
      }
    });
    
    // Update hero section background colors
    const heroSection = document.querySelector('section');
    if (heroSection) {
      heroSection.classList.remove('bg-black');
      heroSection.classList.add('bg-white');
    }
    
    // Update any bg-[#292929] elements to light mode
    const darkBgElements = document.querySelectorAll('[class*="bg-\\[#292929\\]"]');
    darkBgElements.forEach(el => {
      el.classList.remove('bg-[#292929]');
      el.classList.add('bg-gray-200');
    });
    
  } else {
    // Dark Mode
    body.classList.remove('bg-white', 'text-black');
    body.classList.add('bg-black', 'text-white');
    
    // Update nav colors
    document.querySelector('nav').classList.remove('text-black');
    document.querySelector('nav').classList.add('text-white');
    
    // Update toggle button
    themeToggle.classList.remove('bg-[#505050]');
    themeToggle.classList.add('bg-[#FFEC70]');
    toggleCircle.classList.remove('bg-gray-300');
    toggleCircle.classList.add('bg-[#FFFDED]');
    
    // Update toggle icon to moon
    toggleIcon.src = './assets/moon-toggle.png';
    toggleIcon.alt = 'moon';
    
    // Move circle to the left (dark mode)
    toggleCircle.style.order = '1';
    toggleIcon.style.order = '2';
    
    // Update social icons to dark mode
    Object.keys(imageMap).forEach(iconId => {
      const element = document.getElementById(iconId);
      if (element) {
        element.src = imageMap[iconId].dark;
      }
    });
    
    // Update hero section background colors
    const heroSection = document.querySelector('section');
    if (heroSection) {
      heroSection.classList.remove('bg-white');
      heroSection.classList.add('bg-black');
    }
    
    // Update any light bg elements back to dark
    const lightBgElements = document.querySelectorAll('[class*="bg-gray-200"]');
    lightBgElements.forEach(el => {
      el.classList.remove('bg-gray-200');
      el.classList.add('bg-[#292929]');
    });
  }
  
  // Save theme to localStorage
  localStorage.setItem('theme', theme);
  currentTheme = theme;
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
});

// Hamburger Menu Functionality
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle mobile menu
hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a, button');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
  if (!hamburgerBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
    mobileMenu.classList.add('hidden');
  }
});
