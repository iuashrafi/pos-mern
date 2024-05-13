import React from "react";
import EditAccountDialogWrapper from "./EditAccountDialogWrapper";
import DeleteSubAccountDialog from "./DeleteSubAccountDialog";

const AccountItem = ({ account, index }) => {
  return (
    <>
      <tr className="hover">
        <th>{index + 1}</th>
        <td>{account.name}</td>
        <td>{account.email}</td>
        <td>{account.user_role}</td>
        <td>
          <div className="dropdown">
            <button tabIndex={0} role="button" className="btn btn-sm m-1">
              ...
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1000] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById(`editSubAc${account._id}`)
                      .showModal()
                  }
                >
                  Edit Account
                </button>
              </li>
              <li>
                <a>Change Password</a>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById(`delSubAc${account._id}`)
                      .showModal()
                  }
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <EditAccountDialogWrapper account={account} />
      <DeleteSubAccountDialog account={account} />
    </>
  );
};

export default AccountItem;
