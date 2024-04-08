import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Form1() {
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
            Ingredients
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <InputLabel sx={{ textAlign: "left" }}>Ingredient name</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="ingredient"
              label="ingredient"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="quantity"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Dish
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
