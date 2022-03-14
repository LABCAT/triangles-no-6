export default class AnimatedTriangle {
    constructor(p5, point1, point2, point3, colour1, colour2) {
        this.p = p5;
        this.canDraw = false;
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.lerpAmount = this.p.random(0.8);
        this.fillColour = this.p.lerpColor( 
            colour1, 
            colour2, 
            this.lerpAmount
        ); 
    }

    draw() {
        if(this.canDraw) {
            this.p.push();
            this.p.strokeWeight(3);
            this.p.stroke(255);
            this.p.fill(this.fillColour);
            this.p.triangle( 
                this.point1.x, 
                this.point1.y, 
                this.point2.x, 
                this.point2.y, 
                this.point3.x, 
                this.point3.y 
            );
            this.p.pop();
        }
    }
}