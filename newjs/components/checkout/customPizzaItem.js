export function createCustomPizzaItemStr(item) {
  const [fullTopStr, leftTopStr, rightTopStr] = createToppingsStrs(item);

  return `
    <li data-uuid=${item.uuid} class="product__item">
      <p class="miniscule-text product__item-full">Full: ${fullTopStr}</p>
      <p class="miniscule-text product__item-left">Left: ${leftTopStr} </p>
      <p class="miniscule-text product__item-right">Right: ${rightTopStr} </p>
      <img
        src=${item.imageLink}
        alt=${item.name}
        class="img--thumbnail product__item-img"
      />
      <div class="product__item-desc">
        <p>${item.name}</p>
        <p>${item.size}</p>
        <p>${item.crust}</p>
      </div>
      <p class="product__item-quantity">${item.count}</p>
      <p class="product__item-price">${item.sizePrice}</p>
      <p class="product__item-total">${item.totalPrice}</p>
      <button class="btn btn--checkout-remove">Remove</button>
    </li>
`;
}

export function createToppingsStrs(item) {
  let fullTopStr = '';
  let leftTopStr = '';
  let rightTopStr = '';

  item.toppings.forEach((top) => {
    switch (top.side) {
      case 'full':
        fullTopStr += `${top.name},`;
        break;

      case 'left':
        leftTopStr += `${top.name},`;
        break;

      case 'right':
        rightTopStr += `${top.name},`;
        break;
    }
  });

  // removes last comma from strings
  fullTopStr = fullTopStr.slice(0, -1);
  leftTopStr = fullTopStr.slice(0, -1);
  rightTopStr = fullTopStr.slice(0, -1);

  return [fullTopStr, leftTopStr, rightTopStr];
}
