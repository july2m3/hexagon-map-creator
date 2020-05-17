import React from 'react';

import Canvas from './Canvas';

import './style.css';
import fantasyTiles from './borderless.png';

const sizeOfTiles = 16;
const sizeBetweenTiles = sizeOfTiles * 2;

class App extends React.Component {
  drawImage = (x: number, y: number) => {
    let imageObj = new Image(32, 32);
    let ctx = document.querySelector('canvas')?.getContext('2d')!;

    let w = 32;
    let h = w * 2;

    imageObj.src = fantasyTiles;

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

          this.drawImage(
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

  componentDidMount() {
    // this.drawGrid();
    this.drawGridOfImages();
    // this.drawFlatHex(sizeOfTiles, sizeOfTiles, 'black');
    // this.drawImage(0, 0);
    // this.drawImage(sizeOfTiles, 0);
    // this.drawImage(sizeOfTiles, 0);
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
