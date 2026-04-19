import {Dust, Fire} from './particle.js';

export const states={
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    INVISIBILITY: 5,
}
class State{
    constructor(state,game){
        this.state=state;
        this.game=game;
    }
}
export class IDLE extends State{
    constructor(game){
       // super('IDLE',game);
       super(states.IDLE, game);
       
    }
    enter(){
        this.game.player.width=87;
        this.game.player.maxFrame=1;
        this.game.player.frameX=0;
        this.game.player.frameY=0;
    }
    handleInput(input){
        if(input.includes('ArrowLeft')|| input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING,3);
        }else if(input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING,2);
        }else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING,6);
        }else if(input.includes('i')){
            this.game.player.setState(states.INVISIBILITY,0);
        }
    }
}
export class RUNNING extends State{
    constructor(game){
        //super('RUNNING',game);
        super(states.RUNNING, game);

    }
    enter(){
        this.game.player.width=87;
        this.game.player.maxFrame=5;
        this.game.player.frameX=0;
        this.game.player.frameY=1;
    }
    handleInput(input){
        // if(input.includes('ArrowLeft')|| input.includes('ArrowRight')){
        //     this.game.player.setState(states.RUNNING);
        // }
        this.game.particles.unshift(new Dust(this.game,this.game.player.x + this.game.player.width*0.8,this.game.player.y+this.game.player.height*1.2));
        if(input.includes('ArrowDown')){
            this.game.player.setState(states.IDLE,0);
        }
        else if(input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING,2);
        }
        else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING,6);
        }else if(input.includes('i')){
            this.game.player.setState(states.INVISIBILITY,0);
        }
        // else{
        // this.game.player.setState(states.IDLE,0);}
    }
}
export class JUMPING extends State{
    constructor(game){
        //super('JUMPING',game);
        super(states.JUMPING, game);
    }
    enter(){
        if(this.game.player.onGround())
            this.game.player.vy-=30;
        this.game.player.maxFrame=3;
        this.game.player.frameX=0;
        this.game.player.frameY=2;
    }
    handleInput(input){
        if(input.includes('ArrowRight')){
                this.game.player.setState(states.FALLING,2);
            }
        else if(this.game.player.vy>this.game.player.weight){
            this.game.player.setState(states.FALLING,2);
        }
        else if(input.includes('Enter')){
             this.game.player.setState(states.ROLLING,6);
        }
        else if(input.includes('i')){
            this.game.player.setState(states.INVISIBILITY,0);
        }
    }
}
export class FALLING extends State{
        constructor(game){
            //super('FALLING',game);
            super(states.FALLING, game);
        }
        enter(){
            this.game.player.maxFrame=3;
            this.game.player.frameX=0;
            this.game.player.frameY=3;
        }
        handleInput(input){
            
            if(this.game.player.onGround){
                this.game.player.setState(states.IDLE,0);
            }
        }
}
export class ROLLING extends State{
    constructor(game){
        //super('ROLLING',game);
        super(states.ROLLING, game);
    }
    enter(){
        this.game.player.width=70;
        this.game.player.width=76;
        this.game.player.maxFrame=6;
        this.game.player.frameX=0;
        this.game.player.frameY=4;
    }
    handleInput(input){
        
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width*1.2, this.game.player.y+this.game.player.height*0.7));
        if(!input.includes('Enter')&& this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,3);
        }
        else if(!input.includes('Enter')&& !this.game.player.onGround()){
            this.game.player.setState(states.FALLING,2);
        }
        else if(input.includes('Enter')&& input.includes('ArrowUp') && this.game.player.onGround()){
            //this.game.player.setState(states.RUNNING,3);
            this.game.player.vy-=27;
        }
    }
}
export class INVISIBILITY extends State{
    constructor(game){
        //super('INVISIBILITY',game);
        super(states.INVISIBILITY, game);
       
    }
    enter(){
        this.game.player.width=87;
        this.game.player.maxFrame=1;
        this.game.player.frameX=0;
        this.game.player.frameY=5;
    }
    handleInput(input){
        if(input.includes('ArrowLeft')|| input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING,3);
        }else if(input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING,2);
        }else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING,6);
        }
    }
}

