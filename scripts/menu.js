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
    play_text_position_y
} from "./configuration.js";

export class MenuContainer {
    constructor(context){
        this.marked = 0;
        this.inMenu = true;
        this.ctx = context;
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
        this.marked = (this.marked - 1) % 3;
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

// var listener_menu_1 = function(event){
//     if(event.which === 38) {
//         myMenu.marked = (myMenu.marked - 1 + 3) % 3;
//         myMenu.clear();
//         myMenu.drawMenu();
//     } else if(event.which === 40){
//         myMenu.marked = (myMenu.marked + 1) % 3;
//         myMenu.clear();
//         myMenu.drawMenu();
//     } else if(event.which === 32){
//         if(myMenu.marked === 1){
//             document.removeEventListener("keydown", listener_menu_1);
//             myMenu.clear();
//             myMenu.drawControls();
//             document.addEventListener("keydown", listener_menu_2);
//         } else if(myMenu.marked === 2){
//             document.removeEventListener("keydown", listener_menu_1);
//             myMenu.clear();
//             myMenu.drawCredits();
//             document.addEventListener("keydown", listener_menu_2);
//         }
//     }
// };
//
// var listener_menu_2 = function(event) {
//     if(event.which === 32){
//         myMenu.clear();
//         document.removeEventListener("keydown", listener_menu_2);
//         myMenu.marked = 0;
//         myMenu.drawMenu();
//         document.addEventListener("keydown", listener_menu_1);
//     }
// };
//
// myMenu.drawMenu();
// document.addEventListener("DOMContentLoaded", function f(event) {
//
//     document.addEventListener("keydown", listener_menu_1);
//
// });
