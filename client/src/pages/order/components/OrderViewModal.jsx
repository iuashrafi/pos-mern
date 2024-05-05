import OrderStatus from "./OrderStatus";
const OrderViewModal = ({ order, currentStatus, handleStatusChange }) => {
  const calculateTotalCost = () => {
    let totalCost = 0;
    order.cartItems.forEach((item) => {
      totalCost += item.price * item.qt;
    });
    return totalCost;
  };

  const generateBill = () => {};
  return (
    <div>
      <button
        className="btn btn-link btn-sm"
        onClick={() => document.getElementById(order._id).showModal()}
      >
        View
      </button>
      <dialog id={order._id} className="modal">
        <div className="modal-box">
          <div className="space-x-3">
            <span className="text-lg">{order.customer_name}</span>
            <span className="">{order.customer_contact.phone}</span>
            <span>
              <OrderStatus
                order={order}
                currentStatus={order?.status}
                handleStatusChange={handleStatusChange}
              />
            </span>
          </div>
          <div className="py-4 overflow-x-auto">
            <table id={"tableOrder" + order._id} className="table table-xs">
              <thead>
                <tr>
                  <th>Sl no</th>
                  <th>Item</th>
                  <th>rate</th>
                  <th>Qt</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td> {item.id}</td>
                    <td>{item.price}</td>
                    <td>{item.qt}</td>
                    <td>{item.price * item.qt}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>{calculateTotalCost()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex items-center justify-end">
            <button onClick={generateBill} className="btn  btn-xs">
              Generate Bill
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OrderViewModal;
