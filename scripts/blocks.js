import {
    color_of_block1,
    color_of_block2,
    color_of_block3,
    color_of_block4,
    color_of_block5,
    color_of_block6,
    color_of_block7
} from "./configuration.js";

// function clone(obj) {
//     if (null == obj || "object" != typeof obj) return obj;
//     var copy = obj.constructor();
//     for (var attr in obj) {
//         if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
//     }
//     return copy;
// }
class Block{
    constructor(vertical, horizontal) {
        this.rotation = 0;
        this.x = horizontal;
        this.y = vertical;
    }
    rotateRight() {
        this.rotation = (this.rotation + 1) % 4;
    };
    rotateLeft() {
        this.rotation = (this.rotation - 1 + 4) % 4;
    };
    decrementHeight() {
        this.y -= 1;
    };
    moveLeft(){
        this.x -= 1;
    }
    moveRight(){
        this.x += 1;
    }
}

// the order of blocks in tables is as in pictures while applying filters - from up left
// rotation rises clockwise
export class Block1 extends Block{
    // |||
    // |
    // this shape above (in rotation 0)
    constructor(vertical, horizontal){
        super(vertical, horizontal);
    }
    getLocations() {
        switch (this.rotation) {
            // returns the location of blocks according to rotation
            case 0:
                return [{x:this.x, y:this.y}, {x:this.x + 1, y:this.y},
                    {x:this.x - 1, y:this.y}, {x:this.x - 1, y:this.y - 1}];
            case 1:
                return [{x:this.x, y:this.y}, {x:this.x, y:this.y + 1},
                    {x:this.x, y:this.y - 1}, {x:this.x + 1, y:this.y - 1}];
            case 2:
                return [{x:this.x, y:this.y}, {x:this.x - 1, y:this.y},
                    {x:this.x + 1, y:this.y}, {x:this.x + 1, y:this.y + 1}];
            case 3:
                return [{x:this.x, y:this.y}, {x:this.x, y:this.y - 1},
                    {x:this.x, y:this.y + 1}, {x:this.x - 1, y:this.y + 1}];
        }
    };
    getColorOfBlock(){
        return color_of_block1;
    };

    getTypeOfBlock(){
        return 1;
    };
}

export class Block2 extends Block{
    // |||
    //   |
    // this shape above (in rotation 0)
    constructor(vertical, horizontal){
        super(vertical,horizontal);
    }
    getLocations() {
        switch (this.rotation) {
            // returns the location of blocks according to rotation
            case 0:
                return [{x: this.x, y: this.y}, {x: this.x - 1, y: this.y},
                    {x: this.x + 1, y: this.y}, {x: this.x + 1, y: this.y - 1}];
            case 1:
                return [{x: this.x, y: this.y}, {x: this.x, y: this.y - 1},
                    {x: this.x, y: this.y + 1}, {x: this.x + 1, y: this.y + 1}];
            case 2:
                return [{x: this.x, y: this.y}, {x: this.x + 1, y: this.y},
                    {x: this.x - 1, y: this.y}, {x: this.x - 1, y: this.y + 1}];
            case 3:
                return [{x: this.x, y: this.y}, {x: this.x, y: this.y + 1},
                    {x: this.x, y: this.y - 1}, {x: this.x - 1, y: this.y - 1}];
        }
    };
    getColorOfBlock(){
        return color_of_block2;
    };

    getTypeOfBlock(){
        return 2;
    };
}

export class Block3 extends Block{
    //  ||
    //  ||
    // this shape above
    constructor(vertical, horizontal){
        super(vertical,horizontal);
    }
    getLocations() {
        return [{x: this.x, y: this.y}, {x: this.x + 1, y: this.y},
            {x: this.x, y: this.y - 1}, {x: this.x + 1, y: this.y - 1}];
    };
    // override
    rotateRight() {
        this.rotation = 0;
    };
    // override
    rotateLeft() {
        this.rotation = 0;
    };
    getColorOfBlock(){
        return color_of_block3;
    };
    getTypeOfBlock(){
        return 3;
    };
}

export class Block4 extends Block{
    // |||
    //  |
    // this shape above (in rotation 0)
    getLocations() {
        switch (this.rotation) {
            // returns the location of blocks according to rotation
            case 0:
                return [{x:this.x - 1, y:this.y}, {x:this.x, y:this.y},
                    {x:this.x + 1, y:this.y}, {x:this.x, y:this.y - 1}];
            case 1:
                return [{x:this.x, y:this.y + 1}, {x:this.x, y:this.y},
                    {x:this.x + 1, y:this.y}, {x:this.x, y:this.y - 1}];
            case 2:
                return [{x:this.x, y:this.y + 1}, {x:this.x - 1, y:this.y},
                    {x:this.x, y:this.y}, {x:this.x + 1, y:this.y}];
            case 3:
                return [{x:this.x, y:this.y + 1}, {x:this.x - 1, y:this.y},
                    {x:this.x, y:this.y}, {x:this.x, y:this.y - 1}];
        }
    };
    getColorOfBlock(){
        return color_of_block4;
    };
    getTypeOfBlock(){
        return 4;
    };
}

export class Block5 extends Block{
    // ||||
    // this shape above (in rotation 0)
    getLocations() {
        switch (this.rotation) {
            // returns the location of blocks according to rotation
            case 0:
            case 2:
                return [{x: this.x - 2, y: this.y}, {x: this.x - 1, y: this.y},
                    {x: this.x, y: this.y}, {x: this.x + 1, y: this.y}];
            case 1:
            case 3:
                return [{x: this.x, y: this.y + 2}, {x: this.x, y: this.y + 1},
                    {x: this.x, y: this.y}, {x: this.x, y: this.y - 1}];
        }
    };
    getColorOfBlock(){
        return color_of_block5;
    };
    getTypeOfBlock(){
        return 5;
    };
}

export class Block6 extends Block{
    //  ||
    // ||
    // this shape above (in rotation 0)
    getLocations() {
        switch (this.rotation) {
            // returns the location of blocks according to rotation
            case 0:
            case 2:
                return [{x: this.x, y: this.y}, {x: this.x + 1, y: this.y},
                    {x: this.x - 1, y: this.y - 1}, {x: this.x, y: this.y - 1}];
            case 1:
            case 3:
                return [{x: this.x, y: this.y + 1}, {x: this.x, y: this.y},
                    {x: this.x + 1, y: this.y}, {x: this.x + 1, y: this.y - 1}];
        }
    };
    getColorOfBlock(){
        return color_of_block6;
    };
    getTypeOfBlock(){
        return 6;
    };
}

export class Block7 extends Block {
    // ||
    //  ||
    // this shape above (in rotation 0)
    getLocations() {
        switch (this.rotation) {
            // returns the location of blocks according to rotation
            case 0:
            case 2:
                return [{x: this.x - 1, y: this.y}, {x: this.x, y: this.y},
                    {x: this.x, y: this.y - 1}, {x: this.x + 1, y: this.y - 1}];
            case 1:
            case 3:
                return [{x: this.x + 1, y: this.y + 1}, {x: this.x, y: this.y},
                    {x: this.x + 1, y: this.y}, {x: this.x, y: this.y - 1}];
        }
    };
    getColorOfBlock(){
        return color_of_block7;
    };
    getTypeOfBlock(){
        return 7;
    };
}
