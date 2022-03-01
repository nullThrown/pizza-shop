// create pizza cart item
// requires a topping section as well
function createPizzaItemNode(item, container) {
  container.insertAdjacentHTML(
    'beforeend',
    `<li data-uuid=${item.uuid} class='cart__item'>
    <button class='btn--cancel btn delete-cart-item'>X</button>
    <h4 class='cart__item-title'>${item.name}</h4>
    <p class='cart__item-size'>${item.size}</p>
<p>${item.crust}</p>
<div></div>
<p class='cart__item-amount'>
<span class='u-text-italicize'>${item.count}</span>
<span class='u-text-italicize'> for </span>
<span class='u-text-bold'>$</span>
<span class='cart__item-price'>${item.price}</span>
</p>
</li>;`
  );
}
