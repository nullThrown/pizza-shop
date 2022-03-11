import foodItems from './data/foodItemData.js';
const itemPriceEls = document.querySelectorAll('.item-price__amount');

export function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export function isStored(key) {
  return Boolean(localStorage.getItem(key));
}

//   sets prices for all food items on intial page load
export function setPrices() {
  itemPriceEls.forEach((item) => {
    const containerUUID = item.closest('.food-item-box').dataset.uuid;
    const foodItem = foodItems.find(
      (foodItem) => foodItem.id === containerUUID
    );
    item.innerHTML = foodItem.smallPrice || foodItem.price;
  });
}
