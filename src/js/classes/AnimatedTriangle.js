export default class AnimatedTriangle {
    constructor(p5, point1, point2, point3, colour1, colour2, lifetime = 1000) {
        this.p = p5;
        this.canDraw = false;
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.centerX = (this.point1.x + this.point2.x + this.point3.x) / 3;
        this.centerY = (this.point1.y + this.point2.y + this.point3.y) / 3;
        this.origin = this.p.createVector(this.centerX, this.centerY);
        this.lerpAmount = this.p.random(0.8);
        this.fillColour = this.p.lerpColor( 
            colour1, 
            colour2, 
            this.lerpAmount
        ); 
        this.currentFrame = 0;
        this.setLifeTime(lifetime);
    }

    setLifeTime(lifetime) {
        const frameRate = this.p.getFrameRate() ? this.p.getFrameRate() : 60;
        this.totalFrames = frameRate / 1000 * lifetime;
    }

    draw() {
        if(this.canDraw) {
            let point1 = this.point1;
            let point2 = this.point2;
            let point3 = this.point3;

            if(this.currentFrame < this.totalFrames){
                const scale = this.p.min(1, this.currentFrame / this.totalFrames),
                    dist1 = window.p5.Vector.sub(this.point1, this.origin).mult(scale),
                    dist2 = window.p5.Vector.sub(this.point2, this.origin).mult(scale),
                    dist3 = window.p5.Vector.sub(this.point3, this.origin).mult(scale);
                point1 = window.p5.Vector.add(this.origin, dist1);
                point2 = window.p5.Vector.add(this.origin, dist2);
                point3 = window.p5.Vector.add(this.origin, dist3);
            }

            this.p.push();
            this.p.strokeWeight(3);
            this.p.stroke(255);
            this.p.fill(this.fillColour);
            this.p.triangle( 
                point1.x, 
                point1.y, 
                point2.x, 
                point2.y, 
                point3.x, 
                point3.y 
            );
            this.p.pop();
            this.currentFrame++;
        }
    }
}