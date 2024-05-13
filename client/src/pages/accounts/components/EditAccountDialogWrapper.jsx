import EditSubAccountForm from "./EditSubAccountForm";

const EditAccountDialogWrapper = ({ account }) => {
  return (
    <>
      <dialog id={`editSubAc${account?._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Edit Account {account.name}!</h3>
          <EditSubAccountForm account={account} />
        </div>
      </dialog>
    </>
  );
};

export default EditAccountDialogWrapper;
