// constants
const cartIcons = document.querySelectorAll('.cart-icons');
const cartEl = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__ul');

class CartItem {
  constructor(
    uuid,
    name,
    size,
    crust,
    sauce,
    count,
    originalPrice,
    totalPrice,
    imageLink
  ) {
    this.uuid = uuid;
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.sauce = sauce;
    this.count = count;
    this.originalPrice = originalPrice;
    this.totalPrice = totalPrice;
    this.imageLink = imageLink;
  }
}

// app.js
cartIcons.forEach((el) => {
  el.addEventListener('click', toggleCartDisplay);
});

// app.js
cartContainer.addEventListener('click', deleteCartItem);

// storage.js
function deleteCartItem(event) {
  if (
    event.target.nodeName === 'BUTTON' &&
    event.target.classList.contains('delete-cart-item')
  ) {
    let targetLi = event.target.closest('li');
    deleteItemFromLocalStorage(targetLi.dataset.uuid);
    renderCart();
    renderSidebarCart();
  }
}

// render.js
function renderCart() {
  let cart = getObjFromLocalStorage('cart');
  let listContainer = document.querySelector('.cart__ul');
  listContainer.replaceChildren();

  cart.items.forEach((item) => {
    createCartItem(item, listContainer);
  });
  determineCartTotals();
  renderCartTotals();
  renderCartCount();
  renderOrderType();
}

// createNode.js
function createCartItem(item, container) {
  let li = document.createElement('li');
  li.dataset.uuid = item.uuid;
  li.classList.add('cart__item');

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

  let toppingBox = document.createElement('div');
  if (item.name === 'Custom Pizza') {
    toppingBox.classList.add('cart__item-toppings');
    let leftBox = document.createElement('ul');
    leftBox.textContent = 'Left';
    let fullBox = document.createElement('ul');
    fullBox.textContent = 'full';
    let rightBox = document.createElement('ul');
    rightBox.textContent = 'right';

    toppingBox.append(leftBox, fullBox, rightBox);

    item.toppings.forEach((topping) => {
      let li = document.createElement('li');
      li.textContent = topping.name;

      switch (topping.side) {
        case 'left':
          leftBox.appendChild(li);
          break;
        case 'full':
          fullBox.appendChild(li);
          break;
        case 'right':
          rightBox.appendChild(li);
          break;
      }
    });
  }

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
  li.append(cancelBtn, h4, sizeP, crustP, sauceP, toppingBox, countPrice);
  container.appendChild(li);
}

// helpers.js
function toggleCartDisplay() {
  let cartElDisplay = window.getComputedStyle(cartEl);
  if (cartElDisplay.display === 'none') {
    cartEl.style.display = 'block';
  } else {
    cartEl.style.display = 'none';
  }
}

// helpers.js
function determineCartTotals() {
  let cart = getObjFromLocalStorage('cart');
  let subtotal = cart.items.reduce((acc, item) => {
    return acc + parseFloat(item.totalPrice);
  }, 0);

  let calculatedTax = Number(parseFloat(subtotal * 0.085).toFixed(2));
  let total = Number((subtotal + parseFloat(calculatedTax)).toFixed(2));
  subtotal = Number(subtotal.toFixed(2));

  cart.cartTotals.subtotal = subtotal;
  cart.cartTotals.calculatedTax = calculatedTax;
  cart.cartTotals.total = total;
  setObjToLocalStorage('cart', cart);
}

// render.js
function renderCartTotals() {
  let cart = getObjFromLocalStorage('cart');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTax = document.getElementById('cart-tax');
  const cartTotal = document.getElementById('cart-total');
  cartSubtotal.textContent = cart.cartTotals.subtotal.toFixed(2);
  cartTax.textContent = cart.cartTotals.calculatedTax.toFixed(2);
  cartTotal.textContent = cart.cartTotals.total.toFixed(2);
}

// render.js
function renderCartCount() {
  let cart = getObjFromLocalStorage('cart');
  document.getElementById('cart-count').textContent = cart.items.length;
  document.querySelector('.sidebar__cart-count').textContent =
    cart.items.length;
}

// render.js
function renderOrderType() {
  const orderTypeP = document.querySelector('.cart__order-type');
  let cart = getObjFromLocalStorage('cart');
  if (cart.orderType) orderTypeP.textContent = cart.orderType;
}

// helpers.js
function activateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.classList.add('header__cart-box--active');
  setTimeout(() => {
    cartCount.classList.remove('header__cart-box--active');
  }, 200);
}
