export function createDrinkItemNode(item, container) {
  container.insertAdjacentHTML(
    'beforeend',
    `
    <li data-uuid=${item.uuid} class="product__item">
      <img
        src=${item.imageLink}
        alt=${item.name}
        class="img--thumbnail product__item-img"
      />
      <div class="product__item-desc">
        <p>${item.name}</p>
        <p>${item.size}</p>
      </div>
      <p class="product__item-quantity">${item.count}</p>
      <p class="product__item-price">${item.originalPrice}</p>
      <p class="product__item-total">${item.totalPrice}</p>
      <button class="btn btn--checkout-remove">Remove</button>
    </li>
  
  `
  );
}
