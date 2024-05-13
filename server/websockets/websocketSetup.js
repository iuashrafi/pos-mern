const ws = require("ws");

let wss;

const createWebSocketServer = (server) => {
  wss = new ws.WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Websocket client connected");
    ws.on("message", (message) => {
      console.log(`Received message :${message}`);
    });
  });
};

const notifyOrders = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = {
  createWebSocketServer,
  notifyOrders,
};
