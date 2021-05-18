const cartIcons = document.querySelectorAll('.cart-icons');
const cartEl = document.querySelector('.cart');


cartIcons.forEach((el) => {
  el.addEventListener('click', toggleCartDisplay)
});

function renderCart(cart) {
    if(cart.items.length === 0 ) {
      return;
    }
    let foodItem = cart.items[cart.items.length-1];
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
  
  let subtotal = cart.items.reduce((acc, item) => {
     return acc + parseFloat(item.cost);
    }, 0);

  let calculatedTax = (parseFloat(subtotal * .085)).toFixed(2);
    
  let total = (subtotal + parseFloat(calculatedTax)).toFixed(2);
    
  subtotal = subtotal.toFixed(2); 
  cartTotals.subtotal = subtotal;
  cartTotals.calculatedTax = calculatedTax;
  cartTotals.total = total;
};

function renderCartTotals() {
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTax = document.getElementById('cart-tax');
  const cartTotal = document.getElementById('cart-total');
  
  cartSubtotal.textContent = cartTotals.subtotal;
  cartTax.textContent = cartTotals.calculatedTax;
  cartTotal.textContent = cartTotals.total;
};

function renderCartCount() {
  const CartCountEl = document.getElementById('cart-count'); 
  CartCountEl.textContent = cart.items.length;
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