import React from 'react';

import Canvas from './Canvas';
import './style.css';

const size = 10;

class App extends React.Component {
  drawTile = (x: number, y: number, color = '#333') => {
    let canvas = document.querySelector('canvas')?.getContext('2d')!;
    let side = 0;

    // canvas.rotate((90 * Math.PI) / 180);
    // canvas.rotate((-90 * Math.PI) / 180);

    if (canvas != null) {
      canvas.beginPath();
      //   canvas.moveTo(x + 10 + size * Math.cos(0), y + size * Math.sin(0));
      canvas.moveTo(x + size, y + size);

      for (side; side < 7; side++) {
        canvas.lineTo(
          x + size * Math.cos((side * 2 * Math.PI) / 6),
          y + size * Math.sin((side * 2 * Math.PI) / 6),
        );
      }

      canvas.fillStyle = color;
      canvas.fill();
      canvas.setTransform(1, 0, 0, 1, 0, 0);
    }
  };

  componentDidMount() {
    let color = 'blue';
    let xOffset = 0;
    let yOffset = 0;

    for (let i = 0; i < 30; i++) {
      color = 'blue';

      for (let j = 0; j < 10; j++) {
        color = j % 2 === 0 ? 'green' : 'blue';
        xOffset = i % 2 === 0 ? 0 : 10;
        yOffset = j % 2 === 0 ? 0 : 0;

        this.drawTile(i * 10 + xOffset, j * 18 + yOffset, color);
      }
    }
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
