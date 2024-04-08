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
            Dishes
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <InputLabel sx={{ textAlign: "left" }}>Dish name</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="dish"
              label="Dish"
            />
            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 1</InputLabel>
            <Select required fullWidth sx={{ mt: 1, mb: 1 }}>
              <MenuItem value="option1">1</MenuItem>
              <MenuItem value="option2">2</MenuItem>
              <MenuItem value="option3">3</MenuItem>
            </Select>
            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 2</InputLabel>
            <Select fullWidth sx={{ mt: 1, mb: 1 }}>
              <MenuItem value="option1">1</MenuItem>
              <MenuItem value="option2">2</MenuItem>
              <MenuItem value="option3">3</MenuItem>
            </Select>
            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 3</InputLabel>
            <Select fullWidth sx={{ mt: 1, mb: 1 }}>
              <MenuItem value="option1">1</MenuItem>
              <MenuItem value="option2">2</MenuItem>
              <MenuItem value="option3">3</MenuItem>
            </Select>
            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 4</InputLabel>
            <Select fullWidth sx={{ mt: 1, mb: 1 }}>
              <MenuItem value="option1">1</MenuItem>
              <MenuItem value="option2">2</MenuItem>
              <MenuItem value="option3">3</MenuItem>
            </Select>
            <InputLabel sx={{ textAlign: "left" }}>Ingredient nr 5</InputLabel>
            <Select fullWidth sx={{ mt: 1, mb: 1 }}>
              <MenuItem value="option1">1</MenuItem>
              <MenuItem value="option2">2</MenuItem>
              <MenuItem value="option3">3</MenuItem>
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="price"
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
