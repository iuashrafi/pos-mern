export const calculateTotal = (cartItems) => {
  console.log(cartItems);
  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.qt;
  }
  return total;
};
