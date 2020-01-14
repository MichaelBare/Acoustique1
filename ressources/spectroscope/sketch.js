let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(111, 20, 25);

  let spectrum = fft.analyze();

  beginShape();
  strokeWeight(3);
  noFill();
  stroke(245,55,109);
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
}
