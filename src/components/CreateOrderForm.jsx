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
import { useDishes } from "../api/useDishes";
import { useForm } from "react-hook-form";
import { useCreateOrder } from "../api/useCreateOrder";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateOrderForm({setWasCreatedOrder}) {
  const { isLoading, error, dishes } = useDishes();
  const { isCreating, createOrder } = useCreateOrder();
  const { register, formState, getValues, handleSubmit, reset } = useForm();

  if (isLoading) return ;
  if (error) {
    console.log(error);
    return;
  }

  const onSubmit = ({
    customerName,
    email,
    dishId1,
    dishId2,
    dishId3,
    dishId4,
    dishId5,
  }) => {
    const dishIds = [dishId1, dishId2, dishId3, dishId4, dishId5];

    let nonEmptyDishIds = [];
    for (const id of dishIds) {
      if (id) {
        nonEmptyDishIds.push(parseInt(id));
      }
    }

    createOrder(
      { customerName, email, dishIds: nonEmptyDishIds },
      {
        onSettled: () => {
          setWasCreatedOrder(true);
          reset();
        },
      }
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          s={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add order
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="customer name"
              label="customer name"
              {...register("customerName", {
                required: true,
              })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              {...register("email", {
                required: true,
              })}
            />
            <InputLabel sx={{ textAlign: "left" }}>Dish nr 1</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("dishId1", {
                required: "At least 1 dish is required.",
              })}
            >
              {dishes &&
                dishes.map((dish) => (
                  <MenuItem value={dish.id} key={dish.id}>
                    {dish.name}
                  </MenuItem>
                ))}
            </Select>

            <InputLabel sx={{ textAlign: "left" }}>Dish nr 2</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("dishId2")}
            >
              {dishes &&
                dishes.map((dish) => (
                  <MenuItem value={dish.id} key={dish.id}>
                    {dish.name}
                  </MenuItem>
                ))}
            </Select>

            <InputLabel sx={{ textAlign: "left" }}>Dish nr 3</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("dishId3", {})}
            >
              {dishes &&
                dishes.map((dish) => (
                  <MenuItem value={dish.id} key={dish.id}>
                    {dish.name}
                  </MenuItem>
                ))}
            </Select>

            <InputLabel sx={{ textAlign: "left" }}>Dish nr 4</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("dishId4", {})}
            >
              {dishes &&
                dishes.map((dish) => (
                  <MenuItem value={dish.id} key={dish.id}>
                    {dish.name}
                  </MenuItem>
                ))}
            </Select>

            <InputLabel sx={{ textAlign: "left" }}>Dish nr 5</InputLabel>
            <Select
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              disabled={isLoading || isCreating}
              {...register("dishId5", {})}
            >
              {dishes &&
                dishes.map((dish) => (
                  <MenuItem value={dish.id} key={dish.id}>
                    {dish.name}
                  </MenuItem>
                ))}
            </Select>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isCreating}
            >
              Create order
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
