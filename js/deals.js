const threeMedBtn = document.getElementById('three-med-btn');
const largePizzaSideBtn = document.getElementById('large-pizza-side-btn');
const medPizza2LiterBtn = document.getElementById('med-pizza-2liter-btn');
const over40Btn = document.getElementById('over-40-btn');

function addCouponCode (coupon) {
    cart.couponCode = coupon.id;
    popupText.textContent = coupon.activeMessage; 
    activateSuccessPopup();
    console.log(cart.couponCode);
  };

threeMedBtn.onclick = function () {
  addCouponCode(coupons[0]);
}
largePizzaSideBtn.onclick = function () {
  addCouponCode(coupons[1]);
}
medPizza2LiterBtn.onclick = function () {
  addCouponCode(coupons[2]);
}
over40Btn.onclick = function () {
  addCouponCode(coupons[3]);
}