// order file
  // variable bindings
  // event listeners
  // rendering fn()s 
  // math ops/ setting data to LS
  // helper functions
  // helper functions may follow or precede the fn()s they are helping 
    // but perhaps could also stand alone depending on how often they are used or best judgement

const meatsBtn = document.getElementById('meatsBtn');
const veggiesBtn = document.getElementById('veggiesBtn');
const cheeseBtn = document.getElementById('cheeseBtn');


let meatToppings = document.querySelector('.topping-select--meats');
const veggieToppings = document.querySelector('.topping-select--veggies');
const cheeseToppings = document.querySelector('.topping-select--cheese');

// refactor! bind variables outside of respective functions 
meatsBtn.onclick = () => {
  veggieToppings.style.display = 'none';
  veggiesBtn.style.background = 'rgba(255, 0, 0, 0.082)';
  cheeseToppings.style.display = 'none';
  cheeseBtn.style.background = 'rgba(255, 0, 0, 0.082)';

  meatsBtn.style.background = 'rgba(255, 0, 0, 0.335)';
  meatToppings.style.display = 'block';
}

veggiesBtn.onclick = () => { 
  meatToppings.style.display = 'none';
  meatsBtn.style.background = 'rgba(255, 0, 0, 0.082)';
  cheeseToppings.style.display = 'none';
  cheeseBtn.style.background = 'rgba(255, 0, 0, 0.082)';

  veggiesBtn.style.background = 'rgba(255, 0, 0, 0.335)';
  veggieToppings.style.display = 'block';
}

cheeseBtn.onclick = () => {
  veggieToppings.style.display = 'none';
  veggiesBtn.style.background = 'rgba(255, 0, 0, 0.082)';
  meatToppings.style.display = 'none';
  meatsBtn.style.background = 'rgba(255, 0, 0, 0.082)';

  cheeseBtn.style.background = 'rgba(255, 0, 0, 0.335)';
  cheeseToppings.style.display = 'block';
}

//determine price 
// CHANGE THE IDS -- TOO GERNERIC!!
const sizeRadios = document.querySelectorAll('input[name="size"]');
sizeRadios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    let customPizza = getObjFromLocalStorage('customPizza');
    customPizza.size = e.target.id;
    setObjToLocalStorage('customPizza', customPizza);
    setCustomPizzaPrices();
    setCustomPizzaTotal();
    toggleAddToCartBtn();
    renderSize();
    renderTotal();
    renderPizzaToppings();
  });
});

// find more suitable fn() name
// find more sutiable array fn()
function populateSizeRadios() {
  let customPizza = getObjFromLocalStorage('customPizza');
  if(customPizza.size) {
    sizeRadios.forEach((radio) => {
      if(radio.id === customPizza.size){
        radio.checked = true;
      }
    });
  }
};
// determine price
const crustRadios = document.querySelectorAll('input[name="crust"]');
crustRadios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    let customPizza = getObjFromLocalStorage('customPizza');
    customPizza.crust = e.target.id;
    setObjToLocalStorage('customPizza', customPizza);
    

    renderCrust();
    renderTotal();
  });
});

function populateCrustRadios() {
  let customPizza = getObjFromLocalStorage('customPizza');
  crustRadios.forEach((radio) => {
    if(radio.id === customPizza.crust){
      radio.checked = true;
    }
  });
};


const orderCountIncrement = document.getElementById('orderCountIncrement');
const orderCountDecrement = document.getElementById('orderCountDecrement');

orderCountDecrement.addEventListener('click', () => {
  let customPizza = getObjFromLocalStorage('customPizza');
  if(customPizza.count > 1) {
    customPizza.count--;
  }
  setObjToLocalStorage('customPizza', customPizza);
  
  setCustomPizzaTotal();
  renderCount();
  renderTotal();
});

orderCountIncrement.addEventListener('click', () => {
  let customPizza = getObjFromLocalStorage('customPizza');
  if(customPizza.count < 20) {
    customPizza.count++;
  }
  setObjToLocalStorage('customPizza', customPizza);
  setCustomPizzaTotal();
  renderCount();
  renderTotal();
});

const toppingRadios = document.querySelectorAll('.portion-side');
function deleteToppingFromLocalStorage(uuid) {
  let customPizza = getObjFromLocalStorage('customPizza');
  let itemIndex = customPizza.toppings.findIndex((item) => item.uuid === uuid);
  console.log(customPizza.toppings[itemIndex]);
  if(itemIndex !== -1) {
    uncheckTopping(customPizza.toppings[itemIndex]);
    customPizza.toppings.splice(itemIndex, 1);
    setObjToLocalStorage('customPizza', customPizza);
  }
};
// rename to more general purpose uncheck input
function uncheckTopping(topping) {
 let toppingRadio = Array.from(toppingRadios).find(radio => radio.name === topping.name  && radio.dataset.side === topping.side);
  toppingRadio.checked = false;
};
function uncheckInputs() {
  for(let i = 0; i < arguments.length; i++) {
    arguments[i].forEach((el) => {
      if(el.checked === true) {
        el.checked = false;
      }
    });
  }
};
 const toppingsContainer = document.querySelector('.current-order__toppings-box');
 
 toppingsContainer.addEventListener('click', (e) => {
   if(e.target.nodeName === 'BUTTON' && e.target.classList.contains('btn--cancel')) {
      let targetDiv = e.target.closest('div');
      deleteToppingFromLocalStorage(targetDiv.dataset.uuid);
      setCustomPizzaTotal();
      renderPizzaToppings();
      renderTotal();
   }
 });

class PizzaTopping {
  constructor(name, side, uuid) {
    this.name = name,
    this.side = side
    this.uuid = uuid;
  }
}
toppingRadios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    let customPizza = getObjFromLocalStorage('customPizza');
   let foodTitle = e.target.name;
   let side = e.target.dataset.side;
   let isTopping = customPizza.toppings.some((el) => el.name === foodTitle);
   if(!isTopping){
     let pizzaTopping = new PizzaTopping(foodTitle, side, create_UUID());
     customPizza.toppings.push(pizzaTopping);
   }
   else {
     let topping = customPizza.toppings.find((el) => el.name === foodTitle);   
      topping.side = side;
    
   }
   setObjToLocalStorage('customPizza', customPizza);
   setCustomPizzaTotal();
   renderTotal();
   renderPizzaToppings();
  });
});

// find a more suitable fn() name
function populateToppingRadios() {
  let customPizza = getObjFromLocalStorage('customPizza');
  customPizza.toppings.forEach((topping) => {
    for(let i = 0; i < toppingRadios.length; i++) {
      if(topping.name === toppingRadios[i].name && topping.side === toppingRadios[i].dataset.side){
            toppingRadios[i].checked = true;   
      }
    }
  });
};

// convert into helper function 
// perhaps use a callback 
let addCustomToCartbtn = document.querySelector('.btn--add-custom-to-cart');

addCustomToCartbtn.addEventListener('click', (e) => {
  let customPizza = getObjFromLocalStorage('customPizza');
  let cart = getObjFromLocalStorage('cart');
  if(!customPizza.size) {
    activateFailurePopup('Please select a size.');
  }
  else {
    cart.items.push(customPizza);
    setObjToLocalStorage('cart', cart);
    initCustomPizzaToLocalStorage(true);
    activateSuccessPopup('custom Pizza has been added to your cart');
    renderCart();
    renderSidebarCart();
    clearToppingDisplay();
    uncheckInputs(sizeRadios, toppingRadios);
    renderCrust();

  }
});


function toggleAddToCartBtn() {
  let customPizza = getObjFromLocalStorage('customPizza');
    if(!customPizza.size) {
      
      addCustomToCartbtn.classList.add('btn--disabled');
      
    }
    else {
      
      addCustomToCartbtn.classList.remove('btn--disabled');
    }
};



//
function setCustomPizzaPrices() {
  let customPizza = getObjFromLocalStorage('customPizza');
  let sizePrice;
  let toppingPrice;
  switch(customPizza.size) {
    case 'small':
      sizePrice = makeYourOwn.smallPrice;
      toppingPrice = makeYourOwn.smallToppingPrice; 
      break;
    case 'medium':
      sizePrice = makeYourOwn.mediumPrice;
      toppingPrice = makeYourOwn.mediumToppingPrice; 
      break;
    case 'large':
      sizePrice = makeYourOwn.largePrice;
      toppingPrice = makeYourOwn.largeToppingPrice; 
      break;
    case 'x-large':
      sizePrice = makeYourOwn.xlargePrice;
      toppingPrice = makeYourOwn.xlargeToppingPrice; 
      break;
  }
    customPizza.sizePrice = sizePrice;
    customPizza.toppingPrice = toppingPrice;
    setObjToLocalStorage('customPizza', customPizza);
};
function setCustomPizzaTotal() {
  let customPizza = getObjFromLocalStorage('customPizza');
  customPizza.totalPrice = Number(((customPizza.sizePrice + customPizza.toppingPrice * customPizza.toppings.length) * customPizza.count).toFixed(2));
  setObjToLocalStorage('customPizza', customPizza);
};


// render size
const currentOrderSizeEl = document.querySelector('.current-order__size'); 
function renderSize() {
  let customPizza = getObjFromLocalStorage('customPizza');
  currentOrderSizeEl.textContent = customPizza.size; 
};

// render crust
const currentOrderCrustEl = document.querySelector('.current-order__crust'); 
function renderCrust() {
  let customPizza = getObjFromLocalStorage('customPizza');
  currentOrderCrustEl.textContent = customPizza.crust;
};

// render count 
const currentOrderCountEl = document.querySelector('.current-order__count');
function renderCount() {
  let customPizza = getObjFromLocalStorage('customPizza');
  currentOrderCountEl.textContent = customPizza.count;
};








// render total
const currentOrderPriceEl = document.getElementById('currentOrderPrice');
function renderTotal() {
  let customPizza = getObjFromLocalStorage('customPizza');
  currentOrderPriceEl.textContent = customPizza.totalPrice;
};


const fullBox = document.querySelector('.topping-display-full');
const leftBox = document.querySelector('.topping-display-left');
const rightBox = document.querySelector('.topping-display-right');

function renderPizzaToppings() {
  clearToppingDisplay();
  let customPizza = getObjFromLocalStorage('customPizza');

  customPizza.toppings.forEach((topping) => {
    let toppingBox = document.createElement('div');
    toppingBox.classList.add('current-order__topping');
    toppingBox.dataset.uuid = topping.uuid;
    let toppingP = document.createElement('p');
    toppingP.textContent = topping.name;
    let priceP = document.createElement('p');
    priceP.textContent = '(+$' + customPizza.toppingPrice + ')';
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn--cancel');
    removeBtn.textContent = 'X';
    toppingBox.append(toppingP, priceP, removeBtn);
    switch(topping.side) {
      case 'full':
        fullBox.appendChild(toppingBox);
        break;
      case 'left':
        leftBox.appendChild(toppingBox);
        break;
      case 'right': 
        rightBox.appendChild(toppingBox);
        break;      
    }
  });

};

function clearToppingDisplay() {
  while (fullBox.children.length > 1){
    fullBox.removeChild(fullBox.lastChild);
  }
  while (leftBox.children.length > 1){
    leftBox.removeChild(leftBox.lastChild);
  }
  while (rightBox.children.length > 1){
    rightBox.removeChild(rightBox.lastChild);
  }
};

function initCustomPizzaToLocalStorage(reset) {
  if(!isStored('customPizza') || reset === true){
    let customPizzaStr = JSON.stringify(
      {
        name: 'Custom Pizza',
        size: '',
        crust: 'regular',
        count: 1,
        sizePrice: 0,
        toppingPrice: 0.99,
        totalPrice: 0,
        toppings: [],
        imageLink: '../img/pizza/cheese.jpg',
        uuid: create_UUID()
      }
    );
    localStorage.setItem('customPizza', customPizzaStr);
  };
};


initCustomPizzaToLocalStorage();
toggleAddToCartBtn();
populateSizeRadios();
populateCrustRadios();
populateToppingRadios();
renderSize();
renderCrust();
renderTotal();
renderCount();
renderPizzaToppings();
// initialize make your own array into 
