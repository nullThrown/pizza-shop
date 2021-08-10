// shorten this fn() 
function isStored(key) {
  let storedItem = localStorage.getItem(key);

  return Boolean(storedItem);
};

// initiliazes cart into localStorage
// refactor! change init cart to obj
function initCartToLocalStorage(reset) {
  if(!isStored('cart') || reset){
    let cartStr = JSON.stringify(
      {
        orderType: '',
        couponCode: '',
        items: [],
        cartTotals: {},
        uuid: create_UUID()
      }
    );
    localStorage.setItem('cart', cartStr);
  };
};
function initPreviousOrdersToLocalStorage() {
  if(!isStored('previousOrders')){
    let ordersStr = JSON.stringify([]);
    localStorage.setItem('previousOrders', ordersStr);
  };
};

const pickupBtn = document.querySelector('.pickup-btn');
const deliveryBtn = document.querySelector('.delivery-btn');

function setOrderType(orderType) {
  let cart = getObjFromLocalStorage('cart');
  cart.orderType = orderType;
  setObjToLocalStorage('cart', cart);
};

function setCouponCode(couponCode) {
  let cart = getObjFromLocalStorage('cart');
  cart.couponCode = couponCode;
  setObjToLocalStorage('cart', cart);
};

if(pickupBtn && deliveryBtn) {
  pickupBtn.onclick = () => setOrderType('pickup');
  deliveryBtn.onclick = () => setOrderType('delivery');
}
  

const itemPriceEls = document.querySelectorAll('.item-price__amount');  
//   sets prices for all food items
function setPrices() { 
  itemPriceEls.forEach(item => {
    let foodItemUuid = item.closest('.food-item-box').dataset.uuid;
    let foodItem = foodItems.find(foodItem => foodItem.uuid === foodItemUuid);
    item.innerHTML = foodItem.smallPrice || foodItem.price;   
  });
};
 
// GET/SET HELPERS 
function getObjFromLocalStorage(obj) {
  let storedObj = localStorage.getItem(obj);
  return JSON.parse(storedObj);    
};
function setObjToLocalStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
};

   
// add food item to LS
// change 'add' to 'set'
function addItemToLocalStorage(item) {
  let cart = getObjFromLocalStorage('cart');
  cart.items.push(item);
  setObjToLocalStorage('cart', cart);
};

// UPDATE 

// add/update order type
// change 'add' to 'set'
function addOrderTypeToLocalStorage(orderType) {
  let cart = getObjFromLocalStorage('cart');
  cart.orderType = orderType;
  setObjToLocalStorage('cart', cart);
};  
    
// DELETE

function deleteItemFromLocalStorage(uuid) {
  let cart = getObjFromLocalStorage('cart');
  let itemIndex = cart.items.findIndex((item) => item.uuid === uuid);
  if(itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    setObjToLocalStorage('cart', cart);
  }
};



function deleteCouponFromLocalStorage() {
  let cart = getObjFromLocalStorage('cart');
  cart.couponCode = '';
  setObjToLocalStorage('cart', cart);
};
 

setPrices();
initCartToLocalStorage();
initPreviousOrdersToLocalStorage();
renderCart();
// renderSidebarCart();

