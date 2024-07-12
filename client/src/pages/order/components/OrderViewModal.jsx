import { IndianRupee } from "lucide-react";
import OrderStatus from "./OrderStatus";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Invoice from "./Invoice";
import { calculateTotalCost } from "../../../lib/helper.js";
const OrderViewModal = ({ order, currentStatus, handleStatusChange }) => {
  const generateBill = async () => {
    let fileName = `INVOICE${order._id}.pdf`;
    alert(
      `Generating Bill, Please check folder - Downloads/${fileName} in a few seconds`
    );

    const blob = await pdf(<Invoice order={order} />).toBlob();
    saveAs(blob, fileName);
  };
  return (
    <div>
      <button
        className="btn btn-link btn-sm"
        onClick={() => document.getElementById(order._id).showModal()}
      >
        View
      </button>
      <dialog id={order._id} className="modal">
        <div className="modal-box bg-white p-0 max-w-lg  md:max-w-2xl text-lg">
          {/* header */}
          <div className="bg-theme text-white px-4 py-2 w-full flex space-x-4 items-center ">
            <div className="">{order.customer_name}</div>
            <div className="">{order.customer_contact.phone}</div>
            <div className="">
              <OrderStatus
                order={order}
                currentStatus={order?.status}
                handleStatusChange={handleStatusChange}
              />
            </div>
          </div>

          {/* modal body content */}
          <div className="p-4 overflow-y-auto">
            <table
              id={"tableOrder" + order._id}
              className="table table-sm 2xl:table-lg"
            >
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
                  <tr key={item._id}>
                    {item.id ? (
                      <>
                        <th>{index + 1}</th>
                        <th>{item.id.name}</th>
                        <th className="flex items-center">
                          <IndianRupee size={16} /> {item.price}
                        </th>
                        <th>{item.qt}</th>
                        <th>{item.qt * item.price}</th>
                      </>
                    ) : (
                      <p>Product information not available</p>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-black text-base">
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>{calculateTotalCost(order)}</td>
                </tr>
              </tfoot>
            </table>
            <button
              onClick={generateBill}
              className="btn btn-sm float-end bg-theme hover:bg-theme2 text-white"
            >
              Generate Bill
            </button>
          </div>
          {/* modal footer */}
          <div className="modal-action px-4 py-2">
            <form method="dialog">
              <button className="btn btn-sm ">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OrderViewModal;
