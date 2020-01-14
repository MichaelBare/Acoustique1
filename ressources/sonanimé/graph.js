class Graph{
  
  constructor(x,y,dx,dy,fr,Amp,ld,npt){
	this.offx = 20;
    this.offy = 20;    
	this.ox = this.offx+x;
    this.oy = this.offy+y+dy/2;
    this.sx = dx;
    this.sy = dy;
    this.n = npt;
    this.f = fr;
    this.A = Amp;
    this.l = ld;
    this.yt = [npt];
    this.scly = float(dy)/(2*A*2.);
    this.sclx = float(dx)/float(npt);
	
  }
  
  display(){
    stroke(0);
    strokeWeight(2);
    
    //axes et tires
    line(this.ox,this.oy-this.sy/2,this.ox,this.oy+this.sy/2);
    line(this.ox,this.oy+this.sy/2.5,this.ox+this.sx-this.offx,this.oy+this.sy/2.5);
	fill(30,65,130);
  	text('p ' , this.ox+this.offx ,this.oy-this.sy/2);
	text('r ' , this.ox+this.sx-1.5*this.offx ,this.oy+this.sy/2.5-this.offy);
    
    //flèches
    fill(0,0,0);
    
    line(this.ox+this.sx-this.offx,this.oy+this.sy/2.5,this.ox+this.sx-2.5*this.offx,this.oy+this.sy/2.5 + this.offy/2);
    line(this.ox+this.sx-this.offx,this.oy+this.sy/2.5,this.ox+this.sx-2.5*this.offx,this.oy+this.sy/2.5 - this.offy/2);
    
    line(this.ox,this.oy-this.sy/2,this.ox-this.offx/2,this.oy-this.sy/2+1.5*this.offy);
    line(this.ox,this.oy-this.sy/2,this.ox+this.offx/2,this.oy-this.sy/2+1.5*this.offy);
    
    noFill();
    
    //Courbe
    for(var i=0;i<this.n-1;i++){
      line(this.ox+i*this.sclx,this.oy-this.yt[i],this.ox+(i+1)*this.sclx,this.oy-this.yt[i+1]);
    }
  }
  
  update(t) {
    for(var i=0;i<this.n;i++){
      this.yt[i] = this.scly * this.A * cos(TWO_PI*(this.f*t-i*this.sclx/this.l));
    }
    
  }
}
