import {
  getObjFromLS,
  deleteCartItemFromLS,
  setObjToLS,
  findCartItemFromLS,
} from './storage.js';
import { createPizzaItemStr } from './components/cart/pizzaItem.js';
import { createCustomPizzaItemStr } from './components/cart/customPizzaItem.js';
import { createDrinkItemStr } from './components/cart/drinkItem.js';
import { createDessertItemStr } from './components/cart/dessertItem.js';
import { createSideItemStr } from './components/cart/sideItem.js';
import { createEmptyCartStr } from './components/emptyCart.js';
import { activateAlert } from './alert.js';
import { activateSidebarAlert } from './alert.js';
const cartEl = document.querySelector('.cart');
const cartItemsUl = document.querySelector('.cart__ul');

const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTaxEl = document.getElementById('cart-tax');
const cartTotalEl = document.getElementById('cart-total');
const orderTypeEl = document.querySelector('.cart__order-type');
const cartCountEl = document.querySelector('.cart__count');
const cartIcon = document.querySelector('.header__cart-icon');
const listContainer = document.querySelector('.cart__ul');
const sidebarCartContainer = document.querySelector('.sidebar__cart-list');
const sidebarOrderTypeEl = document.querySelector('.sidebar__order-type');
const sidebarSubtotalEl = document.getElementById('sidebar-subtotal');
const sidebarTaxEl = document.getElementById('sidebar-tax');
const sidebarTotalEl = document.getElementById('sidebar-total');

export function initCart() {
  renderCarts();
}

export function addCartListeners() {
  if (cartItemsUl) cartItemsUl.onclick = (e) => handleDeleteCartItem(e, false);

  if (cartIcon) cartIcon.onclick = handleCartDisplay;
}

// HANDLERS //
// fromSidebar - Boolean value, determines if item is deleted from sidebar or regular cart
// fromSidebar Boolean determines which side effects will run

// handleDeleteCartItem does not have access to the event object when another argument is passed in
// possible solutions
// - run callback within handleDelete itself
// - run callback in onclick method that calls handleDelete
// - callback will have access to event object, which can be passed down in handleDelete
export function handleDeleteCartItem(e, fromSidebar) {
  const el = e.target;
  if (el.nodeName === 'BUTTON' && el.classList.contains('delete-cart-item')) {
    const targetLiUuid = el.closest('li').dataset.uuid;
    const removedItem = findCartItemFromLS(targetLiUuid);
    const alertMsg = `${removedItem.name} has been removed from your cart`;
    if (fromSidebar) {
      activateSidebarAlert(alertMsg, true);
    } else {
      activateAlert(alertMsg, true);
    }
    deleteCartItemFromLS(targetLiUuid);
    renderCarts();
  }
}

export function handleCartDisplay() {
  console.log('handle cart display ran');
  const windowWidth = window.innerWidth;
  const cartElStyles = window.getComputedStyle(cartEl);

  // a window width > 735px will open the dropdown cart
  // window widths < 735px are ignored and handled in sidebar.js file
  if (windowWidth > 735) {
    if (cartElStyles.display === 'none') {
      cartEl.style.display = 'block';
    } else {
      cartEl.style.display = 'none';
    }
  }
}

// RENDERERS //

export function renderCarts() {
  const { items } = getObjFromLS('cart');
  listContainer.replaceChildren();
  sidebarCartContainer.replaceChildren();
  let itemsStr = '';

  if (!items.length) {
    itemsStr = createEmptyCartStr();
  }
  items.forEach((item) => {
    switch (item.category) {
      case 'pizza':
        itemsStr += createPizzaItemStr(item);
        break;
      case 'custom':
        itemsStr += createCustomPizzaItemStr(item);
        break;
      case 'side':
        itemsStr += createSideItemStr(item);
        break;
      case 'dessert':
        itemsStr += createDessertItemStr(item);
        break;
      case 'drink':
        itemsStr += createDrinkItemStr(item);
        break;

      default:
        break;
    }
  });
  listContainer.insertAdjacentHTML('beforeend', itemsStr);
  sidebarCartContainer.insertAdjacentHTML('beforeend', itemsStr);

  determineCartTotals();
  renderCartMetaData();
  renderSidebarCartMetaData();
}

function renderCartMetaData() {
  const { cartTotals, orderType, items } = getObjFromLS('cart');

  cartSubtotalEl.textContent = cartTotals.subtotal.toFixed(2);
  cartTaxEl.textContent = cartTotals.calculatedTax.toFixed(2);
  cartTotalEl.textContent = cartTotals.total.toFixed(2);

  orderTypeEl.textContent = orderType || '';

  cartCountEl.textContent = items.length;
}

function renderSidebarCartMetaData() {
  const { cartTotals, orderType } = getObjFromLS('cart');

  sidebarSubtotalEl.textContent = cartTotals.subtotal.toFixed(2);
  sidebarTaxEl.textContent = cartTotals.calculatedTax.toFixed(2);
  sidebarTotalEl.textContent = cartTotals.total.toFixed(2);

  sidebarOrderTypeEl.textContent = orderType || '';
}

// HELPERS //

export function determineCartTotals() {
  const cart = getObjFromLS('cart');
  let subtotal = cart.items.reduce((acc, item) => {
    return acc + parseFloat(item.totalPrice);
  }, 0);

  const calculatedTax = Number(parseFloat(subtotal * 0.085).toFixed(2));
  const total = Number((subtotal + parseFloat(calculatedTax)).toFixed(2));
  subtotal = Number(subtotal.toFixed(2));

  cart.cartTotals.calculatedTax = calculatedTax;
  cart.cartTotals.total = total;
  cart.cartTotals.subtotal = subtotal;
  setObjToLS('cart', cart);
}

export function activateCartCount() {
  cartCountEl.classList.add('header__cart-box--active');
  setTimeout(() => {
    cartCountEl.classList.remove('header__cart-box--active');
  }, 200);
}
