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
import CartItem from "./CartItem";
import { calculateTotal } from "../lib/helper";
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
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Cart</h1>
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
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone number"
          value={customer.phone}
          onChange={(e) => {
            setCustomer((prev) => ({ ...prev, phone: e.target.value }));
          }}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          type="submit"
          onClick={handleCustomerSubmit}
          className="btn btn-neutral"
        >
          Set Customer
        </button>
      </form>

      <h1 className="text-xl font-semibold">Cart Items : </h1>
      <ul className="space-y-2">
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            index={index}
            dispatch={dispatch}
            increaseQt={increaseQt}
            decreaseQt={decreaseQt}
          />
        ))}
      </ul>

      <h1 className="text-xl font-semibold">
        Total : $ {calculateTotal(cartItems)}
      </h1>
      <button className="btn btn-primary mt-4" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CartContent;
