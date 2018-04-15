import * as WebSocket from 'ws';

let wss;
let apiWaitTime = 0;
let apiQueueLength = 0;
export function initializeWebsockets(server) {
  wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    ws.send(
      JSON.stringify({
        apiWaitTime,
        apiQueueLength,
      }),
    );
    ws.on('message', (message) => {
      console.log(`received: ${message}`);
      ws.send(`Hi, you sent '${message}'`);
    });
  });
}

function broadcastApiStatus() {
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        apiWaitTime,
        apiQueueLength,
      }),
    );
  });
}

export function setCurrentApiWaitTime(time) {
  apiWaitTime = time;
  broadcastApiStatus();
}

export function setCurrentApiQueueLength(length) {
  apiQueueLength = length;
  broadcastApiStatus();
}
