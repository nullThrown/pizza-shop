class CartItem {
  constructor(name, size, crust, sauce, count, cost) {
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.sauce = sauce;
    this.count = count;
    this.cost = cost;
  }
};

let cart = {
  ordertype: '',
  couponCode: '',
  items: []
};


setPrices();

