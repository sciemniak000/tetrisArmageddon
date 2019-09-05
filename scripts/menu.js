import {
    controls_text_position_x,
    controls_text_position_y,
    credits_text_position_x,
    credits_text_position_y,
    game_canvas_height,
    game_canvas_width,
    menu_button_distance_y,
    menu_button_font,
    menu_button_starting_y,
    menu_button_text_color,
    menu_buttons_color,
    menu_buttons_height,
    menu_buttons_width,
    menu_buttons_x,
    menu_logo_position_x,
    menu_logo_position_y,
    menu_marked_button_color,
    play_text_position_x,
    play_text_position_y,
    interspace_horizontal,
    interspace_vertical,
    margin_vertical,
    size_of_tile,
    number_of_level_font,
    number_of_level_x_1_digit,
    number_of_level_x_2_digit,
    number_of_level_y_1_digit,
    number_of_level_y_2_digit
} from "./configuration.js";

export class MenuContainer {
    constructor(context){
        this.marked = 0;
        this.inMenu = true;
        this.ctx = context;
        this.chooseLevels = new ChooseLevelScreen(context);
    }

    // createMenuCanvas : function(){
    //     this.canvas.width = 279;
    //     this.canvas.height = 559;
    //     this.canvas.style.border = "1px solid #d3d3d3";
    //     this.canvas.style.backgroundColor = "#000000";
    //     this.canvas.style.marginLeft = "auto";
    //     this.canvas.style.marginRight = "auto";
    //     this.canvas.style.marginTop = "30px";
    //     this.canvas.style.marginBottom = "30px";
    //     this.canvas.style.display = "block";
    // },

    clearCanvas(){
        this.ctx.clearRect(0, 0, game_canvas_width, game_canvas_height);
    }

    drawMenu() {
        this.clearCanvas();

        this.ctx.fillStyle = menu_buttons_color;
        this.ctx.fillRect(menu_buttons_x, menu_button_starting_y, menu_buttons_width, menu_buttons_height);
        this.ctx.fillRect(menu_buttons_x, menu_button_starting_y + menu_buttons_height + menu_button_distance_y,
            menu_buttons_width, menu_buttons_height);
        this.ctx.fillRect(menu_buttons_x, menu_button_starting_y + 2*(menu_buttons_height + menu_button_distance_y),
            menu_buttons_width, menu_buttons_height);

        this.ctx.fillStyle = menu_marked_button_color;
        let marked_coordinate_vertical = menu_button_starting_y +
            this.marked*(menu_buttons_height + menu_button_distance_y);

        this.ctx.fillRect(menu_buttons_x, marked_coordinate_vertical, menu_buttons_width, menu_buttons_height);


        this.ctx.font = menu_button_font;
        this.ctx.fillStyle = menu_button_text_color;
        this.ctx.fillText("Play", play_text_position_x, play_text_position_y);

        this.ctx.fillText("Controls", controls_text_position_x, controls_text_position_y);

        this.ctx.fillText("Credits", credits_text_position_x, credits_text_position_y);

        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(menu_logo_position_x, menu_logo_position_y, 200, 70);
    }

    drawCredits() {
        this.clearCanvas();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText("Project by Przemek Indyka", 110, 256);
    }
    drawControls() {
        this.clearCanvas();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText("Press space", 110, 256);
    }

    nextButton(){
        this.marked = (this.marked + 1) % 3;
        this.drawMenu();
    }

    previousButton(){
        this.marked = (this.marked - 1 + 3) % 3;
        this.drawMenu();
    }

    resetButtonPosition(){
        this.marked = 0;
    }

    enterMenu(reset){
        if(reset) {
            this.resetButtonPosition();
        }
        this.drawMenu();
    }
}

class ChooseLevelScreen {
    constructor(context){
        this.ctx = context;
        this.marked = 0;
    }

    clearCanvas(){
        this.ctx.clearRect(0, 0, game_canvas_width, game_canvas_height);
    }

    drawCanvas(){
        this.clearCanvas();
        this.ctx.fillStyle = menu_buttons_color;
        for(let i = 0; i <= 9; i++){
            for(let j = -1; j <= 1; j++){
                this.ctx.fillRect(Math.floor(game_canvas_width / 2) - Math.floor(size_of_tile / 2)
                + j * (size_of_tile + interspace_horizontal),
                    margin_vertical + i * (size_of_tile + interspace_vertical),
                    size_of_tile, size_of_tile);
            }
        }

        this.ctx.fillStyle = menu_marked_button_color;
        let j = this.marked % 3 - 1;
        let i = Math.floor(this.marked / 3);
        this.ctx.fillRect(Math.floor(game_canvas_width / 2) - Math.floor(size_of_tile / 2)
            + j * (size_of_tile + interspace_horizontal),
            margin_vertical + i * (size_of_tile + interspace_vertical),
            size_of_tile, size_of_tile);

        this.ctx.fontStyle = number_of_level_font;
        this.ctx.fillStyle = "black";

        let number_of_level_x = 0;
        let number_of_level_y = 0;

        for(let i = 0; i <= 9; i++){
            if(i < 3){
                number_of_level_x = number_of_level_x_1_digit;
                number_of_level_y = number_of_level_y_1_digit;
            } else {
                number_of_level_x = number_of_level_x_2_digit;
                number_of_level_y = number_of_level_y_2_digit;
            }
            for(let j = -1; j <= 1; j++){
                this.ctx.fillText(i * 3 + j + 2,Math.floor(game_canvas_width / 2) - Math.floor(size_of_tile / 2)
                    + j * (size_of_tile + interspace_horizontal) + number_of_level_x,
                    margin_vertical + i * (size_of_tile + interspace_vertical) + number_of_level_y);
            }
        }
    }

    markedMoveDown(){
        this.marked = (this.marked + 3) % 30;
        this.drawCanvas();
    }

    markedMoveUp(){
        this.marked = (this.marked - 3 + 30) % 30;
        this.drawCanvas();
    }

    markedMoveLeft(){
        this.marked = Math.floor(this.marked / 3) * 3 + ((this.marked % 3) - 1 + 3) % 3;
        this.drawCanvas();
    }

    markedMoveRight(){
        this.marked = Math.floor(this.marked / 3) * 3 + ((this.marked % 3) + 1) % 3;
        this.drawCanvas();
    }

    resetMarkedPosition(){
        this.marked = 0;
    }

    getIndexOfChosenLevel(){
        return this.marked;
    }
}
