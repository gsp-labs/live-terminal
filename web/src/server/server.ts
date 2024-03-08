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
    "-tt",
    "-o",
    "ProxyCommand=upterm proxy wss://b7fSIqoZHqTkphi5SNbf:MC4wLjAuMDoyMjIy@upterm-f232c0de815c.herokuapp.com",
    "b7fSIqoZHqTkphi5SNbf:MC4wLjAuMDoyMjIy@upterm-f232c0de815c.herokuapp.com:443",
  ]);

  sshProcess.stdout.on("data", (data) => {
    console.log("Sending data", data);
    ws.send(data.toString());
  });

  sshProcess.stderr.on("data", (data) => {
    console.error("Error", data.toString());
  });

  ws.on("message", (data: any) => {
    console.log("On message", data);
    sshProcess.stdin.write(data);
  });

  ws.on("close", () => {
    console.log("Closed");
    sshProcess.kill();
  });

  ws.on("error", (err: any) => {
    console.error("WebSocket error:", err);
  });
});

server.listen(port, () => {
  console.log(`WebSocket server is listening on port ${port}`);
});
