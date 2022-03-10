import {
  initCartToLS,
  initPreviousOrdersToLS,
  setOrderTypeToLS,
} from './storage.js';
import { setPrices } from './helpers.js';
import { addCartListeners, initCart } from './cart.js';
import { addCheckoutListeners, initCheckout } from './checkout.js';
import { addCustomListeners, initCustomPizza } from './customPizza.js';
import { addDealsListeners } from './deals.js';
import { addSidebarListeners, initSidebar } from './sidebar.js';
import { addMenuListeners } from './menu.js';

const pickupBtn = document.querySelector('.pickup-btn');
const deliveryBtn = document.querySelector('.delivery-btn');

const currentPath = window.location.pathname;

if (pickupBtn && deliveryBtn) {
  pickupBtn.onclick = () => setOrderTypeToLS('pickup');
  deliveryBtn.onclick = () => setOrderTypeToLS('delivery');
}

// add event listeners
addCartListeners();
addDealsListeners();
addCheckoutListeners();
addCustomListeners();
addSidebarListeners();
addMenuListeners();

initCartToLS();
initPreviousOrdersToLS();

initCheckout(currentPath);
initCustomPizza(currentPath);
initCart();
initSidebar();

setPrices();
