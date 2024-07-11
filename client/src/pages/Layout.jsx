import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen p-4 sm:p-6 md:p-8 xl:p-16  food-pattern">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
