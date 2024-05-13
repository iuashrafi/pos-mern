import { BACKEND_URL } from "../data";

const CartItem = ({ item, dispatch, increaseQt, decreaseQt }) => {
  console.log("item = ", item);

  return (
    <li className="bg-gray-50 p-1 border rounded-md grid grid-cols-12">
      <div className="col-span-4">
        <img
          className="object-contain rounded-md"
          src={BACKEND_URL + "/" + item.image_url}
          alt={item.name}
        />
      </div>
      <div className="col-span-8 px-2">
        <div className="text-lg font-semibold">{item.name}</div>

        <div>
          Qt:{" "}
          <span
            className=""
            onClick={() => {
              dispatch(decreaseQt(item));
            }}
          >
            -
          </span>{" "}
          {item.qt}{" "}
          <span
            onClick={() => {
              dispatch(increaseQt(item));
            }}
          >
            +
          </span>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
