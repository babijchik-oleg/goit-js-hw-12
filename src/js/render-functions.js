import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Ініціалізуємо SimpleLightbox один раз поза функціями
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Функція для створення та додавання розмітки
export function createGallery(images) {
  const galleryContainer = document.querySelector('.gallery');

  const galleryMarkup = images
    .map(
      image => `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b>${image.likes}</p>
          <p class="info-item"><b>Views</b>${image.views}</p>
          <p class="info-item"><b>Comments</b>${image.comments}</p>
          <p class="info-item"><b>Downloads</b>${image.downloads}</p>
        </div>
      </li>`
    )
    .join('');

  // Додаємо нові елементи до існуючих (важливо для Load More)
  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

  // Оновлюємо SimpleLightbox, щоб він побачив нові картинки
  lightbox.refresh();
}

// Очищення галереї при новому пошуку
export function clearGallery() {
  const galleryContainer = document.querySelector('.gallery');
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
  }
}

// Керування лоадером
export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('is-hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('is-hidden');
}

// Керування кнопкою Load More
export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');
}
