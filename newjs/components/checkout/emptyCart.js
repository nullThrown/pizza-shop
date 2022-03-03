export function createEmptyCartNode(container) {
  container.insertAdjacentHTML(
    'beforeend',
    `
  <li class="product__empty">Cart is currently empty...</li>
  `
  );
}

const li = document.createElement('li');
li.textContent = 'Cart is currently empty';
li.classList.add('product__empty');
productList.appendChild(li);
