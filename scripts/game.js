export class GameContainer {
    constructor(game_window, fifo, switch_window, timer){
        this.game = game_window;
        this.fifo = fifo;
        this.s_window = switch_window;
        this.timer = timer;
        this.switch_block_possible = true;
        this.level = 50;
        this.intervl = null;
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
            clearInterval(this.intervl);
            console.log("lost");
            document.dispatchEvent(new Event("failure"));
            return true;
        }
        if(this.level <= 28 && this.game.areaCheckIfFixed()){
            clearInterval(this.intervl);
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

    enableBlockDown(){
        this.intervl = setInterval((function(self) {
            return function() {
                self.moveBlockDownByOne();
            }
        })(this), 500);
    }

    speedUpBlockDown(){
        clearInterval(this.intervl);
        this.moveBlockDownByOne();
        this.intervl = setInterval((function(self) {
            return function() {
                self.moveBlockDownByOne();
            }
        })(this), 100);
    }

    slowDownBlockDown(){
        clearInterval(this.intervl);
        this.intervl = setInterval((function(self) {
            return function() {
                self.moveBlockDownByOne();
            }
        })(this), 500);
    }

    loadLevel(level){
        this.level = level.getNumberOfLevel();
        console.log(level.getArea());
        this.game.copyGameArea(level.getArea());
        this.timer.setDistance(level.getTimerDistance());
        this.enableBlockDown();
    }

    //todo victory and defeat functions all having their counterparts in this.game
}