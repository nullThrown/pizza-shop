// these imports are wrong
import {
  createPizzaItemNode,
  createCustomPizzaItemNode,
  createDrinkItemNode,
  createDessertItemNode,
  createSideItemNode,
} from './components/pizzaItem';

const cartEl = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__ul');

const cartSubtotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById('cart-tax');
const cartTotal = document.getElementById('cart-total');

const orderTypeP = document.querySelector('.cart__order-type');

const cartCount = document.getElementById('cart-count');
const sidebarCartCount = document.querySelector('.sidebar__cart-count');

class CartItem {
  constructor(
    uuid,
    category,
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
    this.category = category;
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
  const cart = getObjFromLocalStorage('cart');
  const listContainer = document.querySelector('.cart__ul');
  listContainer.replaceChildren();

  cart.items.forEach((item) => {
    // creates cart item node and appends it to the listcontainer
    switch (item.category) {
      case 'pizza':
        createPizzaItemNode(item, listContainer);
        break;
      case 'custom':
        createCustomPizzaItemNode(item, listContainer);
        break;
      case 'side':
        createSideItemNode(item, listContainer);
        break;
      case 'dessert':
        createDessertItemNode(item, listContainer);
        break;
      case 'drink':
        createDrinkItemNode(item, listContainer);
        break;

      default:
        break;
    }
  });
  determineCartTotals();
  renderCartMetaData();
}

function toggleCartDisplay() {
  let cartElStyles = window.getComputedStyle(cartEl);
  if (cartElStyles.display === 'none') {
    cartEl.style.display = 'block';
  } else {
    cartEl.style.display = 'none';
  }
}

// set cart totals -- belongs in storage
function determineCartTotals() {
  const cart = getObjFromLocalStorage('cart');
  let subtotal = cart.items.reduce((acc, item) => {
    return acc + parseFloat(item.totalPrice);
  }, 0);

  const calculatedTax = Number(parseFloat(subtotal * 0.085).toFixed(2));
  const total = Number((subtotal + parseFloat(calculatedTax)).toFixed(2));
  subtotal = Number(subtotal.toFixed(2));

  cart.cartTotals.calculatedTax = calculatedTax;
  cart.cartTotals.total = total;
  cart.cartTotals.subtotal = subtotal;
  setObjToLocalStorage('cart', cart);
}

function renderCartMetaData() {
  const cart = getObjFromLocalStorage('cart');
  const { cartTotals, orderType, items } = cart;
  //totals
  cartSubtotal.textContent = cartTotals.subtotal.toFixed(2);
  cartTax.textContent = cartTotals.calculatedTax.toFixed(2);
  cartTotal.textContent = cartTotals.total.toFixed(2);

  orderTypeP.textContent = orderType || '';

  // cart count
  cartCount.textContent = items.length;
  sidebarCartCount.textContent = items.length;
}

function activateCartCount() {
  cartCount.classList.add('header__cart-box--active');
  setTimeout(() => {
    cartCount.classList.remove('header__cart-box--active');
  }, 200);
}
