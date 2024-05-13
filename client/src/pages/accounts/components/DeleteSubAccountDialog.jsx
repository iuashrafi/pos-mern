import fetchAPI from "../../../lib/fetchAPI";

const DeleteSubAccountDialog = ({ account }) => {
  const closeDialog = () => {
    document.getElementById(`delSubAc${account._id}`).close();
  };
  const handleDelete = () => {
    fetchAPI("/auth/delete", {
      method: "PUT",
      body: JSON.stringify({ subaccountId: account._id }),
    })
      .then((data) => {
        console.log("Sub Account deleted successfully:", data);
        // setSuccess("Sub Account deleted successfully!");
        closeDialog();
      })
      .catch((error) => {
        console.error("Error during subaccount deletion:", error);
        // setError("Subaccount deletion failed!");
      });
  };
  return (
    <>
      <dialog id={`delSubAc${account?._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Delete {account.name}</h3>
          <p className="text-base mt-2">
            Are you sure you want to delete this{" "}
            <span className="underline text-error">
              <i>{account.name}</i>
            </span>{" "}
            account ?
          </p>
          <div className="space-x-4 mt-4">
            <button className="btn btn-secondary" onClick={handleDelete}>
              Yes
            </button>
            <button className="btn" onClick={closeDialog}>
              No
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteSubAccountDialog;
