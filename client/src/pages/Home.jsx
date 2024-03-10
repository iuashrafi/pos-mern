import { useContext } from "react";
import { UserContext } from "../UserContext";

const Home = () => {
  const user = useContext(UserContext)?.user;
  console.log("current user(context)=", user);
  return (
    <div>
      Home page/marketing page <br />
      {JSON.stringify(user)}
      {user ? `User logged in as ${user.email}` : "user not logged in"}
    </div>
  );
};

export default Home;
