import { mouse, up, down, left, right } from '@nut-tree/nut-js';

const directions = {
  up: (y) => up(y),
  down: (y) => down(y),
  left: (x) => left(x),
  right: (x) => right(x)
}

export async function mouseHandler(params) {
  const command = params.command.split('_')[1].trim();
  await mouse.move(directions[command](params.width));
  const position = await mouse.getPosition();
  return `${params.command} ${position.x},${position.y}`;
}