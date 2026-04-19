export class Lives{
    constructor(game){
        this.game=game;
        this.hearts=document.getElementById('hearts');
        this.heartH=101;
        this.heartW=305;
    }
    
    drawlives(context,life){
    		context.drawImage(this.hearts,0,(3-life)*this.heartH,this.heartW,this.heartH,1700,2,175,58); //1650,0    	
    }

}

