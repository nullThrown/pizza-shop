import CartItem from './CartItem.js';

export class Side extends CartItem {
  size;
  sauce;

  constructor(
    uuid,
    category,
    name,
    count,
    originalPrice,
    totalPrice,
    imageLink,
    size,
    sauce
  ) {
    super(uuid, category, name, count, originalPrice, totalPrice, imageLink);
    this.size = size;
    this.sauce = sauce;
  }
}
export default Side;
