const cartIcons = document.querySelectorAll('.cart-icons');
const cartEl = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__ul');

const cartSubtotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById('cart-tax');
const cartTotal = document.getElementById('cart-total');

const orderTypeP = document.querySelector('.cart__order-type');

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

// combine into single element
cartIcons.forEach((el) => {
  el.onclick = toggleCartDisplay;
});

cartContainer.addEventListener('click', deleteCartItem);

// find a better place for this function
function deleteCartItem(e) {
  const el = e.target;
  if (el.nodeName === 'BUTTON' && el.classList.contains('delete-cart-item')) {
    const targetLi = el.closest('li');
    deleteCartItemFromLocalStorage(targetLi.dataset.uuid);
    renderCart();
    renderSidebarCart();
  }
}

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

function toggleCartDisplay() {
  let cartElStyles = window.getComputedStyle(cartEl);
  if (cartElStyles.display === 'none') {
    cartEl.style.display = 'block';
  } else {
    cartEl.style.display = 'none';
  }
}

function determineCartTotals() {
  const cart = getObjFromLocalStorage('cart');
  let subtotal = cart.items.reduce((acc, item) => {
    return acc + parseFloat(item.totalPrice);
  }, 0);

  const calculatedTax = Number(parseFloat(subtotal * 0.085).toFixed(2));
  const total = Number((subtotal + parseFloat(calculatedTax)).toFixed(2));
  subtotal = Number(subtotal.toFixed(2));

  cart.cartTotals.subtotal = subtotal;
  cart.cartTotals.calculatedTax = calculatedTax;
  cart.cartTotals.total = total;
  setObjToLocalStorage('cart', cart);
}
// convert all of these into a single fn()
// call it cart meta data or whatever
// depends on how large and complex it looks

function renderCartTotals() {
  const cart = getObjFromLocalStorage('cart');
  cartSubtotal.textContent = cart.cartTotals.subtotal.toFixed(2);
  cartTax.textContent = cart.cartTotals.calculatedTax.toFixed(2);
  cartTotal.textContent = cart.cartTotals.total.toFixed(2);
}

function renderCartCount() {
  const cart = getObjFromLocalStorage('cart');
  document.getElementById('cart-count').textContent = cart.items.length;
  document.querySelector('.sidebar__cart-count').textContent =
    cart.items.length;
}

function renderOrderType() {
  const cart = getObjFromLocalStorage('cart');
  orderTypeP.textContent = cart.orderType || '';
}

function activateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.classList.add('header__cart-box--active');
  setTimeout(() => {
    cartCount.classList.remove('header__cart-box--active');
  }, 200);
}
