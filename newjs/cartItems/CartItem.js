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
    this.uuid = uuid;
    this.category = category;
    this.name = name;
    this.count = count;
    this.originalPrice = originalPrice;
    this.totalPrice = totalPrice;
    this.imageLink = imageLink;
  }
}

export default CartItem;

// means of creating cart items... a method that begins each creation with a base case
// the base case are the properties that all cart items contain

// const cartItemBase = {
//   uuid,
//   category,
//   name,
//   countVal,
//   originalPrice,
//   totalPrice,
//   imageLink,
// };
// let newCartItem;

// switch (clickedItemCat) {
//   case 'pizza':
//     cartItemBase.size = sizeVal;
//     cartItemBase.crust = crustVal;
//     newCartItem = new Pizza(...cartItemBase);
//     break;
//   case 'side':
//     cartItemBase.size = sizeVal;
//     cartItemBase.sauce = sauceVal;
//     newCartItem = new Side(cartItemBase);
//     break;
//   case 'dessert':
//     newCartItem = new Dessert(cartItemBase);
//     break;
//   case 'drink':
//     cartItemBase.size = sizeVal;
//     newCartItem = new Drink(cartItemBase);
//     break;

//   default:
//     break;
// }
