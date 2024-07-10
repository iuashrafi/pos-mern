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
import { ShoppingBag, Pencil, Save, IndianRupee } from "lucide-react";

const CartContent = () => {
  const user = useCurrentUser();
  console.log("user=", user);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleCustomerEdit = () => {
    if (isEditingCustomer === false) {
      setIsEditingCustomer(true);
    } else {
      // form submit
      handleCustomerSubmit();
      setIsEditingCustomer(false);
    }
  };

  const handleCustomerSubmit = () => {
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
    <div className="flex flex-col h-full">
      {/* cart header and form */}
      <div className="flex-shrink-0 flex justify-between items-center bg-white px-2 py-4 shadow-lg mb-4">
        <button className="btn rounded-full py-2 px-3">
          <ShoppingBag />
        </button>
        <form className="flex flex-col text-center text-base">
          {!isEditingCustomer ? (
            <div className="font-semibold text-lg">
              {customer.name ? `${customer.name}'s Order` : `Customer's Order`}
            </div>
          ) : (
            <input
              type="text"
              name="customer_name"
              id="customer_name"
              placeholder="Customer name"
              value={customer.name}
              onChange={(e) => {
                setCustomer((prev) => ({ ...prev, name: e.target.value }));
              }}
              className="border-b border-gray-500 outline-0"
            />
          )}

          {!isEditingCustomer ? (
            <div>{customer.phone ? `${customer.phone}` : `Phone Number`}</div>
          ) : (
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone number"
              value={customer.phone}
              onChange={(e) => {
                setCustomer((prev) => ({ ...prev, phone: e.target.value }));
              }}
              className="border-b border-gray-500 outline-0"
            />
          )}
        </form>
        <button
          className="btn rounded-full py-2 px-3"
          onClick={handleCustomerEdit}
        >
          {!isEditingCustomer ? <Pencil /> : <Save />}
        </button>
      </div>

      {/* <div className="p-4">
        <span className="text-base border rounded-full py-2 px-3 bg-gray-50">
          Takeout
        </span>
      </div> */}

      <ul className="flex-grow mt-4 space-y-3 overflow-y-auto">
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

      {/* Bill costs */}
      <div className="bg-white border-t border-dashed">
        <div className="text-xl font-medium font-poppins flex items-baseline justify-between px-2 py-4">
          <span>Total</span>
          <span className="flex items-center">
            <IndianRupee size={20} /> {calculateTotal(cartItems)}
          </span>
        </div>

        <button
          className="btn rounded-none w-full bg-gradient-to-b from-green-500 to-green-600 text-white border-0"
          onClick={handleOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartContent;
