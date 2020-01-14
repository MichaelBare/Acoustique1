var soundFile =[];
var soundName = [];
var mic, fft, trigger;
var oscilloscope;
var font;
var fontsize = 32;
var currentSound;
var currenti = 0;
var previ = 0;
var isrunning = false;


function preload() {
  soundFormats('mp3', 'ogg');
  soundFile[0] = loadSound("diapason");
  soundFile[1] = loadSound("piano_A3");
  soundFile[2] = loadSound("viola_A3");
  soundFile[3] = loadSound("clarinet_A3");
  soundFile[4] = loadSound("guitar_A3");
  soundFile[5] = loadSound("Bass_loop");
  soundFile[6] = loadSound("Mini_pops");
  soundFile[7] = loadSound("Englishman_beat");

	soundName[0] = "Diapason";
	soundName[1] = 'Piano';
	soundName[2] = 'Violon';
	soundName[3] = 'Clarinette';
	soundName[4] = 'Guitare sèche';
	soundName[5] = 'Boucle synthé';
	soundName[6] = 'Boite à rythme';
	soundName[7] = 'Batterie';
	soundName[8] = 'Microphone';

	font = loadFont('SourceSansPro-Regular.otf');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  fft = new p5.FFT();
	mic = new p5.AudioIn();
	mic.stop();

	//Analyse du premier fichier audio chargé par défaut
	fft.setInput(soundFile[currenti]);
	
	
	// Création de l'oscilloscope
	oscilloscope = new Oscilloscope(fft, 1, 0,0,width,height/2);

	// Création du slider
	sSlider = createSlider(0,8,0);
	sSlider.position(40, height/2 + height/8);
	sSlider.input(updateSound);

	currentSound = soundName[0];
	
	// Création de la zone de texte
	textFont(font);
  textSize(fontsize);
  textAlign(LEFT, CENTER);

	// Création du bouton play/pause
	pButton = createButton('Play/Stop');
	pButton.position( 40, height/2 + 3*height/8)
	pButton.mousePressed(run);
}

function draw() {
	background(255);
  oscilloscope.display(); 
  fill(0);
	stroke(255);
  text(currentSound, 40, height/2 + height/4);
	
	
}

/*function mouseClicked()
{
  oscilloscope.paused = !(oscilloscope.paused);
}*/

function updateSound(){
	
	currenti = sSlider.value();
	currentSound = soundName[currenti] 
	fill(0);
	stroke(255);
  text(currentSound, 40, height/2 + height/4);
	if(currenti<8) {
		if(previ==8){
			mic.stop();
			fft.setInput(soundFile[currenti]);
		} else {
			soundFile[previ].pause();
		}
		if(isrunning){
			soundFile[currenti].loop();
		} else {
			soundFile[currenti].pause();
		}
		fft.setInput(soundFile[currenti]);
	} else {
		soundFile[previ].pause();
		if(isrunning){
			mic.start();
		} else {
			mic.stop();
		}
		
		fft.setInput(mic);
	}
	previ = currenti;
}

function run()
{
	if(isrunning){
		if(currenti==8){
			mic.stop();
		} else{
			soundFile[currenti].pause();
		}
	} else {
		if(currenti==8){
			mic.start();
		} else{
			soundFile[currenti].loop();
		}
	}
	isrunning = !isrunning;
	print(isrunning);
}
