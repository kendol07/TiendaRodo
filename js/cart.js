import { products } from './products.js';

const CART_KEY = 'rodo_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(id) {
  const cart = getCart();
  cart.push(id);
  saveCart(cart);
}

export function getCartCount() {
  return getCart().length;
}

export function getCartItems() {
  const counts = {};
  getCart().forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
  });
  return Object.entries(counts).map(([id, qty]) => {
    const product = products.find(p => p.id === parseInt(id, 10));
    return { ...product, qty };
  }).filter(item => item.id);
}

export function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function removeFromCart(id) {
  const cart = getCart();
  const index = cart.indexOf(id);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}
