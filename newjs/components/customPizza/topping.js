export function createToppingNode(topping, toppingPrice, container) {
  container.insertAdjacentHTML(
    'beforeend',
    `
    <div class="custom__topping" data-uuid=${topping.uuid}>
    <p>${topping.name}</p>
    <p>(+$${toppingPrice})</p>
    <button class="btn btn--cancel">X</button>
    </div>
    `
  );
}
