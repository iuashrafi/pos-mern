import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    customerName: "",
    contactNumber: "",
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, qt } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // If item already exists in cart, increase the quantity
        existingItem.qt += qt;
      } else {
        // If item does not exist in cart, add it
        state.items.push(action.payload);
      }
    },
    increaseQt: (state, action) => {
      const { id } = action.payload; // product id
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // If item already exists in cart, increase the quantity
        existingItem.qt += 1;
      }
    },
    decreaseQt: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.qt >= 1) {
        if (existingItem.qt == 1) {
          // remove from cart
          state.items = state.items.filter((item) => item.id !== id);
        } else if (existingItem.qt > 1) {
          existingItem.qt -= 1;
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state, action) => {
      state.items = [];
      state.customerName = "";
      state.contactNumber = "";
      state.total = 0;
    },
    updateCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    updateContactNumber: (state, action) => {
      state.contactNumber = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQt,
  decreaseQt,
  updateCustomerName,
  updateContactNumber,
} = cartSlice.actions;
export default cartSlice.reducer;
