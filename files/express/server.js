const express = require("express");
const app = express();

require("dotenv").config();
require("dotenv-flow").config();

const expressWs = require("express-ws")(app);
const router = express.Router();
const cors = require("cors");
const port = process.env.PORT;

const staticFilesDirectory = "public";
app.use(express.static(staticFilesDirectory));

/* Websockets */
app.get("/ws/connections", (req, res) => res.json(expressWs.getWss()));
app.get("/ws/clients", (req, res) => res.json(expressWs.getWss().clients));
app.get("/ws/close", (req, res) =>
  // eslint-disable-next-line no-magic-numbers
  res.status(444).json(
    expressWs.getWss().close(() => {
      return {
        status: 404,
        message: "connection closed",
      };
    })
  )
);

// eslint-disable-next-line require-await
app.ws("/ws/ping-pong", (ws, req) => {
  let alive = true;

  const interval = setInterval(
    () => {
      ws.ping();

      if (alive) {
        console.log("websocket still alive");
        alive = false;
      } else {
        console.log("websocket connection lost");
        ws.terminate();
      }
    },
    // eslint-disable-next-line no-magic-numbers
    60 * 1000
  );

  ws.on("close", function close() {
    console.log("websocket closed");
    clearInterval(interval);
  });

  ws.on("pong", () => {
    console.log("pong received");
    alive = true;
  });
});

app.use("/", router);

app.listen(port, () => {
  console.log(`service listening at http://localhost:${port}`);
});
