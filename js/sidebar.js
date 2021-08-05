const sidebar = document.querySelector('.sidebar');
const sidebarMenuBtn = document.querySelector('.sidebar__hamburger-icon');
const sidebarCartBtn = document.querySelector('.sidebar__cart-icon');
const sidebarMenu = document.querySelector('.sidebar__nav-list');
const sidebarCart = document.querySelector('.sidebar__cart');
const sidebarCartContainer = document.querySelector('.sidebar__cart-list');


sidebarMenuBtn.addEventListener('click', () => {
  if(sidebar.dataset.state === 'closed'){
    sidebar.dataset.state = 'open'; 
    sidebar.classList.add('sidebar--bg-blue');
    openSidebar();
    sidebarMenu.style.display = 'grid';
  }
  else if(sidebar.dataset.state === 'open' && sidebarCart.style.display === 'block'){
    closeSidebar();

    setTimeout(()=> {
      openSidebar();
      sidebar.classList.add('sidebar--bg-blue');
      sidebarMenu.style.display = 'grid';
    },400); 
    
  }
  else if(sidebar.dataset.state === 'open') {
    closeSidebar();
    sidebar.classList.remove('sidebar--bg-blue');
    sidebar.dataset.state = 'closed';
  }

});

sidebarCartBtn.addEventListener('click', () => {
  if(sidebar.dataset.state === 'closed'){
    sidebar.dataset.state = 'open'; 
    openSidebar();
    sidebarCart.style.display = 'block';
  }
  else if(sidebar.dataset.state === 'open' && sidebarMenu.style.display === 'grid'){
    closeSidebar();
    setTimeout(()=> {
      openSidebar();
      sidebarCart.style.display = 'block';
      sidebar.classList.remove('sidebar--bg-blue');
    },400); 
  }
  else if(sidebar.dataset.state === 'open') {
    closeSidebar();
    sidebar.dataset.state = 'closed';
  }
});

sidebarCartContainer.addEventListener('click', deleteCartItem);

function openSidebar() {
  if(sidebar.classList.contains('sidebar--close')) {
    sidebar.classList.remove('sidebar--close');
  }
  sidebar.classList.add('sidebar--open');
  
};
function closeSidebar() {
  if(sidebar.classList.contains('sidebar--open')) {
    sidebar.classList.remove('sidebar--open');
  }
  sidebar.classList.add('sidebar--close');
  sidebarMenu.style.display = 'none';
  sidebarCart.style.display = 'none';
};



function renderSidebarCart() {
  let cart = getObjFromLocalStorage('cart');
  sidebarCartContainer.replaceChildren();
  
  cart.items.forEach((item) => {
    createCartItem(item, sidebarCartContainer);
  })
  determineCartTotals();
  renderSidebarTotal();
};

function renderSidebarTotal() {
  let cart = getObjFromLocalStorage('cart');
  const sidebarSubtotal = document.getElementById('sidebar-subtotal');
  const sidebarTax = document.getElementById('sidebar-tax');
  const sidebarTotal = document.getElementById('sidebar-total');
  sidebarSubtotal.textContent = cart.cartTotals.subtotal.toFixed(2);
  sidebarTax.textContent = cart.cartTotals.calculatedTax.toFixed(2);
  sidebarTotal.textContent = cart.cartTotals.total.toFixed(2);
};


renderSidebarCart();
renderSidebarTotal();
