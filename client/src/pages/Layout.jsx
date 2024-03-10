import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { BRAND_NAME } from "../data.js";
const Layout = () => {
  const user = null;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
