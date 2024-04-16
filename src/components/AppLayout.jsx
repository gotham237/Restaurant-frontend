import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout({user, setUser}) {
  

  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <Outlet user={user} setUser={setUser}/>
    </>
  );
}

export default AppLayout;
