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
		.add(#52616d, 2)
		.add(#e6e2d2, 2)
		.add(#ffffff, 2)
	;


	pool1 = new HDrawablePool(85);
	pool1.autoAddToStage()
		.add(new HShape("dash.svg"))

		.layout(
			new HGridLayout()
			.startLoc(10, height/2)
			.spacing(15, 0)
			.cols(85)
		)

		.onCreate(
			new HCallback() {
				public void run(Object obj) {
					HShape d = (HShape) obj;
					d
						.enableStyle(false) // Turns off illustrators svg styles
						.noStroke()
						.width((int)random(1, 5))
						.height((int)random(75, 150))
						// .loc( (int)random(0), (int)random(0) )
					;
					d.randomColors(colors.fillOnly());
				}
			}
		)
		.requestAll()
	;


	saveVector();
	noLoop();
}

void draw() {
	H.drawStage();
}

void saveVector() {
	PGraphics tmp = null;
	tmp = beginRecord(PDF, "render4.pdf");

	if (tmp == null) {
		H.drawStage();
	} else {
		H.stage().paintAll(tmp, false, 1); // PGraphics, uses3D, alpha
	}

	endRecord();
}