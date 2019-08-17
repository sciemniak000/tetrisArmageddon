export class GameArea {
    constructor(){
        this.createTimerCanvas();
        this.createSwitchCanvas(50);
    }

    createTimerCanvas(){
        this.timer_canvas = document.createElement("canvas");
        this.timer_canvas.id = "timer_area";
        this.timer_canvas.width = 100;
        this.timer_canvas.height = 100;
        this.timer_canvas.style.border = "1px solid #d3d3d3";
        this.timer_canvas.style.backgroundColor = "#000000";
        // this.timer_canvas.style.backgroundColor = "maroon";
        this.timer_canvas.style.marginRight = "10px";
        this.timer_canvas.style.marginLeft = "10px";
        document.body.appendChild(this.timer_canvas);
    }

    createSwitchCanvas(size){
        this.switch_canvas = document.createElement("canvas");
        this.switch_canvas.id = "switch_area";
        this.switch_canvas.width = size;
        this.switch_canvas.height = size;
        this.switch_canvas.style.border = "1px solid #d3d3d3";
        this.switch_canvas.style.backgroundColor = "#000000";
        // this.timer_canvas.style.backgroundColor = "maroon";
        this.switch_canvas.style.marginRight = "10px";
        this.switch_canvas.style.marginLeft = "10px";
        document.body.appendChild(this.switch_canvas);
    }

}