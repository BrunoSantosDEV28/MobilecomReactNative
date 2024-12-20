import axios from 'axios';

const baseURL = 'https://images-api.nasa.gov/search';

export const fetchImages = async (query = 'earth', page = 1) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        q: query,
        page: page,
      },
    });
    return response.data.collection.items;
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
  }
};
