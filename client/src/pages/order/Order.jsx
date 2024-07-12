import { useContext, useEffect, useState } from "react";
import fetchAPI from "../../lib/fetchAPI";
import OrderStatus from "./components/OrderStatus";
import OrderViewModal from "./components/OrderViewModal";
import { UserContext } from "../../UserContext";
import TypographyH1 from "../../components/typography/TypographyH1";
import { EllipsisVertical } from "lucide-react";

const Order = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  useEffect(() => {
    if (user) {
      const ws = new WebSocket("ws://localhost:3000");

      ws.onopen = () => {
        console.log("Connected to WebSocket server");
      };
      ws.onmessage = (event) => {
        console.log("Received message on ws client : ", event.data);

        const { action, newOrder } = JSON.parse(event.data);
        if (action === "new_order") {
          setOrders([...orders, newOrder]);
        } else if (action === "updated_order") {
          // currently, we are updating the order's status only
          const updatedOrders = orders.map((order) => {
            if (order._id === newOrder._id) {
              order.status = newOrder.status;
            }
            return order;
          });

          setOrders(updatedOrders);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      //  return () => {
      //    ws.close();
      //  };
    }
  }, [orders]);

  const fetchOrders = () => {
    fetchAPI("/orders/" + user.owner_id, { method: "GET" })
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
    <div className="bg-white border rounded-xl p-4">
      <TypographyH1>Orders</TypographyH1>
      <div className="bg-green-400 mt-4">
        <table className=" bg-white w-full table-auto">
          <thead className="border-b">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="font-normal text">
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
                  <button className="btn btn-sm btn-circle">
                    <EllipsisVertical size={16} />
                  </button>
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
