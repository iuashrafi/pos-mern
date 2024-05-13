const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// environment variables
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

// import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const accountRoutes = require("./routes/accountRoutes");

// import middlewares
const verifyToken = require("./middlewares/verifyToken");

// websockets
const { createWebSocketServer } = require("./websockets/websocketSetup");

const app = express();

// middlewares
app.use(
  cors({
    /**
     * means that requests originating from http://localhost:5173 are allowed to
     * access the resources of the server
     */
    origin: "http://localhost:5173",
    /**
     * credentials: This option specifies whether to include credentials
     * (such as cookies, authorization headers, or TLS client certificates) in CORS requests.
     *  By setting credentials to true, the server indicates that it is willing to accept
     *  credentials in CORS requests. This allows the client to include cookies in requests made
     *  to the server, which is essential for maintaining session state and authentication across
     *  multiple requests.
     */
    credentials: true,
  })
);
// app.use(cors()); // to allow request from any origin
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser()); // Use cookie-parser middleware
app.use("/uploads", express.static("uploads"));

// this will apply verifyToken globally
// app.use(verifyToken);

// Connect to mongoodb database
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("[MONGO_DB] Connected successfully!"))
  .catch((error) =>
    console.error(`[MONGO_DB] Connecting failed! ERROR:`, error)
  );

// routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/accounts", accountRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Hello World from server!" });
});

const server = app.listen(PORT, () => {
  console.log(`[Server] Running on PORT ${process.env.PORT}`);
});

const wss = createWebSocketServer(server);
