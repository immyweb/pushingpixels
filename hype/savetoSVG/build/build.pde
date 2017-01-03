HDrawablePool pool1;
HDrawablePool pool2;
HDrawablePool pool3;
HColorPool colours;

void settings() {
	size(1550, 850);
}

void setup(){
	H.init(this).background(#202020);
	smooth();

	colours = new HColorPool()
		.add(#5C472C, 2)
		.add(#82613B, 2)
		.add(#BF9761, 2)
		.add(#E9C88F, 2)
		.add(#F2E3BD)
		.add(#F0E4D4)
		.add(#FFFFFF)
	;

	pool1 = new HDrawablePool(120);
	pool1.autoAddToStage()
		.add(new HShape("pediastrum-1.svg"))

		.layout(
			new HGridLayout()
			.startX(75)
			.startY(75)
			.spacing(100, 100)
			.cols(15)
		)

		.onCreate(
			new HCallback() {
				public void run(Object obj) {
					HShape d = (HShape) obj;
					d
						.enableStyle(false) // Turns off illustrators svg styles
						.noStroke()
						//.strokeJoin(ROUND)
						//.strokeCap(ROUND)
						//.strokeWeight(1)
						//.stroke( #000000 )
						//.rotate( (int)random(360) )
						//.alpha( (int)random(50, 255) )
						.anchorAt(H.CENTER)
						//.rotate( (int)random(4) * 90 )
						.size(100)
						//.size( 100 + ( (int)random(2) * 50 ) ) // 50, 100
					;
					d.randomColors(colours.fillOnly());
				}
			}
		)
		// Note: Use requestAll with animation to control what images get used at set intervals
		// Good for narrative animation
		.requestAll()
	;

	pool2 = new HDrawablePool(144);
	pool2.autoAddToStage()
		.add(
			new HRect()
			.rounding(3)
		)

		.layout(
			new HGridLayout()
			.startX(25)
			.startY(25)
			.spacing(100, 100)
			.cols(16)
		)

		.onCreate(
			new HCallback() {
				public void run(Object obj) {
					HDrawable d = (HDrawable) obj;
					d
						.noStroke()
						.anchorAt(H.CENTER)
						.size(25)
						.fill(colours.getColor())
					;
				}
			}
		)
		.requestAll()
	;

	pool3 = new HDrawablePool(144);
	pool3.autoAddToStage()
		.add(
			new HEllipse(), 50
		)

		.layout(
			new HGridLayout()
			.startX(25)
			.startY(25)
			.spacing(100, 100)
			.cols(16)
		)

		.onCreate(
			new HCallback() {
				public void run(Object obj) {
					HDrawable d = (HDrawable) obj;
					d
						.noStroke()
						// .strokeJoin(ROUND)
						// .strokeCap(ROUND)
						// .strokeWeight(3)
						// .stroke( #202020 )
						.anchorAt(H.CENTER)
						.size(12)
						.fill(colours.getColor())
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

void saveVector() {
	PGraphics tmp = null;
	tmp = beginRecord(PDF, "render.pdf");

	if (tmp == null) {
		H.drawStage();
	} else {
		H.stage().paintAll(tmp, false, 1); // PGraphics, uses3D, alpha
	}

	endRecord();
}