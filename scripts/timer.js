import {
    timer_canvas_height,
    timer_canvas_width,
    timer_font_color,
    timer_font_position_x, timer_font_position_y,
    timer_font_style
} from "./configuration.js";

export class TetrisTimer {
    constructor(context){
        this.distance = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.ctx = context;
    }

    setDistance(distance){
        this.distance = distance;
    }

    countdownOneSecond(){
        this.distance -= 1000;

        this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

        //true if the time has come
        return this.distance < 0;
    }

    clearCanvas(){
        this.ctx.clearRect(0, 0, timer_canvas_width, timer_canvas_height);
    }

    drawCanvas() {
        this.clearCanvas();

        this.ctx.fillStyle = timer_font_color;
        this.ctx.font = timer_font_style;

        this.ctx.fillText(this.minutes + " : " + this.seconds, timer_font_position_x, timer_font_position_y);
    }


}