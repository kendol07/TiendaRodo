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
