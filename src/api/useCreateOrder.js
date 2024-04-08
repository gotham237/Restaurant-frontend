import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const createOrderMutation = async ({ customerName, email, dishIds }) => {
  try {
    await axios.post("http://localhost:8080/api/v1/orders", {
      customerName,
      email,
      dishIds,
    });
  } catch (error) {
    console.error("Error creating an order:", error);
  }
};

export function useCreateOrder() {
  const { mutate: createOrder, isLoading: isCreating } = useMutation({
    mutationFn: ({ customerName, email, dishIds }) => {
      createOrderMutation({customerName, email, dishIds});
    },
    onSuccess: () => {
      toast.success("New order successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createOrder };
}
