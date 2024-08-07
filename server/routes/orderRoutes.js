const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");
const { notifyOrders } = require("../websockets/websocketSetup");

/**
 * @desc Placing an order
 */
router.post("/", async (req, res) => {
  try {
    const { customerName, customerPhone, cartItems, user_id } = req.body;
    const orderData = {
      user_id,
      customer_name: customerName,
      customer_contact: {
        phone: customerPhone,
      },
      cartItems,
    };

    console.log("orderData=", orderData);

    // Create
    const newOrder = new Order(orderData);
    await newOrder.save();

    // broadcast the new order to all the connected Websockets clients
    notifyOrders({ action: "new_order", newOrder });

    res
      .status(201)
      .json({ message: "Order created successfully!", order: newOrder });
  } catch (error) {
    console.log("Error while placing an order, ERROR:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

/**
 * @desc Fetch Orders generated by user_id
 */
router.get("/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      return res
        .status(500)
        .json({ error: "user_id is required to fetch orders" });
    }
    // const status = req.params.status || "WAITING";
    const orders = await Order.find({
      user_id,
    })
      .populate({
        path: "cartItems.id",
        model: "Product",
      })
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders :", error);
    res.status(500).json({ error: "Error while fetching orders" });
  }
});

/**
 * @desc - change the status of order
 */
router.put("/update_status/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // TODO
    // rememeber to add verifyToken middleware
    // if (order && order.user_id !== req.decodedToken) {
    //   // should be same
    //   return res(400).json({ error: "Order does not belongs to the user" });
    // }

    // Check if the provided status is valid
    if (!Order.schema.path("status").enumValues.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Update the status of the order
    order.status = status;
    await order.save();

    // broadcast the updated order to all the connected Websockets clients
    // currently we are updating only the order's status
    notifyOrders({ action: "updated_order", newOrder: order }); // here, newOrder is a misnomer

    return res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});
module.exports = router;
