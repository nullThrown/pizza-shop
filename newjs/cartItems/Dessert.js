import CartItem from './CartItem.js';

export class Dessert extends CartItem {
  constructor(
    uuid,
    category,
    name,
    count,
    originalPrice,
    totalPrice,
    imageLink
  ) {
    super(uuid, category, name, count, originalPrice, totalPrice, imageLink);
  }
}
export default Dessert;
