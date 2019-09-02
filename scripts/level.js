export class Level {
    constructor(number, map, milliseconds){
        this.number = number;
        this.area = map;
        this.distance = milliseconds;
    }

    getNumberOfLevel(){
        return this.number;
    }

    getArea(){
        return this.area;
    }

    getTimerDistance(){
        return this.distance;
    }
}