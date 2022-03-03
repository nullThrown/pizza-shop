export function createPizzaItemNode(item, container) {
  container.insertAdjacentHTML(
    'beforeend',
    `<li data-uuid=${item.uuid} class="product__item">
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
    <span class="product__item-quantity">${item.count}</span>
    <span class="product__item-price">${item.originalPrice}</span>
    <span class="product__item-total">${item.totalPrice}</span>
    <button class="btn btn--checkout-remove">Remove</button>
  </li>`
  );
}
