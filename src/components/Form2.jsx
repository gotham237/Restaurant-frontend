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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

//const dishes = [{ name: "pizza" }, { name: "chicken" }, { name: "burrito" }];

export default function Form2() {
  const { isLoading, error, dishes } = useDishes();

  if (isLoading) return "Loading...";
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
            Orders
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputLabel sx={{ textAlign: "left" }}>Name</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
            />
            <InputLabel sx={{ textAlign: "left" }}>Email</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
            />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <InputLabel sx={{ textAlign: "left" }}>
                  Dish nr {index + 1}
                </InputLabel>
                <Select required fullWidth sx={{ mt: 1, mb: 1 }}>
                  {dishes.map((dish) => (
                    <MenuItem value={dish.name} key={dish.name}>
                      {dish.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ))}
            <TextField
              margin="normal"
              required
              fullWidth
              name="some field"
              label="some field"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
