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
        this.ctx.font = timer_font_style;
        this.ctx.fillStyle = timer_font_color;
        this.countdown = null;
    }

    setDistance(distance){
        this.distance = distance;
        this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
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

        this.ctx.fillText(this.minutes + " : " + this.seconds, timer_font_position_x, timer_font_position_y);
    }

    startCountdown(level){
        this.countdown = setInterval((function(self) {
            return function() {
                if(self.countdownOneSecond()){
                    clearInterval(self.countdown);
                    if(level < 29){
                        window.dispatchEvent(new Event("lose"));
                    } else {
                        window.dispatchEvent(new Event("win"));
                    }
                }
                if(self.distance >= 0) {
                    self.drawCanvas();
                }
            }
        })(this), 1000);
    }

    stopCountdown(){
        clearInterval(this.countdown);
    }
}