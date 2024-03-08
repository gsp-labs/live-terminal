import express from "express";
import dotenv from "dotenv";
import http from "http";
import WebSocket from "ws";
import { spawn } from "child_process";
import path from "path";

dotenv.config();

const app = express();
console.log(path.join(__dirname, "../public").toString());
app.use(express.static(path.join(__dirname, "../public")));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = process.env.PORT || 3000;

wss.on("connection", (ws: WebSocket) => {
  const sshProcess = spawn("ssh", [
    "-o",
    "ProxyCommand=upterm proxy wss://PS9ZOH7a1BFfvDoBGhdO:MC4wLjAuMDoyMjIy@upterm-f232c0de815c.herokuapp.com",
    "PS9ZOH7a1BFfvDoBGhdO:MC4wLjAuMDoyMjIy@upterm-f232c0de815c.herokuapp.com:443",
  ]);

  sshProcess.stdout.on("data", (data) => {
    ws.send(data.toString());
  });

  sshProcess.stderr.on("data", (data) => {
    console.error("Error", data.toString());
  });

  ws.on("message", (data: any) => {
    sshProcess.stdin.write(data);
  });

  ws.on("close", () => {
    sshProcess.kill();
  });

  ws.on("error", (err: any) => {
    console.error("WebSocket error:", err);
  });
});

server.listen(port, () => {
  console.log(`WebSocket server is listening on port ${port}`);
});
