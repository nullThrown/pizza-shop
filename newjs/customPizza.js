import { getObjFromLS, setObjToLS, initCustomPizzaToLS } from './storage.js';
import { create_UUID } from './helpers.js';
import { activateAlert } from './alert.js';
import { activateCartCount, renderCart } from './cart.js';
import { renderSidebarCart } from './sidebar.js';
import customData from './data/customData.js';

const meatsBtn = document.getElementById('meatsBtn');
const veggiesBtn = document.getElementById('veggiesBtn');
const cheeseBtn = document.getElementById('cheeseBtn');

let meatToppings = document.querySelector('.topping-select--meats');
const veggieToppings = document.querySelector('.topping-select--veggies');
const cheeseToppings = document.querySelector('.topping-select--cheese');

const sizeRadios = document.querySelectorAll('input[name="size"]');
const crustRadios = document.querySelectorAll('input[name="crust"]');
const countBtns = document.querySelectorAll('.btn--count');
const toppingRadios = document.querySelectorAll('.portion-side');

const toppingsContainer = document.querySelector('.custom__toppings-box');

const addCustomToCartbtn = document.querySelector('.btn--add-custom-to-cart');

const customSizeEl = document.querySelector('.custom__size');
const customCrustEl = document.querySelector('.custom__crust');
const customCountEl = document.querySelector('.custom__count');
const customPriceEl = document.getElementById('customPrice');

export function initCustomPizza(currentPath) {
  if (currentPath === '/html/menu/make-your-own.html') {
    initCustomPizzaToLS();
    toggleAddToCartBtn();
    populateSizeRadios();
    populateCrustRadios();
    populateToppingRadios();
    renderSize();
    renderCrust();
    renderTotal();
    renderCount();
    renderPizzaToppings();
  }
}

export function addCustomListeners() {
  if (sizeRadios)
    sizeRadios.forEach((radio) => (radio.onchange = handleSizeSelect));

  if (crustRadios)
    crustRadios.forEach((radio) => {
      radio.onchange = handleCrustSelect;
    });

  if (countBtns) countBtns.forEach((btn) => (btn.onclick = handleCount));

  if (toppingRadios)
    toppingRadios.forEach((radio) => (radio.onchange = handleToppingSelect));

  if (toppingsContainer) toppingsContainer.onclick = handleToppingDelete;

  if (addCustomToCartbtn) addCustomToCartbtn.onclick = handleAddCustomToCart;

  if (meatsBtn)
    meatsBtn.onclick = () => {
      veggieToppings.style.display = 'none';
      veggiesBtn.style.background = 'rgba(255, 0, 0, 0.082)';
      cheeseToppings.style.display = 'none';
      cheeseBtn.style.background = 'rgba(255, 0, 0, 0.082)';

      meatsBtn.style.background = 'rgba(255, 0, 0, 0.335)';
      meatToppings.style.display = 'block';
    };

  if (veggiesBtn)
    veggiesBtn.onclick = () => {
      meatToppings.style.display = 'none';
      meatsBtn.style.background = 'rgba(255, 0, 0, 0.082)';
      cheeseToppings.style.display = 'none';
      cheeseBtn.style.background = 'rgba(255, 0, 0, 0.082)';

      veggiesBtn.style.background = 'rgba(255, 0, 0, 0.335)';
      veggieToppings.style.display = 'block';
    };

  if (cheeseBtn)
    cheeseBtn.onclick = () => {
      veggieToppings.style.display = 'none';
      veggiesBtn.style.background = 'rgba(255, 0, 0, 0.082)';
      meatToppings.style.display = 'none';
      meatsBtn.style.background = 'rgba(255, 0, 0, 0.082)';

      cheeseBtn.style.background = 'rgba(255, 0, 0, 0.335)';
      cheeseToppings.style.display = 'block';
    };
}

class PizzaTopping {
  constructor(name, side, uuid) {
    (this.name = name), (this.side = side);
    this.uuid = uuid;
  }
}

// HANDLERS //

function handleSizeSelect(e) {
  const customPizza = getObjFromLS('customPizza');
  customPizza.size = e.target.id;
  setObjToLS('customPizza', customPizza);
  setCustomPizzaPrices();
  setCustomPizzaTotal();
  toggleAddToCartBtn();
  renderSize();
  renderTotal();
}

function handleCrustSelect(e) {
  const customPizza = getObjFromLS('customPizza');
  customPizza.crust = e.target.id;
  setObjToLS('customPizza', customPizza);

  renderCrust();
  renderTotal();
}

function handleCount(e) {
  const customPizza = getObjFromLS('customPizza');
  const { count } = customPizza;
  const elId = e.target.parentNode.id;
  if (elId === 'orderCountDecrement' && count > 1) customPizza.count--;
  else if (elId === 'orderCountIncrement' && count < 20) customPizza.count++;
  else {
    return;
  }
  setObjToLS('customPizza', customPizza);
  setCustomPizzaTotal();
  renderCount();
  renderTotal();
}

function handleToppingSelect(e) {
  const customPizza = getObjFromLS('customPizza');
  const toppingName = e.target.name;
  const toppingSide = e.target.dataset.side;
  const isTopping = customPizza.toppings.some((el) => el.name === toppingName);
  if (!isTopping) {
    const pizzaTopping = new PizzaTopping(
      toppingName,
      toppingSide,
      create_UUID()
    );
    customPizza.toppings.push(pizzaTopping);
  } else {
    const topping = customPizza.toppings.find((el) => el.name === toppingName);
    topping.side = toppingSide;
  }
  setObjToLS('customPizza', customPizza);
  setCustomPizzaTotal();
  renderTotal();
  renderPizzaToppings();
}

function handleToppingDelete(e) {
  if (
    e.target.nodeName === 'BUTTON' &&
    e.target.classList.contains('btn--cancel')
  ) {
    const targetDiv = e.target.closest('div');

    deleteToppingFromLS(targetDiv.dataset.uuid);
    setCustomPizzaTotal();
    renderPizzaToppings();
    renderTotal();
  }
}

function handleAddCustomToCart() {
  const customPizza = getObjFromLS('customPizza');
  const cart = getObjFromLS('cart');
  if (!customPizza.size) activateAlert('Please select a size.', false);
  else {
    cart.items.push(customPizza);
    setObjToLS('cart', cart);
    initCustomPizzaToLS(true);
    activateCartCount();
    activateAlert('Custom pizza has been added to your cart', true);
    renderCart();
    renderSidebarCart();
    clearToppingDisplay();
    uncheckInputs(sizeRadios, toppingRadios);
  }
}

// RENDERERS //

function renderSize() {
  const { size } = getObjFromLS('customPizza');
  customSizeEl.textContent = size;
}

function renderCrust() {
  const { crust } = getObjFromLS('customPizza');
  customCrustEl.textContent = crust;
}

// render count
function renderCount() {
  const { count } = getObjFromLS('customPizza');
  customCountEl.textContent = count;
}

// render total
function renderTotal() {
  const { totalPrice } = getObjFromLS('customPizza');
  customPriceEl.textContent = totalPrice;
}

const fullBox = document.querySelector('.topping-display-full');
const leftBox = document.querySelector('.topping-display-left');
const rightBox = document.querySelector('.topping-display-right');

// create html node
function renderPizzaToppings() {
  clearToppingDisplay();
  let customPizza = getObjFromLS('customPizza');

  customPizza.toppings.forEach((topping) => {
    let toppingBox = document.createElement('div');
    toppingBox.classList.add('custom__topping');
    toppingBox.dataset.uuid = topping.uuid;
    let toppingP = document.createElement('p');
    toppingP.textContent = topping.name;
    let priceP = document.createElement('p');
    priceP.textContent = '(+$' + customPizza.toppingPrice + ')';
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn--cancel');
    removeBtn.textContent = 'X';
    toppingBox.append(toppingP, priceP, removeBtn);
    switch (topping.side) {
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
}

function toggleAddToCartBtn() {
  const { size } = getObjFromLS('customPizza');
  if (!size) addCustomToCartbtn.classList.add('btn--disabled');
  else {
    addCustomToCartbtn.classList.remove('btn--disabled');
  }
}

// POPULATE //

function populateSizeRadios() {
  const { size } = getObjFromLS('customPizza');
  if (size) {
    sizeRadios.forEach((radio) => {
      if (radio.id === size) radio.checked = true;
    });
  }
}

function populateCrustRadios() {
  const { crust } = getObjFromLS('customPizza');
  crustRadios.forEach((radio) => {
    if (radio.id === crust) {
      radio.checked = true;
    }
  });
}
// find a more suitable fn() name
function populateToppingRadios() {
  const customPizza = getObjFromLS('customPizza');
  customPizza.toppings.forEach((topping) => {
    for (let i = 0; i < toppingRadios.length; i++) {
      if (
        topping.name === toppingRadios[i].name &&
        topping.side === toppingRadios[i].dataset.side
      ) {
        toppingRadios[i].checked = true;
      }
    }
  });
}

// HELPERS //

function deleteToppingFromLS(uuid) {
  const customPizza = getObjFromLS('customPizza');
  const itemIndex = customPizza.toppings.findIndex(
    (item) => item.uuid === uuid
  );
  if (itemIndex !== -1) {
    uncheckTopping(customPizza.toppings[itemIndex]);
    customPizza.toppings.splice(itemIndex, 1);
    setObjToLS('customPizza', customPizza);
  }
}
function uncheckTopping(topping) {
  let toppingRadio = Array.from(toppingRadios).find(
    (radio) =>
      radio.name === topping.name && radio.dataset.side === topping.side
  );
  toppingRadio.checked = false;
}

// place in helper.js
function uncheckInputs() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].forEach((el) => {
      if (el.checked) el.checked = false;
    });
  }
}

function clearToppingDisplay() {
  while (fullBox.children.length > 1) {
    fullBox.removeChild(fullBox.lastChild);
  }
  while (leftBox.children.length > 1) {
    leftBox.removeChild(leftBox.lastChild);
  }
  while (rightBox.children.length > 1) {
    rightBox.removeChild(rightBox.lastChild);
  }
}

function setCustomPizzaPrices() {
  const customPizza = getObjFromLS('customPizza');
  let sizePrice;
  let toppingPrice;
  switch (customPizza.size) {
    case 'small':
      sizePrice = customData.smallPrice;
      toppingPrice = customData.smallToppingPrice;
      break;
    case 'medium':
      sizePrice = customData.mediumPrice;
      toppingPrice = customData.mediumToppingPrice;
      break;
    case 'large':
      sizePrice = customData.largePrice;
      toppingPrice = customData.largeToppingPrice;
      break;
    case 'x-large':
      sizePrice = customData.xlargePrice;
      toppingPrice = customData.xlargeToppingPrice;
      break;
  }
  customPizza.sizePrice = sizePrice;
  customPizza.toppingPrice = toppingPrice;
  setObjToLS('customPizza', customPizza);
}

function setCustomPizzaTotal() {
  const customPizza = getObjFromLS('customPizza');
  const { sizePrice, toppingPrice, toppings, count } = customPizza;
  customPizza.totalPrice = Number(
    ((sizePrice + toppingPrice * toppings.length) * count).toFixed(2)
  );
  setObjToLS('customPizza', customPizza);
}
