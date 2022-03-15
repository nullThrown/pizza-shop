class CartItem {
  uuid;
  category;
  name;
  count;
  originalPrice;
  totalPrice;
  imageLink;

  constructor(
    uuid,
    category,
    name,
    count,
    originalPrice,
    totalPrice,
    imageLink
  ) {
    this.uuid == uuid;
    this.category = category;
    this.name = name;
    this.count = count;
    this.originalPrice = originalPrice;
    this.totalPrice = totalPrice;
    this.imageLink = imageLink;
  }
}

export default CartItem;
