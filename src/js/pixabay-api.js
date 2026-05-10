import axios from 'axios';

const API_KEY = '55667978-30b86439af915a57195a8c60a';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 15,
    },
  });
  return response.data;
}
