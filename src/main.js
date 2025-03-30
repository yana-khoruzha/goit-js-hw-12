import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderGalleryMarkup } from './js/render-functions.js';



const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', e => {
  e.preventDefault();

  const query = input.value.trim();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';
  loader.classList.remove('hidden');

  fetchImages(query)
    .then(data => {
      loader.classList.add('hidden');

      if (data.hits.length === 0) {
        iziToast.info({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      renderGalleryMarkup(data.hits, gallery);
    })
    .catch(error => {
      loader.classList.add('hidden');
      iziToast.error({
        message: 'Something went wrong. Try again later.',
        position: 'topRight',
      });
      console.error(error);
    });
});