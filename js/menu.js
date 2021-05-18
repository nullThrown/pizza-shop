const itemSizeSelecters = document.querySelectorAll('.item-size-select');
const itemCountSelectors = document.querySelectorAll('.food-item-count');
const addToCartBtns = document.querySelectorAll('.btn--add-to-cart');


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
   
    let cartItem = new CartItem(foodItem.name, sizeSelectEl, crustSelectEl, sauceSelectEl, countEl.value, currentPrice);
    cart.items.push(cartItem);

    // console.log(cart);
    renderCartCount();
    determineCartTotals();
    renderCartTotals();
    renderCart(cart);
  });
});

