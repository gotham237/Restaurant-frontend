import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Ingredient from "./pages/Ingredient";
import Dish from "./pages/Dish";
import Order from "./pages/Order";
import SignIn from "./components/SignIn";
import AppLayout from "./components/AppLayout";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout user={user} setUser={setUser} />}>
            <Route index element={<Navigate replace to="signIn" />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/signIn" element={<SignIn setUser={setUser} />} />
            <Route path="/createOrder" element={<Order />} />
            <Route path="/createDish" element={<Dish />} />
            <Route path="/createIngredient" element={<Ingredient />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
