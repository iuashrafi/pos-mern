import { useEffect, useState } from "react";
import fetchAPI from "../../lib/fetchAPI";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import OrderStatus from "./components/OrderStatus";
import OrderViewModal from "./components/OrderViewModal";

const Order = () => {
  const user = useCurrentUser();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = () => {
    fetchAPI("/orders/" + user._id, { method: "GET" })
      .then((data) => {
        setOrders(data);
        console.log("orders=", data);
      })
      .catch((error) => {
        console.error("error fetching orders ", error);
      });
  };

  const handleStatusChange = (orderId, currentStatus, changeToStatus) => {
    fetchAPI(`/orders/update_status/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ status: changeToStatus }),
    })
      .then((data) => {
        // successfully updated order's status
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: changeToStatus };
          }
          return order;
        });

        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.log("Error updating order status", error);
      });
  };
  return (
    <div className="p-8">
      <h1>Orders</h1>
      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{order.customer_name}</th>
                <th>{order.customer_contact.phone}</th>
                <th>
                  <OrderStatus
                    order={order}
                    currentStatus={order?.status}
                    handleStatusChange={handleStatusChange}
                  />
                </th>
                <th>
                  <OrderViewModal
                    order={order}
                    currentStatus={order?.status}
                    handleStatusChange={handleStatusChange}
                  />
                </th>
                <th>
                  <button className="btn btn-sm">...</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
