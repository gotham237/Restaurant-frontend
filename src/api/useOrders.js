import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getOrders = async ({ from, to }) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/orders?from=${from}&to=${to}`
    );
    const orders = await response.data;
    console.log(orders, "nowe ordery")
    console.log(from, to, "from , to");
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export function useOrders(from, to) { 
  const {
    isLoading,
    data: orders,
    error,
    refetch
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders({from, to}), 
  });

  return { isLoading, error, orders, refetch };
}
