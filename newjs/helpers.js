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

// shorten this fn()
export function isStored(key) {
  let storedItem = localStorage.getItem(key);

  return Boolean(storedItem);
}
// refactored version!!
export function isStored(key) {
  return Boolean(localStorage.getItem(key));
}

//   sets prices for all food items
export function setPrices() {
  itemPriceEls.forEach((item) => {
    let foodItemUuid = item.closest('.food-item-box').dataset.uuid;
    let foodItem = foodItems.find((foodItem) => foodItem.uuid === foodItemUuid);
    item.innerHTML = foodItem.smallPrice || foodItem.price;
  });
}
