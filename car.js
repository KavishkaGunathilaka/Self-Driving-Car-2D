class Car{
    constructor(x, y, width, height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.1;
        this.maxSpeed=3;
        this.friction=0.05;

        this.controls=new Controls();
    }

    update(){
        if(this.controls.forward){
            this.speed += this.acceleration;
        }

        if(this.controls.reverse){
            this.speed -= this.acceleration;
        }

        // capping the top speed
        if (this.speed > this.speed){
            this.speed = this.maxSpeed;
        }

        // reversing speed is maxSpeed/2
        if (this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }

        if (this.speed > 0){
            this.speed -= this.friction;
        }

        if (this.speed < 0){
            this.speed += this.friction;
        }

        // this avoids car moving due to friction force when its speed = 0
        if (Math.abs(this.speed) < this.friction){
            this.speed=0;
        }

        this.y -= this.speed;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(
            this.x-this.width/2,
            this.y-this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
    }
}