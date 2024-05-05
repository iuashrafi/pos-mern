import React from "react";

const DialogWrapper = ({ btn, title, obj, children }) => {
  const modalId = `editPdtModal${obj._id}`;
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-link"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        {btn}
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title} {obj.name}
          </h3>
          <p className="py-4">{children}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DialogWrapper;
