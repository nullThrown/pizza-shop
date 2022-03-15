import CartItem from './CartItem.js';

class Pizza extends CartItem {
  size;
  crust;

  constructor(
    uuid,
    category,
    name,
    count,
    originalPrice,
    totalPrice,
    imageLink,
    size,
    crust
  ) {
    super(uuid, category, name, count, originalPrice, totalPrice, imageLink);
    this.size = size;
    this.crust = crust;
  }
}

export default Pizza;
