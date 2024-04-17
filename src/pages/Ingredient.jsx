import { useState } from "react";
import CreateIngredientForm from "../components/CreateIngredientForm";
import IngredientsTable from "../components/IngredientsTable";

export default function Ingredient() {
  const [wasCreatedIngredient, setWasCreatedIngredient] = useState(false);

  return (
    <>
      <CreateIngredientForm setWasCreatedIngredient={setWasCreatedIngredient}/>
      <IngredientsTable wasCreatedIngredient={wasCreatedIngredient} setWasCreatedIngredient={setWasCreatedIngredient}/>
    </>
  );
}
