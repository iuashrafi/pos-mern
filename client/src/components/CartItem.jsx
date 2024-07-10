import { BACKEND_URL } from "../data";
import { Plus, Minus, IndianRupee, Edit } from "lucide-react";
const CartItem = ({ item, dispatch, increaseQt, decreaseQt }) => {
  console.log("item = ", item);

  return (
    <li className="p-2 bg-white border-b border-dashed grid grid-cols-12">
      <div className="col-span-4">
        <img
          className="object-contain rounded-md bg-gray-50"
          src={BACKEND_URL + "/" + item.image_url}
          alt={item.name}
        />
      </div>
      <div className="col-span-8 px-2">
        <div className="text-lg font-semibold">
          {item.name}
          <br />
          <span className="font-medium text-gray-600 flex items-center">
            <IndianRupee size={18} /> {item.price}
          </span>
        </div>

        <div className="flex justify-between">
          <button className="btn btn-circle btn-sm">
            <Edit size={16} />
          </button>
          <div className="bg-gray-100 rounded-full inline-block float-right space-x-3 py-0.5 px-1">
            <button
              className="btn btn-sm btn-circle rounded-full bg-white hover:bg-gray-200 hover:border-gray-200"
              onClick={() => {
                dispatch(decreaseQt(item));
              }}
            >
              <Minus size={16} />
            </button>
            <span>{item.qt}</span>
            <button
              className="btn btn-sm btn-circle rounded-full bg-white hover:bg-gray-200 hover:border-gray-200"
              onClick={() => {
                dispatch(increaseQt(item));
              }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
