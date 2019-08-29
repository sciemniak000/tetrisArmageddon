import {GameWindow, FifoWindows, BlackWindow} from "./containters.js";
import {GameContainer} from "./game.js";
import {TetrisTimer} from "./timer.js";

export class ApplicationContainer{
    constructor(){
        let div = document.createElement("div");
        div.id = "container";
        div.style.display = "block";
        div.style.marginLeft = "auto";
        div.style.marginRight = "auto";
        div.style.width = "10px";
        div.style.height = "10px";
        document.body.appendChild(div);
        this.div2 = document.createElement("div");
        this.div2.id = "positioner";
        this.div2.style.display = "block";
        this.div2.style.marginRight = "auto";
        this.div2.style.marginLeft = "auto";
        this.div2.style.position = "relative";
        div.appendChild(this.div2);

        this.createCanvasStructure();
        this.createGameLogic();
    }

    createGameWindow(){
        let canv = document.createElement("canvas");
        canv.id = "game_area";
        canv.width = 279;
        canv.height = 559;
        canv.style.border = "1px solid #d3d3d3";
        canv.style.backgroundColor = "#000000";

        canv.style.position = "absolute";
        canv.style.left = "-135px";

        // canv.style.marginRight = "auto";
        // canv.style.marginLeft = "auto";
        // canv.style.display = "block";

        this.div2.appendChild(canv);
    }

    createBlackWindowCanvas(id){
        let canv = document.createElement("canvas");
        canv.id = id;
        canv.width = 50;
        canv.height = 50;
        canv.style.border = "1px solid #d3d3d3";
        canv.style.backgroundColor = "#000000";
        return canv;
    }

    createTimerWindow(){
        let timer_canvas = document.createElement("canvas");
        timer_canvas.id = "timer_area";
        timer_canvas.width = 100;
        timer_canvas.height = 100;
        timer_canvas.style.border = "1px solid #d3d3d3";
        timer_canvas.style.backgroundColor = "#000000";
        // this.timer_canvas.style.backgroundColor = "maroon";
        timer_canvas.style.position = "absolute";
        timer_canvas.style.bottom = "-559px";
        timer_canvas.style.left = "-250px";
        this.div2.appendChild(timer_canvas);
    }

    createSwitchWindow(){
        let sw = this.createBlackWindowCanvas("switch");
        sw.style.position = "absolute";
        sw.style.left = "-200px";
        sw.style.top = "10px";
        this.div2.appendChild(sw);
    }

    createFifoWindows(){
        let w1 = this.createBlackWindowCanvas("fifo1");
        let w2 = this.createBlackWindowCanvas("fifo2");
        let w3 = this.createBlackWindowCanvas("fifo3");
        let w4 = this.createBlackWindowCanvas("fifo4");
        let w5 = this.createBlackWindowCanvas("fifo5");

        w1.style.position = "absolute";
        w1.style.right = "-200px";
        w1.style.top = "10px";
        this.div2.appendChild(w1);

        w2.style.position = "absolute";
        w2.style.right = "-200px";
        w2.style.top = "70px";
        this.div2.appendChild(w2);

        w3.style.position = "absolute";
        w3.style.right = "-200px";
        w3.style.top = "130px";
        this.div2.appendChild(w3);

        w4.style.position = "absolute";
        w4.style.right = "-200px";
        w4.style.top = "190px";
        this.div2.appendChild(w4);

        w5.style.position = "absolute";
        w5.style.right = "-200px";
        w5.style.top = "250px";
        this.div2.appendChild(w5);
    }

    createCanvasStructure(){
        this.createGameWindow();
        this.createSwitchWindow();
        this.createTimerWindow();
        this.createFifoWindows();
    }

    createGameLogic(){
        let g = new GameWindow(document.getElementById("game_area").getContext("2d"));

        let f = new FifoWindows();
        f.addWindow(new BlackWindow(document.getElementById("fifo1").getContext("2d")));
        f.addWindow(new BlackWindow(document.getElementById("fifo2").getContext("2d")));
        f.addWindow(new BlackWindow(document.getElementById("fifo3").getContext("2d")));
        f.addWindow(new BlackWindow(document.getElementById("fifo4").getContext("2d")));
        f.addWindow(new BlackWindow(document.getElementById("fifo5").getContext("2d")));

        let s = new BlackWindow(document.getElementById("switch").getContext("2d"));

        let t = new TetrisTimer(document.getElementById("timer_area").getContext("2d"));

        this.game = new GameContainer(g, f, s, t);
    }
}