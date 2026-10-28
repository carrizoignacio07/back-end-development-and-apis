// Helper functions - pre-provided. Do not modify.

function updateMetrics({ loadAvg, freeMemMB, totalMemMB, memUsagePct }) {
  document.getElementById("mem-usage").textContent = memUsagePct;
  document.getElementById("free-mem").textContent = freeMemMB;
  document.getElementById("total-mem").textContent = totalMemMB;
  document.getElementById("load-1").textContent = loadAvg[0].toFixed(2);
  document.getElementById("load-5").textContent = loadAvg[1].toFixed(2);
  document.getElementById("load-15").textContent = loadAvg[2].toFixed(2);
}

function setStatus(text) {
  document.getElementById("status").textContent = text;
}

// Your code below - create a WebSocket connection and handle events.
<<<<<<< HEAD
const socket = new WebSocket("ws://localhost:3000");
=======
const protocol = location.protocol === "https:" ? "wss:" : "ws:";
const socket = new WebSocket(`${protocol}//${location.host}`);
>>>>>>> 21d6507b360010c8ed5c707bd3a80b61a4791a43

socket.onopen = () => {
  setStatus("Connected");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateMetrics(data);
};

socket.onclose = () => {
  setStatus("Disconnected");
};

socket.onerror = (err) => {
  console.error("WebSocket error:", err);
};