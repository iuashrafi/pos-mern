import { useEffect, useState, useContext } from "react";
import CreateSubAccount from "./components/CreateSubAccount";
import fetchAPI from "../../lib/fetchAPI";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { isAccessible } from "../../data";
import Loading from "../../components/Loading";
import EditAccount from "./components/EditAccountDialogWrapper";
import AccountItem from "./components/AccountItem";
const Accounts = () => {
  const { user, ready } = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && ready) {
      navigate("/login");
    }

    // check for user's permission to access the current page/Component
    if (user && isAccessible["/accounts"].includes(user.user_role) === false) {
      navigate("/dashboard");
    }
  }, [user, ready, navigate]);

  useEffect(() => {
    if (user) {
      fetchAPI(`/accounts/${user._id}`)
        .then((data) => {
          setAccounts(data);
        })
        .catch((error) => {
          console.error("Error during fetching accounts:", error);
        });
    }
  }, [user]);

  // Display loading indicator while the application is loading
  if (!ready) {
    return <Loading />;
  }
  return (
    <div className="p-8 space-y-3">
      <h1 className="font-semibold text-4xl">Accounts</h1>

      <div className="  ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((ac, index) => (
              <AccountItem key={index} account={ac} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      <CreateSubAccount />
    </div>
  );
};

export default Accounts;
