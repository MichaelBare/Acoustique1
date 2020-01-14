class Speaker {
  
  
  constructor(posx,posy,scale,Amp,frq){
    this.x = posx;
    this.y = posy;
    this.s = scale;
    this.A = Amp;
    this.f = frq;
  }
  
  update(t){
    this.cx = round(this.x + this.A*(1+sin(TWO_PI*this.f*t))/2);
    this.cy = this.y;
  }
  
  display(){
    strokeWeight(3);
    stroke(0);
    line(this.x,this.y-this.s*10,this.x,this.y+this.s*10);
    line(this.x,this.y-this.s*10,this.x+this.s*5,this.y-this.s*20);
    line(this.x,this.y+this.s*10,this.x+this.s*5,this.y+this.s*20);
    stroke(100,80,0);
    noFill();
    arc(this.cx,this.cy,this.s*5,this.s*20,-PI/2,PI/2);
    strokeWeight(1);
  }
  
}
