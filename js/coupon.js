const popup = document.querySelector('.popup');
const popupIcon = document.querySelector('.popup__icon');
const popupText = document.querySelector('.popup__text');

const threeMedBtn = document.getElementById('three-med-btn');
const largePizzaSideBtn = document.getElementById('large-pizza-side-btn');
const medPizza2LiterBtn = document.getElementById('med-pizza-2liter-btn');
const over40Btn = document.getElementById('over-40-btn');

function addCouponCode (coupon) {
  if(!cart.couponCode) {
    cart.couponCode = coupon.id;
    popup.classList.add('popup--success');
    popupIcon.classList.add('popup__icon--success');
    popupText.textContent = coupon.activeMessage; 
    popup.style.display = 'flex';
    console.log(cart);
    setTimeout(() => {
      popup.style.display = 'none';
      popup.classList.remove('popup--success');
    popupIcon.classList.remove('popup__icon--success');
    }, 3000);
  }

}
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


// add popup fail when deal is removed
