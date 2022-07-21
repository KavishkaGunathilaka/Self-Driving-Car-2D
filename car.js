class Car{
    constructor(x, y, width, height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.1;
        this.maxSpeed=2;
        this.friction=0.05;
        this.angle=0;

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

        // flip left and right controls when car is reversing
        if (this.speed != 0){
            const flip = this.speed > 0 ? 1 : -1;
            
            if(this.controls.left){
                this.angle += flip*0.03;
            }
    
            if(this.controls.right){
                this.angle -= flip*0.03;
            }

        }

        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;

        this.y -= this.speed;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );

        ctx.fill();

        ctx.restore();
    }
}