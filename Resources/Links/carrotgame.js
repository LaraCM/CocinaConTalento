// JavaScript Document
window.addEventListener('load',init,false);
var canvas=null,ctx=null;

//sprites
var imagenfondo,imagenfinal,imageninicio;
var Shelfsprite;
var Carrotsprite;
var Cazuelasprite;

//Basic Variables
var Start=false;
var Dead=false;

//Player and enemies
var Carrot;
var Shelfs=new Array();
var Cazuela;
var Frame=0,Floortimer=120,diftimer=0,speed=1,Score=0;
var Shelfpos= new Array();
var mousePosX;

var Shelf = function(posx,posy,sprite){
	this.x=posx;
	this.y=posy;
	this.image= new Image();
	this.image.src=sprite;
	this.width=this.image.width;
	this.height=this.image.height;
	
	this.intersects=function(rect)
	  {
		 if(rect!==null)
		 {
			 return(this.x<rect.x+rect.width &&
			 this.x+this.width>rect.x &&
			 this.y+78<rect.y+rect.height &&
			 this.y+this.height>rect.y);
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
	this.width=this.image.width;
	this.height=this.image.height;
	this.intersects=function(rect)
	  {
		 if(rect!==null)
		 {
			 return(this.x<rect.x+rect.width &&
			 this.x+this.width>rect.x &&
			 this.y<rect.y+rect.height &&
			 this.y+this.height>rect.y);
		 }
      };
};

var Item = function (posx, posy,image){
	this.x=posx;
	this.y=posy;
	this.image= image;
	this.width=this.image.width/2;
	this.height=this.image.height;
	
	this.crop=0;
	this.intersects=function(rect)
	
	  {
		 if(rect!==null)
		 {
			 return(this.x<rect.x+rect.width &&
			 this.x+this.width>rect.x &&
			 this.y<rect.y+rect.height &&
			 this.y+this.height>rect.y);
		 }
      };
};

function init()
{
	"use strict";
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
	
	imagenfondo=new Image();  imagenfondo.src="../Img/Game/fondo.png";
	imageninicio=new Image();  imageninicio.src="../Img/Game/Inicio.png";
	imagenfinal=new Image();  imagenfinal.src="../Img/Game/final.png";
	
	Cazuelasprite=new Image();  Cazuelasprite.src="../Img/Game/cazuela.png";
	
	Shelfsprite= new Array("../Img/Game/empty_shelf.png","../Img/Game/1_shelf.png","../Img/Game/2_shelf.png","../Img/Game/3_shelf.png");
	Carrotsprite= new Array("../Img/Game/carrot_1.png","../Img/Game/carrot_2.png","../Img/Game/carrot_3.png","../Img/Game/carrot_dead.png");
	
	Carrot = new Player(50,50,Carrotsprite[0],speed+1);
	Cazuela = new Item(0,766,Cazuelasprite);
	Shelfpos=[49,145,240,335,430];
	
	update();
}

function update()
{
	"use strict";
	
	if(Start){
		Move();
		
		Floortimer++;
		if(Floortimer>=150){Floortimer=0;CreateShelfs();}
		if(diftimer>=100) {speed++;diftimer=0;}
	}
	
	paint(ctx);
	//Other
	Frame++; 
	if(Frame>=20) {Framechange();}
	canvas.onclick = function(){
		if(!Start) {Start=true;}
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
	
	
	if(Start){
	//Pintar Estanterias
	for(var i=0;i<=Shelfs.length-1;i++){
		ctx.drawImage(Shelfs[i].image,Shelfs[i].x,Shelfs[i].y-Shelfs[i].height);
	}
	
	//Here Sprites
	ctx.drawImage(Carrot.image,Carrot.x, Carrot.y);
	
	//Animacion Cazuela
		ctx.drawImage(Cazuela.image,Cazuela.crop,0,Cazuela.width,Cazuela.height,Cazuela.x,Cazuela.y,Cazuela.width,Cazuela.height);
	}
	
	
	
	if(!Start){ ctx.drawImage(imageninicio,0,0);}
	if(Dead) {ctx.drawImage(imagenfinal,0,0);}
}

function Framechange(){
	if(Cazuela.crop==0) {Cazuela.crop=Cazuela.width;}
	else {Cazuela.crop=0;}
	Frame=0;
	diftimer++;
}

function Move(){
	
	//Player
	if(mousePosX<Carrot.x) {Carrot.x-=Carrot.v;}
	else if(mousePosX>Carrot.x)  {Carrot.x+=Carrot.v;}
	
	
	
	//shelfsss
	for(var i=0;i<=Shelfs.length-1;i++){
		Shelfs[i].y += speed;
		if(Shelfs[i].y>=canvas.height) {Shelfs.splice(i,1);}
	}
	
}

function CreateShelfs(){
	for(var i=0;i<=rand(0,2);i++){
	Shelfs.push(new Shelf(Shelfpos[rand(0,Shelfpos.length-1)],0,Shelfsprite[rand(0,Shelfsprite.length-1)]));
	}
}

function rand(min,max){
	return Math.floor(Math.random()*(max-min+1) +min);
}

function Restart(){
	Start=false; Dead=false;
	Score=0;
	diftimer=0;
	speed=1;
	
	Shelfs.splice(0,Shelfs.length);
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return evt.clientX - rect.left;
      }
canvas.addEventListener('mousemove', function(evt) {
	mousePosX = getMousePos(canvas, evt);
        //mousePos.x = ;
      }, false);