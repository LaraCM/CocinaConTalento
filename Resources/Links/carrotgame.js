// JavaScript Document
window.addEventListener('load',init,false);
var canvas=null,ctx=null;

//sprites
var imagenfondo,imagenfinal,imageninicio;
var Shelfsprite;
var Carrotsprite;
var Cazuelasprite;

//Basic Variables
var Start=false, Wait=false,Waitcounter=3;
var Dead=false;
var Gravity;

//Player and enemies
var Carrot;
var Shelfs=new Array();
var Cazuela;
var Frame=0,Floortimer=120,diftimer=0,speed=1,Score=0,jumpcounter=0;
var Shelfpos= new Array();
var mousePosX;
var dificulty=1;

//sounds
var youkilledjim,bgm,startclick,jump;

var Shelf = function(posx,posy,sprite){
	this.x=posx;
	this.y=posy;
	this.image= new Image();
	this.image.src=sprite;
	this.width=95;
	this.height=100;
	
	this.intersects=function(rect)
	  {
		 if(rect!==null)
		 {
			 return(this.x+this.width>rect.x &&
				   this.x<rect.x+rect.width &&
				   this.y-20<rect.y+rect.height&&
				   this.y-19>rect.y+50);
		 }
      };
};

var Player = function (posx, posy,sprite,v){
	this.x=posx;
	this.y=posy;
	this.image= new Image();
	this.image.src=sprite;
	this.v=v;
	this.facingL=true;
	this.jumping=false;
	this.jumpingcounter=0;
	this.jumpspr=false;
	this.width=30;
	this.height=59;
	this.intersects=function(rect)
	  {
		 if(rect!==null)
		 {
			 return(this.x<rect.x+rect.width &&
			 this.x+this.width>rect.x &&
			 this.y<rect.y+rect.height &&
			 this.y+this.height>rect.y+30);
		 }
      };
};

var Item = function (posx, posy,image){
	this.x=posx;
	this.y=posy;
	this.image= image;
	this.width=this.image.width/2;
	this.height=100;
	
	this.crop=0;
};

function init()
{
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
	
	//sprites
	imagenfondo=new Image();  imagenfondo.src="../Img/Game/fondo.png";
	imageninicio=new Image();  imageninicio.src="../Img/Game/Inicio.png";
	imagenfinal=new Image();  imagenfinal.src="../Img/Game/final.png";
	
	Cazuelasprite=new Image();  Cazuelasprite.src="../Img/Game/cazuela.png";
	
	Shelfsprite= new Array("../Img/Game/empty_shelf.png","../Img/Game/1_shelf.png","../Img/Game/2_shelf.png","../Img/Game/3_shelf.png");
	Carrotsprite= new Array("../Img/Game/carrot_1.png","../Img/Game/carrot_2.png","../Img/Game/carrot_3.png","../Img/Game/carrot_dead.png");
	
	//sounds
	bgm = new Audio("Sound/bgm.mp3");
	youkilledjim = new Audio("Sound/youkilledjim.wav");
	startclick = new Audio("Sound/start.mp3");
	jump = new Audio("Sound/jump.wav");
	
	bgm.loop=true; bgm.volume=0.3; bgm.play();
	youkilledjim.volume=0.7;
	
	//Objects
	Carrot = new Player(50,50,Carrotsprite[0],speed+2);
	Cazuela = new Item(0,766,Cazuelasprite);
	Shelfpos=[49,145,240,335,430];
	
	update();
}

/*function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return evt.clientX - rect.left;
      }*/

function update()
{
	"use strict";
	/*canvas.addEventListener('mousemove', function(evt) {
	mousePosX = getMousePos(canvas, evt);
      }, false);*/
	
	
		Move();
	
	if(Start){
		if(diftimer>=100) {speed++;diftimer=0;Carrot.v = speed +2;dificulty++;}
	}
	
	paint(ctx);
	//Other
	Frame++;
	Floortimer+=dificulty;
	if(Frame>=20) {Framechange();}
	if(Floortimer>=150){Floortimer=0;CreateShelfs();}
	canvas.onclick = function(){
		if(!Start) {Start=true; Wait=true;startclick.play();}
		if(Dead){Restart();}
		
	};
	requestAnimationFrame(update);
}

function paint(ctx)
{
	"use strict";
	//Limpiar pantalla
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(imagenfondo,0,0);
	
	
	
	//Pintar Estanterias
		for(var i=0;i<=Shelfs.length-1;i++){
			ctx.drawImage(Shelfs[i].image,Shelfs[i].x,Shelfs[i].y-Shelfs[i].height);

	ctx.drawImage(Cazuela.image,Cazuela.crop,0,Cazuela.width,Cazuela.height,Cazuela.x,Cazuela.y,Cazuela.width,Cazuela.height);
	if(Start){
			//Here Sprites
		ctx.drawImage(Carrot.image,Carrot.x, Carrot.y);
		
		if(Wait){ ctx.font = '60pt Arial';ctx.textAlign = "center";ctx.fillStyle = 'white';
        ctx.fillText(""+Waitcounter,canvas.width/2,canvas.height/2);}
		}
	
	//Animacion Cazuela
		
	}
	
	ctx.font = '30pt Arial';ctx.textAlign = "left";ctx.fillStyle = 'black';
        ctx.fillText("SCORE: "+Score,0,canvas.height-10);
	
	if(!Start){ ctx.drawImage(imageninicio,0,0);}
	if(Dead) {ctx.drawImage(imagenfinal,0,0);}
}

function Framechange(){
	if(Cazuela.crop==0) {Cazuela.crop=Cazuela.width;}
	else {Cazuela.crop=0;}
	Frame=0;
	if(Start && !Wait) diftimer++;
	
}

function Move(){
	
	
	if(Start && !Dead){
	//Player
	//if(Carrot.x>mousePosX && Carrot.x>0) {Carrot.x-=Carrot.v;}
	//if(Carrot.x<mousePosX && Carrot.x<canvas.width) {Carrot.x+=Carrot.v;}
	
	if(Carrot.facingL && Carrot.x>20) {Carrot.x-=Carrot.v;}
	else if(!Carrot.facingL && Carrot.x<canvas.width-20) {Carrot.x+=Carrot.v;}
		
		if(!Wait){
		if(!Carrot.jumping){
			if(Gravity) {Carrot.y+=Carrot.v;}
			else {Carrot.y+=speed;}
		}else{

			if(Carrot.jumpspr){
				jumpcounter++;
				Carrot.y+=speed;
				if(jumpcounter<2) {Carrot.image.src=Carrotsprite[1]; jump.play();}
				if(jumpcounter>2) {Carrot.image.src=Carrotsprite[2];}
				if(jumpcounter>4) {Carrot.image.src=Carrotsprite[1];}
				if(jumpcounter>5) {Carrot.jumpspr=false; jumpcounter=0;Carrot.image.src=Carrotsprite[0]; Carrot.jumpingcounter=0;}
			}
			else {
				if(Carrot.jumpingcounter<=50){if(Carrot.y>=0){Carrot.y-=Carrot.v;}else{Carrot.jumpingcounter=60} Carrot.jumpingcounter++;}
				else{Carrot.jumpingcounter=0;Carrot.jumping=false;}
			}
		}
		}
	}
	
	//shelfsss
	for(var i=0;i<=Shelfs.length-1;i++){
		Shelfs[i].y += speed;
		if(Shelfs[i].y>=canvas.height) {Shelfs.splice(i,1);}
		
		if(!Wait && Start && Carrot.jumping==false){
		if(Shelfs[i].intersects(Carrot)==true) 
		{Gravity=false; Carrot.jumpspr=true;Carrot.jumping=true;Score++;}
		else if (Shelfs[i].intersects(Carrot)==false)
		{Gravity=true;}
		}
	}
	
	if(Carrot.intersects(Cazuela) && !Dead) {Dead=true; Carrot.image.src=Carrotsprite[3]; youkilledjim.play();}
	
}

function CreateShelfs(){
	for(var i=0;i<=rand(0,2);i++){
	Shelfs.push(new Shelf(Shelfpos[rand(0,Shelfpos.length-1)],0,Shelfsprite[rand(0,Shelfsprite.length-1)]));
	}
	if(Wait) {Waitcounter--;if(Waitcounter==0){Wait=false;Waitcounter=3;}}
}

function rand(min,max){
	return Math.floor(Math.random()*(max-min+1) +min);
}

function Restart(){
	Start=false; Dead=false;
	Score=0;
	diftimer=0;
	dificulty=1;
	speed=1;
	
	Shelfs.splice(0,Shelfs.length);
	Carrot.y =0;
	Carrot.image.src=Carrotsprite[0];
	Carrot.v=speed+2;
}

document.addEventListener('keydown',function(evt)
{
	
	if(evt.keyCode==65 || evt.keyCode==37) {Carrot.facingL=true;}
	if(evt.keyCode==68 || evt.keyCode==39) {Carrot.facingL=false;}

},false);

