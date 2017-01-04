import hype.*;
import hype.extended.colorist.HColorPool;
import hype.extended.layout.HShapeLayout;
import hype.extended.layout.HGridLayout;
import processing.pdf.*;

HDrawablePool pool1;
HColorPool colors;

float incrementalAngle = 0.0;

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
		.add(#52616d, 2)
		.add(#e6e2d2, 2)
		.add(#ffffff, 2)
	;

	drawBg();

	HImage hitObj = new HImage("path4.png");
	hitObj.loc(92,44);
	// H.add(hitObj);

	HShapeLayout hsl = new HShapeLayout().target(hitObj);

	// pool1 = new HDrawablePool(25);
	// pool1.autoAddToStage()

	// 	.add (
	// 		new HEllipse(), 35
	// 	)

	// 	.layout(hsl)

	// 	.onCreate (
	// 		new HCallback() {
	// 			public void run(Object obj) {
	// 				HDrawable d = (HDrawable) obj;
	// 				d
	// 					.noStroke()
	// 					.fill( colors.getColor() )
	// 					.alpha( (int)random(150,255) )
	// 					// .loc( (int)random(width), (int)random(height) )
	// 					.size( (int)random(50, 75) )
	// 				;
	// 			}
	// 		}
	// 	)

	// 	.requestAll()
	// ;

	pool1 = new HDrawablePool(15);
	pool1.autoAddToStage()
		.add(new HShape("dash.svg"))

		.layout(
			new HGridLayout()
			.startLoc(500, 811)
			.spacing(50, 0)
			.cols(15)
		)

		.onCreate(
			new HCallback() {
				public void run(Object obj) {
					HShape d = (HShape) obj;
					d
						.enableStyle(false) // Turns off illustrators svg styles
						.noStroke()
						.fill( colors.getColor() )
						.width((int)random(30, 45))
						.height((int)random(75, 150))
						.alpha( (int)random(150, 255) )
						// .loc( (int)random(0), (int)random(0) )
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

	HRect e2 = new HRect(660);
	e2
		.noStroke()
		.fill(#2C343B)
		.loc(534,112)
	;
	H.add(e2);

	HRect e1 = new HRect(500);
	e1
		.noStroke()
		.fill(#51616C)
		.loc(141,442)
	;
	H.add(e1);

}

void saveVector() {
	PGraphics tmp = null;
	tmp = beginRecord(PDF, "render8.pdf");

	if (tmp == null) {
		H.drawStage();
	} else {
		H.stage().paintAll(tmp, false, 1); // PGraphics, uses3D, alpha
	}

	endRecord();
}