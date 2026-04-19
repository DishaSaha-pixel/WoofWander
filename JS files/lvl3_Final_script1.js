import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './lvl3_background.js';
import {  GroundEnemy,FlyingEnemy, ClimbingEnemy } from './lvl3_enemies.js';
import { Tunes } from './lvl3_tunes.js';
import { Lives } from './lvl3_Lives.js';
import { Bone } from './lvl3_bone.js';
import { Flag } from './flag.js';
import { BearLives } from './bearlives.js';


window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1900;
    canvas.height = 870;

    const bgMusic = document.getElementById('bgmusic');
    bgMusic.volume = 0.5;

    class Game {
        constructor(width, height) {  //
         //   bgMusic.play();
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);

            this.bear;
            this.bearflag=false;
            this.bearcount=3;

            this.bearlives=new BearLives(this);

            this.tunes = new Tunes(this);
            this.tunetimer = 0;
            this.tuneInterval = 1000;
            this.collectedNotes = [];
            this.array = [2, 1, 4, 7, 8, 3, 5, 6];

            this.spark=false;
            this.wrong_spark=false;
            this.countwrongnotes=0;
            
            this.count=100;
            this.tunenumber=0;
            this.totaltunes=4;
            this.wrong_note=document.getElementById('wrong_spark');
            this.t1=document.getElementById('t1');
            this.t2=document.getElementById('t2');
            this.t3=document.getElementById('t3');
            this.t4=document.getElementById('t4');
            this.t5=document.getElementById('t5');
            this.t6=document.getElementById('t6');
            this.t7=document.getElementById('t7');
            this.t8=document.getElementById('t8');
           

            this.tunelist=[
                { width: 60, height: 60, img: this.wrong_note, number: 0 },
                { width: 60, height: 60, img: this.t1, number: 1 },
                { width: 60, height: 60, img: this.t2, number: 2 },
                { width: 60, height: 60, img: this.t3, number: 3 },
                { width: 60, height: 60, img: this.t4, number: 4 },
                { width: 60, height: 60, img: this.t5, number: 5 },
                { width: 60, height: 60, img: this.t6, number: 6 },
                { width: 60, height: 60, img: this.t7, number: 7 },
                { width: 60, height: 60, img: this.t8, number: 8 },
                // Add music notes
            
            ];

            this.lives = new Lives(this);
            this.life = 5; // Initialize player lives

           
            
            this.bone=new Bone(this);
            this.bones = [];
            this.boneTimer = 0;
            this.boneInterval = 5000;

            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = true;

            this.gameOver = false;
            this.insertflag=false;
            this.flag=new Flag(this);

            this.particles=[];
            this.maxParticles=100;
            this.player.currentState=this.player.states[0];
            this.player.currentState.enter();

            this.collisions=[];
             // Timer setup
             this.timer = 300; // 5 minutes in seconds
             this.timerInterval = 1000; // Update timer every second
             this.timerElapsed = 0;

        }

        update(deltaTime) {
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            // Handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime); // Update enemy without passing this.life
                if (enemy.markedForDeletion)
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });


            //handle bear
            console.log(this.bearcount);
            if(this.collectedNotes.length==7 && this.bearflag==false && this.bearcount>0 ){
                this.bear=new GroundEnemy(this);//,this.player,this.bearcount);
                this.bearflag=true;
            }
            if(this.bearflag==true){
                console.log(this.bearflag);
                this.bear.update(deltaTime); // Update enemy without passing this.life
                if(this.bear.markedForDeletion){
                    this.bearflag=false;
                }
            }





            //handle bones
            if(this.life<5){
            if (this.boneTimer > this.boneInterval ) {
                this.addbone();
                this.boneTimer = 0;
            } else {
                this.boneTimer += deltaTime;
            }
            this.bones.forEach(bone => {
                this.life=bone.update(deltaTime,this.life); 
                if (bone.markedForDeletion)
                    this.bones.splice(this.bones.indexOf(bone), 1);
            });
        }
            //handle particles
            this.particles.forEach((particle,index)=>{
                particle.update();
                if(particle.markedForDeletion)
                    this.particles.splice(index,1);
            });
            if(this.particles.length > this.maxParticles){
                this.particles =this.particles.slice(0,this.maxParticles);
            }

            //handle collision sprites
            this.collisions.forEach((collision,index)=>{
                collision.update(deltaTime);
                if(collision.markedForDeletion)
                    this.collisions.splice(index,1);
            });
            this.tunes.updateTunesPosition();

             var n = this.tunes.checkTuneCollection(this.player);
            if (n != -1) {
                if(n==0){
                    this.wrong_spark=true;
                    this.spark=false;
                    if (this.countwrongnotes==1){
                        this.collectedNotes[this.tunenumber-1]=0;
                        this.countwrongnotes=0;
                    }
                    else
                        this.countwrongnotes+=1;              
                }
                else{
                    this.collectedNotes.push(n);
                    this.tunenumber+=1;
                    this.spark=true;
                    this.wrong_spark=false;

                }
                
                console.log(this.collectedNotes);
               
               // this.spark=true;
                this.count=20;
            }
            
             //handle flag 
          
            if(this.insertflag){
                 this.flag.update(deltaTime);
                 this.gameOver=this.flag.checkCollision(this.player);
            }
            // Update timer
            if (this.timerElapsed > this.timerInterval) {
                this.timer--;
                this.timerElapsed = 0;
                if (this.timer <= 0) {
                    this.gameOver = true;
                }
            } else {
                this.timerElapsed += deltaTime;
            }
        

        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.tunes.draw(context);
           // console.log(this.life);
            this.lives.drawlives(context, this.life);
          //  this.bone.draw(context);
            this.bones.forEach(bone => {
                bone.draw(context);
            });

            if(this.spark==true && this.count>0){
                this.tunes.drawspark(context);
                this.count-=1;
            }
            if(this.wrong_spark==true && this.count>0){
                this.tunes.drawwrongspark(context);
                this.count-=1;
            }
            this.tunes.drawnumber(context,this.tunenumber);

            var tuneX=0;
            this.collectedNotes.forEach(notes=>{
    		    context.drawImage(this.tunelist[notes].img,0,0,225,225,350+tuneX,5,50,50); 
                tuneX+=50; 	
            });
 			
 			 if(this.insertflag){
                this.flag.draw(context);
            }

            if(this.bearflag)
                {
                    this.bear.draw(context);
                    this.bearlives.drawlives(context,this.bearcount);
                }
                // Draw timer
               // Draw timer at the top middle
               context.font = 'bold 30px Arial';
               //context.fillStyle = 'black';
               context.fillStyle = '#CCFF00';


               const timerText = `TIME: ${Math.floor(this.timer / 60)}:${('0' + this.timer % 60).slice(-2)}`;
               const textWidth = context.measureText(timerText).width;
               context.fillText(timerText, (this.width / 2) - (textWidth / 2), 35);
             

        }

       addEnemy() {
        
         //    for(let i=0;i<20;i++){
           //  if (this.speed > 0 && Math.random() < 0.15)
             //    this.enemies.push(new FlyingEnemy(this)); 
      //   }
            if (this.speed > 0 && Math.random() < 0.5)
                this.enemies.push(new ClimbingEnemy(this));
            if (this.speed > 0 && Math.random() < 0.2){
                for(let i=0;i<50;i++){
                    this.enemies.push(new FlyingEnemy(this)); 
            }}
        }
		


        addbone() {
            if (this.speed > 0 && Math.random() < 0.5)
                this.bones.push(new Bone(this));
            
        }


        checkGameOver() {                 
            const totalTunes = this.array.length;
            const correctTunes = this.collectedNotes.length;
            const overallPercent = (correctTunes / totalTunes) * 100;
            if (this.array.length === this.collectedNotes.length && this.bearcount==0) {
                this.insertflag= true;
                console.log(this.insertflag);
            }
            if (this.gameOver) {
                let orderMatchedCount = 0;
                for (let i = 0; i < totalTunes; i++) {
                    if (this.array[i] === this.collectedNotes[i]) {
                        orderMatchedCount++;
                    }
                }
                const percentMatch = (orderMatchedCount / totalTunes) * 100;
        
                if (percentMatch < 75 && this.life > 0) {
                    // Redirect to the try again page if the order percentage matched is < 75% and lives > 0
                   // this.insertflag= true;
                    
                    window.location.href = 'lvl3game_tryagain.html?percentMatch=' + percentMatch.toFixed(2);

                } else if (percentMatch >= 75) {
                    // Redirect to the win page if both order and overall percentage matched are >= 75%
                   // this.insertflag= true;
                    window.location.href = 'lvl3game_win.html';
                }
               // console.log(this.gameOver);

            }
        
            if (this.life <= 0) {
                // Redirect to the lose page showing the overall percentage matched with the original array
                this.gameOver= true;
                window.location.href = 'lvl3game_lose.html?overallPercent=' + overallPercent.toFixed(2);
            }
            // Check timer
            if (this.timer <= 0) {
                this.gameOver = true;
                window.location.href = 'time3.html';
            }
        }         
//---------


    



    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    function animate(timeStamp) {
        bgMusic.play();
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        game.checkGameOver();

        if (!game.gameOver)
            requestAnimationFrame(animate);
    }

    animate(0);
});