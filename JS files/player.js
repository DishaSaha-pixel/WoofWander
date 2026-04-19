/*import { IDLE, RUNNING ,JUMPING,FALLING,ROLLING,INVISIBILITY} from "./playerStates.js";
export class Player{
    constructor(game){
        this.game=game;
        this.width=85;
        this.height=79;
        this.x=0;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.vy=1;
        this.weight=1.4;
        this.image=document.getElementById('player');
        this.frameX=0;
        this.frameY=0;
        this.maxFrame=6;
        this.fps=10;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.speed=0;
        this.maxSpeed=10;
        this.states=[new IDLE(this.game), new RUNNING(this.game),new JUMPING(this.game),new FALLING(this.game),new ROLLING(this.game),new INVISIBILITY(this.game)];
        
    }
    update(input,deltaTime){

        this.currentState.handleInput(input)
        //horizontal movement
        this.x+=this.speed;

        if(input.includes('ArrowRight')) 
            this.speed=this.maxSpeed;
        else if(input.includes('ArrowLeft')) 
            this.speed=-this.maxSpeed;
        else 
            this.speed=0;
        if(this.x<0) 
            this.x=0;
        if(this.x>this.game.width-this.width)
            this.x=this.game.width-this.width;
        //vertical 
        
        //if(input.includes('ArrowUp')&& this.onGround())
         //   this.vy-=22;
        this.y+=this.vy;
        if(!this.onGround())
            this.vy+=this.weight;
        else
            this.vy=0;
         //sprite animations
        if(this.frameTimer > this.frameInterval){
            this.frameTimer=0;
            if(this.frameX < this.maxFrame)
            this.frameX++;
        else
            this.frameX=0;
        
        }else{
            this.frameTimer+=deltaTime;
        }
    }
    draw(context){
        if(this.game.debug) //context.strokeRect(this.x,this.y,150,150);
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,150,150);
    }
    onGround(){
        return this.y >= this.game.height-this.height-this.game.groundMargin;
    }
    setState(state,speed){
        this.currentState=this.states[state];
        this.game.speed=this.game.maxSpeed*speed;
        this.currentState.enter();
    }



    isVisible() {
        return !(this.currentState instanceof INVISIBILITY);
    }
}
*/

import { IDLE, RUNNING ,JUMPING,FALLING,ROLLING,INVISIBILITY} from "./playerStates.js";
export class Player{
    constructor(game){
        this.game=game;
        this.width=85;
        this.height=79;
        this.x=0;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.vy=1;
        this.weight=1.4;
        this.image=document.getElementById('player');
        this.frameX=0;
        this.frameY=0;
        this.maxFrame=6;
        this.fps=10;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.speed=0;
        this.maxSpeed=10;
        this.states=[new IDLE(this.game), new RUNNING(this.game),new JUMPING(this.game),new FALLING(this.game),new ROLLING(this.game),new INVISIBILITY(this.game)];
        
    }
    update(input,deltaTime){

        this.currentState.handleInput(input)
        //horizontal movement
        this.x+=this.speed;

        if(input.includes('ArrowRight')) 
            this.speed=this.maxSpeed;
        else if(input.includes('ArrowLeft')) 
            this.speed=-this.maxSpeed;
        else 
            this.speed=0;
        if(this.x<0) 
            this.x=0;
        if(this.x>this.game.width-this.width)
            this.x=this.game.width-this.width;
        //vertical 
        
        //if(input.includes('ArrowUp')&& this.onGround())
         //   this.vy-=22;
        this.y+=this.vy;
        if(!this.onGround())
            this.vy+=this.weight;
        else
            this.vy=0;
         //sprite animations
        if(this.frameTimer > this.frameInterval){
            this.frameTimer=0;
            if(this.frameX < this.maxFrame)
            this.frameX++;
        else
            this.frameX=0;
        
        }else{
            this.frameTimer+=deltaTime;
        }
    }
    draw(context){
        if(this.game.debug) //context.strokeRect(this.x,this.y,150,150);
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,150,150);
    }
    onGround(){
        return this.y >= this.game.height-this.height-this.game.groundMargin;
    }
    setState(state,speed){
        this.currentState=this.states[state];
        this.game.speed=this.game.maxSpeed*speed;
        this.currentState.enter();
    }



    isVisible() {
        return !(this.currentState instanceof INVISIBILITY);
    }

    isOnRoll() {
        return (this.currentState instanceof ROLLING);
    }
}