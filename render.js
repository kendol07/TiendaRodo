import { addToCart, getCartCount } from './cart.js';

export function renderProducts(list, container) {
  container.innerHTML = '';
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="nombre">${product.name}</div>
      <div class="precio">$${product.price.toFixed(2)}</div>
      <button class="add-cart" data-id="${product.id}">Añadir</button>
    `;
    container.appendChild(card);
  });
}

export function bindAddToCart(container, countEl) {
  container.addEventListener('click', e => {
    if (e.target.classList.contains('add-cart')) {
      const id = parseInt(e.target.dataset.id, 10);
      addToCart(id);
      updateCartCount(countEl);
    }
  });
}

export function updateCartCount(countEl) {
  countEl.textContent = getCartCount();
}
