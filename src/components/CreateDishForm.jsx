import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useIngredients } from "../api/useIngredients";
import { useCreateDish } from "../api/useCreateDish";
import { useForm } from "react-hook-form";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateDishForm() {
  const { isLoading, error, ingredients } = useIngredients();
  const { isCreating, createDish } = useCreateDish();
  const { register, formState, getValues, handleSubmit, reset } = useForm();

  if (isLoading) return "Loading...";
  if (error) {
    console.log(error);
    return;
  }

  const onSubmit = ({
    name,
    price,
    ingredientId1,
    ingredientId2,
    ingredientId3,
    ingredientId4,
    ingredientId5,
  }) => {
    const dishIngredientIds = [
      ingredientId1,
      ingredientId2,
      ingredientId3,
      ingredientId4,
      ingredientId5,
    ];

    let nonEmptyDishIngredientIds = [];
    for (const id of dishIngredientIds) {
      if (id) {
        nonEmptyDishIngredientIds.push(parseInt(id));
      }
    }
  
  createDish(
    { dishName: name, price: parseInt(price), ingredientIds: nonEmptyDishIngredientIds },
    {
      onSettled: () => reset(),
    }
  );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create dish
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 1</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("ingredientId1", {
                required: "At least 2 items are required.",
              })}
            >
              {ingredients.map((ingredient) => (
                <MenuItem value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 2</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("ingredientId2", {
                required: "At least 2 items are required.",
              })}
            >
              {ingredients.map((ingredient) => (
                <MenuItem value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 3</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("ingredientId3", {})}
            >
              {ingredients.map((ingredient) => (
                <MenuItem value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 4</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("ingredientId4", {})}
            >
              {ingredients.map((ingredient) => (
                <MenuItem value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 5</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("ingredientId5", {})}
            >
              {ingredients.map((ingredient) => (
                <MenuItem value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              disabled={isCreating}
              {...register("name", { required: "This field is required." })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="price"
              disabled={isCreating}
              {...register("price", { required: "This field is required." })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isCreating}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
