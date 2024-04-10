import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const createIngredientMutation = async ({
  name,
  quantity,
  price,
}) => {
  try {
    await axios.post("http://localhost:8080/api/v1/ingredients", {
        name,
        quantity,
        price,
      });
  } catch (error) {
    console.log("Error creating ingredient: ", error);
  }
};

export function useCreateIngredient() {
  const queryClient = useQueryClient();

  const { mutate: createIngredient, isLoading: isCreating } = useMutation({
    mutationFn: ({ name, quantity, price }) => {
      createIngredientMutation({ name, quantity, price });
    },
    onSuccess: () => {
      toast.success("New Ingredient successfully created");

      queryClient.invalidateQueries({
        queryKey: ["ingredients"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createIngredient };
}
