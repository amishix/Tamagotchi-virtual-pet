/**
 * By Corey Ford 2024
 * All rights reserved
 */
class GridSquare {
    constructor (x, y, squareSize, colour = [0,0,0,0]) {
      this.x = x + 145;/** offsets to position to the pet */
      this.y = y + 168;/** offsets to position to the pet */
      this.squareSize = squareSize;
      this.colour = colour;
    }
    
    setColour (r,g,b){
      if (typeof r === 'string') {
        this.colour=r;
      }else{
        this.colour = [r,g,b,255];
      }
    }

    draw (showText = false) {
      strokeWeight(0);
      fill(this.colour);
      rect(this.x, this.y, this.squareSize);

      if (showText){
        fill(10);  
        textSize(10);
        textAlign(CENTER); 

        // Display the coordinates at the center of the square
        text('(' + ((this.x - 220.0) / this.squareSize) + ', ' + ((this.y-165) / this.squareSize) + ')', 
             this.x + this.squareSize / 2, this.y + this.squareSize / 2); 
        textAlign(LEFT); 
      }
    }
}

export function makeGrid (width, height,squareSize) {
  let grid = [];
  for (let x = 0; x < width; x += squareSize) {
    let row = [];
    for (let y = 0; y < height; y += squareSize) {
      let mySquare = new GridSquare(x, y, squareSize);
      row.push(mySquare);
    }
    grid.push(row);
  }
  return grid;
}
