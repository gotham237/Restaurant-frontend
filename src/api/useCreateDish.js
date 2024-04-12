import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const createDishMutation = async ({ dishName, price, ingredientIds, quantities }) => {
  try {
    await axios.post("http://localhost:8080/api/v1/dishes", {
      dishName,
      price,
      ingredientIds,
      quantities
    });
  } catch (error) {
    console.error("Error creating a dish:", error);
  }
};

export function useCreateDish() {
  const queryClient = useQueryClient();

  const { mutate: createDish, isLoading: isCreating } = useMutation({
    mutationFn: ({ dishName, price, ingredientIds, quantities }) => {
      createDishMutation({dishName, price, ingredientIds, quantities});
    },
    onSuccess: () => {
      toast.success("New dish successfully created");

      queryClient.invalidateQueries({
        queryKey: ["dishes"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createDish };
}
