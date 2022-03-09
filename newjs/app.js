import {
  initCartToLS,
  initPreviousOrdersToLS,
  setOrderTypeToLS,
} from './storage';
import { setPrices } from './helpers.js';

const pickupBtn = document.querySelector('.pickup-btn');
const deliveryBtn = document.querySelector('.delivery-btn');

if (pickupBtn && deliveryBtn) {
  pickupBtn.onclick = () => setOrderTypeToLS('pickup');
  deliveryBtn.onclick = () => setOrderTypeToLS('delivery');
}

initCartToLS();
initPreviousOrdersToLS();
setPrices();
