
// const foodItemsDiv = document.querySelectorAll('.food-item-box');
const itemSizeSelecters = document.querySelectorAll('.item-size-select');
const itemCountSelectors = document.querySelectorAll('.food-item-count');
const pizzaCrustSelectors = document.querySelectorAll('.pizza-crust-select');
const itemPriceEls = document.querySelectorAll('.item-price__amount');
const addToCartBtns = document.querySelectorAll('.btn--add-to-cart');
const cartIcons = document.querySelectorAll('.cart-icons');
const cartEl = document.querySelector('.cart');

class CartItem {
  constructor(name, size, crust, sauce, count, cost) {
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.sauce = sauce;
    this.count = count;
    this.cost = cost;
  }
}

// Event listners 

itemSizeSelecters.forEach(sizeSelector => {
  sizeSelector.addEventListener('change', () => {
   let priceEl = sizeSelector.parentNode.querySelector('.item-price__amount');
   let countEl = sizeSelector.parentNode.querySelector('.food-item-count').value;
   let uuid = sizeSelector.parentNode.dataset.uuid;
   priceEl.textContent = determinePrice(sizeSelector.value, countEl, uuid);
  });
});

itemCountSelectors.forEach(countSelector => {
  countSelector.addEventListener('change', () => {
    let priceEl = countSelector.parentNode.querySelector('.item-price__amount');
    let sizeSelectEl = countSelector.parentNode.querySelector('.item-size-select');
    if(sizeSelectEl !== null){
      sizeSelectEl = sizeSelectEl.value;
    }
    let uuid = countSelector.parentNode.dataset.uuid;
    priceEl.textContent = determinePrice(sizeSelectEl, countSelector.value, uuid);
  });
}); 

let cart = [];
let bool = true;
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let foodItemBox = e.target.closest('.food-item-box');
    let sizeSelectEl = foodItemBox.querySelector('.item-size-select') || undefined;
    if(sizeSelectEl !== undefined){
      sizeSelectEl = sizeSelectEl.value;
    }
    let crustSelectEl = foodItemBox.querySelector('.pizza-crust-select') || undefined;
      if(crustSelectEl !== undefined) {
        crustSelectEl = crustSelectEl.value;
      }

    let sauceSelectEl = foodItemBox.querySelector('.item-sauce-select') || undefined;
      if(sauceSelectEl !== undefined) {
        sauceSelectEl = sauceSelectEl.value;
      }
    
    let countEl = foodItemBox.querySelector('.food-item-count');
    let currentPrice = determinePrice(sizeSelectEl, countEl.value, foodItemBox.dataset.uuid);
    let foodItem = foodItems.find(foodItem => foodItem.uuid === foodItemBox.dataset.uuid);
    // console.log(isDuplicateItem(foodItem.name, sizeSelectEl, crustSelectEl, sauceSelectEl));
    if(bool){
      let cartItem = new CartItem(foodItem.name, sizeSelectEl, crustSelectEl, sauceSelectEl, countEl.value, currentPrice);
      cart.push(cartItem);
      bool = false;
    }
    else
    console.log(bool);
    // if(isDuplicateItem(foodItem.name, sizeSelectEl, crustSelectEl, sauceSelectEl) === false) {
    // }
      console.log(cart);
    renderCartCount();
    determineCartTotals();
    renderCartTotals();
    renderCart(cart);
  });
});

cartIcons.forEach((el) => {
  el.addEventListener('click', toggleCartDisplay)
});

// Helper functions
console.log();
function determinePrice(size, count, uuid) {
 let foodItem = foodItems.find(foodItem => foodItem.uuid == uuid); 
  let price = 0;

  if(!size) {
    return foodItem.price * parseInt(count);
  }
  switch(size) {
    case 'small':
      price = foodItem.smallPrice;
      break;
    case 'medium':
      price = foodItem.mediumPrice;
      break;
    case 'large':
      price = foodItem.largePrice;
      break;
    case 'x-large':
      price = foodItem.xlargePrice;
      break;
  }
    return (price * parseInt(count)).toFixed(2);
  }; 
  
function setPrices() { 
  itemPriceEls.forEach(item => {
    let foodItemUuid = item.closest('.food-item-box').dataset.uuid;
    let foodItem = foodItems.find(foodItem => foodItem.uuid == foodItemUuid);
    item.innerHTML = foodItem.smallPrice || foodItem.price;   
  });
};

function isDuplicateItem(name, size, crust, sauce) {
  cart.some((item) => {
    if(
       item.name === name &&
       item.size === size &&
       item.crust === crust &&
       item.sauce === sauce 
      ) {
        item.count++;
        console.log('this item is a duplicate')
        return true;
      }
    });
    return false;
  // take current inputs -- size, name, sauce, count, etc. 
  // compare all inputs to array of cart objects
  // if comparison all == true 
  // increase count of matched element
  // do not create new cart item
}

cart = [];

function renderCart(cart) {
    if(cart.length === 0 ) {
      return;
    }
    let foodItem = cart[cart.length-1];
    let listContainer = document.querySelector('.cart__ul');
  
    let li = document.createElement('li');
    
    let h4 = document.createElement('h4');
    h4.classList.add('cart__item-title');
    h4.textContent = foodItem.name;

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn--cancel', 'btn');
    cancelBtn.textContent = 'X'
    // cancelIcon.classList.add('fas', 'fa-window-close');
    // cancelBtn.appendChild(cancelIcon);
    
    let sizeP = document.createElement('p');
    sizeP.classList.add('cart__item-size');
    sizeP.textContent = foodItem.size;

    let crustP = document.createElement('p');
    crustP.textContent = foodItem.crust;

    let sauceP = document.createElement('p');
    sauceP.textContent = foodItem.sauce;

    // price and count 
    let countPrice = document.createElement('p');
    countPrice.classList.add('cart__item-amount');
    
    let countSpan = document.createElement('span');
    countSpan.classList.add('u-text-italicize');
    countSpan.textContent = foodItem.count;

    let xSpan = document.createElement('span');
    xSpan.classList.add('u-text-italicize');
    xSpan.textContent = ' for ';

    let dollarSpan = document.createElement('span');
    dollarSpan.classList.add('u-text-bold');
    dollarSpan.textContent = '$';
    
    let currentPriceP = document.createElement('span');
    currentPriceP.classList.add('cart__item-price');
    currentPriceP.textContent = foodItem.cost;
    
    countPrice.append(countSpan, xSpan, dollarSpan, currentPriceP);
    li.append(cancelBtn, h4, sizeP, crustP, sauceP, countPrice);
    listContainer.appendChild(li);
} 

function toggleCartDisplay() {
  if(cartEl.style.display === 'none') {
   cartEl.style.display = 'block'; 
  }
  else {
    cartEl.style.display = 'none';
  }
}

let cartTotals = {};
function determineCartTotals() {
  
  let subtotal = cart.reduce((acc, item) => {
     return acc + parseFloat(item.cost);
    }, 0);

  let calculatedTax = (parseFloat(subtotal * .085)).toFixed(2);
    
  let total = (subtotal + parseFloat(calculatedTax)).toFixed(2);
    
  subtotal = subtotal.toFixed(2); 
  cartTotals.subtotal = subtotal;
  cartTotals.calculatedTax = calculatedTax;
  cartTotals.total = total;
  
}

function renderCartTotals() {
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTax = document.getElementById('cart-tax');
  const cartTotal = document.getElementById('cart-total');
  
  cartSubtotal.textContent = cartTotals.subtotal;
  cartTax.textContent = cartTotals.calculatedTax;
  cartTotal.textContent = cartTotals.total;
}

function renderCartCount() {
  const CartCountEl = document.getElementById('cart-count'); 
  CartCountEl.textContent = cart.length;
}

setPrices();

