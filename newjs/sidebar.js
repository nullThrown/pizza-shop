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

const sidebar = document.querySelector('.sidebar');
const sidebarMenuBtn = document.querySelector('.sidebar__hamburger-icon');
const sidebarCartBtn = document.querySelector('.sidebar__cart-icon');
const sidebarMenu = document.querySelector('.sidebar__nav-list');
const sidebarCart = document.querySelector('.sidebar__cart');
const sidebarCartContainer = document.querySelector('.sidebar__cart-list');
const sidebarSubtotal = document.getElementById('sidebar-subtotal');
const sidebarTax = document.getElementById('sidebar-tax');
const sidebarTotal = document.getElementById('sidebar-total');

export function initSidebar() {
  renderSidebarCart();
  renderSidebarTotal();
}

export function addSidebarListeners() {
  sidebarMenuBtn.onclick = handleSidebarMenu;
  sidebarCartBtn.onclick = handleSidebarCart;
  sidebarCartContainer.onclick = handleDeleteCartItem;
}

// HANDLERS //

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
