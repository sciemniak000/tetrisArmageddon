import {ApplicationContainer} from "./application.js";
import {all_levels} from "./levels/list_of_levels.js";

let app = new ApplicationContainer();

window.addEventListener("imageLoaded", launchApplication);
app.menu.loadLogoImage();

//todo potential sound effects also in menu

function launchApplication(){
    window.removeEventListener("imageLoaded", launchApplication);
    app.hideCanvases();
    window.addEventListener("keydown", mainMenuOnkeydownListener);
    app.menu.drawMenu();
}

function mainMenuOnkeydownListener(event){
    switch (event.which) {
        case 38:
            app.menu.previousButton();
            break;

        case 40:
            app.menu.nextButton();
            break;

        case 32:
            switch (app.menu.marked) {
                case 0:
                    window.removeEventListener("keydown", mainMenuOnkeydownListener);
                    window.addEventListener("keydown", chooseLevelMenuOnkeydownListener);
                    app.menu.chooseLevels.resetMarkedPosition();
                    app.menu.chooseLevels.drawCanvas();
                    break;

                case 1:
                    window.removeEventListener("keydown", mainMenuOnkeydownListener);
                    window.addEventListener("keydown", controlsMenuOnkeydownListener);
                    //potential todo - reset text position
                    app.menu.drawControls();
                    break;

                case 2:
                    window.removeEventListener("keydown", mainMenuOnkeydownListener);
                    window.addEventListener("keydown", creditsMenuOnkeydownListener);
                    //potential todo - reset text position
                    app.menu.drawCredits();
                    break;
            }
            break;
    }
}

function controlsMenuOnkeydownListener(event){
    switch (event.which) {
        case 81:
            window.removeEventListener("keydown", controlsMenuOnkeydownListener);
            window.addEventListener("keydown", mainMenuOnkeydownListener);
            app.menu.enterMenu(false);
            break;

            //todo potential arrow up and down cases to move the text
    }
}

function creditsMenuOnkeydownListener(event){
    switch (event.which) {
        case 81:
            window.removeEventListener("keydown", creditsMenuOnkeydownListener);
            window.addEventListener("keydown", mainMenuOnkeydownListener);
            app.menu.enterMenu(false);
            break;

            //todo potential arrow up and down cases to move the text
    }
}

function chooseLevelMenuOnkeydownListener(event){
    switch (event.which) {
        case 81:
            window.removeEventListener("keydown", chooseLevelMenuOnkeydownListener);
            window.addEventListener("keydown", mainMenuOnkeydownListener);
            app.menu.enterMenu(false);
            break;

        case 40:
            app.menu.chooseLevels.markedMoveDown();
            break;

        case 39:
            app.menu.chooseLevels.markedMoveRight();
            break;

        case 38:
            app.menu.chooseLevels.markedMoveUp();
            break;

        case 37:
            app.menu.chooseLevels.markedMoveLeft();
            break;

        case 32:
            window.removeEventListener("keydown", chooseLevelMenuOnkeydownListener);
            window.addEventListener("start", afterWaitingForTheLevelToStart);
            window.addEventListener("keydown", waitingForTheLevelKeydownListener);
            window.addEventListener("keyup", waitingForTheLevelKeyupListener);
            app.game.game.drawing_possible = true;
            app.revealCanvases();
            app.game.loadLevel(all_levels[app.menu.chooseLevels.getIndexOfChosenLevel()]);
            app.game.makeTheCountdown();
    }
}

function afterWaitingForTheLevelToStart(){
    window.removeEventListener("start", afterWaitingForTheLevelToStart);
    window.removeEventListener("keydown", waitingForTheLevelKeydownListener);
    window.removeEventListener("keyup", waitingForTheLevelKeyupListener);
    window.addEventListener("keydown", gameControlsOnkeydownListener);
    window.addEventListener("keyup", gameControlsOnkeyupListener);
    window.addEventListener("win", gameWinListener);
    window.addEventListener("lose", gameLoseListener);
    app.game.game.drawCanvas();
    app.game.enableBlockDown();
    if(app.game.game_down_pressed){
        app.game.speedUpBlockDown();
    }
    if(app.game.game_left_pressed){
        app.game.launchIntervalLeft();
    }
    if(app.game.game_right_pressed){
        app.game.launchIntervalRight();
    }
    if(app.game.level > 28){
        //todo enable rising death
    }
    app.game.timer.startCountdown(app.game.level);
}

function waitingForTheLevelKeydownListener(event) {
    switch (event.which) {
        case 40:
            app.game.game_down_pressed = true;
            break;

        case 37:
            app.game.game_left_pressed = true;
            break;

        case 39:
            app.game.game_right_pressed = true;
            break;
    }
}

function waitingForTheLevelKeyupListener(event) {
    switch (event.which) {
        case 40:
            app.game.game_down_pressed = false;
            break;

        case 37:
            app.game.game_left_pressed = false;
            break;

        case 39:
            app.game.game_right_pressed = false;
            break;
    }
}

function gameControlsOnkeydownListener(event) {
    switch (event.which) {
        case 90:
            app.game.shiftBlock();
            break;

        case 88:
            app.game.rotateBlockCounterclockwise();
            break;

        case 67:
            app.game.rotateBlockClockwise();
            break;

        case 37:
            if(!app.game.game_left_pressed){
                app.game.game_left_pressed = true;
                app.game.moveBlockLeft();
                app.game.launchTimeoutLeft();
            }
            break;

        case 39:
            if(!app.game.game_right_pressed){
                app.game.game_right_pressed = true;
                app.game.moveBlockRight();
                app.game.launchTimeoutRight();
            }
            break;

        case 40:
            if(!app.game.game_down_pressed){
                app.game.game_down_pressed = true;
                app.game.speedUpBlockDown();
            }
            break;

        case 32:
            app.game.moveBlockDownByAll();
            break;
    }
}

function gameControlsOnkeyupListener(event) {
    switch (event.which) {
        case 40:
            app.game.slowDownBlockDown();
            app.game.game_down_pressed = false;
            break;

        case 37:
            app.game.clearLeft();
            app.game.game_left_pressed = false;
            break;

        case 39:
            app.game.clearRight();
            app.game.game_right_pressed = false;
            break;
    }
}

function gameWinListener() {
    app.game.game.drawing_possible = false;
    window.removeEventListener("keydown", gameControlsOnkeydownListener);
    window.removeEventListener("keyup", gameControlsOnkeyupListener);
    window.removeEventListener("win", gameWinListener);
    window.removeEventListener("lose", gameLoseListener);

    app.game.disableBlockDown();
    app.game.clearRight();
    app.game.clearLeft();
    app.game.timer.stopCountdown();
    if(app.game.level > 28){
        //todo disable rising death
    }
    if(app.game.level < 30) {
        window.addEventListener("start", afterWaitingForTheLevelToStart);
        window.addEventListener("keydown", waitingForTheLevelKeydownListener);
        window.addEventListener("keyup", waitingForTheLevelKeyupListener);
        app.game.game.drawWinLevelCanvas();
        setTimeout(function () {

            //index of level array which is one lower than the actual number of level
            app.game.game.drawing_possible = true;
            app.game.loadLevel(all_levels[app.game.level -1 + 1]);
            app.game.makeTheCountdown();
        }, 3000);
    } else {
        app.game.game.drawWinCanvas();
        window.addEventListener("keydown", finalWinOnkeydownListener);
    }
}

function gameLoseListener() {
    app.game.game.drawing_possible = false;
    window.removeEventListener("keydown", gameControlsOnkeydownListener);
    window.removeEventListener("keyup", gameControlsOnkeyupListener);
    window.removeEventListener("win", gameWinListener);
    window.removeEventListener("lose", gameLoseListener);

    app.game.disableBlockDown();
    app.game.clearLeft();
    app.game.clearRight();
    app.game.timer.stopCountdown();
    if(app.game.level > 28){
        //todo disable rising death
    }
    window.addEventListener("keydown", loseOnkeydownListener);
    app.game.game.drawLoseCanvas();
}

function loseOnkeydownListener(event){
    switch (event.which) {
        case 81:
            app.hideCanvases();
            window.removeEventListener("keydown", loseOnkeydownListener);
            window.addEventListener("keydown", mainMenuOnkeydownListener);
            app.menu.resetButtonPosition();
            app.menu.drawMenu();
            break;

        case 82:
            window.removeEventListener("keydown", loseOnkeydownListener);
            window.addEventListener("start", afterWaitingForTheLevelToStart);
            window.addEventListener("keydown", waitingForTheLevelKeydownListener);
            window.addEventListener("keyup", waitingForTheLevelKeyupListener);
            app.game.game.drawing_possible = true;
            app.game.loadLevel(all_levels[app.game.level - 1]);
            app.game.makeTheCountdown();
            break;
    }
}

function finalWinOnkeydownListener(event) {
    switch (event.which) {
        case 81:
            app.hideCanvases();
            window.removeEventListener("keydown", finalWinOnkeydownListener);
            window.addEventListener("keydown", mainMenuOnkeydownListener);
            app.menu.resetButtonPosition();
            app.menu.drawMenu();
            break;
    }
}
