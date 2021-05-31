
function isCartStored() {
  let storedCart = localStorage.getItem('cart');
  if(storedCart) return true;

  return false;
}

// initiliazes cart into localStorage
function initCartToLocalStorage() {
  if(!isCartStored()){
    let cartStr = JSON.stringify(
      {
        orderType: '',
        couponCode: '',
        items: [],
        cartTotals: {}
      }
    );
    localStorage.setItem('cart', cartStr);
  };
};

const pickupBtn = document.getElementById('pickup-btn');
const deliveryBtn = document.getElementById('delivery-btn');

function setOrderType(orderType) {
  let cart = getCartFromLocalStorage();
  cart.orderType = orderType;
  setCartToLocalStorage(cart);
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
function getCartFromLocalStorage() {
  let storedCart = localStorage.getItem('cart');
  return JSON.parse(storedCart);    
};
function setCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
    
// add food item to LS
function addItemToLocalStorage(item) {
  let cart = getCartFromLocalStorage();
  cart.items.push(item);
  setCartToLocalStorage(cart);
};

// UPDATE 

// add/update coupon code
function addCouponToLocalStorage(code) {
  let cart = getCartFromLocalStorage();
  cart.couponCode = code;
  setCartToLocalStorage(cart);
};

// add/update order type
function addOrderTypeToLocalStorage(orderType) {
  let cart = getCartFromLocalStorage();
  cart.orderType = orderType;
  setCartToLocalStorage(cart);
};  
    
// DELETE

function deleteItemFromLocalStorage(uuid) {
  let cart = getCartFromLocalStorage();
  let itemIndex = cart.items.findIndex((item) => item.uuid === uuid);
  if(itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    setCartToLocalStorage(cart);
  }
};

function deleteCouponFromLocalStorage() {
  let cart = getCartFromLocalStorage();
  cart.couponCode = '';
  setCartToLocalStorage(cart);
};

// populate cart from local storage function
 

setPrices();
initCartToLocalStorage();
renderCart();

