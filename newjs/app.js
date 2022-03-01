import {
  initCartToLocalStorage,
  initPreviousOrdersToLocalStorage,
  setOrderTypeToLocalStorage,
} from './storage';
import setPrices from './helpers.js';
import coupons from './data/coupons';
const pickupBtn = document.querySelector('.pickup-btn');
const deliveryBtn = document.querySelector('.delivery-btn');

// add coupon selectors
const threeMedBtn = document.getElementById('three-med-btn');
const largePizzaSideBtn = document.getElementById('large-pizza-side-btn');
const medPizza2LiterBtn = document.getElementById('med-pizza-2liter-btn');
const over40Btn = document.getElementById('over-40-btn');

const cartIcons = document.querySelectorAll('.cart-icons');

if (pickupBtn && deliveryBtn) {
  pickupBtn.onclick = () => setOrderTypeToLocalStorage('pickup');
  deliveryBtn.onclick = () => setOrderTypeToLocalStorage('delivery');
}

// combine into single element
cartIcons.forEach((el) => {
  el.onclick = toggleCartDisplay;
});

// find a new home for this function
// cart maybe
function addCouponCode(coupon) {
  const cart = getObjFromLocalStorage('cart');
  let message;
  if (cart.couponCode === coupon.id) {
    message = `${cart.couponCode} has already been added.`;
  } else {
    setCouponToLocalStorage(coupon.id);
    message = `${cart.couponCode} has been added to your cart.`;
  }
  activateAlert(message, true);
}

threeMedBtn.onclick = function () {
  addCouponCode(coupons[0]);
};
largePizzaSideBtn.onclick = function () {
  addCouponCode(coupons[1]);
};
medPizza2LiterBtn.onclick = function () {
  addCouponCode(coupons[2]);
};
over40Btn.onclick = function () {
  addCouponCode(coupons[3]);
};

initCartToLocalStorage();
initPreviousOrdersToLocalStorage();
setPrices();
