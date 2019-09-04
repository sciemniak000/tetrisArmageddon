import {ApplicationContainer} from "./application.js";

let app = new ApplicationContainer();
launchApplication();


//todo potential sound effects also in menu

function launchApplication(){
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

            //todo case 32 - start the game
    }
}
