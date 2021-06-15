import { cocktails } from './menu/cocktails.js';
import { food } from './menu/food.js';
import { wines } from './menu/wines.js';

const menu = [...cocktails, ...food, ...wines];

const sectionCenter = document.querySelector('.menu-items');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load items
window.addEventListener('DOMContentLoaded', function () {
  displayMenuItems(cocktails);
});

// Filter items
filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const category = e.currentTarget.dataset.id;
    const menuCategory = menu.filter(function (menuItem) {
      if (menuItem.category === category) {
        return menuItem;
      }
    });
    displayMenuItems(menuCategory);
  });
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    let location = `${item.location ? item.location : ''}`;
    let year = `${item.year ? item.year : ''}`;
    return `
    <div class="item-info">
    <div class="item-header">
      <h3 class="text-uppercase">${item.title}</h3>
      <h4 class="price">${item.price} kn</h4>
    </div>
    ${
      item.location && item.year
        ? `
        <div class="menu-info">
    <p class="text-info">Year: ${year}</p>
    <p class="text-info">${location}</p>
    </div>`
        : ''
    }
    ${
      item.location && !item.year
        ? `
        <div class="menu-info">
        <p class="text-info">${location}</p>
    </div>`
        : ''
    }
    ${
      item.desc
        ? `
        <p class="item-text">${item.desc}</p>`
        : ''
    }
  </div>
  `;
  });
  displayMenu = displayMenu.join('');
  sectionCenter.innerHTML = displayMenu;
}

// Navbar disappear after first scrolling
$(window).scroll(function (e) {
  // add/remove class to navbar when scrolling to hide/show
  var scroll = $(window).scrollTop();
  if (scroll >= 150) {
    $('.navbar').addClass('navbar-hide');
  } else {
    $('.navbar').removeClass('navbar-hide');
  }
});

// Show current year in footer
document
  .querySelector('.jsYear')
  .appendChild(document.createTextNode(new Date().getFullYear()));
// Fancybox settings
$('[data-fancybox="images"]').fancybox({
  loop: true,
  buttons: ['share', 'slideShow', 'close'],
  transitionEffect: 'circular',
});

// Dropdown stays down when active in menu section
$('.dropdown-menu').on('click.bs.dropdown', function (e) {
  e.stopPropagation();
  e.preventDefault();
});

// Back to top button
const backToTopButton = document.querySelector('#backToTop');

window.addEventListener('scroll', scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) {
    // Show backToTopButton
    if (!backToTopButton.classList.contains('btnEntrance')) {
      backToTopButton.classList.remove('btnExit');
      backToTopButton.classList.add('btnEntrance');
      backToTopButton.style.display = 'block';
    }
  } else {
    // Hide backToTopButton
    if (backToTopButton.classList.contains('btnEntrance')) {
      backToTopButton.classList.remove('btnEntrance');
      backToTopButton.classList.add('btnExit');
      setTimeout(function () {
        backToTopButton.style.display = 'none';
      }, 250);
    }
  }
}

backToTopButton.addEventListener('click', smoothScrollBackToTop);

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 250;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

// Mobile toggle navigation to disappear when item selected
$('.navbar-nav>li>a').on('click', function () {
  $('.navbar-collapse').collapse('hide');
});

// Reveal sections on scroll
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.03,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Reserve from current day onwards
let dateControl = document.querySelector('input[type="datetime-local"]');
dateControl.value = new Date().toISOString().split('.')[0];
dateControl.min = new Date().toISOString().split('.')[0];
