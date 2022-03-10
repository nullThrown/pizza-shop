// TODO THIS FILE
// import renderSidebarCart when exported
// break handleAddToCart into multiple function calls base on food item being added

import { create_UUID } from './helpers.js';
import { CartItem } from './cart.js';
import { setCartItemToLS } from './storage.js';
import { activateCartCount } from './cart.js';
import { activateAlert } from './alert.js';
import { renderCart } from './cart.js';
import { renderSidebarCart } from './sidebar.js';

const itemSizeSelecters = document.querySelectorAll('.item-size-select');
const itemCountSelectors = document.querySelectorAll('.food-item-count');
const addToCartBtns = document.querySelectorAll('.btn--add-to-cart');

export function addMenuListeners() {
  if (addToCartBtns)
    addToCartBtns.forEach((btn) => (btn.onclick = handleAddToCart));
  if (itemSizeSelecters)
    itemSizeSelecters.forEach(
      (selector) => (selector.onchange = handleSizeSelect)
    );
  if (itemCountSelectors)
    itemCountSelectors.forEach(
      (selector) => (selector.onchange = handleCountSelect)
    );
}

// HANDLERS //

// break this function into several based on the food item
// event listeners for addtoCart btns for all menu items
function handleAddToCart(e) {
  let foodItemBox = e.target.closest('.food-item-box');
  let sizeSelectEl =
    foodItemBox.querySelector('.item-size-select') || undefined;
  if (sizeSelectEl !== undefined) sizeSelectEl = sizeSelectEl.value;

  let crustSelectEl =
    foodItemBox.querySelector('.pizza-crust-select') || undefined;
  if (crustSelectEl !== undefined) crustSelectEl = crustSelectEl.value;

  let sauceSelectEl =
    foodItemBox.querySelector('.item-sauce-select') || undefined;
  if (sauceSelectEl !== undefined) sauceSelectEl = sauceSelectEl.value;

  let countEl = foodItemBox.querySelector('.food-item-count');
  let { totalPrice, originalPrice } = determinePrice(
    sizeSelectEl,
    countEl.value,
    foodItemBox.dataset.uuid
  );
  let foodItem = foodItems.find(
    (foodItem) => foodItem.uuid === foodItemBox.dataset.uuid
  );
  const uuid = create_UUID();

  let cartItem = new CartItem(
    uuid,
    foodItem.name,
    foodItem.category,
    sizeSelectEl,
    crustSelectEl,
    sauceSelectEl,
    countEl.value,
    originalPrice,
    totalPrice,
    foodItem.imageLink
  );
  setCartItemToLS(cartItem);
  activateCartCount();
  activateAlert(`${cartItem.name} has been added to your cart`, true);
  renderCart();
  renderSidebarCart();
}

// changes food item price when size is selected
function handleSizeSelect() {
  let priceEl = sizeSelector.parentNode.querySelector('.item-price__amount');
  let countEl = sizeSelector.parentNode.querySelector('.food-item-count').value;
  let uuid = sizeSelector.parentNode.dataset.uuid;
  priceEl.textContent = determinePrice(
    sizeSelector.value,
    countEl,
    uuid
  ).totalPrice;
}

function handleCountSelect() {
  let priceEl = countSelector.parentNode.querySelector('.item-price__amount');
  let sizeSelectEl =
    countSelector.parentNode.querySelector('.item-size-select');
  if (sizeSelectEl !== null) {
    sizeSelectEl = sizeSelectEl.value;
  }
  let uuid = countSelector.parentNode.dataset.uuid;
  priceEl.textContent = determinePrice(
    sizeSelectEl,
    countSelector.value,
    uuid
  ).totalPrice;
}

// HELPERS //

// determines price of specific food item based on size, type, count etc.
function determinePrice(size, count, uuid) {
  const foodItem = foodItems.find((foodItem) => foodItem.id === uuid);
  let price = 0;

  if (!size) {
    price = foodItem.price;
  } else {
    switch (size) {
      case 'small':
        price = foodItem.smallPrice;
        break;
      case 'medium':
        price = foodItem.mediumPrice;
        break;
      case 'large':
        price = foodItem.largePrice;
        break;
      case 'x-large':
        price = foodItem.xlargePrice;
        break;
    }
  }
  return {
    totalPrice: Number((price * Number(count)).toFixed(2)),
    originalPrice: price,
  };
}
