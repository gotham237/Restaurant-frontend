import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios"; 

const createDishMutation = async ({name, price, ingredientIds}) => {
  try {
    await axios.post("http://localhost:8080/api/v1/dishes");
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
};

export function useCreateDish() {
  const queryClient = useQueryClient();

  const { mutate: createDish, isLoading: isCreating } = useMutation({
    mutationFn: ({name, price, ingredientIds}) => {
      createDishMutation({name, price, ingredientIds})
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
