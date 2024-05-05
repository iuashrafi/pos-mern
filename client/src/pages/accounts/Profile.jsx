import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import EditProfileModal from "./components/EditProfileModal";

const ProfileContent = () => {
  return <div>Profile content here</div>;
};

const PasswordContent = () => {
  return <div>Password content here</div>;
};

const AccountsContent = () => {
  return <div>Accounts content here</div>;
};

const Profile = () => {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState("Profile");

  return (
    <div className="bg-green-00 p-8">
      <h1 className="font-semibold text-4xl">Settings</h1>
      <div className="grid grid-cols-12 text-lg">
        <div className="col-span-3 border-r p-8">
          <ul className="space-y-1">
            <li
              onClick={() => setActive("Profile")}
              className="cursor-pointer hover:bg-gray-300/50 p-3 rounded-lg"
            >
              Profile
            </li>
            <li
              onClick={() => setActive("Password")}
              className="cursor-pointer hover:bg-gray-300/50 p-3 rounded-lg"
            >
              Password
            </li>
            <li
              onClick={() => setActive("Accounts")}
              className="cursor-pointer hover:bg-gray-300/50 p-3 rounded-lg"
            >
              Accounts
            </li>
          </ul>
        </div>
        <div className="col-span-9 p-8">
          {active === "Profile" && <ProfileContent />}
          {active === "Password" && <PasswordContent />}
          {active === "Accounts" && <AccountsContent />}
        </div>
      </div>
    </div>
  );
  /* 
    return (
    <div className="p-8 flex items-center justify-center">
      <div className="max-w-3xl">
        <table className=" table text-lg">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Password</th>
              <td>********</td>
            </tr>
            <tr>
              <th>User role</th>
              <td>{user.user_role}</td>
            </tr>
          </tbody>
        </table>
        <EditProfileModal />
      </div>
    </div>
  );

  */
};

export default Profile;
