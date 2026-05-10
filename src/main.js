import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const input = document.querySelector('.search-text');

let searchQuery = '';
let page = 1;
const perPage = 15;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  searchQuery = input.value.trim();
  if (searchQuery === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a search query!',
    });
    return;
  }

  // Скидаємо стан перед новим пошуком
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please, try again.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    checkPagination(data.totalHits);
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong!' });
  } finally {
    hideLoader();
    searchForm.reset();
  }
}

async function onLoadMore() {
  page += 1;
  hideLoadMoreButton(); // Ховаємо кнопку на час завантаження
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    createGallery(data.hits);

    // Плавний скрол сторінки
    smoothScroll();

    checkPagination(data.totalHits);
  } catch (error) {
    iziToast.error({ message: 'Error loading more images!' });
  } finally {
    hideLoader();
  }
}

function checkPagination(totalHits) {
  const totalPages = Math.ceil(totalHits / perPage);

  if (page >= totalPages) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreButton();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const { height: cardHeight } = card.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
