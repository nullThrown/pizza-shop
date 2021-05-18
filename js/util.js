
const itemPriceEls = document.querySelectorAll('.item-price__amount');


function determinePrice(size, count, uuid) {
  let foodItem = foodItems.find(foodItem => foodItem.uuid == uuid); 
   let price = 0;
 
   if(!size) {
     return foodItem.price * parseInt(count);
   }
   switch(size) {
     case 'small':
       price = foodItem.smallPrice;
       break;
     case 'medium':
       price = foodItem.mediumPrice;
       break;
     case 'large':
       price = foodItem.largePrice;
       break;
     case 'x-large':
       price = foodItem.xlargePrice;
       break;
   }
     return (price * parseInt(count)).toFixed(2);
   }; 
   
 function setPrices() { 
   itemPriceEls.forEach(item => {
     let foodItemUuid = item.closest('.food-item-box').dataset.uuid;
     let foodItem = foodItems.find(foodItem => foodItem.uuid == foodItemUuid);
     item.innerHTML = foodItem.smallPrice || foodItem.price;   
   });
 };
 