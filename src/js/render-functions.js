import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


export function createCardMarkup(image) {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

  return `
    <li class="gallery-item">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p><strong>Likes</strong><br>${likes}</p>
        <p><strong>Views</strong><br>${views}</p>
        <p><strong>Comments</strong><br>${comments}</p>
        <p><strong>Downloads</strong><br>${downloads}</p>
      </div>
    </li>
  `;
}


let lightbox = null;

export function renderGalleryMarkup(images, container) {
  const markup = images.map(createCardMarkup).join('');
  container.innerHTML = markup;


  if (lightbox) {
    lightbox.refresh(); 
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}
