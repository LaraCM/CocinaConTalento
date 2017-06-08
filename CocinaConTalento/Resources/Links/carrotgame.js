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
	
	update();
}

function update()
{
	"use strict";
	paint(ctx);
	requestAnimationFrame(update);
}

function paint(ctx)
{
	"use strict";
	//Limpiar pantalla
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(imagenfondo,0,0);
	if(!Start){ ctx.drawImage(imageninicio,0,0);}
	if(Dead) {ctx.drawImage(imagenfinal,0,0);}
}

document.addEventListener('click',Start);
function Start()
{
	if(!Start)Start=true;
}

document.addEventListener('keydown',function(evt)
{
	
	//if(evt.keyCode==13) comienzo=true;
	
},false);
	

