import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
const AuthLayout = () => {
  const user = useCurrentUser();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className=" bg-white border p-8 rounded-lg">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
