import { CollisionAnimation } from "./collisionAnimation.js";
import { INVISIBILITY } from "./playerStates.js";

export class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 7;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;

        this.sound=document.getElementById('collision_sound');

    }

    update(deltaTime,life) {
        // Movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

        // Animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame)
                this.frameX++;
            else
                this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        // Check if enemy is off screen
        if (this.x + this.width < 0)
            this.markedForDeletion = true;

        // Collision detection with player
        if (this.checkCollision(this.game.player)) {
            //this.sound.play();
            // Handle collision with player (redirect to game over page, etc.)
           // window.location.href = "game_lose.html";
           life-=1;
        }  
        return life;
    }

    
    checkCollision(player) {
        const playerRect = { x: player.x, y: player.y, width: player.width, height: player.height };
        const enemyRect = { x: this.x, y: this.y, width: this.width-50, height: this.height };

        return (
            playerRect.x < enemyRect.x + enemyRect.width &&
            playerRect.x + playerRect.width > enemyRect.x &&
            playerRect.y < enemyRect.y + enemyRect.height &&
            playerRect.y + playerRect.height > enemyRect.y
        );
    }
}

export class GroundEnemy1 extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 200;
        this.height = 400;
        this.x = this.game.width;
        this.y = this.game.height - this.game.groundMargin-200;
        this.image = document.getElementById('enemy2');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 7;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width/2, this.height/2);
    }

    update(deltaTime) {
        super.update(deltaTime);

        // Collision detection with player
        if (this.checkCollision(this.game.player)) {
            if (this.game.player.isVisible()) {
            // Decrement player life
            this.sound.play();
            this.game.life -= 1;
            this.game.collisions.push(new CollisionAnimation(this.game,this.x + this.width * 0.5 , this.y + this.height *0.5));
            // Mark the enemy for deletion
            this.markedForDeletion = true;
           
            // Check if player has no lives left
            if (this.game.life <= 0) {
                // Redirect to game over page
                // window.location.href = "game_over.html";
                console.log("Game Over: You lost the level!");
            }
        }
    }
}
}
export class GroundEnemy2 extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=200;
        this.height=331;
        this.x=this.game.width;
        this.y=this.game.height - this.game.groundMargin-150;
        this.image = document.getElementById('enemy1');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 8;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width/2, this.height/2);
    }

    update(deltaTime) {
        super.update(deltaTime);

        // Collision detection with player
        if (this.checkCollision(this.game.player)) {
            if (this.game.player.isVisible()) {
            // Decrement player life
            this.game.life -= 1;
            this.sound.play();
            this.game.collisions.push(new CollisionAnimation(this.game,this.x + this.width * 0.5 , this.y + this.height *0.5));
            // Mark the enemy for deletion
            this.markedForDeletion = true;
           
            // Check if player has no lives left
            if (this.game.life <= 0) {
                // Redirect to game over page
                // window.location.href = "game_over.html";
                console.log("Game Over: You lost the level!");
            }
        }
    }
    }
}
export class GroundEnemy3 extends Enemy{   //black snakeeee
    constructor(game){
        super();
        this.game=game;
        this.width=112.2;
        this.height=102;
        this.x=this.game.width;
        this.y=this.game.height - this.game.groundMargin-150;
        this.image = document.getElementById('enemy3');
        this.speedX = 1.8;
        this.speedY = 0;
        this.maxFrame = 9;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 1, this.width, this.height, this.x, this.y, 300, 250);
    }

    update(deltaTime) {
        super.update(deltaTime);

        // Collision detection with player
        if (this.checkCollision(this.game.player)) {
            if (this.game.player.isVisible()) {
            // Decrement player life
            this.sound.play();
            this.game.life -= 2;
            this.game.collisions.push(new CollisionAnimation(this.game,this.x + this.width * 0.5 , this.y + this.height *0.5));
            // Mark the enemy for deletion
            this.markedForDeletion = true;
           
            // Check if player has no lives left
            if (this.game.life <= 0) {
                // Redirect to game over page
                // window.location.href = "game_over.html";
                console.log("Game Over: You lost the level!");
            }
        }
        }
    }
}
export class GroundEnemy4 extends Enemy{    //brown snakee
    constructor(game){
        super();
        this.game=game;
        this.width=113.2;
        this.height=92;
        this.x=this.game.width;
        this.y=this.game.height - this.game.groundMargin-150;
        this.image = document.getElementById('enemy4');
        this.speedX = 2.5;
        this.speedY = 0;
        this.maxFrame = 10;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, 300, 250);
    }

    update(deltaTime) {
        super.update(deltaTime);

        // Collision detection with player
        if (this.checkCollision(this.game.player)) {
            if (this.game.player.isVisible()) {
            // Decrement player life
            this.game.life -= 1;
            this.sound.play();
            this.game.collisions.push(new CollisionAnimation(this.game,this.x + this.width * 0.5 , this.y + this.height *0.5));
            // Mark the enemy for deletion
            this.markedForDeletion = true;
           
            // Check if player has no lives left
            if (this.game.life <= 0) {
                // Redirect to game over page
                // window.location.href = "game_over.html";
                console.log("Game Over: You lost the level!");
            }
        }
        }
    }
}