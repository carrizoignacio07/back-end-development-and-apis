import http from "http";
import fs from "fs";
import path from "path";
import { WebSocketServer } from "ws";

const PORT = 3001;

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;

  const filePath =
    pathname === "/"
      ? "./public/index.html"
      : path.join("./public", pathname);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath);

    const contentTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
    };

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
    });

    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
  const username = new URL(
    req.url,
    "http://localhost",
  ).searchParams.get("username");

  const broadcast = (message) => {
    const data = JSON.stringify(message);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(data);
      }
    });
  };

  broadcast({
    type: "system",
    text: `${username} joined`,
  });

  socket.on("message", (data) => {
    const { username, text } = JSON.parse(data.toString());

    broadcast({
      type: "chat",
      username,
      text,
    });
  });

  socket.on("close", () => {
    broadcast({
      type: "system",
      text: `${username} left`,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});