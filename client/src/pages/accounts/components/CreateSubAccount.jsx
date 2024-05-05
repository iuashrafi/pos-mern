import RegisterSubAccount from "./RegisterSubAccount";

const CreateSubAccount = () => {
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          document.getElementById("create_sub_account").showModal()
        }
      >
        Create Sub Accounts
      </button>
      <dialog id="create_sub_account" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Register a new account</h3>
          <RegisterSubAccount />
        </div>
      </dialog>
    </>
  );
};

export default CreateSubAccount;
