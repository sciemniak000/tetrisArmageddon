export class GameContainer {
    constructor(game_window, fifo, switch_window, timer){
        this.game = game_window;
        this.fifo = fifo;
        this.s_window = switch_window;
        this.timer = timer;
        this.switch_block_possible = true;
        this.level = 0;
        this.intervl = undefined;
        // this.createTimerCanvas();
        // this.createSwitchCanvas(50);
    }

    // createTimerCanvas(){
    //     this.timer_canvas = document.createElement("canvas");
    //     this.timer_canvas.id = "timer_area";
    //     this.timer_canvas.width = 100;
    //     this.timer_canvas.height = 100;
    //     this.timer_canvas.style.border = "1px solid #d3d3d3";
    //     this.timer_canvas.style.backgroundColor = "#000000";
    //     // this.timer_canvas.style.backgroundColor = "maroon";
    //     this.timer_canvas.style.marginRight = "10px";
    //     this.timer_canvas.style.marginLeft = "10px";
    //     document.body.appendChild(this.timer_canvas);
    // }
    //
    // createSwitchCanvas(size){
    //     this.switch_canvas = document.createElement("canvas");
    //     this.switch_canvas.id = "switch_area";
    //     this.switch_canvas.width = size;
    //     this.switch_canvas.height = size;
    //     this.switch_canvas.style.border = "1px solid #d3d3d3";
    //     this.switch_canvas.style.backgroundColor = "#000000";
    //     // this.timer_canvas.style.backgroundColor = "maroon";
    //     this.switch_canvas.style.marginRight = "10px";
    //     this.switch_canvas.style.marginLeft = "10px";
    //     document.body.appendChild(this.switch_canvas);
    // }


    shiftBlock(){
        if(this.switch_block_possible){
            let temporary = this.game.getBlock();
            if(this.s_window.getBlock()){
                this.game.setBlock(this.s_window.getBlock());
            } else {
                this.game.setBlock(this.fifo.nextBlock());
                //todo draw fifo
            }
            this.s_window.setBlock(temporary);
            this.switch_block_possible = false;

            //todo draw game and switch
        }
    }

    moveBlockRight(){
        this.game.blockMoveRight();
        //todo draw game
    }

    moveBlockLeft(){
        this.game.blockMoveLeft();
        //todo draw game
    }

    rotateBlockClockwise(){
        this.game.blockRotateClockwise();
        //todo draw game
    }

    rotateBlockCounterclockwise(){
        this.game.blockRotateCounterclockwise();
        //todo draw game
    }

    nextBlock(){
        this.game.setBlock(this.fifo.nextBlock());
    }

    moveBlockDownByAll(){
        this.game.blockMoveDownByAll();
        if(!this.checkIfItsTheEnd()){
            this.nextBlock();
            //todo draw the fifo
        }
        //todo draw game

        //todo todo todo
        //todo if there is a problem with events changing the state of the game after it's finished but before the
        //todo finishing screen appears, add a flag and check it in a drawing function
        //todo todo todo
    }

    //todo when placing the block on the game its positions should be reset


    checkIfItsTheEnd(){
        if(this.game.areaCheckIfLost()){
            //todo stop the interval decrementing height
            document.dispatchEvent(new Event("failure"));
            return true;
        }
        if(this.level <= 28 && this.game.areaCheckIfFixed()){
            //todo stop the interval decrementing height
            document.dispatchEvent(new Event("success"));
            return true;
        }
        return false;
    }

    moveBlockDownByOne(){
        if(!this.game.blockMoveDownByOne()){
            if(!this.checkIfItsTheEnd()){
                this.nextBlock();
                //todo draw the fifo
            }
            //todo draw game
        }
    }

    //todo victory and defeat functions all having their counterparts in this.game
}