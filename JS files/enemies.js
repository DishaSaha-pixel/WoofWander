import { CollisionAnimation } from "./collisionAnimation.js";

export class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
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
            this.sound.play();
            // Handle collision with player (redirect to game over page, etc.)
           // window.location.href = "game_lose.html";
           life-=1;
        }  
        return life;
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

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 134;
        this.height = 186;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = 50;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 9;
        this.image = document.getElementById('enemy_fly');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 119;
        this.height = 181;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin +30;
        this.image = document.getElementById('enemy_plant');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);

        // Collision detection with player
        if (this.checkCollision(this.game.player)) {
            // Decrement player life
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

