import {Block1, Block2, Block3, Block4, Block5, Block6, Block7} from "./blocks.js";
import {
    black_window_size,
    black_window_central_block1_x,
    black_window_central_block1_y,
    black_window_central_block2_x,
    black_window_central_block2_y,
    black_window_central_block3_x,
    black_window_central_block3_y,
    black_window_central_block4_x,
    black_window_central_block4_y,
    black_window_central_block5_x,
    black_window_central_block5_y,
    black_window_central_block6_x,
    black_window_central_block6_y,
    black_window_central_block7_x,
    black_window_central_block7_y,
    black_window_size_of_block,
    color_of_block1,
    color_of_block2,
    color_of_block3,
    color_of_block4,
    color_of_block5, color_of_block6, color_of_block7,
    game_canvas_height,
    game_canvas_width, game_grid_color,
    game_higher_part_color,
    info_font_color,
    info_font_style,
    info_less_than_28,
    info_less_than_28_x,
    info_less_than_28_y,
    info_more_than_28,
    info_more_than_28_x,
    info_more_than_28_y,
    start_number_font_style,
    start_number_x,
    start_number_y,
    win_screen_label,
    win_screen_label_x,
    win_screen_label_y,
    final_win_screen_label,
    final_win_screen_label_x,
    final_win_screen_label_y,
    lose_screen_label,
    lose_screen_label_q,
    lose_screen_label_q_x,
    lose_screen_label_q_y,
    lose_screen_label_r,
    lose_screen_label_r_x,
    lose_screen_label_r_y,
    lose_screen_label_x,
    lose_screen_label_y,
    win_screen_label_font,
    final_win_screen_label_font,
    lose_screen_label_font,
    lose_screen_label_font_q,
    lose_screen_label_font_r
} from "./configuration.js";


export class BlackWindow{
    constructor(context){
        this.ctx = context;
    }

    setBlock(block){
        this.block = block;
    }

    getBlock(){
        return this.block;
    }

    removeBlock(){
        this.block = null;
    }

    clearCanvas(){
        this.ctx.clearRect(0, 0, black_window_size, black_window_size);
    }

    drawCanvas(){
        this.clearCanvas();
        if(this.block){
            this.ctx.fillStyle = this.block.getColorOfBlock();

            let loc = this.block.getLocations();
            let x = this.block.x;
            let y = this.block.y;
            let central_x = 0;
            let central_y = 0;
            switch (this.block.getTypeOfBlock()) {
                case 1:
                    central_x = black_window_central_block1_x;
                    central_y = black_window_central_block1_y;
                    break;
                case 2:
                    central_x = black_window_central_block2_x;
                    central_y = black_window_central_block2_y;
                    break;
                case 3:
                    central_x = black_window_central_block3_x;
                    central_y = black_window_central_block3_y;
                    break;
                case 4:
                    central_x = black_window_central_block4_x;
                    central_y = black_window_central_block4_y;
                    break;
                case 5:
                    central_x = black_window_central_block5_x;
                    central_y = black_window_central_block5_y;
                    break;
                case 6:
                    central_x = black_window_central_block6_x;
                    central_y = black_window_central_block6_y;
                    break;
                case 7:
                    central_x = black_window_central_block7_x;
                    central_y = black_window_central_block7_y;
                    break;
            }
            for(let i = 0; i < loc.length; i++){
                let coords = loc[i];
                this.ctx.fillRect(central_x + (black_window_size_of_block + 1) * (coords.x - x),
                    central_y - (black_window_size_of_block + 1)*(coords.y - y),
                    black_window_size_of_block, black_window_size_of_block);
            }

        }
    }
}

export class FifoWindows {
    constructor(){
        this.windows = [];
        this.helpful = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];
    }

    addWindow(window){
        window.setBlock(this.getRandomBlock());
        this.windows.push(window);

    }

    nextBlock(){

        let blok = this.windows[0].getBlock();

        for(let i = 0; i < this.windows.length - 1; i++){
            this.windows[i].setBlock(this.windows[i+1].getBlock());
        }

        this.windows[this.windows.length - 1].setBlock(this.getRandomBlock());

        return blok;
    }

    getRandomBlock(){
        if(this.helpful.length === 0){
            this.helpful = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];
        }

        let nombre = this.helpful.splice(Math.floor(Math.random()*this.helpful.length), 1)[0];

        switch (nombre) {
            case 1:
                return new Block1(0, 0);
            case 2:
                return new Block2(0, 0);
            case 3:
                return new Block3(0, 0);
            case 4:
                return new Block4(0, 0);
            case 5:
                return new Block5(0, 0);
            case 6:
                return new Block6(0, 0);
            case 7:
                return new Block7(0, 0);
            default:
                console.log("something's fucked up :) the random block is a non-existing block :(");
                return new Block3(0, 0);
        }
    }

    drawFIFO(){
        for(let i = 0; i < this.windows.length; i++){
            this.windows[i].drawCanvas();
        }
    }

    clearFIFO(){
        for(let i = 0; i < this.windows.length; i++){
            this.windows[i].clearCanvas();
        }
    }

    resetFIFO(){
        this.helpful = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];
        for(let i = 0; i < 5; i++){
            this.nextBlock();
        }
    }
}

export class GameWindow {
    constructor(context){
        this.area = new Array(10);
        for(let i = 0; i < this.area.length; i++){
            this.area[i] = new Array(20).fill(0);
        }
        this.block = undefined;
        this.ctx = context;
        this.drawing_possible = true;
    }

    setBlock(block){
        this.block = block;
    }

    getBlock(){
        return this.block;
    }

    copyGameArea(area){
        for(let i = 0; i < area.length; i++){
            for(let j = 0; j < area[i].length; j++){
                this.area[i][j] = area[i][j];
            }
        }
    }

    blockMoveLeft(){
        let allowed = true;
        let currentPositions = this.block.getLocations();
        for(let i = 0; i < currentPositions.length; i++){
            if(currentPositions[i].x - 1 < 0){
                allowed = false;
                break;
            }
        }
        if(!allowed){
            return;
        }
        for(let i = 0; i < currentPositions.length; i++){
            if(this.area[currentPositions[i].x - 1][currentPositions[i].y]){
                allowed = false;
                break;
            }
        }
        if(allowed){
            this.block.moveLeft();
        }
    }

    blockMoveRight(){
        let allowed = true;
        let currentPositions = this.block.getLocations();
        for(let i = 0; i < currentPositions.length; i++){
            if(currentPositions[i].x + 1 > 9){
                allowed = false;
                break;
            }
        }
        if(!allowed){
            return;
        }
        for(let i = 0; i < currentPositions.length; i++){
            if(this.area[currentPositions[i].x + 1][currentPositions[i].y]){
                allowed = false;
                break;
            }
        }
        if(allowed){
            this.block.moveRight();
        }
    }

    blockRotateClockwise(){
        //in blocks rotateLeft() - left is associated with clockwise rotation
        let allowed = true;
        let b = this.getBlock();
        b.rotateLeft();
        let newPositions = b.getLocations();
        for(let i = 0; i < newPositions.length; i++){
            if(newPositions[i].x < 0 || newPositions[i].x > 9 || newPositions[i].y < 0 || newPositions[i].y > 19){
                allowed = false;
                break;
            }
        }
        if(!allowed){
            b.rotateRight();
            return;
        }
        for(let i = 0; i < newPositions.length; i++){
            if(this.area[newPositions[i].x][newPositions[i].y]){
                allowed = false;
                break;
            }
        }
        if(!allowed){
            b.rotateRight();
        }
    }
    blockRotateCounterclockwise(){
        //in blocks rotateRight() - right is associated with counterclockwise rotation
        let allowed = true;
        let b = this.getBlock();
        b.rotateRight();
        let newPositions = b.getLocations();
        for(let i = 0; i < newPositions.length; i++){
            if(newPositions[i].x < 0 || newPositions[i].x > 9 || newPositions[i].y < 0 || newPositions[i].y > 19){
                allowed = false;
                break;
            }
        }
        if(!allowed){
            b.rotateLeft();
            return;
        }
        for(let i = 0; i < newPositions.length; i++){
            if(this.area[newPositions[i].x][newPositions[i].y]){
                allowed = false;
                break;
            }
        }
        if(!allowed){
            b.rotateLeft();
        }
    }

    checkIfMoveDownPossible(){
        let allowed = true;
        let currentPositions = this.block.getLocations();
        for(let i = 0; i < currentPositions.length; i++){
            if(currentPositions[i].y - 1 < 0){
                allowed = false;
                break;
            }
        }
        if(!allowed){
            return allowed;
        }
        for(let i = 0; i < currentPositions.length; i++){
            if(this.area[currentPositions[i].x][currentPositions[i].y - 1]){
                allowed = false;
                break;
            }
        }
        return allowed;
    }

    blockMoveDownByOne(){
        if(this.checkIfMoveDownPossible()){
            this.block.decrementHeight();
            return true;
        } else {
            this.blockWriteToArea();
            this.areaCleanOfFullLines();
            return false;
        }
    }

    blockMoveDownByAll(){
        while (this.checkIfMoveDownPossible()){
            this.block.decrementHeight();
        }
        this.blockWriteToArea();
        this.areaCleanOfFullLines();
    }

    blockWriteToArea(){
        let positions = this.block.getLocations();
        let number = this.block.getTypeOfBlock();
        for(let i = 0; i < positions.length; i++){
            this.area[positions[i].x][positions[i].y] = number;
        }
    }

    blockResetPosition(){
        this.block.x = 5;
        this.block.y = 18;
        this.block.rotation = 0;
    }

    areaCleanOfFullLines(){
        let found = false;
        let counter = 0;
        for(let y = 0; y < 16; y++){
            found = true;
            for(let x = 0; x < 10; x++){
                if(!this.area[x][y - counter]){
                    found = false;
                    break;
                }
            }
            if(found){
                for(let yy = y - counter; yy < 16 - counter; yy++){
                    for(let xx = 0; xx < 10; xx++){
                        this.area[xx][yy] = this.area[xx][yy + 1];
                    }
                }
                counter++;
            }
        }
    }

    areaCheckIfFixed(){
        let zeroFoundInThatColumn = false;
        for(let x = 0; x < 10; x++){
            zeroFoundInThatColumn = false;
            for(let y = 0; y < 20; y++){
                if(!zeroFoundInThatColumn && !this.area[x][y]){
                    zeroFoundInThatColumn = true;
                } else if(zeroFoundInThatColumn && this.area[x][y]){
                    return false;
                }
            }
        }
        //fixed, the level up to 28 was finished successfully
        return true;
    }

    areaCheckIfLost(){
        for(let y = 16; y < 20; y++){
            for(let x = 0; x < 10; x++){
                if(this.area[x][y]){
                    //lost
                    return true;
                }
            }
        }
        //still alive
        return false;
    }

    areaAddBottomLine(){
        for(let y = 17; y > 0; y--){
            for(let x = 0; x < 10; x++){
                this.area[x][y] = this.area[x][y - 1];
            }
        }

        let emptyIndex = Math.floor(Math.random()*10);
        for(let x = 0; x < 10; x++){
            if(x === emptyIndex){
                this.area[x][0] = 0;
            } else {
                this.area[x][0] = Math.floor(Math.random()*7) + 1;
            }
        }
    }

    clearCanvas(){
        this.ctx.clearRect(0, 0, game_canvas_width, game_canvas_height);
    }

    drawCanvas(){
        if(this.drawing_possible) {
            this.clearCanvas();

            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 20; y++) {
                    if (y > 15) {
                        this.ctx.fillStyle = game_higher_part_color;
                        this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                    }
                    switch (this.area[x][y]) {
                        case 1:
                            this.ctx.fillStyle = color_of_block1;
                            this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                            break;
                        case 2:
                            this.ctx.fillStyle = color_of_block2;
                            this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                            break;
                        case 3:
                            this.ctx.fillStyle = color_of_block3;
                            this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                            break;
                        case 4:
                            this.ctx.fillStyle = color_of_block4;
                            this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                            break;
                        case 5:
                            this.ctx.fillStyle = color_of_block5;
                            this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                            break;
                        case 6:
                            this.ctx.fillStyle = color_of_block6;
                            this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                            break;
                        case 7:
                            this.ctx.fillStyle = color_of_block7;
                            this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                            break;
                    }
                }
            }

            if (this.block) {
                let positions = this.block.getLocations();
                this.ctx.fillStyle = this.block.getColorOfBlock();
                let x = 0;
                let y = 0;
                for (let i = 0; i < 4; i++) {
                    x = positions[i].x;
                    y = positions[i].y;
                    this.ctx.fillRect(x * 28, (19 - y) * 28, 27, 27);
                }
            }

            this.ctx.strokeStyle = game_grid_color;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            for (let x = 1; x < 10; x++) {
                this.ctx.moveTo((x * 28) - 1, 0);
                this.ctx.lineTo((x * 28) - 1, game_canvas_height);
            }
            this.ctx.stroke();

            this.ctx.beginPath();
            for (let y = 1; y < 20; y++) {
                this.ctx.moveTo(0, (y * 28) - 1);
                this.ctx.lineTo(game_canvas_width, (y * 28) - 1);
            }
            this.ctx.stroke();
        }
    }

    drawInfoOnCanvas(number_of_level){
        if(number_of_level < 29){
            this.ctx.fillStyle = info_font_color;
            this.ctx.font = info_font_style;
            this.ctx.fillText(info_less_than_28, info_less_than_28_x, info_less_than_28_y);
        } else {
            this.ctx.fillStyle = info_font_color;
            this.ctx.font = info_font_style;
            this.ctx.fillText(info_more_than_28, info_more_than_28_x, info_more_than_28_y);
        }
    }

    drawOneOnCanvas(){
        this.ctx.fillStyle = info_font_color;
        this.ctx.font = start_number_font_style;
        this.ctx.fillText("1", start_number_x, start_number_y);
    }

    drawTwoOnCanvas(){
        this.ctx.fillStyle = info_font_color;
        this.ctx.font = start_number_font_style;
        this.ctx.fillText("2", start_number_x, start_number_y);
    }

    drawThreeOnCanvas(){
        this.ctx.fillStyle = info_font_color;
        this.ctx.font = start_number_font_style;
        this.ctx.fillText("3", start_number_x, start_number_y);
    }

    drawWinLevelCanvas(){
        this.clearCanvas();
        this.ctx.fillStyle = info_font_color;
        this.ctx.font = win_screen_label_font;
        this.ctx.fillText(win_screen_label, win_screen_label_x, win_screen_label_y);
    }

    drawWinCanvas(){
        this.clearCanvas();
        this.ctx.fillStyle = info_font_color;
        this.ctx.font = final_win_screen_label_font;
        this.ctx.fillText(final_win_screen_label, final_win_screen_label_x, final_win_screen_label_y);
    }

    drawLoseCanvas(){
        this.clearCanvas();
        this.ctx.fillStyle = info_font_color;
        this.ctx.font = lose_screen_label_font;
        this.ctx.fillText(lose_screen_label, lose_screen_label_x, lose_screen_label_y);

        this.ctx.font = lose_screen_label_font_q;
        this.ctx.fillText(lose_screen_label_q, lose_screen_label_q_x, lose_screen_label_q_y);

        this.ctx.font = lose_screen_label_font_r;
        this.ctx.fillText(lose_screen_label_r, lose_screen_label_r_x, lose_screen_label_r_y);
    }
}