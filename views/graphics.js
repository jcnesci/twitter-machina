console.log('hi');	

	window.onload = function() {

		console.log("loaded window");
		// Get a reference to the canvas object
		var canvas = document.getElementById('myCanvas');
		// Create an empty project and a view for the canvas:
		paper.setup(canvas);
		// Create a Paper.js Path to draw a line into it:
		var path = new paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		var start = new paper.Point(100, 100);
		// Move to start and draw a line from there
		path.moveTo(start);
		// Note that the plus operator on Point objects does not work
		// in JavaScript. Instead, we need to call the add() function:
		path.lineTo(start.add([ 200, -50 ]));
		// Draw the view now:
		paper.view.draw();

		console.log('hello');

	    var $tlt = $viewport.find('.tlt')
	      .on('start.tlt', log('start.tlt triggered.'))
	      .on('inAnimationBegin.tlt', log('inAnimationBegin.tlt triggered.'))
	      .on('inAnimationEnd.tlt', log('inAnimationEnd.tlt triggered.'))
	      .on('outAnimationBegin.tlt', log('outAnimationBegin.tlt triggered.'))
	      .on('outAnimationEnd.tlt', log('outAnimationEnd.tlt triggered.'))
	      .on('end.tlt', log('end.tlt'));
	    
	    //$form.on('change', function () {
	      //var obj = getFormData();
	      var obj = "fadeInLeftBig";
	      $tlt.textillate(obj);
	      //trigger('change');
	    //}).trigger('change');

	}