import { Button, Point, mouse, up, down, left, right } from '@nut-tree/nut-js';

const figures = {
  circle: async (r) => {
    const position = await mouse.getPosition();
    const x = position.x + r * Math.cos(0);
    const y = position.y + r * Math.sin(0);
    let x_tmp = position.x;
    let y_tmp = position.y;
    const points = [];
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
      x_tmp = position.x + r * Math.cos(i);
      y_tmp = position.y + r * Math.sin(i);
      points.push(new Point(x_tmp, y_tmp));
    }
    await mouse.move([new Point(x, y)]);
    await mouse.drag(points);
  },
  rectangle: async (w, h) => {
    const newHeight = h === undefined ? w : h;
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(w));
    await mouse.move(down(newHeight));
    await mouse.move(left(w));
    await mouse.move(up(newHeight));
    await mouse.releaseButton(Button.LEFT);
  },
  square: async (w) => {
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(w));
    await mouse.move(down(w));
    await mouse.move(left(w));
    await mouse.move(up(w));
    await mouse.releaseButton(Button.LEFT);
  }
}

export async function drawHandler(params) {
  const figure = params.command.split('_')[1].trim();
  await figures[figure](params.width, params.height);
  return params.command;
}