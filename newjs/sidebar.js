// TODO FOR THIS FILE
// SIDEBAR NEEDS TO BE TWO SEPARATE CONTAINERS
// HAVE TWO SEPARATE FUNCTIONS FOR EACH CONTAINER
// REMOVE BLUE BACKGROUND FOR MENU
import { handleDeleteCartItem } from './cart.js';

const menuEl = document.querySelector('.sidebar--nav');
const sideBarcartEl = document.querySelector('.sidebar--cart');
const dropDownCartEl = document.querySelector('.cart');
const openMenuBtn = document.querySelector('.header__menu-icon');
const openCartBtn = document.querySelector('.header__cart-icon');
const closeMenuBtn = document.querySelector('.sidebar__close-menu-btn');
const closeCartBtn = document.querySelector('.sidebar__close-cart-btn');
const sidebarCartContainer = document.querySelector('.sidebar__cart-list');

export function addSidebarListeners() {
  openMenuBtn.onclick = handleOpenMenu;
  closeMenuBtn.onclick = handleCloseMenu;
  openCartBtn.onclick = handleOpenCart;
  closeCartBtn.onclick = handleCloseCart;
  sidebarCartContainer.onclick = handleDeleteCartItem;
}

// HANDLERS //

function handleOpenMenu() {
  menuEl.classList.add('sidebar--nav--open');
}
function handleCloseMenu() {
  menuEl.classList.remove('sidebar--nav--open');
}
function handleOpenCart() {
  const windowWidth = window.innerWidth;
  const dropdownCartElStyles = window.getComputedStyle(dropDownCartEl);

  // windropdownCow widths > 735px will open the dropdown cart
  // window widths < 735px dropdownCartElStyles are
  if (windowWidth > 735) {
    if (dropdownCartElStyles.display === 'none') {
      dropDownCartEl.style.display = 'block';
    } else {
      dropDownCartEl.style.display = 'none';
    }
  } else {
    sideBarcartEl.classList.add('sidebar--cart--open');
  }
}
function handleCloseCart() {
  sideBarcartEl.classList.remove('sidebar--cart--open');
}
