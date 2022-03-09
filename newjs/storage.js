import { isStored, create_UUID } from './helpers.js';
// LS = localStorage

// inits cart into LS
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
// inits custom pizza into LS
export function initCustomPizzaToLS(reset) {
  if (!isStored('customPizza') || reset === true) {
    let customPizzaStr = JSON.stringify({
      name: 'Custom Pizza',
      size: '',
      crust: 'regular',
      count: 1,
      sizePrice: 0,
      toppingPrice: 0.99,
      totalPrice: 0,
      toppings: [],
      imageLink: '../img/pizza/cheese.jpg',
      uuid: create_UUID(),
    });
    localStorage.setItem('customPizza', customPizzaStr);
  }
}
// inits  previous orders into LS
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
