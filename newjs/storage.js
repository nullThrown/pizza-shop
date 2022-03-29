import { isStored, create_UUID } from './helpers.js';

// LS = localStorage

export function initCartToLS(reset) {
  if (!isStored('cart') || reset) {
    const cartStr = JSON.stringify({
      orderType: '',
      couponCode: '',
      items: [],
      cartTotals: { subtotal: 0, calculatedTax: 0, total: 0 },
      uuid: create_UUID(),
    });
    localStorage.setItem('cart', cartStr);
  }
}

export function initCustomPizzaToLS(reset) {
  if (!isStored('customPizza') || reset === true) {
    let customPizzaStr = JSON.stringify({
      name: 'Custom Pizza',
      category: 'custom',
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

export function initPreviousOrdersToLS() {
  if (!isStored('previousOrders')) {
    const ordersStr = JSON.stringify([]);
    localStorage.setItem('previousOrders', ordersStr);
  }
}

export function getObjFromLS(key) {
  const storedObj = localStorage.getItem(key);
  return JSON.parse(storedObj);
}
export function setObjToLS(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function setCouponToLS(couponCode) {
  const cart = getObjFromLS('cart');
  cart.couponCode = couponCode;
  setObjToLS('cart', cart);
}

export function deleteCouponFromLS() {
  const cart = getObjFromLS('cart');
  cart.couponCode = '';
  setObjToLS('cart', cart);
}

export function setOrderTypeToLS(orderType) {
  const cart = getObjFromLS('cart');
  cart.orderType = orderType;
  setObjToLS('cart', cart);
}
export function findCartItemFromLS(uuid) {
  const { items } = getObjFromLS('cart');
  return items.find((item) => item.uuid === uuid);
}

export function setCartItemToLS(item) {
  const cart = getObjFromLS('cart');
  cart.items.push(item);
  setObjToLS('cart', cart);
}

export function deleteCartItemFromLS(uuid) {
  const cart = getObjFromLS('cart');
  cart.items = cart.items.filter((item) => item.uuid !== uuid);
  setObjToLS('cart', cart);
}

export function deleteCustomToppingFromLS(uuid) {
  const customPizza = getObjFromLS('customPizza');
  customPizza.toppings = customPizza.toppings.filter(
    (top) => top.uuid !== uuid
  );
  setObjToLS('customPizza', customPizza);
}
