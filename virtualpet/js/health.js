/**
 * All rights reserved
 */
export default class Health {
    constructor(){
        this.hunger = 0.5;
        this.sleep = 0.5;
        this.cleanliness = 0.5;
    }

    isDead(){
        // print(this.hunger);
        if (this.hunger <= 0.00001 
            && this.sleep <= 0.00001
            && this.cleanliness <= 0.00001){
                return true;
            }
        else{
            return false;
        }
    }

    getMood(){
        let sadThreshold = 0.25;
        if (this.hunger <= sadThreshold 
            || this.sleep <= sadThreshold
            || this.cleanliness <= sadThreshold){
                return "sad";
            }

        let happyThreshold =  0.75;
        if (this.hunger >= happyThreshold
            && this.sleep >= happyThreshold
            && this.cleanliness >= happyThreshold){
                return "happy";
            }

        return "normal";
    }


    modifyHunger(amount){
        this.hunger+=amount;
        this.hunger = this.hunger < 0 ? 0 : this.hunger > 1 ? 1 : this.hunger;
    }

    modifySleep(amount){
        this.sleep+=amount;
        this.sleep = this.sleep < 0 ? 0 : this.sleep > 1 ? 1 : this.sleep;
    }

    modifyCleanliness(amount){
        this.cleanliness+=amount;
        this.cleanliness = this.cleanliness < 0 ? 0 : this.cleanliness > 1 ? 1 : this.cleanliness;
    }

    randomlyReduceHealth(){
        let speed = -0.02;
        switch (int(random(0,5))) {
            case 0:
                this.modifySleep(speed);
                break;
            case 1:
                this.modifyHunger(speed);
                break;
            case 2:
                this.modifyCleanliness(speed);
                break;
            default:
                //do nothing!
            }
    }

    draw(){
    
    
        fill("yellow");
        rect(127,18,600,170);
        fill("black"); // Text color

        
        textSize(16); // Larger text size for visibility
        
        text("press'b' to play 't' to pause", 127 + 600 / 2, 18 + 170 / 1.15); // Position the text at the center

        
        let fullBarWidth = 365;
        fill("black");
        
        strokeWeight(0);

        textSize(25);
        
        fill("black");
        text("Hunger", 145, 55);
        rect(300,30,fullBarWidth,30); //bottom
        fill("purple");
        rect(300,30,fullBarWidth * this.hunger,30); //top

        fill("black");
        text("Sleep", 145, 95);
        rect(300,70,fullBarWidth,30);
        fill("purple");
        rect(300,70,fullBarWidth * this.sleep,30); //top

        fill("black");
        text("Cleanliness", 145, 135);
        rect(300,110,fullBarWidth,30);
        fill("purple");
        rect(300,110,fullBarWidth * this.cleanliness,30); //top

        strokeWeight(6); // Set stroke weight.    
    }
}

