export class Bone{

    constructor(game){
        this.game=game;
        this.bone=document.getElementById('magic_berry');
        this.boneH=200;
        this.boneW=200;
        this.x = this.game.width;
        this.y = this.game.height-100;
        this.speedX = 0;
        this.speedY = 0;

        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;

        this.sound=document.getElementById('life_collect');

    }
    
    draw(context){
    		context.drawImage(this.bone,0,0,this.boneW,this.boneH,this.x, this.y,50,50);  
            //ctx.drawImage(bone.img, bone.x, bone.y, bone.width, bone.height);	
    }


    update(deltaTime,life) {
        // Movement
        this.x -= this.game.speed;
        this.y += this.speedY;

        // Check if enemy is off screen
        if (this.x + this.width < 0)
            this.markedForDeletion = true;

        // Collision detection with player
        if (this.checkCollision(this.game.player)) {
            // increment player life if life<3
            this.sound.play();

            if(life<4)
                life+= 1;
            // Mark the bone for deletion
            this.markedForDeletion = true;

        }
        console.log("life",life);
        return life;
    }

    checkCollision(player) {
        const playerRect = { x: player.x, y: player.y, width: player.width, height: player.height };
        const boneRect = { x: this.x, y: this.y, width: this.boneW, height: this.boneH };

        return (
            playerRect.x < boneRect.x + boneRect.width &&
            playerRect.x + playerRect.width > boneRect.x &&
            playerRect.y < boneRect.y + boneRect.height &&
            playerRect.y + playerRect.height > boneRect.y
        );
    }

}