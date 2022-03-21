// TODO FOR THIS FILE
// SIDEBAR NEEDS TO BE TWO SEPARATE CONTAINERS
// HAVE TWO SEPARATE FUNCTIONS FOR EACH CONTAINER
// REMOVE BLUE BACKGROUND FOR MENU
import { handleDeleteCartItem } from './cart.js';
import { getObjFromLS } from './storage.js';
import { createPizzaItemNode } from './components/cart/pizzaItem.js';
import { createCustomPizzaItemNode } from './components/cart/customPizzaItem.js';
import { createSideItemNode } from './components/cart/sideItem.js';
import { createDessertItemNode } from './components/cart/dessertItem.js';
import { createDrinkItemNode } from './components/cart/drinkItem.js';
import { determineCartTotals } from './cart.js';

const menuEl = document.querySelector('.sidebar--menu');
const sideBarcartEl = document.querySelector('.sidebar--cart');
const dropDownCartEl = document.querySelector('.cart');
const openMenuBtn = document.querySelector('.header__menu-icon');
const openCartBtn = document.querySelector('.header__cart-icon');
const closeMenuBtn = document.querySelector('.btn--close-menu-sidebar');
const closeCartBtn = document.querySelector('.btn--close-cart-sidebar');
const sidebarCartContainer = document.querySelector('.sidebar__cart-list');
const sidebarSubtotal = document.getElementById('sidebar-subtotal');
const sidebarTax = document.getElementById('sidebar-tax');
const sidebarTotal = document.getElementById('sidebar-total');

export function initSidebar() {
  renderSidebarCart();
  renderSidebarTotal();
}

export function addSidebarListeners() {
  openMenuBtn.onclick = handleOpenMenu;
  closeMenuBtn.onclick = handleCloseMenu;
  openCartBtn.onclick = handleOpenCart;
  closeCartBtn.onclick = handleCloseCart;
  sidebarCartContainer.onclick = handleDeleteCartItem;
}

// HANDLERS //

function handleOpenMenu() {
  menuEl.classList.add('sidebar--menu--open');
}
function handleCloseMenu() {
  menuEl.classList.remove('sidebar--menu--open');
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

// RENDERERS //

export function renderSidebarCart() {
  const { items } = getObjFromLS('cart');
  sidebarCartContainer.replaceChildren();

  items.forEach((item) => {
    switch (item.category) {
      case 'pizza':
        createPizzaItemNode(item, sidebarCartContainer);
        break;
      case 'custom':
        createCustomPizzaItemNode(item, sidebarCartContainer);
        break;
      case 'side':
        createSideItemNode(item, sidebarCartContainer);
        break;
      case 'dessert':
        createDessertItemNode(item, sidebarCartContainer);
        break;
      case 'drink':
        createDrinkItemNode(item, sidebarCartContainer);
        break;

      default:
        break;
    }
  });
  determineCartTotals();
  renderSidebarTotal();
}

function renderSidebarTotal() {
  const { cartTotals } = getObjFromLS('cart');

  sidebarSubtotal.textContent = cartTotals.subtotal.toFixed(2);
  sidebarTax.textContent = cartTotals.calculatedTax.toFixed(2);
  sidebarTotal.textContent = cartTotals.total.toFixed(2);
}
