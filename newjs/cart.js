import { createPizzaItemNode } from './components/pizzaItem.js';
import { createCustomPizzaItemNode } from './components/customPizzaItem.js';
import { createDrinkItemNode } from './components/drinkItem.js';
import { createDessertItemNode } from './components/dessertItem.js';
import { createSideItemNode } from './components/sideItem.js';
// import {renderSidebarCart} from './sidebar/...'
import { getObjFromLS, deleteCartItemFromLS, setObjToLS } from './storage.js';

const cartEl = document.querySelector('.cart');
const cartItemsUl = document.querySelector('.cart__ul');

const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTaxEl = document.getElementById('cart-tax');
const cartTotalEl = document.getElementById('cart-total');

const orderTypeEl = document.querySelector('.cart__order-type');

const cartCountEl = document.getElementById('cart-count');
const sidebarCartCountEl = document.querySelector('.sidebar__cart-count');

const cartIcons = document.querySelectorAll('.cart-icons');

// event listeners
export function addCartListeners() {
  if (cartItemsUl) cartItemsUl.onclick = handleDeleteCartItem;

  // combine into single element
  if (cartIcons)
    cartIcons.forEach((el) => {
      el.onclick = toggleCartDisplay;
    });
}

export class CartItem {
  constructor(
    uuid,
    category,
    name,
    size,
    crust,
    sauce,
    count,
    originalPrice,
    totalPrice,
    imageLink
  ) {
    this.uuid = uuid;
    this.category = category;
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.sauce = sauce;
    this.count = count;
    this.originalPrice = originalPrice;
    this.totalPrice = totalPrice;
    this.imageLink = imageLink;
  }
}

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

export function toggleCartDisplay() {
  const cartElStyles = window.getComputedStyle(cartEl);
  if (cartElStyles.display === 'none') {
    cartEl.style.display = 'block';
  } else {
    cartEl.style.display = 'none';
  }
}

function renderCartMetaData() {
  const cart = getObjFromLS('cart');
  const { cartTotals, orderType, items } = cart;
  //totals
  cartSubtotalEl.textContent = cartTotals.subtotal.toFixed(2);
  cartTaxEl.textContent = cartTotals.calculatedTax.toFixed(2);
  cartTotalEl.textContent = cartTotals.total.toFixed(2);

  orderTypeEl.textContent = orderType || '';

  // cart count
  cartCountEl.textContent = items.length;
  sidebarCartCountEl.textContent = items.length;
}

export function handleDeleteCartItem(e) {
  const el = e.target;
  if (el.nodeName === 'BUTTON' && el.classList.contains('delete-cart-item')) {
    const targetLi = el.closest('li');
    deleteCartItemFromLS(targetLi.dataset.uuid);
    renderCart();
    renderSidebarCart();
  }
}

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
