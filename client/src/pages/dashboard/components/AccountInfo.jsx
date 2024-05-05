import { useContext } from "react";
import { UserContext } from "../../../UserContext";

const AccountInfo = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="card">
      <div className="card-body text-xl font-semibold">
        Hey, {user.name} !<br />
        You are logged in as {user.user_role}
      </div>
    </div>
  );
};

export default AccountInfo;
