// TODO THIS FILE
// break handleAddToCart into multiple function calls base on food item being added

import { create_UUID } from './helpers.js';
import { setCartItemToLS } from './storage.js';
import { activateCartCount } from './cart.js';
import { activateAlert } from './alert.js';
import { renderCart } from './cart.js';
import { renderSidebarCart } from './sidebar.js';
import foodItems from './data/foodItemData.js';
import Pizza from './cartItems/Pizza.js';
import Side from './cartItems/Side.js';
import Dessert from './cartItems/Dessert.js';
import Drink from './cartItems/Drink.js';

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

function handleAddToCart(e) {
  const foodItemBox = e.target.closest('.food-item-box');
  const clickedItemId = foodItemBox.dataset.id;
  const clickedItemCat = foodItemBox.dataset.category;
  const sizeVal = foodItemBox.querySelector('.item-size-select')?.value;
  const crustVal = foodItemBox.querySelector('.pizza-crust-select')?.value;
  const sauceVal = foodItemBox.querySelector('.item-sauce-select')?.value;
  const countVal = foodItemBox.querySelector('.food-item-count')?.value;

  const foodItem = foodItems.find((foodItem) => foodItem.id === clickedItemId);
  const { category, name, imageLink } = foodItem;
  const uuid = create_UUID();

  let { totalPrice, originalPrice } = determinePrice(
    sizeVal,
    countVal,
    clickedItemId
  );
  let newCartItem;

  switch (clickedItemCat) {
    case 'pizza':
      newCartItem = new Pizza(
        uuid,
        category,
        name,
        countVal,
        originalPrice,
        totalPrice,
        imageLink,
        sizeVal,
        crustVal
      );
      break;
    case 'side':
      newCartItem = new Side(
        uuid,
        category,
        name,
        countVal,
        originalPrice,
        totalPrice,
        imageLink,
        sizeVal,
        sauceVal
      );
      break;
    case 'dessert':
      newCartItem = new Dessert(
        uuid,
        category,
        name,
        countVal,
        originalPrice,
        totalPrice,
        imageLink
      );
      break;
    case 'drink':
      newCartItem = new Drink(
        uuid,
        category,
        name,
        countVal,
        originalPrice,
        totalPrice,
        imageLink,
        sizeVal
      );
      break;

    default:
      break;
  }

  setCartItemToLS(newCartItem);
  activateCartCount();
  activateAlert(`${newCartItem.name} has been added to your cart`, true);
  renderCart();
  // renderSidebarCart();
}

function handleSizeSelect(e) {
  const el = e.target;
  const priceEl = el.parentNode.querySelector('.item-price__amount');
  const countElVal = el.parentNode.querySelector('.food-item-count').value;
  const itemId = el.parentNode.dataset.id;
  priceEl.textContent = determinePrice(el.value, countElVal, itemId).totalPrice;
}

function handleCountSelect(e) {
  const el = e.target;
  const priceEl = el.parentNode.querySelector('.item-price__amount');
  const sizeSelectElVal =
    el.parentNode.querySelector('.item-size-select')?.value;
  const id = el.parentNode.dataset.id;

  priceEl.textContent = determinePrice(
    sizeSelectElVal,
    el.value,
    id
  ).totalPrice;
}

// HELPERS //

// determines price of specific food item based on size, type, count etc.
function determinePrice(size, count, id) {
  const foodItem = foodItems.find((foodItem) => foodItem.id === id);
  let price;

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
