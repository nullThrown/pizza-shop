export function createToppingStr(topping, toppingPrice) {
  return `
    <div class="custom__topping" data-uuid=${topping.uuid}>
    <p>${topping.name}</p>
    <p>(+$${toppingPrice})</p>
    <button class="btn btn--cancel">X</button>
    </div>
    `;
}
