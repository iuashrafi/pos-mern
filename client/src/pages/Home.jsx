import { useContext } from "react";
import { UserContext } from "../UserContext";

const Home = () => {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <p className="p-8 text-lg">Loading...</p>;
  }

  return (
    <div>
      Home page/marketing page <br />
      {JSON.stringify(user)}
      {user ? `User logged in as ${user.email}` : "user not logged in"}
    </div>
  );
};

export default Home;
