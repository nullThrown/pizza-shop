export function createCustomPizzaItemNode(item, container) {
  const [fullTopStr, leftTopStr, rightTopStr] = createToppingsStrs(item);
  container.insertAdjacentHTML(
    'beforeend',
    `
    <li data-uuid=${item.uuid} class="cart__item">
      <button class="btn--cancel btn delete-cart-item">X</button>
      <h4 class="cart__item-title">Custom Pizza</h4>
      <p class="cart__item-size">${item.size}</p>
      <p>${item.crust}</p>
      <div class="cart__item-toppings">
        <ul>
          full
          ${fullTopStr}
        </ul>
        <ul>
          left
          ${leftTopStr}

        </ul>
        <ul>
          right
          ${rightTopStr}

        </ul>
      </div>
      <p class="cart__item-amount">
        <span class="u-text-italicize">${item.count}</span
        ><span class="u-text-italicize"> for </span
        ><span class="u-text-bold">$</span
        ><span class="cart__item-price">${item.totalPrice}</span>
      </p>
    </li>`
  );
}

export function createToppingsStrs(item) {
  const fullTopStr = '';
  const leftTopStr = '';
  const rightTopStr = '';
  item.toppings.forEach((top) => {
    switch (top.side) {
      case 'full':
        fullTopStr += `<li>${top.name}</li>`;
        break;

      case 'left':
        leftTopStr += `<li>${top.name}</li>`;
        break;

      case 'right':
        rightTopStr += `<li>${top.name}</li>`;
        break;
    }
  });
  return [fullTopStr, leftTopStr, rightTopStr];
}
