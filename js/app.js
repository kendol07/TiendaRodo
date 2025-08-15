import { initHome } from './main.js';
import { initCartPage } from './cartPage.js';
import { updateCartCount } from './render.js';

$(function() {
  function loadSection(section) {
    $('#content').load(`areas/${section}.html`, function(response, status) {
      if (status !== 'error') {
        const countEl = document.querySelector('.cart-icon .count');
        updateCartCount(countEl);
        if (section === 'home') {
          initHome();
        } else if (section === 'cart') {
          initCartPage();
        }
      } else {
        $('#content').html('<p>Error al cargar la sección.</p>');
      }
    });
  }

  $('a[data-section]').on('click', function(e) {
    e.preventDefault();
    const section = $(this).data('section');
    loadSection(section);
  });

  // cargar la sección inicial
  loadSection('home');
});
