const cartIcons = document.querySelectorAll('.cart-icons');
const cartEl = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__ul');

class CartItem {
  constructor(uuid, name, size, crust, sauce, count, originalPrice, totalPrice) {
    this.uuid = uuid;
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.sauce = sauce;
    this.count = count;
    this.originalPrice = originalPrice;
    this.totalPrice = totalPrice;
  }
};

cartIcons.forEach((el) => {
  el.addEventListener('click', toggleCartDisplay)
});

cartContainer.addEventListener('click', (e) => {
  if(e.target.nodeName === 'BUTTON' && e.target.classList.contains('delete-cart-item')){  
    let targetLi = e.target.closest('li');
    deleteItemFromLocalStorage(targetLi.dataset.uuid);
    renderCart();
  }
});

function renderCart() {
  let cart = getCartFromLocalStorage();
  let listContainer = document.querySelector('.cart__ul');
  listContainer.replaceChildren(); 

    cart.items.forEach((item) => {
      createCartItem(item, listContainer);
    }); 
    determineCartTotals(); 
    renderCartTotals();
    renderCartCount();
}; 

function deleteCartItem(el) {
  el.parentNode.removeChild(el);
}

function createCartItem(item, container) {
  
    let li = document.createElement('li');
    li.dataset.uuid = item.uuid;
   
    let h4 = document.createElement('h4');
    h4.classList.add('cart__item-title');
    h4.textContent = item.name;

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn--cancel', 'btn', 'delete-cart-item');
    cancelBtn.textContent = 'X';
    
    
    let sizeP = document.createElement('p');
    sizeP.classList.add('cart__item-size');
    sizeP.textContent = item.size;

    let crustP = document.createElement('p');
    crustP.textContent = item.crust;

    let sauceP = document.createElement('p');
    sauceP.textContent = item.sauce;

    // price and count 
    let countPrice = document.createElement('p');
    countPrice.classList.add('cart__item-amount');
    
    let countSpan = document.createElement('span');
    countSpan.classList.add('u-text-italicize');
    countSpan.textContent = item.count;

    let xSpan = document.createElement('span');
    xSpan.classList.add('u-text-italicize');
    xSpan.textContent = ' for ';

    let dollarSpan = document.createElement('span');
    dollarSpan.classList.add('u-text-bold');
    dollarSpan.textContent = '$';
    
    let currentPriceP = document.createElement('span');
    currentPriceP.classList.add('cart__item-price');
    currentPriceP.textContent = item.totalPrice;
    
    countPrice.append(countSpan, xSpan, dollarSpan, currentPriceP);
    li.append(cancelBtn, h4, sizeP, crustP, sauceP, countPrice);
    container.appendChild(li);
};
  

function toggleCartDisplay() {
  if(cartEl.style.display === 'none') {
   cartEl.style.display = 'block'; 
  }
  else {
    cartEl.style.display = 'none';
  }
};

function determineCartTotals() {
  let cart = getCartFromLocalStorage();
  let subtotal = cart.items.reduce((acc, item) => {
     return acc + parseFloat(item.totalPrice);
    }, 0);

  let calculatedTax = (parseFloat(subtotal * .085)).toFixed(2);
    
  let total = (subtotal + parseFloat(calculatedTax)).toFixed(2);
    
  subtotal = subtotal.toFixed(2); 
  cart.cartTotals.subtotal = subtotal;
  cart.cartTotals.calculatedTax = calculatedTax;
  cart.cartTotals.total = total;
  setCartToLocalStorage(cart);
};

function renderCartTotals() {
  let cart = getCartFromLocalStorage();
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTax = document.getElementById('cart-tax');
  const cartTotal = document.getElementById('cart-total');
  
  cartSubtotal.textContent = cart.cartTotals.subtotal;
  cartTax.textContent = cart.cartTotals.calculatedTax;
  cartTotal.textContent = cart.cartTotals.total;
};

function renderCartCount() {
  let cart = getCartFromLocalStorage();
  document.getElementById('cart-count').textContent = cart.items.length;
};

function activatePopupOnCart() {
  let cart = getCartFromLocalStorage();
  popupText.textContent = cart.items[cart.items.length-1].name + ' has been added to your cart.';
  activateSuccessPopup();
};


// function isDuplicateItem(name, size, crust, sauce) {
//   cart.some((item) => {
//     if(
//        item.name === name &&
//        item.size === size &&
//        item.crust === crust &&
//        item.sauce === sauce 
//       ) {
//         item.count++;
//         console.log('this item is a duplicate')
//         return true;
//       }
//     });
//     return false;
// };