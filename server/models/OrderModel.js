const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    // the user_id(person/organisation) to whom the order belongs
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer_name: {
      type: String,
      required: [true, "Please provide Customer's name."],
    },
    customer_contact: {
      phone: {
        type: String,
        required: false, // Phone is optional
      },
      email: {
        type: String,
        required: false, // Email is optional
      },
    },
    status: {
      type: String,
      enum: ["WAITING", "PROCESSING", "PROCESSED", "DELIVERED", "CANCELLED"],
      default: "WAITING",
      required: true,
    },
    cartItems: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Please provide a product ID."],
        },
        qt: {
          type: Number,
          default: 1,
          required: [true, "Please provide the quantity of the product."],
        },
        // cost per unit
        price: {
          type: Number,
          required: [true, "Please provide the cost per unit."],
        },
        notes: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
