import React from "react";
import { X } from "lucide-react";

const DialogWrapper = ({ btn, title, obj, children }) => {
  const modalId = `editPdtModal${obj._id}`;
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-link"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        {btn}
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box bg-white p-0">
          {/* header */}
          <div className="bg-white p-4 text-center text-lg font-poppins font-medium border-b shadow-lg shadow-gray-50">
            Edit Product
            <button
              className="btn btn-sm float-right btn-circle text-red-400 bg-red-100 hover:bg-red-200 border-none"
              onClick={() => {
                document.getElementById(modalId).close();
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* main content */}
          <div>{children}</div>
        </div>
      </dialog>
    </>
  );
};

export default DialogWrapper;
