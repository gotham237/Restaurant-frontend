import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getOrders = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/orders`
    );
    const orders = await response.data;

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export function useOrders() { 
  const {
    isLoading,
    data: orders,
    error,
    refetch
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(), 
  });

  return { isLoading, error, orders, refetch };
}
