import {GameWindow, FifoWindows, BlackWindow} from "./containters.js";
import {GameContainer} from "./game.js";
import {TetrisTimer} from "./timer.js";
import {
    black_window_size,
    canvas_background_color,
    canvas_border_style, fifo_canvas_id_1,
    fifo_canvas_id_2,
    fifo_canvas_id_3,
    fifo_canvas_id_4, fifo_canvas_id_5,
    fifo_canvas_right,
    fifo_canvas_top_top,
    fifo_space_between,
    game_canvas_height,
    game_canvas_id,
    game_canvas_left,
    game_canvas_width,
    switch_canvas_id,
    switch_canvas_left,
    switch_canvas_top,
    timer_canvas_bottom,
    timer_canvas_height,
    timer_canvas_id,
    timer_canvas_left,
    timer_canvas_width
} from "./configuration.js";

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
        canv.id = game_canvas_id;
        canv.width = game_canvas_width;
        canv.height = game_canvas_height;
        canv.style.border = canvas_border_style;
        canv.style.backgroundColor = canvas_background_color;

        canv.style.position = "absolute";
        canv.style.left = game_canvas_left;

        this.div2.appendChild(canv);
    }

    createBlackWindowCanvas(id){
        let canv = document.createElement("canvas");
        canv.id = id;
        canv.width = black_window_size;
        canv.height = black_window_size;
        canv.style.border = canvas_border_style;
        canv.style.backgroundColor = canvas_background_color;
        return canv;
    }

    createTimerWindow(){
        let timer_canvas = document.createElement("canvas");
        timer_canvas.id = timer_canvas_id;
        timer_canvas.width = timer_canvas_width;
        timer_canvas.height = timer_canvas_height;
        timer_canvas.style.border = canvas_border_style;
        timer_canvas.style.backgroundColor = canvas_background_color;
        timer_canvas.style.position = "absolute";
        timer_canvas.style.bottom = timer_canvas_bottom;
        timer_canvas.style.left = timer_canvas_left;
        this.div2.appendChild(timer_canvas);
    }

    createSwitchWindow(){
        let sw = this.createBlackWindowCanvas(switch_canvas_id);
        sw.style.position = "absolute";
        sw.style.left = switch_canvas_left;
        sw.style.top = switch_canvas_top;
        this.div2.appendChild(sw);
    }

    createFifoWindows(){
        let w1 = this.createBlackWindowCanvas(fifo_canvas_id_1);
        let w2 = this.createBlackWindowCanvas(fifo_canvas_id_2);
        let w3 = this.createBlackWindowCanvas(fifo_canvas_id_3);
        let w4 = this.createBlackWindowCanvas(fifo_canvas_id_4);
        let w5 = this.createBlackWindowCanvas(fifo_canvas_id_5);

        w1.style.position = "absolute";
        w1.style.right = fifo_canvas_right;
        w1.style.top = fifo_canvas_top_top + "px";
        this.div2.appendChild(w1);

        w2.style.position = "absolute";
        w2.style.right = fifo_canvas_right;
        w2.style.top = fifo_canvas_top_top + black_window_size + fifo_space_between + "px";
        this.div2.appendChild(w2);

        w3.style.position = "absolute";
        w3.style.right = fifo_canvas_right;
        w3.style.top = fifo_canvas_top_top + (black_window_size + fifo_space_between) * 2 + "px";
        this.div2.appendChild(w3);

        w4.style.position = "absolute";
        w4.style.right = fifo_canvas_right;
        w4.style.top = fifo_canvas_top_top + (black_window_size + fifo_space_between) * 3 + "px";
        this.div2.appendChild(w4);

        w5.style.position = "absolute";
        w5.style.right = fifo_canvas_right;
        w5.style.top = fifo_canvas_top_top + (black_window_size + fifo_space_between) * 4 + "px";
        this.div2.appendChild(w5);
    }

    createCanvasStructure(){
        this.createGameWindow();
        this.createSwitchWindow();
        this.createTimerWindow();
        this.createFifoWindows();
    }

    createGameLogic(){
        let g = new GameWindow(document.getElementById(game_canvas_id).getContext("2d"));

        let f = new FifoWindows();
        f.addWindow(new BlackWindow(document.getElementById(fifo_canvas_id_1).getContext("2d")));
        f.addWindow(new BlackWindow(document.getElementById(fifo_canvas_id_2).getContext("2d")));
        f.addWindow(new BlackWindow(document.getElementById(fifo_canvas_id_3).getContext("2d")));
        f.addWindow(new BlackWindow(document.getElementById(fifo_canvas_id_4).getContext("2d")));
        f.addWindow(new BlackWindow(document.getElementById(fifo_canvas_id_5).getContext("2d")));

        let s = new BlackWindow(document.getElementById(switch_canvas_id).getContext("2d"));

        let t = new TetrisTimer(document.getElementById(timer_canvas_id).getContext("2d"));

        this.game = new GameContainer(g, f, s, t);
    }
}