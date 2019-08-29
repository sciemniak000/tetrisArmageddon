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
        this.ctx.clearRect(0, 0, 100, 100);
    }

    drawCanvas() {
        this.clearCanvas();

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "25px Georgia";

        this.ctx.fillText(this.minutes + " : " + this.seconds, 5, 65);
    }


}