import axios from 'axios';

const getDishes = async () => {
  try {
    const response = await axios.get('api/v1/dishes');
    const dishes = response.data;
    return dishes;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return [];
  }
};

export {getDishes};
