import Jimp from 'jimp';
import { mouse, Region, screen } from '@nut-tree/nut-js';

export async function screenshotHandler(params) {
  const width = 200;
  const height = 200;
  const x0 = width / 2;
  const y0 = height / 2;
  const position = await mouse.getPosition();
  const image = await screen.grabRegion(new Region(position.x - x0, position.y - y0, width, height));
  const rgbImage = await image.toRGB();
  const bufImage = new Promise((res) => {
    const options = {data: rgbImage.data, width: width, height: height};
    new Jimp(options, (err, img) => img.getBuffer(Jimp.MIME_PNG, (err, buffer) => res(buffer.toString('base64'))));
  });
  return `${params.command} ${await bufImage}`;
}