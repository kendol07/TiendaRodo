
document.querySelectorAll('.producto').forEach(el => {
  el.addEventListener('click', () => {
    el.style.boxShadow = '0 0 0 4px rgba(255, 92, 0, 0.3)';
    setTimeout(() => el.style.boxShadow = '', 250);
  });
});

const cart = document.querySelector('.cart-icon');
if (cart) {
  cart.addEventListener('click', () => {
    cart.style.transition = 'transform 0.1s';
    cart.style.transform = 'scale(1.2)';
    setTimeout(() => cart.style.transform = '', 200);
  });
}
