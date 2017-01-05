import hype.*;
import hype.extended.colorist.HColorPool;
import hype.extended.layout.HShapeLayout;
import processing.pdf.*;

HDrawablePool pool1;
HColorPool colors;

void settings() {
	size(1280, 1024);
}

void setup(){
	H.init(this).background(#CACACA);
	smooth();

	colors = new HColorPool()
		.add(#fd6e5e)
		.add(#c44740)
		.add(#1e1e20)
		.add(#2c343b)
		// .add(#52616d, 2)
		.add(#e6e2d2, 2)
		.add(#ffffff, 2)
	;

	drawBg();

	HImage hitObj = new HImage("path.png");
	hitObj.loc(0,592);
	// H.add(hitObj);

	HShapeLayout hsl = new HShapeLayout().target(hitObj);

	pool1 = new HDrawablePool(100);
	pool1.autoAddToStage()

		.add (
			new HEllipse(), 35
		)

		.layout(hsl)

		.onCreate (
			new HCallback() {
				public void run(Object obj) {
					HDrawable d = (HDrawable) obj;
					d
						.noStroke()
						.fill( colors.getColor() )
						// .alpha( (int)random(150,255) )
						// .loc( (int)random(width), (int)random(height) )
						.size( (int)random(15) )
					;
				}
			}
		)

		.requestAll()
	;



	// saveVector();
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