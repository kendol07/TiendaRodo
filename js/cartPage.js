import { getCartItems, getCartTotal, addToCart, removeFromCart, removeItem } from './cart.js';
import { updateCartCount } from './render.js';

export function initCartPage() {
  const listEl = document.querySelector('.cart-items');
  const totalEl = document.querySelector('.cart-total');
  const countEl = document.querySelector('.cart-icon .count');

  const render = () => {
    const items = getCartItems();
    listEl.innerHTML = '';

    if (items.length === 0) {
      listEl.innerHTML = '<p>Tu carrito está vacío.</p>';
      totalEl.textContent = '$0.00';
      return;
    }

    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-price">$${item.price.toFixed(2)}</div>
          <div class="item-qty">
            <button class="qty-btn decrease" data-id="${item.id}">-</button>
            <span class="qty">${item.qty}</span>
            <button class="qty-btn increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="item-total">$${(item.price * item.qty).toFixed(2)}</div>
        <button class="remove-item" data-id="${item.id}">&times;</button>
      `;
      listEl.appendChild(row);
    });

    totalEl.textContent = '$' + getCartTotal().toFixed(2);
  };

  listEl.addEventListener('click', e => {
    const id = parseInt(e.target.dataset.id, 10);
    if (e.target.classList.contains('remove-item')) {
      removeItem(id);
    } else if (e.target.classList.contains('increase')) {
      addToCart(id);
    } else if (e.target.classList.contains('decrease')) {
      removeFromCart(id);
    } else {
      return;
    }
    render();
    updateCartCount(countEl);
  });

  render();
}
