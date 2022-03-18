import { getObjFromLS, deleteCartItemFromLS, setObjToLS } from './storage.js';
import { createPizzaItemNode } from './components/cart/pizzaItem.js';
import { createCustomPizzaItemNode } from './components/cart/customPizzaItem.js';
import { createDrinkItemNode } from './components/cart/drinkItem.js';
import { createDessertItemNode } from './components/cart/dessertItem.js';
import { createSideItemNode } from './components/cart/sideItem.js';
import { renderSidebarCart } from './sidebar.js';

const cartEl = document.querySelector('.cart');
const cartItemsUl = document.querySelector('.cart__ul');

const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTaxEl = document.getElementById('cart-tax');
const cartTotalEl = document.getElementById('cart-total');
const orderTypeEl = document.querySelector('.cart__order-type');

const cartCountEl = document.querySelector('.cart__count');

const cartIcon = document.querySelector('.header__cart-icon');
console.log(cartIcon);

export function initCart() {
  renderCart();
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
    renderCart();
    renderSidebarCart();
  }
}

export function handleCartDisplay() {
  console.log('handle cart display ran');
  const windowWidth = window.innerWidth;
  const cartElStyles = window.getComputedStyle(cartEl);

  // a window width > 520px will open the dropdown cart
  // window widths < 520px are ignored and handled in sidebar.js file
  if (windowWidth > 520) {
    if (cartElStyles.display === 'none') {
      cartEl.style.display = 'block';
    } else {
      cartEl.style.display = 'none';
    }
  }
}

// RENDERERS //

export function renderCart() {
  const cart = getObjFromLS('cart');
  const listContainer = document.querySelector('.cart__ul');
  listContainer.replaceChildren();
  cart.items.forEach((item) => {
    // creates cart item node and appends it to the listcontainer
    switch (item.category) {
      case 'pizza':
        createPizzaItemNode(item, listContainer);
        break;
      case 'custom':
        createCustomPizzaItemNode(item, listContainer);
        break;
      case 'side':
        createSideItemNode(item, listContainer);
        break;
      case 'dessert':
        createDessertItemNode(item, listContainer);
        break;
      case 'drink':
        createDrinkItemNode(item, listContainer);
        break;

      default:
        break;
    }
  });
  determineCartTotals();
  renderCartMetaData();
}

function renderCartMetaData() {
  const cart = getObjFromLS('cart');
  const { cartTotals, orderType, items } = cart;

  cartSubtotalEl.textContent = cartTotals.subtotal.toFixed(2);
  cartTaxEl.textContent = cartTotals.calculatedTax.toFixed(2);
  cartTotalEl.textContent = cartTotals.total.toFixed(2);

  orderTypeEl.textContent = orderType || '';

  cartCountEl.textContent = items.length;
  // sidebarCartCountEl.textContent = items.length;
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
