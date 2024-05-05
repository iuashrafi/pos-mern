import { useEffect, useState, useContext } from "react";
import CreateSubAccount from "./components/CreateSubAccount";
import fetchAPI from "../../lib/fetchAPI";
import { UserContext } from "../../UserContext";

const Accounts = () => {
  const user = useContext(UserContext)?.user;

  const [accounts, setAccounts] = useState([]);
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
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>{ac.name}</td>
                <td>{ac.email}</td>
                <td>{ac.user_role}</td>
                <td>
                  <div className="dropdown">
                    <button
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm m-1"
                    >
                      ...
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1000] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a>Edit</a>
                      </li>
                      <li>
                        <a>Change Password</a>
                      </li>
                      <li>
                        <a>Delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateSubAccount />
    </div>
  );
};

export default Accounts;
