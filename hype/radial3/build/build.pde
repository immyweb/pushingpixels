import processing.pdf.*;

HDrawablePool pool1;
HColorPool colors;

int centerX;
int centerY;
int radius = 495;
float angle = 0;
int numObjects = 50;
float slice = PI*2/numObjects;
float x, y, rotation;

void settings() {
	size(1280, 1024);
}

void setup(){
	H.init(this).background(#CACACA);
	smooth();

	colors = new HColorPool()
		.add(#fd6e5e)
		.add(#c44740)
		// .add(#1e1e20)
		.add(#2c343b)
		.add(#52616d, 2)
		.add(#e6e2d2, 2)
		.add(#ffffff, 2)
	;

	drawBg();

	centerX = 640;
	centerY = 725;

	for (int i = 0; i < numObjects; i++ ) {
		angle = i * slice;
		x = centerX + cos(angle) * radius; //<>//
		y = centerY + sin(angle) * radius;
		rotation = degrees(angle);

		HRect s1 = new HRect((int)random(50, 150), (int)random(30, 45));
		s1
			.noStroke()
			.fill( colors.getColor() )
			.anchorAt(H.BOTTOM)
			.loc(x,y)
			.rotation(rotation)
			.alpha( (int)random(150, 255) )
		;
		H.add(s1);
	}



	saveVector();
	noLoop();
}

void draw() {
	H.drawStage();

}

void drawBg() {

	HEllipse e1 = new HEllipse(458);
	e1
		.noStroke()
		.fill(#E5E1D1)
		.loc(-411, 420)
	;
	H.add(e1);

	HEllipse e2 = new HEllipse(458);
	e2
		.noStroke()
		.fill(#E5E1D1)
		.loc(823, 420)
	;
	H.add(e2);

	HEllipse e3 = new HEllipse(495);
	e3
		.noStroke()
		.fill(#2C343B)
		.loc(145, 229)
	;
	H.add(e3);

	HEllipse e4 = new HEllipse(273);
	e4
		.noStroke()
		.fill(#51616C)
		.loc(-272, 676)
	;
	H.add(e4);

	HEllipse e5 = new HEllipse(273);
	e5
		.noStroke()
		.fill(#51616C)
		.loc(1008, 676)
	;
	H.add(e5);

}

void saveVector() {
	PGraphics tmp = null;
	tmp = beginRecord(PDF, "render1.pdf");

	if (tmp == null) {
		H.drawStage();
	} else {
		H.stage().paintAll(tmp, false, 1); // PGraphics, uses3D, alpha
	}

	endRecord();
}