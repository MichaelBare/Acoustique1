var mic, fft, trigger;
var paused = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

	mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0.8, 2048);
  fft.setInput(mic);
  
}

function draw() {
  
  if (!paused)
  {
    background(25, 120, 111);

    var waveform = fft.waveform();  // analyze the waveform
    beginShape();
    strokeWeight(4);
    noFill();
    stroke(109,255,245);
    trigger = 0;
    for (var i = 0; i < waveform.length; i++){

      // find the first point in the waveform buffer
      // where the waveform crosses zero, going in a positive direction
      if ((waveform[i] > 0) && (waveform[i-1] <= 0) && (trigger == 0))
      {
        trigger = 1;
        firstPos = i;
      }
      //once that first positive-going zero crossing is found, 
      //start drawing the waveform
      if (trigger == 1)
      {
        // subtract the offset of the first zero crossing from "i",
        // and use only use an early section of the buffer 
        // (in this case, the first third of it, because it will 
        // end in different places based on where the zero crossing
        // happened)
        var x = map((i - firstPos), 0, waveform.length, 0, width * 3);
        var y = map(waveform[i], -1, 1, height, 0);
      }
      vertex(x, y);
    }
    endShape();
  }

}

function mouseClicked()
{
  paused = !paused;
}
