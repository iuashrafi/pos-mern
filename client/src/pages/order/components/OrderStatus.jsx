const OrderStatus = ({ order, currentStatus, handleStatusChange }) => {
  // possible statuses of the order
  const statuses = [
    "WAITING",
    "PROCESSING",
    "PROCESSED",
    "DELIVERED",
    "CANCELLED",
  ];
  return (
    <div class=" dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm rounded-full m-1 text-xs btn-"
      >
        {currentStatus}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
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
