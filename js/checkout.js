// const productList = document.querySelector('.product__list');

// // this needs to be broken into separate components similar to cart
// // string -> html conversion
// function renderCheckout() {
//   const cart = getObjFromLocalStorage('cart');
//   if (!cart.items.length) {
//     const li = document.createElement('li');
//     li.textContent = 'Cart is currently empty';
//     li.classList.add('product__empty');
//     productList.appendChild(li);
//   } else {
//     cart.items.forEach((item) => {
//       const productLi = document.createElement('li');
//       productLi.dataset.uuid = item.uuid;
//       productLi.classList.add('product__item');

//       // img
//       const img = document.createElement('img');
//       img.setAttribute('src', item.imageLink);
//       img.setAttribute('alt', item.name);
//       img.classList.add('img--thumbnail', 'product__item-img');

//       // description
//       const itemDescDiv = document.createElement('div');
//       itemDescDiv.classList.add('product__item-desc');
//       const nameP = document.createElement('p');
//       nameP.textContent = item.name;
//       const sizeP = document.createElement('p');
//       sizeP.textContent = item.size;
//       const crustP = document.createElement('p');
//       crustP.textContent = item.crust;
//       itemDescDiv.append(nameP, sizeP, crustP);

//       //amounts
//       const quantityP = document.createElement('p');
//       quantityP.classList.add('product__item-quantity');
//       quantityP.textContent = item.count;

//       const priceP = document.createElement('p');
//       priceP.classList.add('product__item-price');
//       priceP.textContent = item.originalPrice;

//       const totalP = document.createElement('p');
//       totalP.classList.add('product__item-total');
//       totalP.textContent = item.totalPrice;

//       if (item.name === 'Custom Pizza') {
//         renderCustomToppings(item.toppings, productLi);
//       }
//       // remove btn
//       const removeBtn = document.createElement('button');
//       removeBtn.classList.add('btn', 'btn--checkout-remove');
//       removeBtn.textContent = 'Remove';

//       productLi.append(img, itemDescDiv, quantityP, priceP, totalP, removeBtn);
//       productList.append(productLi);
//     });
//   }
// }
// // this needs to be string -> html insert/conversion
// function renderCustomToppings(toppings, container) {
//   let toppingsFullP = document.createElement('p');
//   toppingsFullP.textContent += 'Full: ';
//   toppingsFullP.classList.add('miniscule-text', 'product__item-full');
//   let toppingsLeftP = document.createElement('p');
//   toppingsLeftP.textContent += 'Left: ';
//   toppingsLeftP.classList.add('miniscule-text', 'product__item-left');
//   let toppingsRightP = document.createElement('p');
//   toppingsRightP.textContent += 'Right: ';
//   toppingsRightP.classList.add('miniscule-text', 'product__item-right');
//   // const toppingsArr = toppings.map(el => el.name);

//   toppings.forEach((el) => {
//     if (el.side === 'full') {
//       toppingsFullP.textContent += `${el.name}, `;
//     } else if (el.side === 'left') {
//       toppingsLeftP.textContent += `${el.name}, `;
//     } else if (el.side === 'right') {
//       toppingsRightP.textContent += `${el.name}, `;
//     }
//     //  toppingsFullP.textContent = toppingsFullP.textContent.slice(0, -1);
//     // toppingsLeftP = toppingsLeftP.trim();
//     // toppingsRightP = toppingsRightP.trim();
//   });
//   container.append(toppingsFullP, toppingsLeftP, toppingsRightP);
// }

// const orderTypeSpan = document.getElementById('orderType');
// const subtotalSpan = document.getElementById('subtotal');
// const taxSpan = document.getElementById('tax');
// const totalSpan = document.getElementById('total');
// const summaryPromoBox = document.querySelector('.summary__promo-box');

// function renderOrderType() {
//   let cart = getObjFromLocalStorage('cart');
//   orderTypeSpan.textContent = cart.orderType;
// }

// // combine into single function
// // add e listeners to nodeList
// // and choose by ID
// pickupBtn.addEventListener('click', () => {
//   setOrderType('pickup');
//   renderOrderType();
//   togglePlaceOrderBtn();
// });
// deliveryBtn.addEventListener('click', () => {
//   setOrderType('delivery');
//   renderOrderType();
//   togglePlaceOrderBtn();
// });

// productList.onclick = (e) => {
//   if (
//     e.target.nodeName === 'BUTTON' &&
//     e.target.classList.contains('btn--checkout-remove')
//   ) {
//     let targetLi = e.target.closest('li');
//     deleteItemFromLocalStorage(targetLi.dataset.uuid);
//     productList.replaceChildren();
//     togglePlaceOrderBtn();
//     renderCheckout();
//     renderCart();
//     renderSidebarCart();
//     populateSummary();
//   }
// };

// const couponSpan = document.querySelector('.promo-code-span');
// // create separate function for creating both promo span and cancel promo btn
// function populateSummary() {
//   let cart = getObjFromLocalStorage('cart');
//   orderTypeSpan.textContent = cart.orderType;
//   subtotalSpan.textContent = cart.cartTotals.subtotal.toFixed(2);
//   taxSpan.textContent = cart.cartTotals.calculatedTax.toFixed(2);
//   totalSpan.textContent = cart.cartTotals.total.toFixed(2);
//   if (cart.couponCode) {
//     renderCouponCode(cart.couponCode);
//   }
// }

// function renderCouponCode(couponCode) {
//   couponCodeBox.replaceChildren();
//   let cart = getObjFromLocalStorage('cart');
//   // couponSpan.replaceChildren();
//   const couponSpan = document.createElement('span');
//   const couponCancelBtn = document.createElement('button');

//   couponSpan.classList.add('promo-code-span');
//   couponSpan.textContent = cart.couponCode;
//   couponCancelBtn.classList.add('btn', 'btn--cancel');
//   couponCancelBtn.textContent = 'X';
//   couponCodeBox.append(couponSpan, couponCancelBtn);
//   couponSpan.textContent = couponCode;
// }

// // separate these two button events into separate event listeners
// // they are placed within separate containers

// //event propogation is only necessary for the promo cancel button
// // as it is rendered after the page loads
// const applyBtn = document.querySelector('.btn--apply');
// const couponCodeInput = document.getElementById('coupon-code-input');

// applyBtn.addEventListener('click', (e) => {
//   let couponCode = couponCodeInput.value;
//   let isCouponCode = coupons.some((item) => item.id === couponCode);

//   if (isCouponCode) {
//     setCouponCode(couponCode);
//     renderCouponCode(couponCode);
//   } else {
//     activateFailurePopup(`${couponCode} is not a correct code.`);
//   }
//   couponCodeInput.value = '';
// });
// const couponCodeBox = document.querySelector('.summary__promo-code-box');

// couponCodeBox.addEventListener('click', (e) => {
//   let cart = getObjFromLocalStorage('cart');

//   if (
//     e.target.nodeName === 'BUTTON' &&
//     e.target.classList.contains('btn--cancel')
//   ) {
//     cart.couponCode = '';
//     couponCodeBox.replaceChildren();
//     setObjToLocalStorage('cart', cart);
//   }
// });

// const placeOrderbtn = document.querySelector('.btn-link--place-order');

// placeOrderbtn.onclick = (e) => {
//   const cart = getObjFromLocalStorage('cart');
//   const { items, orderType } = cart;
//   if (!items.length) {
//     e.preventDefault();
//     activateFailurePopup('Cart is currently empty');
//   } else if (!orderType) {
//     e.preventDefault();
//     activateFailurePopup('Please choose between pickup or delivery');
//   } else {
//     let previousOrders = getObjFromLocalStorage('previousOrders');
//     previousOrders.push(cart);
//     setObjToLocalStorage('previousOrders', previousOrders);
//     initCartToLocalStorage(true);
//   }
// };

// function togglePlaceOrderBtn() {
//   const cart = getObjFromLocalStorage('cart');
//   const { items, orderType } = cart;
//   if (!items.length || !orderType) {
//     placeOrderbtn.classList.add('btn--disabled');
//   } else {
//     placeOrderbtn.classList.remove('btn--disabled');
//   }
// }

// populateSummary();
// togglePlaceOrderBtn();
// renderCheckout();
