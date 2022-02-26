// helper.js
function isStored(key) {
  let storedItem = localStorage.getItem(key);

  return Boolean(storedItem);
}

// init cart into local Storage
// storage.js
// call in app.js
function initCartToLocalStorage(reset) {
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
// init previous orders obj into Local Storage
// storage.js
// call in app.js
function initPreviousOrdersToLocalStorage() {
  if (!isStored('previousOrders')) {
    let ordersStr = JSON.stringify([]);
    localStorage.setItem('previousOrders', ordersStr);
  }
}

// constants.js
const pickupBtn = document.querySelector('.pickup-btn');
const deliveryBtn = document.querySelector('.delivery-btn');

// storage.js
function setOrderType(orderType) {
  let cart = getObjFromLocalStorage('cart');
  cart.orderType = orderType;
  setObjToLocalStorage('cart', cart);
}
if (pickupBtn && deliveryBtn) {
  pickupBtn.onclick = () => setOrderType('pickup');
  deliveryBtn.onclick = () => setOrderType('delivery');
}

// storage.js
function setCouponCode(couponCode) {
  let cart = getObjFromLocalStorage('cart');
  cart.couponCode = couponCode;
  setObjToLocalStorage('cart', cart);
}

const itemPriceEls = document.querySelectorAll('.item-price__amount');

//  sets prices for all food items

function setPrices() {
  itemPriceEls.forEach((item) => {
    let foodItemUuid = item.closest('.food-item-box').dataset.uuid;
    let foodItem = foodItems.find((foodItem) => foodItem.uuid === foodItemUuid);
    item.textContent = foodItem.smallPrice || foodItem.price;
  });
}

// GET/SET HELPERS
// storage.js
// look into parse/stringify and LS
function getObjFromLocalStorage(obj) {
  let storedObj = localStorage.getItem(obj);
  return JSON.parse(storedObj);
}
// storage.js
function setObjToLocalStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

// add food item to LS
// storage.js
function setItemToLocalStorage(item) {
  let cart = getObjFromLocalStorage('cart');
  cart.items.push(item);
  setObjToLocalStorage('cart', cart);
}

// storage.js
function deleteItemFromLocalStorage(uuid) {
  let cart = getObjFromLocalStorage('cart');
  let itemIndex = cart.items.findIndex((item) => item.uuid === uuid);
  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    setObjToLocalStorage('cart', cart);
  }
}

// storage.js
function deleteCouponFromLocalStorage() {
  let cart = getObjFromLocalStorage('cart');
  cart.couponCode = '';
  setObjToLocalStorage('cart', cart);
}

// will be called in app.js
setPrices();
initCartToLocalStorage();
initPreviousOrdersToLocalStorage();
renderCart();
