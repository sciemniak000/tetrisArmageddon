export class MainMenu {
    constructor(context){
        this.marked = 0;
        this.context = context;
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

    drawButtons() {

        this.context.fillStyle = "#8a0707";
        this.context.fillRect(55, 300, 170, 35);
        this.context.fillRect(55, 360, 170, 35);
        this.context.fillRect(55, 420, 170, 35);

        this.context.fillStyle = "#a431d5";
        let marked_coordinate_vertical = 300;
        if(this.marked === 1){
            marked_coordinate_vertical = 360;
        }
        if(this.marked === 2){
            marked_coordinate_vertical = 420;
        }

        this.context.fillRect(55, marked_coordinate_vertical, 170, 35);


        this.context.font = "bold 25px TimesNewRoman";
        this.context.fillStyle = "#000000";
        this.context.fillText("Play", 110, 326);

        this.context.fillText("Controls", 90, 386);

        this.context.fillText("Credits", 95, 446);

        this.context.fillStyle = "#ffffff";
        this.context.fillRect(40, 80, 200, 70);
    }

    // drawMenu() {
    //
    //     this.createMenuCanvas();
    //     this.drawButtons();
    //
    //     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // },

    // clear : function() {
    //     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // },

    drawCredits() {
        this.context.fillStyle = "#ffffff";
        this.context.fillText("Project by Przemek Indyka", 110, 256);
    }
    drawControls() {
        this.context.fillStyle = "#ffffff";
        this.context.fillText("Press space", 110, 256);
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
