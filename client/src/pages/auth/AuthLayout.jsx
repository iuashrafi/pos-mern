import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="w-full bg-blue-300 p-8">
      AuthLayout
      <Outlet />
    </div>
  );
};

export default AuthLayout;
