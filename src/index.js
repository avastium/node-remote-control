import { createWebSocketStream, WebSocketServer } from 'ws';
import * as handlers from './handlers/index.js';

function parseArgs(...args) {
  if (!args.length) return;
  const [command, width, height] = args;
  return {
    command: command,
    width: parseInt(width, 10),
    height: parseInt(height, 10)
  };
}

const server = new WebSocketServer({ port: 4000 }, () => console.log('server is running on ws://localhost:4000'));

server.on('connection', (ws) => {
  const stream = createWebSocketStream(ws, {decodeStrings: false, encoding: 'utf-8'});
  stream.on('data', async (data) => {
    console.log(`command: ${data}`);
    const response = await handle(...data.split(' '));
    stream.write(response);
  });
});

const handle = (...args) => {
  const params = parseArgs(...args);
  if (params.command.startsWith('mouse')) return handlers.mouseHandler(params);
  if (params.command.startsWith('draw')) return handlers.drawHandler(params);
  if (params.command.startsWith('prnt')) return handlers.screenshotHandler(params);
};