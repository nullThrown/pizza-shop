import CartItem from './CartItem.js';

export class Drink extends CartItem {
  size;

  constructor(
    uuid,
    category,
    name,
    count,
    originalPrice,
    totalPrice,
    imageLink,
    size
  ) {
    super(uuid, category, name, count, originalPrice, totalPrice, imageLink);
    this.size = size;
  }
}
export default Drink;
