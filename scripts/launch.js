import {ApplicationContainer} from "./application.js";

let a = new ApplicationContainer();

a.game.game.drawCanvas();
a.game.fifo.drawFIFO();
a.game.timer.drawCanvas();
a.game.s_window.drawCanvas();
a.game.nextBlock();

window.addEventListener("keydown", function (event) {
    if(event.which === 38){
        a.game.rotateBlockClockwise();
    } else if(event.which === 37){
        a.game.moveBlockLeft();
    } else if(event.which === 39){
        a.game.moveBlockRight();
    } else if(event.which === 40){
        a.game.moveBlockDownByOne();
    } else if(event.which === 32){
        a.game.moveBlockDownByAll();
    }
    console.log(a.game.game.area);
    console.log(a.game.game.block);
});
