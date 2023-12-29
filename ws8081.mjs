import WebSocket from "ws";

async function main() {
  const wss = new WebSocket.Server({ port: 8081 });
  console.log("ws server open");
  wss.on("connection", (ws) => {
    console.log("ws 8081 client connected");
    ws.on("message", (message) => {
      const buffer = Buffer.from(message);
      const string = buffer.toString("utf-8");
      console.log(string);
      wss.clients.forEach((client) => {
        client.send(string);
      });
    });
    ws.on("close", () => {
      console.log("ws client disconnected");
    });
  });
}

main();
