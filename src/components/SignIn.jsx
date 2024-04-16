import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUsers } from "../api/useSignIn";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const defaultTheme = createTheme();

export default function SignIn({ user, setUser }) {
  const navigate = useNavigate();
  const { isLoading, error, users } = useUsers();

  if (isLoading) return;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target.closest("form");
    if (!form) {
      console.error("Form element not found");
      return;
    }

    const formData = new FormData(form);
    const email = formData.get("email");
    
    const u = users.find((u) => u.email === email);
    if (u) {
      setUser(u);
      navigate("/createOrder", { replace: true });
      return;
    }

    toast.error("Wrong email or password");
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
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
