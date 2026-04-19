export class Tunes{
    constructor(game){
        this.game=game;
        
        this.cycle=0;
        this.currentTuneIndex=0;
        this.prevIndex=this.currentTuneIndex;
        
        this.t1=document.getElementById('t1');
            this.t2=document.getElementById('t2');
            this.t3=document.getElementById('t3');
            this.t4=document.getElementById('t4');
            this.t5=document.getElementById('t5');
            this.spark=document.getElementById('spark');
            this.tunecountimg=document.getElementById('tunecount');
            this.TC=document.getElementById('TC');
            this.sound=document.getElementById('tune_collect');

            this.countH=41;
            this.countW=72;

            this.sparkX=0;
            this.sparkY=0;

            this.va=Math.random()*0.1+0.1;
            this.angle=0;

            this.tuneslist=[
                { x: game.width, y: 500, width: 60, height: 60, img: this.t1, number: 1, collected: false },
                { x: game.width, y: 600, width: 60, height: 60, img: this.t2, number: 2, collected: false },
                { x: game.width, y: 450, width: 60, height: 60, img: this.t3, number: 3, collected: false },
                { x: game.width, y: 550, width: 60, height: 60, img: this.t4, number: 4, collected: false },
                // Add music notes
            ];
    }

   /* draw(context){ 
        this.tuneslist.forEach(function(note) {
            if (!note.collected) {
                    context.drawImage(note.img, note.x, note.y, note.width, note.height);
                }
            else{
                this.currentTuneIndex = Math.floor(Math.random()* (this.tuneslist.length-1));
            }
            });
        }*/



    draw(context){
        this.currentTune = this.tuneslist[this.currentTuneIndex];
        this.prevIndex=this.currentTuneIndex;
        if (!this.currentTune.collected && this.currentTune.x>0) {
            context.drawImage(this.currentTune.img, this.currentTune.x, this.currentTune.y, this.currentTune.width, this.currentTune.height);

        }
        else{
            if (this.currentTune.x <=0) {
                this.currentTune.x= this.game.width;
                this.currentTune.y=500;
            }
             do{
                this.currentTuneIndex = Math.floor(Math.random()* (this.tuneslist.length));
                console.log('this.currentTuneIndex', this.currentTuneIndex);
                console.log('this.prevIndex', this.prevIndex);

             }while(this.prevIndex==this.currentTuneIndex);
            }
    }

    updateTunesPosition() {
        this.currentTune = this.tuneslist[this.currentTuneIndex];
        if(this.game.speed==0){
            this.currentTune.x = this.currentTune.x-3;
         
        }
        else{
            this.currentTune.x = this.currentTune.x-2-this.game.speed; // Adjust the speed of moving Tunes 
          
        }
        this.angle+=this.va;
        this.currentTune.y+=Math.sin(this.angle);
   
        
    }
        
        // Function to check for Tune collection (collision detection)
        checkTuneCollection(player) {
            const currentTune = this.tuneslist[this.currentTuneIndex];

            const playerRect = { x: player.x, y: player.y, width: player.width, height: player.height };
            const tuneRect = { x: currentTune.x, y: currentTune.y, width: currentTune.width, height: currentTune.height };
    
            if (!currentTune.collected &&
                (playerRect.x < tuneRect.x  + tuneRect.width &&
                playerRect.x + playerRect.width > tuneRect.x ) &&
                (playerRect.y < tuneRect.y + tuneRect.height &&
                playerRect.y + playerRect.height > tuneRect.y )//||
               /// playerRect.x<tuneRect.x && playerRect.x + playerRect.width > tuneRect.x && 

            )


         /*   if (!currentTune.collected &&
                player.x < player.x + currentTune.width &&
                player.x + player.width >currentTune.x &&
                player.y < currentTune.y + currentTune.height &&
                player.y + player.height > currentTune.y &&
                currentTune.x>=player.x && currentTune.y>=player.y)*/ 
                
                {
                currentTune.collected = true;
                //collectedNumbers.push(currentTune.number);
                console.log('Tune collected:', currentTune.number);
               // this.currentTuneIndex = Math.floor(Math.random()* (this.tuneslist.length-1));
               //console.log('tuneslist.length', this.tuneslist.length);
                   // this.drawspark(context);
             //   console.log('this.currentTuneIndex', this.currentTuneIndex);
             this.sparkX=currentTune.x;
             this.sparkY=currentTune.y;
            // context.drawImage(this.spark,0,0,218,204,currentTune.x, currentTune.y,218,204);  
            this.sound.play();

                return currentTune.number;
            }
            else
            return -1;
        } 
        
        drawspark(context){
           // console.log('entered drawwwwwwwwwwwww');
            context.drawImage(this.spark,0,0,218,204,this.sparkX-25,this.sparkY-25,100,100);  

        }
        drawnumber(context,tunenumber){
            context.drawImage(this.TC,0,0,350,46,8,2,350,46); //1650,0    	

               // context.drawImage(this.tunecountimg,0,tunenumber*this.countH,this.countW,this.countH,350,-3,90,48); //1650,0    	
        }
        
}