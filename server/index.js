const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3002;

const app = express();
// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "Hello World from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
