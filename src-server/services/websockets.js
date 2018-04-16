import * as WebSocket from 'ws';

let wss;
let apiWaitTime = 0;
let apiQueueLength = 0;
const apiUrls = {};
export function initializeWebsockets(server) {
  wss = new WebSocket.Server({ server });
  console.log('initializing websockets...');
  wss.on('connection', (ws) => {
    console.log('received websocket connection');
    ws.send(
      JSON.stringify({
        apiWaitTime,
        apiQueueLength,
        apiUrls,
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
        apiUrls,
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

export function dequeueApiUrl(url) {
  if (apiUrls[url]) {
    apiUrls[url]--;
    if (!apiUrls[url]) {
      delete apiUrls[url];
    }
  } else {
    console.log('[Websockets] failed to dequeue api url', url);
  }
  broadcastApiStatus();
}

export function enqueueApiUrl(url) {
  if (!apiUrls[url]) {
    apiUrls[url] = 1;
  } else {
    apiUrls[url]++;
  }
  broadcastApiStatus();
}
