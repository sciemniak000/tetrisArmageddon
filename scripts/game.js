export class GameContainer {
    constructor(game_window, fifo, switch_window, timer){
        this.game = game_window;
        this.fifo = fifo;
        this.s_window = switch_window;
        this.timer = timer;
        this.switch_block_possible = true;
        this.level = 50;
        this.intervl = null;
        this.rising_death = null;
        this.game_down_pressed = false;
    }

    shiftBlock(){
        if(this.switch_block_possible){
            this.game.blockResetPosition();
            let temporary = this.game.getBlock();
            if(this.s_window.getBlock()){
                this.game.setBlock(this.s_window.getBlock());
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
        console.log("event sent");
        if(this.game.areaCheckIfLost()){
            window.dispatchEvent(new Event("lose"));
            return true;
        }
        if(this.level <= 28 && this.game.areaCheckIfFixed()){
            window.dispatchEvent(new Event("win"));
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
        this.game.copyGameArea(level.getArea());
        this.timer.setDistance(level.getTimerDistance());
        this.fifo.resetFIFO();
        this.s_window.removeBlock();
        this.nextBlock();
        this.fifo.drawFIFO();
        this.s_window.drawCanvas();
        this.timer.drawCanvas();
        this.game.drawCanvas();
    }

    makeTheCountdown(){
        this.game.drawInfoOnCanvas(this.level);
        window.setTimeout(function () {
            this.game.drawThreeOnCanvas();
        }.bind(this), 500);
        window.setTimeout(function () {
            this.game.drawCanvas();
            this.game.drawInfoOnCanvas(this.level);
            this.game.drawTwoOnCanvas();
        }.bind(this), 1500);
        window.setTimeout(function () {
            this.game.drawCanvas();
            this.game.drawInfoOnCanvas(this.level);
            this.game.drawOneOnCanvas();
        }.bind(this), 2500);
        window.setTimeout(function () {
            window.dispatchEvent(new Event("start"));
        }.bind(this), 3500);
    }

    disableBlockDown(){
        clearInterval(this.intervl);
    }

    riseDeath(){}

    // enableRisingDeath(){
    //     this.intervl = setInterval((function(self) {
    //         return function() {
    //             self.game.areaAddBottomLine();
    //         }
    //     })(this), 500);
    // }
    // todo rising death in 29 and 30

    //todo victory and defeat functions all having their counterparts in this.game
}