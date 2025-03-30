import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more-btn');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});



export function createGallery(images) {
  const markup = images.map(image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="info">
        <p><strong>Likes</strong><br>${image.likes}</p>
        <p><strong>Views</strong><br>${image.views}</p>
        <p><strong>Comments</strong><br>${image.comments}</p>
        <p><strong>Downloads</strong><br>${image.downloads}</p>
      </div>
    </li>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}