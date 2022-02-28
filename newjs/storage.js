import { isStored } from './helpers';
// initiliazes cart into localStorage
export function initCartToLocalStorage(reset) {
  if (!isStored('cart') || reset) {
    let cartStr = JSON.stringify({
      orderType: '',
      couponCode: '',
      items: [],
      cartTotals: {},
      uuid: create_UUID(),
    });
    localStorage.setItem('cart', cartStr);
  }
}

export function initPreviousOrdersToLocalStorage() {
  if (!isStored('previousOrders')) {
    let ordersStr = JSON.stringify([]);
    localStorage.setItem('previousOrders', ordersStr);
  }
}

// GET/SET HELPERS
// objects/arrays are stored as strings in LS -- must be stringified/parsed
export function getObjFromLocalStorage(obj) {
  let storedObj = localStorage.getItem(obj);
  return JSON.parse(storedObj);
}
export function setObjToLocalStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function setCouponToLocalStorage(couponCode) {
  let cart = getObjFromLocalStorage('cart');
  cart.couponCode = couponCode;
  setObjToLocalStorage('cart', cart);
}

export function deleteCouponFromLocalStorage() {
  let cart = getObjFromLocalStorage('cart');
  cart.couponCode = '';
  setObjToLocalStorage('cart', cart);
}

export function setOrderTypeToLocalStorage(orderType) {
  let cart = getObjFromLocalStorage('cart');
  cart.orderType = orderType;
  setObjToLocalStorage('cart', cart);
}

// add food item to LS
export function setCartItemToLocalStorage(item) {
  let cart = getObjFromLocalStorage('cart');
  cart.items.push(item);
  setObjToLocalStorage('cart', cart);
}

//refactored version!!
export function deleteCartItemFromLocalStorage(uuid) {
  let cart = getObjFromLocalStorage('cart');
  cart.items = cart.items.filter((item) => item.uuid !== uuid);
  setObjToLocalStorage('cart', cart);
}
