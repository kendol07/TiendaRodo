import { products } from './products.js';
import { renderProducts, bindAddToCart, updateCartCount } from './render.js';

export function initHome() {
  const productContainer = document.querySelector('.productos');
  const countEl = document.querySelector('.cart-icon .count');
  const categories = document.querySelector('.categorias');
  const searchInput = document.querySelector('.search-bar input');

  if (!productContainer || !categories || !searchInput) {
    return;
  }

  let currentCategory = 'Todos';
  let currentSearch = '';

  const applyFilters = () => {
    let filtered = products;
    if (currentCategory !== 'Todos') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (currentSearch) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(currentSearch));
    }
    renderProducts(filtered, productContainer);
  };

  categories.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      currentCategory = e.target.dataset.category;
      categories.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      applyFilters();
    }
  });

  searchInput.addEventListener('input', e => {
    currentSearch = e.target.value.toLowerCase();
    applyFilters();
  });

  bindAddToCart(productContainer, countEl);
  updateCartCount(countEl);
  applyFilters();

  productContainer.addEventListener('click', e => {
    const card = e.target.closest('.producto');
    if (card && !e.target.classList.contains('add-cart')) {
      card.style.boxShadow = '0 0 0 4px rgba(255, 92, 0, 0.3)';
      setTimeout(() => (card.style.boxShadow = ''), 250);
    }
  });

  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.addEventListener('click', () => {
    cartIcon.style.transition = 'transform 0.1s';
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => (cartIcon.style.transform = ''), 200);
  });
}
