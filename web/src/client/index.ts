import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

const term = new Terminal();
const fitAddon = new FitAddon();

term.loadAddon(fitAddon);

const terminalContainer = document.getElementById("terminal-container");

if (terminalContainer) {
  term.open(terminalContainer);
  fitAddon.fit();

  const socket = new WebSocket("ws://localhost:3000"); // Adjust URL if needed

  socket.addEventListener("open", () => {
    term.onData((data: string) => {
      socket.send(data);
    });

    socket.addEventListener("message", (event) => {
      term.write(event.data.toString());
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });
  });
} else {
  console.error("Terminal container not found");
}
