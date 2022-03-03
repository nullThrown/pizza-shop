const productList = document.querySelector('.product__list');
import { createPizzaItemNode } from './components/checkout/pizzaItem';
import { createCustomPizzaItemNode } from './components/checkout/customPizzaItem';
import { createSideItemNode } from './components/checkout/sideItem';
import { createDessertItemNode } from './components/checkout/dessertItem';
import { createDrinkItemNode } from './components/checkout/drinkItem';
import { createEmptyCartNode } from './components/checkout/emptyCart';

const orderTypeSpan = document.getElementById('orderType');
const subtotalSpan = document.getElementById('subtotal');
const taxSpan = document.getElementById('tax');
const totalSpan = document.getElementById('total');
// what is this doing here?
const summaryPromoBox = document.querySelector('.summary__promo-box');

const applyBtn = document.querySelector('.btn--apply');
const couponCodeInput = document.getElementById('coupon-code-input');

applyBtn.onclick = handleApplyCoupon;
productList.onclick = handleRemoveItem;
couponCodeBox.onclick = handleRemoveCoupon;
placeOrderbtn.onclick = handlePlaceOrder;

function renderCheckout() {
  const cart = getObjFromLocalStorage('cart');

  if (!cart.items.length) {
    createEmptyCartNode(productList);
  } else {
    cart.items.forEach((item) => {
      switch (item.category) {
        case 'pizza':
          createPizzaItemNode(item, productList);
          break;
        case 'custom':
          createCustomPizzaItemNode(item, productList);
          break;
        case 'side':
          createSideItemNode(item, productList);
          break;
        case 'dessert':
          createDessertItemNode(item, productList);
          break;
        case 'drink':
          createDrinkItemNode(item, productList);
          break;

        default:
          break;
      }
    });
  }
}

function renderOrderType() {
  const cart = getObjFromLocalStorage('cart');
  orderTypeSpan.textContent = cart.orderType;
}

// combine into single function
// add e listeners to nodeList
// and setOrderTpe by ID
pickupBtn.addEventListener('click', () => {
  setOrderType('pickup');
  renderOrderType();
  togglePlaceOrderBtn();
});
deliveryBtn.addEventListener('click', () => {
  setOrderType('delivery');
  renderOrderType();
  togglePlaceOrderBtn();
});

// removes food item from cart/checkout

function handleRemoveItem(e) {
  if (
    e.target.nodeName === 'BUTTON' &&
    e.target.classList.contains('btn--checkout-remove')
  ) {
    let targetLi = e.target.closest('li');
    deleteItemFromLocalStorage(targetLi.dataset.uuid);
    productList.replaceChildren();
    togglePlaceOrderBtn();
    renderCheckout();
    renderCart();
    renderSidebarCart();
    populateSummary();
  }
}

// populates checkout metadata, totals, ordertype, coupons etc.
function populateSummary() {
  const cart = getObjFromLocalStorage('cart');
  const { orderType, cartTotals, couponCode } = cart;
  orderTypeSpan.textContent = orderType;
  subtotalSpan.textContent = cartTotals.subtotal.toFixed(2);
  taxSpan.textContent = cartTotals.calculatedTax.toFixed(2);
  totalSpan.textContent = cartTotals.total.toFixed(2);
  if (couponCode) {
    renderCouponCode(couponCode);
  }
}

// this should be a display toggle
// no need to create elements when it is not necessary
function renderCouponCode(couponCode) {
  couponCodeBox.replaceChildren();
  const cart = getObjFromLocalStorage('cart');

  const couponSpan = document.createElement('span');
  const couponCancelBtn = document.createElement('button');

  couponSpan.classList.add('promo-code-span');
  couponSpan.textContent = cart.couponCode;
  couponCancelBtn.classList.add('btn', 'btn--cancel');
  couponCancelBtn.textContent = 'X';
  couponCodeBox.append(couponSpan, couponCancelBtn);
  couponSpan.textContent = couponCode;
}

// event attached to apply btn
// stores/renders a coupon code if valid

function handleApplyCoupon() {
  let couponCode = couponCodeInput.value;
  let hasCouponCode = coupons.some((item) => item.id === couponCode);

  if (hasCouponCode) {
    setCouponCode(couponCode);
    renderCouponCode(couponCode);
  } else {
    activateAlert(`${couponCode} is not a correct code.`, false);
  }
  couponCodeInput.value = '';
}

const couponCodeBox = document.querySelector('.summary__promo-code-box');

// no reason to event propogate
// just attach the listener to the button directly
// reason: btn was created/inserted after page load
// therefore, event could not be attached
function handleRemoveCoupon() {
  const cart = getObjFromLocalStorage('cart');

  if (
    e.target.nodeName === 'BUTTON' &&
    e.target.classList.contains('btn--cancel')
  ) {
    cart.couponCode = '';
    couponCodeBox.replaceChildren();
    setObjToLocalStorage('cart', cart);
  }
}

const placeOrderbtn = document.querySelector('.btn-link--place-order');

function handlePlaceOrder() {
  const cart = getObjFromLocalStorage('cart');
  const { items, orderType } = cart;
  if (!items.length) {
    e.preventDefault();
    activateAlert('Cart is currently empty', false);
  } else if (!orderType) {
    e.preventDefault();
    activateAlert('Please choose between pickup or delivery', false);
  } else {
    const previousOrders = getObjFromLocalStorage('previousOrders');
    previousOrders.push(cart);
    setObjToLocalStorage('previousOrders', previousOrders);
    // resets cart obj in LS
    initCartToLocalStorage(true);
  }
}

function togglePlaceOrderBtn() {
  const cart = getObjFromLocalStorage('cart');
  const { items, orderType } = cart;
  if (!items.length || !orderType) {
    placeOrderbtn.classList.add('btn--disabled');
  } else {
    placeOrderbtn.classList.remove('btn--disabled');
  }
}

populateSummary();
togglePlaceOrderBtn();
renderCheckout();
