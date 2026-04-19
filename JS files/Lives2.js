export class Lives{
    constructor(game){
        this.game=game;
        this.hearts=document.getElementById('hearts');
        this.heartH=101;
        this.heartW=410;
    }
    
    drawlives(context,life){
    		context.drawImage(this.hearts,0,(4-life)*this.heartH,this.heartW,this.heartH,1675,2,215,58); //1650,0    	
    }

}