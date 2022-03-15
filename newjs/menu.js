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

// break this function into several based on the food item
// event listeners for addtoCart btns for all menu items

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

  const cartItemBase = {
    uuid,
    category,
    name,
    countVal,
    originalPrice,
    totalPrice,
    imageLink,
  };
  let newCartItem;

  switch (clickedItemCat) {
    case 'pizza':
      cartItemBase.size = sizeVal;
      cartItemBase.crust = crustVal;
      newCartItem = new Pizza(...cartItemBase);
      break;
    case 'side':
      cartItemBase.size = sizeVal;
      cartItemBase.sauce = sauceVal;
      newCartItem = new Side(cartItemBase);
      break;
    case 'dessert':
      newCartItem = new Dessert(cartItemBase);
      break;
    case 'drink':
      cartItemBase.size = sizeVal;
      newCartItem = new Drink(cartItemBase);
      break;

    default:
      break;
  }

  setCartItemToLS(newCartItem);
  activateCartCount();
  activateAlert(`${newCartItem.name} has been added to your cart`, true);
  renderCart();
  renderSidebarCart();
}

function handleSizeSelect(e) {
  const el = e.target;
  const priceEl = el.parentNode.querySelector('.item-price__amount');
  const countEl = el.parentNode.querySelector('.food-item-count').value;
  const id = el.parentNode.dataset.id;
  priceEl.textContent = determinePrice(el.value, countEl, id).totalPrice;
}

function handleCountSelect(e) {
  const el = e.target;
  const priceEl = el.parentNode.querySelector('.item-price__amount');
  let sizeSelectEl = el.parentNode.querySelector('.item-size-select');
  if (sizeSelectEl !== null) {
    sizeSelectEl = sizeSelectEl.value;
  }
  const id = el.parentNode.dataset.id;
  priceEl.textContent = determinePrice(sizeSelectEl, el.value, id).totalPrice;
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

// function handleAddToCart(e) {
//   let foodItemBox = e.target.closest('.food-item-box');
//   let sizeSelectEl =
//     foodItemBox.querySelector('.item-size-select') || undefined;
//   if (sizeSelectEl !== undefined) sizeSelectEl = sizeSelectEl.value;

//   let crustSelectEl =
//     foodItemBox.querySelector('.pizza-crust-select') || undefined;
//   if (crustSelectEl !== undefined) crustSelectEl = crustSelectEl.value;

//   let sauceSelectEl =
//     foodItemBox.querySelector('.item-sauce-select') || undefined;
//   if (sauceSelectEl !== undefined) sauceSelectEl = sauceSelectEl.value;

//   let countEl = foodItemBox.querySelector('.food-item-count');
//   let { totalPrice, originalPrice } = determinePrice(
//     sizeSelectEl,
//     countEl.value,
//     foodItemBox.dataset.id
//   );
//   let foodItem = foodItems.find(
//     (foodItem) => foodItem.id === foodItemBox.dataset.id
//   );
//   const uuid = create_UUID();

//   let cartItem = new CartItem(
//     uuid,
//     foodItem.category,
//     foodItem.name,
//     sizeSelectEl,
//     crustSelectEl,
//     sauceSelectEl,
//     countEl.value,
//     originalPrice,
//     totalPrice,
//     foodItem.imageLink
//   );
//   setCartItemToLS(cartItem);
//   activateCartCount();
//   activateAlert(`${cartItem.name} has been added to your cart`, true);
//   renderCart();
//   renderSidebarCart();
// }

// switch (clickedItemCat) {
//   case 'pizza':
//     console.log('pizza case was run');
//     newCartItem = new Pizza(
//       uuid,
//       category,
//       name,
//       countVal,
//       originalPrice,
//       totalPrice,
//       imageLink,
//       sizeVal,
//       crustVal
//     );
//     break;
//   case 'side':
//     newCartItem = new Side(
//       uuid,
//       category,
//       name,
//       countVal,
//       originalPrice,
//       totalPrice,
//       imageLink,
//       sizeVal,
//       sauceVal
//     );
//     break;
//   case 'dessert':
//     newCartItem = new Dessert(
//       uuid,
//       category,
//       name,
//       countVal,
//       originalPrice,
//       totalPrice,
//       imageLink
//     );
//     break;
//   case 'drink':
//     newCartItem = new Drink(
//       uuid,
//       category,
//       name,
//       countVal,
//       originalPrice,
//       totalPrice,
//       imageLink,
//       sizeVal
//     );
//     break;

//   default:
//     break;
// }
