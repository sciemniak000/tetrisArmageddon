export class TetrisTimer {
    constructor(){
        this.distance = 0;
        this.minutes = 0;
        this.seconds = 0;
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

    createCanvas(){
        let canv = document.createElement("canvas");
        canv.id = "timer_area";
        canv.width = 100;
        canv.height = 100;
        canv.style.border = "1px solid #d3d3d3";
        canv.style.backgroundColor = "#000000";
        canv.style.marginRight = "10px";
        canv.style.marginLeft = "10px";
        document.body.appendChild(canv);
        this.ctx = canv.getContext("2d");
    }

    clearCanvas(){
        this.ctx.clearRect(0, 0, 100, 100);
    }

    drawCanvas() {
        this.clearCanvas();

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "50px Georgia";

        this.ctx.fillText(this.minutes + " " + this.seconds, 5, 65);
    }


}