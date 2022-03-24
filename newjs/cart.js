import { getObjFromLS, deleteCartItemFromLS, setObjToLS } from './storage.js';
import { createPizzaItemStr } from './components/cart/pizzaItem.js';
import { createCustomPizzaItemStr } from './components/cart/customPizzaItem.js';
import { createDrinkItemStr } from './components/cart/drinkItem.js';
import { createDessertItemStr } from './components/cart/dessertItem.js';
import { createSideItemStr } from './components/cart/sideItem.js';
import { createEmptyCartStr } from './components/checkout/emptyCart.js';

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
const sidebarSubtotalEl = document.getElementById('sidebar-subtotal');
const sidebarTaxEl = document.getElementById('sidebar-tax');
const sidebarTotalEl = document.getElementById('sidebar-total');

export function initCart() {
  renderCarts();
}

export function addCartListeners() {
  if (cartItemsUl) cartItemsUl.onclick = handleDeleteCartItem;

  if (cartIcon) cartIcon.onclick = handleCartDisplay;
}

// HANDLERS //

export function handleDeleteCartItem(e) {
  const el = e.target;
  if (el.nodeName === 'BUTTON' && el.classList.contains('delete-cart-item')) {
    const targetLi = el.closest('li');
    deleteCartItemFromLS(targetLi.dataset.uuid);
    renderCarts();
  }
}

export function handleCartDisplay() {
  console.log('handle cart display ran');
  const windowWidth = window.innerWidth;
  const cartElStyles = window.getComputedStyle(cartEl);

  // a window width > 520px will open the dropdown cart
  // window widths < 520px are ignored and handled in sidebar.js file
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

  if (!items) {
    const emptyCartStr = createEmptyCartStr();
  }
  items.forEach((item) => {
    switch (item.category) {
      case 'pizza':
        const PizzaStr = createPizzaItemStr(item);
        listContainer.insertAdjacentHTML('beforeend', PizzaStr);
        sidebarCartContainer.insertAdjacentHTML('beforeend', PizzaStr);
        break;
      case 'custom':
        const customStr = createCustomPizzaItemStr(item);
        listContainer.insertAdjacentHTML('beforeend', customStr);
        sidebarCartContainer.insertAdjacentHTML('beforeend', customStr);
        break;
      case 'side':
        const sideStr = createSideItemStr(item);
        listContainer.insertAdjacentHTML('beforeend', sideStr);
        sidebarCartContainer.insertAdjacentHTML('beforeend', sideStr);
        break;
      case 'dessert':
        const dessertStr = createDessertItemStr(item);
        listContainer.insertAdjacentHTML('beforeend', dessertStr);
        sidebarCartContainer.insertAdjacentHTML('beforeend', dessertStr);
        break;
      case 'drink':
        const drinkStr = createDrinkItemStr(item);
        listContainer.insertAdjacentHTML('beforeend', drinkStr);
        sidebarCartContainer.insertAdjacentHTML('beforeend', drinkStr);
        break;

      default:
        break;
    }
  });
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
