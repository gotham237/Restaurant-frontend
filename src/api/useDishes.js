import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

const getDishes = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/dishes');
    const dishes = await response.data;
    return dishes;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return [];
  }
};

export function useDishes() {
  const {
    isLoading,
    data: dishes,
    error,
  } = useQuery({
    queryKey: ["dishes"],
    queryFn: getDishes,
  });

  return {isLoading, error, dishes};
}
