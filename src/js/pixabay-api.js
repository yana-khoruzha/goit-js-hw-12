import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42434028-6957339565ff307ea1e8da0af';

export async function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => response.data)
    .catch(error => {
      throw new Error('Error fetching images');
    });
}