
import { CollisionAnimation } from "./collisionAnimation.js";
import { ROLLING, INVISIBILITY } from "./playerStates.js";

export class Enemy {
    constructor(game) {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 10;
        this.frameInterval = 1500 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.sound = document.getElementById('collision_sound');
    }

    update(deltaTime) {
        // Movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

        // Animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.frameX = (this.frameX < this.maxFrame) ? this.frameX + 1 : 0;
        } else {
            this.frameTimer += deltaTime;
        }

        // Check if enemy is off screen
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    checkCollision(player) {
        const playerRect = { x: player.x, y: player.y, width: player.width, height: player.height };
        const enemyRect = { x: this.x, y: this.y, width: this.width, height: this.height };

        return (
            playerRect.x < enemyRect.x + enemyRect.width &&
            playerRect.x + playerRect.width > enemyRect.x &&
            playerRect.y < enemyRect.y + enemyRect.height &&
            playerRect.y + playerRect.height > enemyRect.y
        );
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.fwidth = 92;
        this.fheight = 82;
        this.width=400;
        this.height=400;
        this.x = this.game.width;
        this.y = this.game.height - this.fheight - this.game.groundMargin - 200;
        this.walkSprite = document.getElementById('enemy_bear1');
        this.attackSprite = document.getElementById('enemy_bear2');
        this.speedX = 3;
        this.speedY = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.moving = false;
        this.attacking = false;
        this.attackTimer = 0; // add a timer to control attack duration
    }

    draw(context) {
        //context.strokeRect(this.x,this.y,this.width,this.height);

        let sprite = this.attacking? this.attackSprite : this.walkSprite;
        context.drawImage(sprite, this.frameX * this.fwidth, 0, this.fwidth, this.fheight, this.x, this.y, 400, 400);
    }

    update(deltaTime) {
        super.update(deltaTime);

        if (this.attacking) {
            // if attacking, decrement the attack timer
            this.attackTimer -= deltaTime;
            console.log(this.attackTimer);
            if (this.checkCollision(this.game.player)) {
              //   console.log("Roll cooollll!");
    
                if (this.game.player.isOnRoll()) {
                    this.sound.play();
                    this.markedForDeletion = true;
                   this.game.collisions.push(new CollisionAnimation(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5));
                   this.game.bearcount-=1;
                   this.game.bearkills=false;
    
                 }  
                else if(this.game.player.isVisible()) {
                    this.sound.play();
                    this.game.life -= 2;
                    this.markedForDeletion = true;
                    this.game.bearkills=true;
                   // console.log("visible!");
                   this.game.collisions.push(new CollisionAnimation(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
    
                }
                else
                    this.game.bearkills=false;
            } 

            if (this.attackTimer <= 0) {
                this.attacking = false;
                this.attackTimer = 0; // reset the timer
            }
            return;
        }
    
        // check if the player is within attack range
        if(this.game.player.isVisible()){
        const playerCenterX = this.game.player.x + this.game.player.width ;
        const enemyCenterX = this.x + this.fwidth ;
        const distance = Math.abs(playerCenterX - enemyCenterX);
        if (distance < 200 && distance > 100) { // adjust these values to your desired attack range 
           // this.speedX = 0; // stop the bear from moving
            this.attacking = true;
            this.attackTimer = 1000; // set the attack timer to 1 second (adjust to your desired attack duration)
        } else {
            //this.x += this.speedX;
            if (this.x > this.game.width) 
                this.x = -this.fwidth;
        }
    }
        else{
            this.speedX=3;
        }

    
    }
}
export class FlyingEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.width = 134;
        this.height = 186;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.50;
        this.speedX = Math.random() * 4 + 2;
        this.speedY = 0;
        this.maxFrame = 9;
        this.image = document.getElementById('enemy_fly');
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;

        
    }

    draw(context) {
               // context.strokeRect(this.x,this.y,this.width,this.height);

        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.x -= this.speedX;
        this.y += 5 * Math.sin(this.angle);
        this.angle += this.angleSpeed;


        if (this.checkCollision(this.game.player)) {
            if (this.game.player.isVisible()) {
                this.sound.play();
                this.game.life -= 1;
                this.game.collisions.push(new CollisionAnimation(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5));
                if (this.game.life <= 0) {
                    console.log("Game Over: You lost the level!");
                    // Redirect to game over page
                    // window.location.href = "game_over.html";
                }
                this.markedForDeletion = true;
            }
        }
    }


}



export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = document.getElementById('enemy_spider_big');
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }

    draw(context) {
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width / 2, 0);
        context.lineTo(this.x + this.width / 2, this.y + 50);
        context.stroke();
        context.strokeStyle="white";
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin)
            this.speedY *= -1;
        if (this.y < -this.height)
            this.markedForDeletion = true;

        if (this.checkCollision(this.game.player)) {
            if (this.game.player.isVisible()) {
                this.sound.play();
                this.game.life -= 1;
                this.game.collisions.push(new CollisionAnimation(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5));
                if (this.game.life <= 0) {
                    console.log("Game Over: You lost the level!");
                    // Redirect to game over page
                    // window.location.href = "game_over.html";
                }
                this.markedForDeletion = true;
            }
        }
    }
}
