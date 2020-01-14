let font,fontsize = 24;


var source;

var numP = 2000; 
var particules = [numP];
var r = [numP];
var th =[numP];
var graph;

var offset = 20;

var A = 8;
var f = 1;
var T = 1/f;
var l = 100;

var t = 0;
var timestep = 1./60.;

var numfront;

var speaker;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  
  createCanvas(600,600);
  background(0);
  source = new createVector(offset,height/3);
  numfront = round((width-source.x)/l);
  
  speaker = new Speaker(offset,height/3,4.,A,f);
  graph = new  Graph(0,height/2,width,height/2,f,A,l,width);
  for(var i=0;i<numP;i++){
    var a = random(20,800);
    var b = random(-HALF_PI/6,HALF_PI/6);
    r[i] = a; 
    th[i] = b;
    particules[i] = createVector(source.x+a*cos(b),source.y+a*sin(b));
    
  }
  t = 0;
  
  // Set text characteristics
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
}

function draw(){
  fill(255,255,255,255);
  rect(0,0,width,height);
  
  speaker.update(t);
  speaker.display();
  
  graph.update(t);
  graph.display();
  
  
  //Zones de haute pression
  for(var j=0;j<numfront*2;j++){
    strokeWeight(50);
    stroke(255,50,50,40);
    noFill();
    strokeCap(SQUARE);
    arc(source.x,source.y,2*(j*l+(l*f*t)),2*(j*l+(l*f*t)),-HALF_PI/6,HALF_PI/6);
  }
  
  //Zones de basse pression
  for(var j=0;j<numfront*2;j++){
    strokeWeight(50);
    stroke(50,50,255,40);
    noFill();
    strokeCap(SQUARE);
    arc(source.x,source.y,2*((j-0.5)*l+(l*f*t)),2*((j-0.5)*l+(l*f*t)),-HALF_PI/6,HALF_PI/6);
  }
  
  //Repères de basse pression
  strokeWeight(2);
  for(var j=0;j<numfront*2;j++){
    strokeWeight(2);
    stroke(50,50,255);
    noFill();
    line(offset+((j-0.5)*l+(l*f*t)),source.y,offset+((j-0.5)*l+(l*f*t)),height);
  }
  
  //Repères de haute pression
  strokeWeight(2);
  for(var j=0;j<numfront*2;j++){
    strokeWeight(2);
    stroke(255,50,50);
    noFill();
    line(offset+((j)*l+(l*f*t)),source.y,offset+((j)*l+(l*f*t)),height);
  }
  
  /*fill(140,255,140);
  ellipse(source.x,source.y,8,8);*/
  
  strokeWeight(0);
  fill(100,100,255);
  for(var i=0;i<particules.length;i++){
    var x = A*sin(TWO_PI*(f*t-r[i]/l))*cos(th[i]);
    var y = A*sin(TWO_PI*(f*t-r[i]/l))*sin(th[i]);
    //println("x : " , particules[i].x+x ,", y :" ,particules[i].y+y);
    ellipse(particules[i].x+x,particules[i].y+y,4,4);
    //println(degrees(th[i]));
  }
  t = (t+timestep)%T;
  
  stroke(0);
  strokeWeight(2);
  line(offset,height/3,width,height/3);
}
