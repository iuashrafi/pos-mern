import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // if user exists/logged in then navigate to dashboard page
  if (user) {
    return navigate("/dashboard");
  }

  return (
    <div className="flex flex-col p-16 items-center justify-center space-y-16">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="font-semibold text-6xl">Powering your Bussiness</h1>
        <h2 className="font-semibold text-3xl">with our POS</h2>
      </div>

      <div className="space-x-4 mt-8">
        <Link to="/register" className="btn btn-primary">
          Get Started
        </Link>
        <Link to="/" className="btn ">
          Contact Sales
        </Link>
      </div>
    </div>
  );
};

export default Home;
