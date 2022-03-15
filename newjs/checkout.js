// TODO THIS FILE
// fn() renderCouponCode() does not need to create couponcode element, instead toggle display property of html content
// fn() handleRemoveCoupon() does not need to event propogate. Once the item is added to html file, just grab the btn el directly
// what is summaryPromoBox??
import { createPizzaItemNode } from './components/checkout/pizzaItem.js';
import { createCustomPizzaItemNode } from './components/checkout/customPizzaItem.js';
import { createSideItemNode } from './components/checkout/sideItem.js';
import { createDessertItemNode } from './components/checkout/dessertItem.js';
import { createDrinkItemNode } from './components/checkout/drinkItem.js';
import { createEmptyCartNode } from './components/checkout/emptyCart.js';
import {
  getObjFromLS,
  setObjToLS,
  initCartToLS,
  deleteCartItemFromLS,
  setOrderTypeToLS,
  setCouponToLS,
  deleteCouponFromLS,
} from './storage.js';
import couponData from './data/couponData.js';
import { renderCart } from './cart.js';
import { activateAlert } from './alert.js';

const orderTypeEl = document.getElementById('orderType');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const applyBtn = document.querySelector('.btn--apply');
const productUl = document.querySelector('.product__list');
const couponCodeBox = document.querySelector('.summary__promo-code-box');
const couponSpan = document.querySelector('.promo-code-span');
const deleteCouponBtn = document.querySelector('.remove-coupon-code');
const placeOrderbtn = document.querySelector('.btn-link--place-order');
const couponCodeInput = document.getElementById('coupon-code-input');
const orderTypeBtns = document.querySelectorAll('.checkout__order-type-btn');

export function initCheckout(currentPath) {
  if (currentPath === '/html/checkout.html') {
    populateSummary();
    togglePlaceOrderBtn();
    renderCheckoutItems();
    renderCouponCode();
  }
}

export function addCheckoutListeners() {
  if (applyBtn) applyBtn.onclick = handleApplyCoupon;
  if (orderTypeBtns)
    orderTypeBtns.forEach((btn) => (btn.onclick = handleAddOrderType));
  if (productUl) productUl.onclick = handleRemoveItem;
  if (deleteCouponBtn) deleteCouponBtn.onclick = handleRemoveCoupon;
  if (placeOrderbtn) placeOrderbtn.onclick = handlePlaceOrder;
}

// HANDLERS //

function handleApplyCoupon() {
  const couponCode = couponCodeInput.value;
  let isValidCouponCode = couponData.some((item) => item.id === couponCode);

  if (isValidCouponCode) {
    setCouponToLS(couponCode);
    renderCouponCode();
    activateAlert(`${couponCode} has been added to your order.`, true);
    couponCodeInput.value = '';
  } else {
    activateAlert(`${couponCode} is not a correct code.`, false);
  }
}

function handleAddOrderType(e) {
  setOrderTypeToLS(e.target.value);
  renderOrderType();
  togglePlaceOrderBtn();
}

function handleRemoveItem(e) {
  if (
    e.target.nodeName === 'BUTTON' &&
    e.target.classList.contains('btn--checkout-remove')
  ) {
    let targetLi = e.target.closest('li');
    deleteCartItemFromLS(targetLi.dataset.uuid);
    productUl.replaceChildren();
    togglePlaceOrderBtn();
    renderCheckoutItems();
    renderCart();
    populateSummary();
  }
}

function handleRemoveCoupon() {
  deleteCouponFromLS();
  renderCouponCode();
}

function handlePlaceOrder() {
  const cart = getObjFromLS('cart');
  const { items, orderType } = cart;
  if (!items.length) {
    e.preventDefault();
    activateAlert('Cart is currently empty', false);
  } else if (!orderType) {
    e.preventDefault();
    activateAlert('Please choose between pickup or delivery', false);
  } else {
    const previousOrders = getObjFromLS('previousOrders');
    previousOrders.push(cart);
    setObjToLS('previousOrders', previousOrders);
    // resets cart obj in LS
    initCartToLS(true);
  }
}

// RENDERERS //

function renderCheckoutItems() {
  const { items } = getObjFromLS('cart');

  if (!items.length) {
    createEmptyCartNode(productUl);
  } else {
    items.forEach((item) => {
      switch (item.category) {
        case 'pizza':
          createPizzaItemNode(item, productUl);
          break;
        case 'custom':
          createCustomPizzaItemNode(item, productUl);
          break;
        case 'side':
          createSideItemNode(item, productUl);
          break;
        case 'dessert':
          createDessertItemNode(item, productUl);
          break;
        case 'drink':
          createDrinkItemNode(item, productUl);
          break;

        default:
          break;
      }
    });
  }
}

function renderOrderType() {
  const cart = getObjFromLS('cart');
  orderTypeEl.textContent = cart.orderType;
}

function renderCouponCode() {
  const { couponCode } = getObjFromLS('cart');

  if (!couponCode) {
    couponCodeBox.style.display = 'none';
  } else {
    couponCodeBox.style.display = 'flex';
    couponSpan.textContent = couponCode;
  }
}

function togglePlaceOrderBtn() {
  const { items, orderType } = getObjFromLS('cart');
  if (!items.length || !orderType) {
    placeOrderbtn.classList.add('btn--disabled');
  } else {
    placeOrderbtn.classList.remove('btn--disabled');
  }
}

// POPULATE //

function populateSummary() {
  const { orderType, cartTotals, couponCode } = getObjFromLS('cart');

  orderTypeEl.textContent = orderType;
  subtotalEl.textContent = cartTotals.subtotal.toFixed(2);
  taxEl.textContent = cartTotals.calculatedTax.toFixed(2);
  totalEl.textContent = cartTotals.total.toFixed(2);
}
