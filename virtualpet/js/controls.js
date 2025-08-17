/***
 * All rights reserved
 */
export default class Controls {
    constructor(){
        this.numControls = 4;
        this.controlCoords = [];        

        this.innerW = 120;
        this.innerH = 105;
    }

    setup(){             
        let padding = 20;
        for (let i = 0; i < this.numControls; i++) {    

            let x = 140 + i * (this.innerW + padding);
            let y = 627;

            this.controlCoords.push({ //< add the co-ordinates to the this.controlCords structure
                topLeft: { x: x, 
                           y: y },
                bottomRight: { x: x + this.innerW, 
                               y: y + this.innerH }
            });
        }
    }

    draw(){
        fill(140,255,105); // Set fill colour of rectangles.
        strokeWeight(3); // Set stroke weight.
        textSize(65); // Set text size.
        rect(127, 610, 565, 140, 10);
        fill(70,235,20); // Set fill color for text
        textSize(70); // Adjust text size for instructions

        
        // Emojis for each button
        const emojis = ["🍏", "💤", "🛁", "🌟"]; // Food, Sleep, Cleanliness, Custom
        
        

        //==========================================================

        for (let i = 0; i < this.numControls; ++i) { 
            // Draw the button rectangle for the current control.
            rect(this.controlCoords[i].topLeft.x, //< Draw inside rectangles
                this.controlCoords[i].topLeft.y, 
                this.innerW, 
                this.innerH, 
                100);
        
        /**
     * Calculate the position to draw the emoji so that it is 
     * centered within the button rectangle.
     */
        let xEmoji = this.controlCoords[i].topLeft.x + (this.innerW - 65) / 2; // Adjust for width
        let yEmoji = this.controlCoords[i].topLeft.y + (this.innerH + 70) / 2; // Adjust for height

        // Draw emoji at calculated position
        text(emojis[i], xEmoji, yEmoji);

        }  
        //===========================================================
    }

    
     
    /**
 * Determines which button was clicked based on the mouse position.
 *
 * @returns {string} The emoji corresponding to the clicked button, or "none" 
 * if no button was clicked.
 */
    clicked() {
        // Emojis for each button
        
        const emojis = ["🍏", "💤", "🛁", "🌟"]; // Food, Sleep, Cleanliness, Custom

       // Loop through each button to check if the mouse click is within bounds.
        for (let i = 0; i < this.numControls; i++) {
            let button = this.controlCoords[i];
            let topLeft = button.topLeft;
            let bottomRight = button.bottomRight;

            /**
         * Check if the current mouse position is inside the boundaries of the 
         * current button.
         */
            if (mouseX >= topLeft.x && mouseX <= bottomRight.x && 
                mouseY >= topLeft.y && mouseY <= bottomRight.y) {
                // Return the emoji corresponding to the clicked button
                return emojis[i];
            }
        }

        // Return "none" if no button was clicked
        return "none";
    }
}
    
    



