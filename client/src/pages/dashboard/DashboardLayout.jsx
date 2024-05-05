import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
const AuthLayout = () => {
  const user = useCurrentUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="w-full bg-blue-300 p-8">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
