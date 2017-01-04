import hype.*;
import hype.extended.colorist.HColorPool;
import hype.extended.layout.HShapeLayout;
import hype.extended.layout.HGridLayout;
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
		.add(#ffffff)
	;

	drawBg();





	HImage hitObj = new HImage("path2.png");
	hitObj.loc(0,0);
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