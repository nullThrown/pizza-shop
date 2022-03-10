export function createEmptyCartNode(container) {
  container.insertAdjacentHTML(
    'beforeend',
    `
  <li class="product__empty">Cart is currently empty...</li>
  `
  );
}
