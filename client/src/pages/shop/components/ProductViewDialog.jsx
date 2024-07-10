import { X, Minus, IndianRupee, Plus } from "lucide-react";
const ProductViewDialog = ({ product: p, handleAddToCart }) => {
  return (
    <dialog id={`pdt-modal-${p._id}`} className="modal">
      <div className="modal-box bg-green-30 p-0">
        <div className="bg-white p-4 text-center text-lg font-poppins font-medium border-b shadow-lg shadow-gray-50">
          Detail Menu
          <button
            className="btn btn-sm float-right btn-circle text-red-400 bg-red-100 hover:bg-red-200 border-none"
            onClick={() => {
              document.getElementById(`pdt-modal-${p._id}`).close();
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* main content */}
        <div className="p-4">
          <figure>{/* <img src="" alt="" /> */}</figure>

          <h1 className="font-semibold font-poppins text-xl">{p.name}</h1>

          <p className="text-lg py-1">{p.description}</p>

          <div className="text-xl font-semibold text-blue-500 flex items-center ">
            <IndianRupee size={20} />
            <span>{p.price}</span>
          </div>

          <div className="mt-4">
            <textarea
              rows={8}
              name="notes"
              placeholder="Add preparation notes to your order...."
              className="w-full rounded-lg p-3 text-base outline-none bg-gray-50"
            ></textarea>
          </div>

          <div className="w-full px-0 py-2 bg-red-20">
            <div className="bg-gray-100 rounded-full p-1 flex justify-between items-center">
              <button className="btn btn-circle bg-white">
                <Minus />
              </button>
              <span>23</span>
              <button className="btn btn-circle bg-white">
                <Plus />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-action bg-gray-200">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            <button className="font-poppins text-base rounded-t-none btn w-full bg-theme text-white hover:bg-theme2 border-none">
              Add to Cart
              <span className="flex items-center">
                {"("}
                <IndianRupee size={20} />
                <span>{p.price}</span>
                {")"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ProductViewDialog;
