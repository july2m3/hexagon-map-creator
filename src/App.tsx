import React from 'react';

import Canvas from './Canvas';
import './style.css';

const sizeOfTiles = 10;
const sizeBetweenTiles = sizeOfTiles * 2;

class App extends React.Component {
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

  drawGrid = () => {
    let color = 'blue';
    let xOffset = 0;

    for (let x = 0; x < 34; x++) {
      color = 'blue';
      for (let y = 0; y < 20; y++) {
        color = y % 2 === 0 ? 'green' : 'blue';
        xOffset = y % 2 === 0 ? sizeOfTiles * 1.5 : 0;

        // this.drawPointyHex(
        this.drawFlatHex(
          x * (sizeBetweenTiles + sizeOfTiles) + xOffset,
          (y * (Math.sqrt(3) * sizeOfTiles)) / 2,
          color,
        );
      }
    }
  };

  componentDidMount() {
    this.drawGrid();
    // this.drawFlatHex(sizeOfTiles, sizeOfTiles, 'black');
  }

  render() {
    return (
      <div>
        <h1>Army Game</h1>
        <Canvas />
      </div>
    );
  }
}
export default App;
