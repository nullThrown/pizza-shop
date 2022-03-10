import coupons from './data/coupons.js';
import { getObjFromLS, setCouponToLS } from './storage.js';
import { activateAlert } from './alert.js';

const threeMedBtn = document.getElementById('three-med-btn');
const largePizzaSideBtn = document.getElementById('large-pizza-side-btn');
const medPizza2LiterBtn = document.getElementById('med-pizza-2liter-btn');
const over40Btn = document.getElementById('over-40-btn');

// check if onclick can be set to fn() call
export function addDealsListeners() {
  if (threeMedBtn) threeMedBtn.onclick = addCouponCode(coupons[0]);
  if (largePizzaSideBtn) largePizzaSideBtn.onclick = addCouponCode(coupons[1]);
  if (medPizza2LiterBtn) medPizza2LiterBtn.onclick = addCouponCode(coupons[2]);
  if (over40Btn) over40Btn.onclick = addCouponCode(coupons[3]);
}

function addCouponCode(coupon) {
  const cart = getObjFromLS('cart');
  let msg;

  if (cart.couponCode === coupon.id) {
    msg = `${cart.couponCode} has already been added.`;
  } else {
    setCouponToLS(coupon.id);
    msg = `${cart.couponCode} has been added to your cart.`;
  }
  activateAlert(msg, true);
}
