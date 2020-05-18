import React from 'react';

import Canvas from './Canvas';

import './style.css';
import fantasyTiles from './assets/borderless.png';

// https://oco.itch.io/medieval-fantasy-character-pack-4
import rangerIdle from './assets/ranger/idle.png';
import rangerAttack from './assets/ranger/attack.png'; //14 frames at 180 x 128
import rangerDash from './assets/ranger/dash.png';
import rangerDeath from './assets/ranger/death.png';

// let rangerFrame = 0;
let rangerFrames = [0, 0, 0, 0];

const sizeOfTiles = 16;
const sizeBetweenTiles = sizeOfTiles * 2;

class App extends React.Component {
  drawStrip = (
    x: number,
    y: number,
    frame = 0,
    source = rangerAttack,
    scale = 128,
  ) => {
    let size = 64;
    let sprite = new Image(size, size);
    let ctx = document.querySelector('canvas')?.getContext('2d')!;
    sprite.src = source;

    sprite.onload = () => {
      ctx.clearRect(x, y, scale, scale);
      // ctx.drawImage(sprite, 128 * frame, 0, 128, 128, x, y, size, size);
      if (source === rangerAttack) {
        ctx.drawImage(sprite, 180 * frame, 0, 128, 128, x, y, size, size);
      } else {
        ctx.drawImage(sprite, 128 * frame, 0, 128, 128, x, y, size, size);
      }
    };
  };

  drawHexImage = (x: number, y: number) => {
    let imageObj = new Image(32, 32);
    let ctx = document.querySelector('canvas')?.getContext('2d')!;
    imageObj.src = fantasyTiles;

    let w = 32;
    let h = w * 2;

    // ctx.drawImage(imageObj, x, y);
    // ctx.drawImage(imageObj, 100, 200, 100, 100);
    imageObj.onload = () => {
      ctx.drawImage(
        imageObj,
        w * Math.floor(Math.random() * 7),
        16,
        w,
        w,
        x,
        y,
        sizeOfTiles,
        sizeOfTiles,
      );

      // ctx.drawImage(imageObj,0,0, )
    };
  };

  flatHexCorner = (x: number, y: number, i: number) => {
    let angleDeg = 60 * i;
    let angleRad = (Math.PI / 180) * angleDeg;
    return {
      x: x + sizeOfTiles * Math.cos(angleRad),
      y: y + sizeOfTiles * Math.sin(angleRad),
    };
  };

  drawFlatHex = (x: number, y: number, color: string) => {
    let point: any;
    let ctx = document.querySelector('canvas')?.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 0; i < 7; i++) {
      point = this.flatHexCorner(x, y, i);
      ctx.lineTo(point.x, point.y);
    }

    ctx.fillStyle = color;
    ctx.fill();
  };

  pointyHexCorner = (x: number, y: number, i: number) => {
    let angleDeg = 60 * i - 30;
    let angleRad = (Math.PI / 180) * angleDeg;
    return {
      x: x + sizeOfTiles * Math.cos(angleRad),
      y: y + sizeOfTiles * Math.sin(angleRad),
    };
  };

  drawPointyHex = (x: number, y: number, color: string) => {
    let point: any;
    let ctx = document.querySelector('canvas')?.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 0; i < 7; i++) {
      point = this.pointyHexCorner(x, y, i);
      ctx.lineTo(point.x, point.y);
    }

    ctx.fillStyle = color;
    ctx.fill();
  };

  drawGridOfImages = () => {
    let xOffset = 0;
    let canvas = document.querySelector('canvas');
    if (canvas) {
      for (let x = -sizeOfTiles; x < canvas.width / sizeOfTiles; x++) {
        for (let y = -sizeOfTiles; y < 720 / sizeOfTiles; y++) {
          xOffset = y % 2 === 0 ? sizeOfTiles * 0.75 : 0;

          this.drawHexImage(
            x * sizeOfTiles * 1.5 + xOffset,
            (y * (Math.sqrt(3) * sizeOfTiles)) / 4,
          );
        }
      }
    }
  };

  drawGrid = () => {
    let color = 'blue';
    let xOffset = 0;
    let canvas = document.querySelector('canvas');

    if (canvas) {
      for (let x = 0; x < canvas.width / sizeOfTiles; x++) {
        color = 'blue';
        // for (let y = 0; y < canvas.height / sizeOfTiles; y++) {
        for (let y = 0; y < 720 / sizeOfTiles; y++) {
          color = y % 2 === 0 ? 'green' : 'blue';

          // for drawFlatHex
          xOffset = y % 2 === 0 ? sizeOfTiles * 1.5 : 0;

          // this.drawPointyHex(
          this.drawFlatHex(
            x * (sizeBetweenTiles + sizeOfTiles) + xOffset,
            (y * (Math.sqrt(3) * sizeOfTiles)) / 2,
            color,
          );
        }
      }
    }
  };

  clearCanvas = () => {
    let canvas = document.querySelector('canvas');
    if (canvas != null) {
      let ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  animate = () => {
    window.requestAnimationFrame(this.animate);

    //draw the Ranger idle animation (max 6 frames)
    this.drawStrip(0, 0, rangerFrames[0], rangerIdle);
    rangerFrames[0] = rangerFrames[0] > 6 ? 0 : rangerFrames[0] + 1;

    //draw the Ranger dashing(max 14 frames)
    this.drawStrip(160, 0, rangerFrames[1], rangerDash);
    rangerFrames[1] = rangerFrames[1] > 12 ? 0 : rangerFrames[1] + 1;

    //draw the Ranger attacking(max 14 frames)
    this.drawStrip(0, 50, rangerFrames[2], rangerAttack);
    rangerFrames[2] = rangerFrames[2] > 12 ? 0 : rangerFrames[2] + 1;

    //draw the Ranger dying(max 24 frames)
    this.drawStrip(160, 50, rangerFrames[3], rangerDeath);
    rangerFrames[3] = rangerFrames[3] > 23 ? 0 : rangerFrames[3] + 1;

    // this.drawGrid();
    // this.drawStrip(150, 100, rangerFrame, rangerDash);
    // this.drawStrip(150, 100, rangerFrame, rangerDeath); //28 frames?

    // if (rangerFrame >= 14) rangerFrame = 0;
  };

  componentDidMount() {
    // this.drawGrid();
    // this.drawGridOfImages();

    this.animate();
  }

  render() {
    return (
      <div>
        <h1>Army Game</h1>
        <Canvas />
        {/* <img alt="ddd" src={fantasyTiles} /> */}
      </div>
    );
  }
}
export default App;
