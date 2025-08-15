import { getCartItems, getCartTotal, removeFromCart } from './cart.js';
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
          <div class="item-price">$${item.price.toFixed(2)} x ${item.qty}</div>
        </div>
        <div class="item-total">$${(item.price * item.qty).toFixed(2)}</div>
        <button class="remove-item" data-id="${item.id}">&times;</button>
      `;
      listEl.appendChild(row);
    });

    totalEl.textContent = '$' + getCartTotal().toFixed(2);
  };

  listEl.addEventListener('click', e => {
    if (e.target.classList.contains('remove-item')) {
      const id = parseInt(e.target.dataset.id, 10);
      removeFromCart(id);
      render();
      updateCartCount(countEl);
    }
  });

  render();
}
