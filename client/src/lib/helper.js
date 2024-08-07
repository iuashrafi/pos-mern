export const calculateTotal = (cartItems) => {
  console.log(cartItems);
  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.qt;
  }
  return total;
};

// user in Invoice Document and OrderViewModal
export const calculateTotalCost = (order) => {
  let totalCost = 0;
  order.cartItems.forEach((item) => {
    totalCost += item.price * item.qt;
  });
  return totalCost;
};
