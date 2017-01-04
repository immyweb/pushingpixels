import processing.pdf.*;

HDrawablePool pool1;
HColorPool colors;

int centerX;
int centerY;
int radius = 358;
float angle = 0;
int numObjects = 150;
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

	centerX = 950;
	centerY = 675;

	for (int i = 0; i < numObjects; i++ ) {
		angle = i * slice;
		x = centerX + cos(angle) * radius; //<>//
		y = centerY + sin(angle) * radius;
		rotation = degrees(angle);

		HRect s1 = new HRect((int)random(50, 175), 1);
		s1
			.noStroke()
			.fill( colors.getColor() )
			.anchorAt(H.BOTTOM)
			.loc(x,y)
			.rotation(rotation)
		;
		H.add(s1);
	}



	// saveVector();
	noLoop();
}

void draw() {
	H.drawStage();

}

void drawBg() {

	HEllipse e2 = new HEllipse(369);
	e2
		.noStroke()
		.fill(#51616C)
		.loc(-67, 1)
	;
	H.add(e2);

	HEllipse e4 = new HEllipse(173);
	e4
		.noStroke()
		.fill(#1E1E20)
		.loc(129, 194)
	;
	H.add(e4);

	HEllipse e1 = new HEllipse(564);
	e1
		.noStroke()
		.fill(#2C343B)
		.loc(339, 77)
	;
	H.add(e1);

	HEllipse e3 = new HEllipse(358);
	e3
		.noStroke()
		.fill(#1E1E20)
		.loc(583, 320)
	;
	H.add(e3);

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