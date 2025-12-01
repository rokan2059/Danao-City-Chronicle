// UI Elements
const ui = {
  header: document.getElementById('main-header'),
  brandText: document.getElementById('brand-text'),
  currentDate: document.getElementById('current-date'),
  year: document.getElementById('year'),
};

// Initialize app logic
function init() {
  // Set dates
  if (ui.currentDate) ui.currentDate.textContent = new Date().toLocaleDateString();
  if (ui.year) ui.year.textContent = new Date().getFullYear();

  // Scroll Listener
  window.addEventListener('scroll', handleScroll);
}

// Scroll Handler for Header styling
function handleScroll() {
  if (window.scrollY > 20) {
    ui.header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
    ui.header.classList.remove('bg-transparent', 'py-5');
    ui.brandText.classList.remove('text-white');
    ui.brandText.classList.add('text-gray-900');
  } else {
    ui.header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
    ui.header.classList.add('bg-transparent', 'py-5');
    ui.brandText.classList.remove('text-gray-900');
    ui.brandText.classList.add('text-white');
  }
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}