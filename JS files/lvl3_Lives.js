export class Lives{
    constructor(game){
        this.game=game;
        this.hearts=document.getElementById('hearts');
        this.heartH=90.5;
        this.heartW=459;
    }
    
    drawlives(context,life){
    		context.drawImage(this.hearts,0,(5-life)*this.heartH,this.heartW,this.heartH,1605,2,300,65); //1650,0    	
    }

}