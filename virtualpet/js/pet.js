/**
 * All rights reserved
 */
import {drawScaledImage} from "./utility.js";
import Health from "./health.js";

const spriteWindowSize = 20;

export default class Pet {
    constructor(){
        this.currentAnimation = 'maracas';
        this.spritesheet;
        this.table;
        this.health = new Health();
    }

    preload(){
        this.spritesheet = loadImage("assets/flowertchi-masterpengo.png");
        this.table = loadTable('assets/flowertchi-coords.csv', 'csv', 'header');
    }
    
    setCurrentAnimation(newAnimation){
        this.currentAnimation = newAnimation;
    }

    getDataForCurrentAnimation(){
        let row = this.table.findRow(this.currentAnimation, 'label');

        if (row) { 
            let xValue = row.get('x');
            let yValue = row.get('y');
            let pairedValue = row.get('pairedLabel');
            return [xValue,yValue,pairedValue];
        }
        print("Error! This animation dosen't exist!");
    }

    getHealth(){
        return this.health;
    }

    draw(){
        let rowData = this.getDataForCurrentAnimation();
        drawScaledImage(this.spritesheet.get(rowData[0],
                                             rowData[1],
                                             spriteWindowSize,
                                             spriteWindowSize), 
                        150, 130, 25);
    }
}

