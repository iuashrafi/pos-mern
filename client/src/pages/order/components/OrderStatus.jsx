const OrderStatus = ({ order, currentStatus, handleStatusChange }) => {
  // possible statuses of the order
  const statuses = [
    "WAITING",
    "PROCESSING",
    "PROCESSED",
    "DELIVERED",
    "CANCELLED",
  ];

  const getStatusStyle = (status) => {
    if (status === "WAITING") {
      return " bg-yellow-500 hover:bg-yellow-500/95 ";
    } else if (status === "PROCESSING") {
      return " bg-green-400 hover:bg-green-400/95 ";
    } else if (status === "PROCESSED") {
      return " bg-green-400 hover:bg-green-400/95 ";
    } else if (status === "DELIVERED") {
      return " bg-blue-500 hover:bg-blue-500/95 ";
    } else if (status === "CANCELLED") {
      return " bg-red-500 hover:bg-red-500/95 ";
    }
    return " ";
  };

  return (
    <div className="dropdown">
      <button
        tabIndex={order._id}
        role="button"
        className={
          "btn btn-sm rounded-full m-1 text-xs text-white border-none" +
          getStatusStyle(currentStatus)
        }
      >
        {currentStatus}
      </button>
      <ul
        tabIndex={order._id}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-800"
      >
        {statuses.map((status) => {
          return (
            currentStatus !== status && (
              <li
                key={status}
                onClick={() =>
                  handleStatusChange(order._id, currentStatus, status)
                }
              >
                <a>{status}</a>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default OrderStatus;
