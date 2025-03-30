import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('#load-more-btn');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value.trim();

  if (query === '') {
    iziToast.error({ message: 'Please enter a search term!', position: 'topRight' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ message: 'Sorry, there are no images matching your search query.', position: 'topRight' });
      return;
    }

    createGallery(data.hits);
    if (totalHits > 15) showLoadMoreButton();
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Try again later.', position: 'topRight' });
    console.error(error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

  
    const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    const loadedImages = document.querySelectorAll('.gallery-item').length;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Try again later.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});
