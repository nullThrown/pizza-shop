
const itemSizeSelect = document.querySelectorAll('.item-size-select');
const foodItemCount = document.querySelectorAll('.food-item-count');
const itemPrice = document.querySelectorAll('.item-price__amount');
const foodItemsDiv = document.querySelectorAll('.food-item-box');
const addToCartBtn = document.querySelectorAll('.btn--add-to-cart');
let foodItems = [
  {
    category: 'pizza',
    name: 'cheese',
    smallPrice: 9.99,
    mediumPrice: 11.99,
    largePrice: 13.99,
    xlargePrice: 16.99,
    uuid: 'piz100'    
  },
  {
    category: 'pizza',
    name: 'pepperoni',
    smallPrice: 9.99,
    mediumPrice: 11.99,
    largePrice: 13.99,
    xlargePrice: 16.99,
    uuid: 'piz200'
  },
  {
    category: 'pizza',
    name: 'works',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz300'
  },
  {
    category: 'pizza',
    name: 'sausage',
    smallPrice: 9.99,
    mediumPrice: 11.99,
    largePrice: 13.99,
    xlargePrice: 16.99,
    uuid: 'piz400'
  }, 
  {
    category: 'pizza',
    name: 'meats',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz500'
  },
  {
    category: 'pizza',
    name: 'vegetarian',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz600'
  },
  {
    category: 'pizza',
    name: 'hawaiian',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz700'
  },
  {
    category: 'pizza',
    name: 'BBQ chicken',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz800'
  },
  {
    category: 'pizza',
    name: 'six cheese',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz900'
  },
  {
    category: 'side',
    name: 'jalepeno poppers',
    smallPrice: 3.99,
    largePrice: 5.99,
    uuid: 'sde100'
  }, 
  {
    category: 'side',
    name: 'garlic bread',
    price: 3.99,
    uuid: 'sde200'
  },
  {
    category: 'side',
    name: 'parmesan breadsticks',
    smallPrice: 2.99,
    largePrice: 4.99,
    uuid: 'sde300'
  }, 
  {
    category: 'side',
    name: 'chicken wings',
    smallPrice: 3.99,
    largePrice: 5.99,
    uuid: 'sde400'
  }, 
  {
    category: 'side',
    name: 'fries',
    smallPrice: 1.39,
    mediumPrice: 1.79,
    largePrice: 1.99,
    uuid: 'sde500'
  }, 
  {
    category: 'side',
    name: 'garlic fries',
    smallPrice: 1.75,
    mediumPrice: 2.39,
    largePrice: 2.99,
    uuid: 'sde600'
  }, 
  {
    category: 'side',
    name: 'chicken nuggets',
    smallPrice: 1.99,
    mediumPrice: 2.75,
    largePrice: 3.99,
    uuid: 'sde700'
  }, 
  {
    category: 'side',
    name: 'caesar salad',
    smallPrice: 2.99,
    largePrice: 4.99,
    uuid: 'sde800'
  }, 
  {
    category: 'side',
    name: 'garden salad',
    smallPrice: 2.99,
    largePrice: 4.99,
    uuid: 'sde900'
  }, 
  {
    category: 'dessert',
    name: 'cinnamon sticks',
    price: 5.99,
    uuid: 'des100'
  },
  {
    category: 'dessert',
    name: 'chocolate chip cookie',
    price: 1.99,
    uuid: 'des200'
  },
  {
    category: 'dessert',
    name: 'chocolate brownie',
    price: 4.99,
    uuid: 'des300'
  },
  {
    category: 'drink',
    name: 'coke',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk100'
  },
  {
    category: 'drink',
    name: 'diet coke',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk200'
  },
  {
    category: 'drink',
    name: 'root beer',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk300'
  },
  {
    category: 'drink',
    name: 'sprite',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk400'
  },
  {
    category: 'drink',
    name: 'dr pepper',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk500'
  },
  {
    category: 'drink',
    name: 'grape crush',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk600'
  }
];

class CartItem {
  constructor(name, size, count, cost) {
    this.name = name;
    this.size = size;
    this.count = count;
    this.cost = cost;
  }
}


itemSizeSelect.forEach(foodItem => {
  foodItem.addEventListener('change', () => {
   let priceEl = foodItem.parentNode.querySelector('.item-price__amount');
   let countEl = foodItem.parentNode.querySelector('.food-item-count').value;
   let uuid = foodItem.parentNode.dataset.uuid;
   priceEl.textContent = determinePrice(foodItem.value, countEl, uuid);
  });
});

foodItemCount.forEach(count => {
  count.addEventListener('change', () => {
    let priceEl = count.parentNode.querySelector('.item-price__amount');
    let sizeSelectEl = count.parentNode.querySelector('.item-size-select');
    if(sizeSelectEl !== null){
      sizeSelectEl = sizeSelectEl.value;
    }
    let uuid = count.parentNode.dataset.uuid;
    priceEl.textContent = determinePrice(sizeSelectEl, count.value, uuid);
  });
}); 

let cart = [];
addToCartBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let box = e.target.closest('.food-item-box');
    let sizeSelectEl = box.querySelector('.item-size-select') || undefined;
    if(sizeSelectEl !== undefined){
      sizeSelectEl = sizeSelectEl.value;
    }

    let countEl = box.querySelector('.food-item-count');
    let currentPrice = determinePrice(sizeSelectEl, countEl.value, box.dataset.uuid);
    let foodItem = foodItems.find(foodItem => foodItem.uuid == box.dataset.uuid);
    let cartItem = new CartItem(foodItem.name, sizeSelectEl, countEl.value, currentPrice);
    cart.push(cartItem);
    console.log(cart);
    renderCart(cart);
  });
})

function renderCart() {
  
}

function determinePrice(size, count, uuid) {
 let foodItem = foodItems.find(foodItem => foodItem.uuid == uuid); 
  let price = 0;

  if(!size) {
    return foodItem.price * parseInt(count);
  }

    // turn this into a switch case 
    if(size == 'small'){
      price = foodItem.smallPrice;
    }
    else if(size == 'medium'){
      price = foodItem.mediumPrice;
    }
    else if(size == 'large'){
      price = foodItem.largePrice;
    }
    else if(size == 'x-large'){
      price = foodItem.xlargePrice;
    }
    return (price * parseInt(count)).toFixed(2);

  }; 

   
function setPrices() {
  
  itemPrice.forEach(item => {
    let foodItemId = item.closest('.food-item-box').dataset.uuid;
    let foodItem = foodItems.find(foodItem => foodItem.uuid == foodItemId);
    item.innerHTML = foodItem.smallPrice || foodItem.price;
    
  });
};

setPrices();


cart = [];

function renderCart(cart) {
  let listContainer = document.querySelector('.cart-ul');
  cart.forEach(item => {
    let li = document.createElement('li');
    
    let h4 = document.createElement('h4');
    h4.classList.add('cart__item-title');
    h4.textContent = item.name;
    
    let sizeP = document.createElement('p');
    sizeP.classList.add('cart__item-size');
    sizeP.textContent = item.size
    
    // let crustP = document.createElement('p');
    // crustP.classList.add('cart__item-crust');
    // crustP.textContent = item.crust;

    let countP = document.createElement('p');
    countP.classList.add('cart__item-count');
    countP.textContent = item.count;

    let currentPriceP = document.createElement('p');
    currentPriceP.textContent = item.cost;
    listContainer.appendChild(li);
    li.append(h4, sizeP, countP, currentPriceP);
   });
}


{/* <li>              
  <h4 class="cart__item-title">Cheese Pizza</h4>
  <p class="cart__item-size">small</p>
  <p class="cart__item-crust">regular crust</p>
  <p class="cart__item-amount"><span class="u-text-italicize">1 </span class="u-text-italicize">X <span class="u-text-bold">$</span><span class="cart__item-price">13.99</span></p>
  <div class="cart__btn-box">
  <a href=""><button class="btn btn--edit-cart">Edit</button></a>
  <button class="btn btn--remove-cart-item">Remove</button>
  </div>
</li>  */}

