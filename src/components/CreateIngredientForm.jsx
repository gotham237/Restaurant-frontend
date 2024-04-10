import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import { useCreateIngredient } from "../api/useCreateIngredient";
import { useIngredients } from "../api/useIngredients";
import { useForm } from "react-hook-form";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateIngredientForm() {
  const { isLoading, error } = useIngredients();
  const { isCreating, createIngredient } = useCreateIngredient();
  const { register, handleSubmit, reset } = useForm();

  if (isLoading) return "Loading...";
  if (error) {
    console.log(error);
    return;
  }

  const onSubmit = ({ name, quantity, price }) => {
    createIngredient(
      {
        name,
        quantity,
        price: parseInt(price),
      },
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
            Ingredients
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputLabel sx={{ textAlign: "left" }}>Ingredient name</InputLabel>
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
              name="quantity"
              label="quantity"
              disabled={isCreating}
              {...register("quantity", { required: "This field is required." })}
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
            >
              Create/Update Ingredient
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
