export class BearLives{
    constructor(game){
        this.game=game;
        this.hearts=document.getElementById('bearlives');
        this.heartH=101;
        this.heartW=305;
    }
    
    drawlives(context,bearlife){
    		context.drawImage(this.hearts,0,(3-bearlife)*this.heartH,this.heartW,this.heartH,this.game.width-200,105,200,65); //1650,0    	
    }

}