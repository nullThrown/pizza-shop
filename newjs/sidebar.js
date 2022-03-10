// TODO FOR THIS FILE
// SIDEBAR NEEDS TO BE TWO SEPARATE CONTAINERS
// HAVE TWO SEPARATE FUNCTIONS FOR EACH CONTAINER
// REMOVE BLUE BACKGROUND FOR MENU
import { handleDeleteCartItem } from './cart.js';
import { getObjFromLS } from './storage.js';
import { createPizzaItemNode } from './components/pizzaItem.js';
import { createCustomPizzaItemNode } from './components/customPizzaItem.js';
import { createSideItemNode } from './components/sideItem.js';
import { createDessertItemNode } from './components/dessertItem.js';
import { createDrinkItemNode } from './components/drinkItem.js';
import { determineCartTotals } from './cart.js';

const sidebar = document.querySelector('.sidebar');
const sidebarMenuBtn = document.querySelector('.sidebar__hamburger-icon');
const sidebarCartBtn = document.querySelector('.sidebar__cart-icon');
const sidebarMenu = document.querySelector('.sidebar__nav-list');
const sidebarCart = document.querySelector('.sidebar__cart');
const sidebarCartContainer = document.querySelector('.sidebar__cart-list');
const sidebarSubtotal = document.getElementById('sidebar-subtotal');
const sidebarTax = document.getElementById('sidebar-tax');
const sidebarTotal = document.getElementById('sidebar-total');

export function addSidebarListeners() {
  sidebarMenuBtn.onclick = handleSidebarMenu;
  sidebarCartBtn.onclick = handleSidebarCart;
  sidebarCartContainer.onclick = handleDeleteCartItem;
}

function handleSidebarMenu() {
  if (sidebar.dataset.state === 'closed') {
    sidebar.dataset.state = 'open';
    sidebar.classList.add('sidebar--bg-blue');
    openSidebar();
    sidebarMenu.style.display = 'grid';
  } else if (
    sidebar.dataset.state === 'open' &&
    sidebarCart.style.display === 'block'
  ) {
    closeSidebar();

    setTimeout(() => {
      openSidebar();
      sidebar.classList.add('sidebar--bg-blue');
      sidebarMenu.style.display = 'grid';
    }, 400);
  } else if (sidebar.dataset.state === 'open') {
    closeSidebar();
    sidebar.classList.remove('sidebar--bg-blue');
    sidebar.dataset.state = 'closed';
  }
}

function handleSidebarCart() {
  const sidebarState = sidebar.dataset.state;
  if (sidebarState === 'closed') {
    sidebar.dataset.state = 'open';
    openSidebar();
    sidebarCart.style.display = 'block';
  } else if (sidebarState === 'open' && sidebarMenu.style.display === 'grid') {
    closeSidebar();
    setTimeout(() => {
      openSidebar();
      sidebarCart.style.display = 'block';
      sidebar.classList.remove('sidebar--bg-blue');
    }, 400);
  } else if (sidebar.dataset.state === 'open') {
    closeSidebar();
    sidebar.dataset.state = 'closed';
  }
}

// RENDER //

// func should mirror that of renderCart from './cart.js'
export function renderSidebarCart() {
  const cart = getObjFromLS('cart');
  sidebarCartContainer.replaceChildren();

  cart.items.forEach((item) => {
    // creates cart item node and appends it to the sidebarCartContainer
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
  const cart = getObjFromLS('cart');
  const { cartTotals } = cart;
  sidebarSubtotal.textContent = cartTotals.subtotal.toFixed(2);
  sidebarTax.textContent = cartTotals.calculatedTax.toFixed(2);
  sidebarTotal.textContent = cartTotals.total.toFixed(2);
}

function openSidebar() {
  if (sidebar.classList.contains('sidebar--close')) {
    sidebar.classList.remove('sidebar--close');
  }
  sidebar.classList.add('sidebar--open');
}
function closeSidebar() {
  if (sidebar.classList.contains('sidebar--open')) {
    sidebar.classList.remove('sidebar--open');
  }
  sidebar.classList.add('sidebar--close');
  sidebarMenu.style.display = 'none';
  sidebarCart.style.display = 'none';
}

export function initSidebar() {
  renderSidebarCart();
  renderSidebarTotal();
}
