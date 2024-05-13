import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
const AuthLayout = () => {
  const navigate = useNavigate();

  const { user, ready } = useContext(UserContext);
  useEffect(() => {
    if (!user && ready) {
      navigate("/login");
    }
  }, [user, ready, navigate]);

  return (
    <div className="w-full bg-blue-300 p-8">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
