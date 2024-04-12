import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const updateIngredientMutation = async (id, quantity) => {
  try {
    await axios.put(
      `http://localhost:8080/api/v1/ingredients/${id}`,
      quantity,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Error updating ingredient: ", error);
    throw new Error(
      error.response?.data?.message || "Failed to update ingredient"
    );
  }
};

export function useUpdateIngredient() {
  const queryClient = useQueryClient();

  const { mutate: updateIngredient, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, quantity }) => {
      return updateIngredientMutation(id, quantity);
    },
    onSuccess: () => {
      toast.success("Ingredient successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["ingredients"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateIngredient };
}
