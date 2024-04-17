import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getIngredients = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/ingredients");
    const ingredients = await response.data;
  
    return ingredients;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

export function useIngredients() {
  const {
    isLoading,
    data: ingredients,
    error,
    refetch
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
  });

  return { isLoading, error, ingredients, refetch };
}
