import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQt,
  increaseQt,
  updateContactNumber,
  updateCustomerName,
  clearCart,
} from "../slices/cartSlice";
import fetchAPI from "../lib/fetchAPI";
import { useCurrentUser } from "../hooks/useCurrentUser";
const CartContent = () => {
  const user = useCurrentUser();
  console.log("user=", user);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCustomerName(customer.name));
    dispatch(updateContactNumber(customer.phone));
  };

  const handleOrder = () => {
    const orderItems = {
      user_id: user._id,
      customerName: customer.name,
      customerPhone: customer.phone,
      cartItems,
    };

    alert(JSON.stringify(orderItems, null, 2));

    if (cartItems.length > 0) {
      fetchAPI("/orders/", {
        method: "POST",
        body: JSON.stringify(orderItems),
      })
        .then((data) => {
          console.log("Ordered successfully: ", data);
          dispatch(clearCart());
          setCustomer({ name: "", phone: "" });
        })
        .catch((error) => {
          console.error("Error during ordering:", error);
        });
    }
  };
  return (
    <div>
      <h1>Cart</h1>
      <form className="space-y-3 mb-3">
        <input
          type="text"
          name="customer_name"
          id="customer_name"
          placeholder="Customer name"
          value={customer.name}
          onChange={(e) => {
            setCustomer((prev) => ({ ...prev, name: e.target.value }));
          }}
          className="input input-bordered w-full max-w-xs input-sm"
        />
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="phone number"
          value={customer.phone}
          onChange={(e) => {
            setCustomer((prev) => ({ ...prev, phone: e.target.value }));
          }}
          className="input input-bordered w-full max-w-xs input-sm"
        />
        <button
          type="submit"
          onClick={handleCustomerSubmit}
          className="btn btn-sm"
        >
          Save
        </button>
      </form>
      <h1>Items:</h1>
      <ul className="space-y-2">
        {cartItems.map((item, index) => (
          <li key={index} className="bg-gray-50 py-3 px-2 border rounded-md">
            <div>{item.name}</div>

            <div>
              qt:{" "}
              <span
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
          </li>
        ))}
      </ul>

      <div>Total : $$$</div>
      <button className="btn btn-primary btn-sm mt-4" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CartContent;
