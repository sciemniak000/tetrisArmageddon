import {ApplicationContainer} from "./application.js";

let a = new ApplicationContainer();

// a.hideCanvases();
// a.menu.drawMenu();
//
// window.addEventListener("keydown", function (event) {
//     if(event.which === 38){
//         a.menu.previousButton();
//     } else if(event.which === 40){
//         a.menu.nextButton();
//     } else if(event.which === 32){
//         if(a.menu.inMenu){
//             if(a.menu.marked === 1){
//                 a.menu.drawControls();
//                 a.menu.inMenu = false;
//             } else if(a.menu.marked === 2){
//                 a.menu.drawCredits();
//                 a.menu.inMenu = false;
//             }
//         } else {
//             a.menu.drawMenu();
//             a.menu.inMenu = true;
//         }
//     }
// });


a.game.game.drawCanvas();
a.game.fifo.drawFIFO();
a.game.timer.drawCanvas();
a.game.s_window.drawCanvas();
a.game.nextBlock();
a.game.fifo.drawFIFO();
a.game.timer.setDistance(7000);
a.game.timer.drawCanvas();
a.game.enableBlockDown();

window.addEventListener("keydown", function (event) {
    if(event.which === 38){
        a.game.rotateBlockClockwise();
    } else if(event.which === 37){
        a.game.moveBlockLeft();
    } else if(event.which === 39){
        a.game.moveBlockRight();
    } else if(event.which === 40){
        a.game.speedUpBlockDown();
    } else if(event.which === 32){
        a.game.moveBlockDownByAll();
    } else if(event.which === 90){
        a.game.shiftBlock();
    } else if(event.which === 70){
        a.game.timer.countdownOneSecond();
        a.game.timer.drawCanvas();
    }
});

window.addEventListener("keypress", function (event) {
    if(event.which === 40){
        void(0);
    }
});

window.addEventListener("keyup", function(event) {
    if(event.which === 40) {
        a.game.slowDownBlockDown();
    }
});
