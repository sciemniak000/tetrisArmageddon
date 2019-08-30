export class GameContainer {
    constructor(game_window, fifo, switch_window, timer){
        this.game = game_window;
        this.fifo = fifo;
        this.s_window = switch_window;
        this.timer = timer;
        this.switch_block_possible = true;
        this.level = 50;
        this.intervl = undefined;
    }

    shiftBlock(){
        if(this.switch_block_possible){
            let temporary = this.game.getBlock();
            if(this.s_window.getBlock()){
                this.game.setBlock(this.s_window.getBlock());
                this.game.blockResetPosition();
            } else {
                this.nextBlock();
                this.fifo.drawFIFO();
            }
            this.s_window.setBlock(temporary);
            this.switch_block_possible = false;

            this.game.drawCanvas();
            this.s_window.drawCanvas();
        }
    }

    moveBlockRight(){
        this.game.blockMoveRight();
        this.game.drawCanvas();
    }

    moveBlockLeft(){
        this.game.blockMoveLeft();
        this.game.drawCanvas();
    }

    rotateBlockClockwise(){
        this.game.blockRotateClockwise();
        this.game.drawCanvas();
    }

    rotateBlockCounterclockwise(){
        this.game.blockRotateCounterclockwise();
        this.game.drawCanvas();
    }

    nextBlock(){
        this.game.setBlock(this.fifo.nextBlock());
        this.game.blockResetPosition();
        this.switch_block_possible = true;
    }

    moveBlockDownByAll(){
        this.game.blockMoveDownByAll();
        if(!this.checkIfItsTheEnd()){
            this.nextBlock();
            this.fifo.drawFIFO();
        }
        this.game.drawCanvas();

        //todo add flag that checks if drawing possible to stop it from happening at the end of the game
    }


    checkIfItsTheEnd(){
        if(this.game.areaCheckIfLost()){
            //todo stop the interval decrementing height
            console.log("lost");
            document.dispatchEvent(new Event("failure"));
            return true;
        }
        if(this.level <= 28 && this.game.areaCheckIfFixed()){
            //todo stop the interval decrementing height
            console.log("fixed");
            document.dispatchEvent(new Event("success"));
            return true;
        }
        return false;
    }

    moveBlockDownByOne(){
        if(!this.game.blockMoveDownByOne()){
            if(!this.checkIfItsTheEnd()){
                this.nextBlock();
                this.fifo.drawFIFO();
            }
        }
        this.game.drawCanvas();
    }

    //todo victory and defeat functions all having their counterparts in this.game
}