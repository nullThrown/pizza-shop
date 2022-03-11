import couponData from './data/couponData.js';
import { getObjFromLS, setCouponToLS } from './storage.js';
import { activateAlert } from './alert.js';

const threeMedBtn = document.getElementById('three-med-btn');
const largePizzaSideBtn = document.getElementById('large-pizza-side-btn');
const medPizza2LiterBtn = document.getElementById('med-pizza-2liter-btn');
const over40Btn = document.getElementById('over-40-btn');

// LISTENER EXPORT //

export function addDealsListeners() {
  if (threeMedBtn) threeMedBtn.onclick = () => addCouponCode(couponData[0]);
  if (largePizzaSideBtn)
    largePizzaSideBtn.onclick = () => addCouponCode(couponData[1]);
  if (medPizza2LiterBtn)
    medPizza2LiterBtn.onclick = () => addCouponCode(couponData[2]);
  if (over40Btn) over40Btn.onclick = () => addCouponCode(couponData[3]);
}

// HELPER //

function addCouponCode(coupon) {
  const { couponCode } = getObjFromLS('cart');
  let msg;

  if (couponCode === coupon.id) {
    msg = `${couponCode} has already been added.`;
  } else {
    setCouponToLS(coupon.id);
    msg = `${coupon.id} has been added to your cart.`;
  }
  activateAlert(msg, true);
}
