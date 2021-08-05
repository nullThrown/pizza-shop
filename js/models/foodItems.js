let foodItems = [
  {
    category: 'pizza',
    name: 'Cheese Pizza',
    smallPrice: 9.99,
    mediumPrice: 11.99,
    largePrice: 13.99,
    xlargePrice: 16.99,
    uuid: 'piz100',
    imageLink: '../img/pizza/cheese.jpg'    
  },
  {
    category: 'pizza',
    name: 'Pepperoni Pizza',
    smallPrice: 9.99,
    mediumPrice: 11.99,
    largePrice: 13.99,
    xlargePrice: 16.99,
    uuid: 'piz200',
    imageLink: '../img/pizza/pepperoni.jpg' 
  },
  {
    category: 'pizza',
    name: 'Works Pizza',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz300',
    imageLink: '../img/pizza/works.jpg' 
  },
  {
    category: 'pizza',
    name: 'Sausage Pizza',
    smallPrice: 9.99,
    mediumPrice: 11.99,
    largePrice: 13.99,
    xlargePrice: 16.99,
    uuid: 'piz400',
    imageLink: '../img/pizza/sausage.jpg' 
  }, 
  {
    category: 'pizza',
    name: 'Meats Pizza',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz500',
    imageLink: '../img/pizza/meats.jpg' 
  },
  {
    category: 'pizza',
    name: 'Vegetarian Pizza',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz600',
    imageLink: '../img/pizza/vegetarian.webp' 
  },
  {
    category: 'pizza',
    name: 'Hawaiian Pizza',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz700',
    imageLink: '../img/pizza/hawaiian.jpg' 
  },
  {
    category: 'pizza',
    name: 'BBQ Chicken Pizza',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz800',
    imageLink: '../img/pizza/bbq-chicken.webp' 
  },
  {
    category: 'pizza',
    name: 'Six Cheese Pizza',
    smallPrice: 10.99,
    mediumPrice: 13.99,
    largePrice: 16.99,
    xlargePrice: 19.99,
    uuid: 'piz900',
    imageLink: '../img/pizza/six-cheese.webp' 
  },
  {
    category: 'side',
    name: 'Jalepeno Poppers',
    smallPrice: 3.99,
    largePrice: 5.99,
    uuid: 'sde100',
    imageLink: '../img/sides/jalapeno-poppers.jpg' 
  }, 
  {
    category: 'side',
    name: 'Garlic Bread',
    price: 3.99,
    uuid: 'sde200',
    imageLink: '../img/sides/garlic-bread.jpg'
  },
  {
    category: 'side',
    name: 'Parmesan Breadsticks',
    smallPrice: 2.99,
    largePrice: 4.99,
    uuid: 'sde300',
    imageLink: '../img/sides/parmesan-breadsticks.jpg'
  }, 
  {
    category: 'side',
    name: 'Chicken Wings',
    smallPrice: 3.99,
    largePrice: 5.99,
    uuid: 'sde400',
    imageLink: '../img/sides/chicken-wings.jpg'
  }, 
  {
    category: 'side',
    name: 'Fries',
    smallPrice: 1.39,
    mediumPrice: 1.79,
    largePrice: 1.99,
    uuid: 'sde500',
    imageLink: '../img/sides/french-fries.jpg'
  }, 
  {
    category: 'side',
    name: 'Garlic Fries',
    smallPrice: 1.75,
    mediumPrice: 2.39,
    largePrice: 2.99,
    uuid: 'sde600',
    imageLink: '../img/sides/garlic-fries.jpg'
  }, 
  {
    category: 'side',
    name: 'Chicken Nuggets',
    smallPrice: 1.99,
    mediumPrice: 2.75,
    largePrice: 3.99,
    uuid: 'sde700',
    imageLink: '../img/sides/chicken-nuggets.jpg'
  }, 
  {
    category: 'side',
    name: 'Caesar Salad',
    smallPrice: 2.99,
    largePrice: 4.99,
    uuid: 'sde800',
    imageLink: '../img/sides/caesar-salad.jpg'
  }, 
  {
    category: 'side',
    name: 'Garden Salad',
    smallPrice: 2.99,
    largePrice: 4.99,
    uuid: 'sde900',
    imageLink: '../img/sides/garden-salad.jpg'
  }, 
  {
    category: 'dessert',
    name: 'Cinnamon Sticks',
    price: 5.99,
    uuid: 'des100',
    imageLink: '../img/sides/cinnamon-sticks.jpg'
  },
  {
    category: 'dessert',
    name: 'Chocolate Chip Cookie',
    price: 1.99,
    uuid: 'des200',
    imageLink: '../img/sides/chocalate-chip-cookie.jpg'
  },
  {
    category: 'dessert',
    name: 'Chocolate Brownie',
    price: 4.99,
    uuid: 'des300',
    imageLink: '../img/sides/brownie.jpg'
  },
  {
    category: 'drink',
    name: 'Coke',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk100',
    imageLink: '../img/drinks/coke.jpg'
  },
  {
    category: 'drink',
    name: 'Diet Coke',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk200',
    imageLink: '../img/drinks/diet-coke.jpg'
  },
  {
    category: 'drink',
    name: 'Root Beer',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk300',
    imageLink: '../img/drinks/root-beer.jpg'
  },
  {
    category: 'drink',
    name: 'Sprite',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk400',
    imageLink: '../img/drinks/sprite.jpg'
  },
  {
    category: 'drink',
    name: 'Dr Pepper',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk500',
    imageLink: '../img/drinks/dr-pepper.jpg'
  },
  {
    category: 'drink',
    name: 'Grape Crush',
    smallPrice: 1.75,
    largePrice: 2.99,
    uuid: 'drnk600',
    imageLink: '../img/drinks/crush-grape.jpg'
  }
];