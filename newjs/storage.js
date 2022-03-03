import { isStored, create_UUID } from './helpers.js';
// LS = localStorage

// initiliazes cart into localStorage
export function initCartToLS(reset) {
  if (!isStored('cart') || reset) {
    const cartStr = JSON.stringify({
      orderType: '',
      couponCode: '',
      items: [],
      cartTotals: {},
      uuid: create_UUID(),
    });
    localStorage.setItem('cart', cartStr);
  }
}

export function initPreviousOrdersToLS() {
  if (!isStored('previousOrders')) {
    const ordersStr = JSON.stringify([]);
    localStorage.setItem('previousOrders', ordersStr);
  }
}

// GET/SET HELPERS
// objects/arrays are stored as strings in LS -- must be stringified/parsed
export function getObjFromLS(key) {
  const storedObj = localStorage.getItem(key);
  return JSON.parse(storedObj);
}
export function setObjToLS(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function setCouponToLS(couponCode) {
  const cart = getObjFromLocalStorage('cart');
  cart.couponCode = couponCode;
  setObjToLocalStorage('cart', cart);
}

export function deleteCouponFromLS() {
  const cart = getObjFromLocalStorage('cart');
  cart.couponCode = '';
  setObjToLocalStorage('cart', cart);
}

export function setOrderTypeToLS(orderType) {
  const cart = getObjFromLocalStorage('cart');
  cart.orderType = orderType;
  setObjToLocalStorage('cart', cart);
}

export function setCartItemToLS(item) {
  const cart = getObjFromLocalStorage('cart');
  cart.items.push(item);
  setObjToLocalStorage('cart', cart);
}

export function deleteCartItemFromLS(uuid) {
  const cart = getObjFromLocalStorage('cart');
  cart.items = cart.items.filter((item) => item.uuid !== uuid);
  setObjToLocalStorage('cart', cart);
}
