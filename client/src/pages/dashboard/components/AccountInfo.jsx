import { useContext } from "react";
import { UserContext } from "../../../UserContext";

const AccountInfo = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="py-6">
      <div className="text-xl font-semibold">
        Hey, {user?.name} !<br />
        <span className="font-medium text-lg">
          You are logged in as {user?.user_role}
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
