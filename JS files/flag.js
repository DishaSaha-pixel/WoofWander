export class Flag{

    constructor(game){
        this.game=game;
        this.flag=document.getElementById('flag');
        this.flagH=519;
        this.flagW=481;
        this.x = this.game.width;
        this.y = this.game.height;
        this.speedX = 0;
        this.speedY = 0;

        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.collide=false;
        this.sound=document.getElementById('life_collect');

    }
    
    draw(context){
    		context.drawImage(this.flag,0,0,this.flagW,this.flagH,this.x,650,150,200);  
    }


    update(deltaTime) {
        // Movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

      

        // Collision detection with player
       /* if (this.checkCollision(this.game.player)) {
            this.sound.play();
            this.collide=true;
            // Mark the bone for deletion
            this.markedForDeletion = true;

        }*/
        //console.log("life",life);
        //return this.collide;//this.checkCollision(this.game.player);
    }

    checkCollision(player) {
        const playerRect = { x: player.x, y: player.y, width: player.width, height: player.height };
        const flagRect = { x: this.x, y: this.y, width: this.flagW, height: this.flagH };

        return (
            playerRect.x < flagRect.x + flagRect.width &&
            playerRect.x + playerRect.width > flagRect.x 
        );
    }

}