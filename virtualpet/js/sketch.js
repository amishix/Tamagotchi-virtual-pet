/**
 * By Amishi Sharma 2024
 * All rights reserved
 */

// Libraries
import './../lib/p5.min.js';
import'./../lib/p5.sound.min.js';
import Pet from "./pet.js";
import Controls from "./controls.js";
import { makeGrid } from './gridSquare.js';

 //=============================================================================

// Global Variables
/** @type {Pet} The pet object representing the virtual pet. */
let pet = new Pet();
/** @type {Controls} The controls object managing UI interactions. */
let controls = new Controls();
/** @type {boolean} Indicates if the pet is currently performing an action. */
let doingAction = false;
/** @type {Array} The grid for displaying custom patterns. */
let grid, gridIsShown=false;
/** @type {number} Counter for tracking frames during an action. */
let actionCounter = 0; 

let soundFile = ['assets/brattheme.mp3'];
/** @type {Array} Array of Star objects for animation effects. */
let stars = []; // Array to hold stars
/** @type {number} Duration in frames to display stars. */
let starDisplayDuration = 10; 

let bratTheme;

 //=============================================================================

/**
 * Preload assets for the application.
 */
window.preload = function() {
  pet.preload();
  bratTheme = loadSound(soundFile);
};

 //=============================================================================
/**
 * Setup function initializes the canvas and essential components.
 */
window.setup = function() {
  createCanvas(800, 800);
  frameRate(1.5);
  background("green");
  noSmooth();
  grid = makeGrid(480, 430, 28);
  controls.setup();
  
}

 //=============================================================================
/**
 * Handle keyboard input for sound control.
 */
window.keyPressed = function () {
  if (key === 'b' || key === 'B') {
     if (bratTheme.isLoaded()) 
      bratTheme.play();
    } 
  
  if (key === 't' || key === 'T'){
    bratTheme.pause();
  }
  
  }

 //=============================================================================
/**
 * The main draw function, called every frame to update the canvas.
 */
window.draw = function() {
  background("green"); 
  if(pet.getHealth().isDead())
  {
    textSize(80); 
    background("green");
    fill("black");
    text("Game Over!",(width/2)-230,height/2);
  }
  else
  {
    
     // Call the pet's current animation data.
    let animationData = pet.getDataForCurrentAnimation();

     // If the animation data has a paired frame, update the animation.
    if (animationData[2] !== "no") {
      pet.setCurrentAnimation(animationData[2]);
    }
    
    //=============================================================================

    // draw onto the screen
    pet.draw();
    controls.draw();
    pet.getHealth().draw();

    //=============================================================================

    // run animation for a fixed time when doing action
    if(doingAction){ if (actionCounter >= 10) { // Adjust 60 to set the animation duration
      pet.setCurrentAnimation('maracas'); // Reset to the default animation
      doingAction = false; // Stop the action
      gridIsShown = false; // Hide the grid
      actionCounter = 0; // Reset the counter
    }
        
    }else{
      if(pet.getHealth().getMood()==='happy'){
        pet.setCurrentAnimation('happy');
      }
      if(pet.getHealth().getMood()==='sad'){
        pet.setCurrentAnimation('sad');
      }
      if(pet.getHealth().getMood()==='normal' && pet.currentAnimation !== 'maracas'){
        pet.setCurrentAnimation('general1');
      }
      
      pet.getHealth().randomlyReduceHealth(); //<update health
    }
    
    // Increment the action counter when an action is active.
    if (doingAction) {
      actionCounter++; 
    }
    // Draw and update stars
    if (stars.length > 0) {
      for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].move();
        stars[i].draw();
        if (stars[i].isExpired()) {
          stars.splice(i, 1);
        }
      }
    }
  
    //=============================================================================

     // Draw the grid if required.
    if(gridIsShown){
      const defineColor = (coords, color) => {
        coords.forEach(([x, y]) => grid[x][y].setColour(...color));
    };
    
    const blackElements = [
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1],
      [4, 2], [3, 2], [10, 2], [11, 2],
      [12, 3], [2, 3], [1, 4], [1, 5], [1, 6],
      [13, 4], [13, 5], [13, 6], [2, 7], [3, 7],
      [4, 7], [10, 7], [11, 7], [12, 7],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [6, 8], [8, 7], [8, 8],
      [3, 8], [3, 9], [11, 8], [11, 9],
      [4, 10], [10, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11]
  ];
  const goldElements = [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10],
      [5, 7], [7, 7], [9, 7],
      [4, 8], [4, 9], [10, 8], [10, 9]
  ];
  const lightGoldElements = [
      [5, 8], [7, 8], [9, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]
  ];
  const redElements = [
      [5, 3], [9, 3], [5, 5], [9, 5],
      [6, 2], [8, 2],
      [10, 3], [10, 4], [10, 5], [10, 6],
      [4, 3], [4, 4], [4, 5], [4, 6],
      [11, 3], [11, 4], [11, 6],
      [3, 3], [3, 4], [3, 6]
  ];
  
  // Define colors and corresponding coordinates
  const colors = [
      { color: [0, 0, 0], elements: blackElements },
      { color: [230, 175, 45], elements: goldElements },
      { color: [247, 216, 145], elements: lightGoldElements },
      { color: [203, 23, 23], elements: redElements }
  ];
  
  // Loop through each color group and define colors
  colors.forEach(({ color, elements }) => {
      elements.forEach(([x, y]) => {
          defineColor([[x, y]], color);
      });
  });
  
    showGrid();
  } 
}
}

 //=============================================================================

/**
 * Handle mouse click interactions with the control buttons.
 */
window.mouseClicked = function(){
  if(controls.clicked() !== "none" && !doingAction){
    switch (controls.clicked()) {
      case '🍏':
        // Feed the pet: triggers eating animation and increases hunger level.
        pet.setCurrentAnimation("eating1");
        pet.getHealth().modifyHunger(0.2);
        break;
      case '💤':
        // Put the pet to sleep: triggers sleep animation and increases sleep level.
        pet.setCurrentAnimation("bed1");
        pet.getHealth().modifySleep(0.2);
        break;
      case '🛁':
        pet.setCurrentAnimation("bath1");
        pet.getHealth().modifyCleanliness(0.2);
        break;
      case '🌟':
        console.log("emoji clicked: displaying the custom grid!");
        gridIsShown = true; // Set the flag to show the grid
        doingAction = false;
        stars = [];
        for (let i = 0; i < 5; i++) {
          let x = random(width);
          let y = random(height);
          stars.push(new Star(x, y));
        }
        break;
      default:
        console.log('Option for this emoji does not exist!');
    }

    
    actionCounter = 0; 
    doingAction = true;
  }
}

 //=============================================================================

 /**
 * Display the grid on the canvas.
 */
let showGrid = function(){
  for (let x = 0; x < grid.length; ++x) {
    for (let y = 0; y < grid[x].length; ++y) {
      grid[x][y].draw (false); //<- Change to true to see co-ordinates
      grid[x][y].setColour(255, 255, 255);  
    }
  }
}

 //=============================================================================

/**
 * Star class represents animated stars on the canvas.
 */
class Star {
  /**
   * Create a Star instance.
   * @param {number} x - The initial x-coordinate of the star.
   * @param {number} y - The initial y-coordinate of the star.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-3, 3); // Random horizontal speed
    this.dy = random(-3, 3); // Random vertical speed
    this.creationFrame = frameCount;
  }
  /**
   * Update the star's position.
   */
  move() {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }
   /**
   * Draw the star on the canvas.
   */
  draw() {
    fill(255, 223, 0); // Bright yellow
    noStroke();
    // ellipse(this.x, this.y, 10, 10);
    this.drawStar(this.x, this.y, 50, 90, 10); // Draw a star shape5,10,5
  }

  /**
   * Draw a star shape.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} radius1 - Inner radius of the star.
   * @param {number} radius2 - Outer radius of the star.
   * @param {number} npoints - Number of points in the star.
   */
  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  /**
   * Check if the star has expired.
   * @return {boolean} True if the star's display duration has ended.
   */

  isExpired() {
    return frameCount - this.creationFrame > starDisplayDuration;
  }
}

 //=============================================================================
