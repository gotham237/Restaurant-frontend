import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AppLayout;
