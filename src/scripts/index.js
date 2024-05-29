import 'regenerator-runtime';
import '../styles/tailwind.css';

// document.getElementById('hamburger').addEventListener('click', () => {
//   const mobileMenu = document.getElementById('mobile-menu');
//   if (mobileMenu.classList.contains('hidden')) {
//     mobileMenu.classList.remove('hidden');
//   } else {
//     mobileMenu.classList.add('hidden');
//   }
// });
const menuToggle = document.querySelector('.menu-togle input');
const nav = document.querySelector('header nav ul');
const aElements = document.querySelector('header nav ul li a');
const checkbox = document.querySelector('menu-togle input');

_initialCheckbox(checkbox, false);

menuToggle.addEventListener('click', (event) => {
  _toggleDrawer(event, nav);
});

aElements.forEach((a) => {
  a.addEventListener('click', (event) => {
    _aElementsHandler(event, nav);
    _initialCheckbox(checkbox, !checkbox.checked);
  });
});

// eslint-disable-next-line no-shadow
function _initialCheckbox(checkbox, status) {
  const clonedCheckbox = checkbox;
  clonedCheckbox.checked = status;
}

function _toggleDrawer(event, nav) {
  event.stopPropagation();
  nav.classList.toggle('slide');
}

function _aElementsHandler(event, nav) {
  event.stopPropagation();
  nav.classList.toggle('slide');
}
