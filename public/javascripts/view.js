/*
View.js
Contains the code relative to the View parts of the app (following an MVC approach).
*/

// View for intro/1st state of a comparison.
function introView(){
	$("#content").html("<div id='intro_view'>" +
												"<p>There is a lot of strife out there in the world. And that discord reaches online with arguments, name-calling, and all out twitter warfare. But aren’t we all humans, born of the same stuff? Can’t we find some Common Ground?</p>" +
												"<p>People who talk similarly are said to be likely matches for friends. Let’s see who deep-down, should be getting along, and who might be better off staying far away from each other.</p>" +
											"</div>");
}

// 
function diagramView(){

	// TODO: set the state of the diagram view.
	// Each state has descriptive text and a graphical layout of the data associated with it.
	
	//OLD
	// drawD3TestChart();

}

// 
function setView(){

}

// 
function tweetView(){

}

// A list view of both sets of tweets. Un-cleaned.
function listView(){
	// Add the HTML structure to be populated.
	$("#content").html("<div id='listView'>" +
												"<div id='listContainer'>" +
													"<h2>List 1</h2>" +
													"<div id='list1' class='tweetlist'></div>" +
												"</div>" +
												"<div id='listContainer'>" +
													"<h2>List 2</h2>" +
													"<div id='list2' class='tweetlist'></div>");
	
	// Populate it.
	$.each(sets, function(key, value) {
		
		if (key == 0) {		//if in set 1 place in div list1
			$.each(value.tweets, function(jKey, jValue) {
				$("#list1").append('<p>'+ jValue.fullTweet +' </p><br>');
			});
		} else if (key == 1) {	//if in set 2 place in div list2
			$.each(value.tweets, function(jKey, jValue) {
				$("#list2").append('<p>'+ jValue.fullTweet +' </p><br>');
			});

		} else { console.log("Error in listView")}; //If not a part of a set...

	});

}

function initialTweetBubblesView() {
	console.log("view.js- tweetBubblesView----------- ENTER");

	// Add the HTML structure to be populated.
	$("#content").html("<div id='bubbleContainer'>" +
											"<div id='tweetBubble1'></div>" +
											"<div id='tweetBubble2'></div>" +
											"<div id='tweetBubble3'></div>" +
											"<div>" +
												"<button type='button' class='button' onclick='union()'>Union</button>" +
											"</div>" +
										"</div>");

	// Populate it.
	$.each(words, function(key, value){
		var theWord = value.value;
		if(value.linkedSets[0] == "set1") {
			if (value.visible == true) {
				$("#tweetBubble1").append('<span id="'+key+'" class="show">'+ theWord +' </span>');
			} else {
				$("#tweetBubble1").append('<span id="'+key+'" class="hide">'+ theWord +' </span>');
			}
		} else if(value.linkedSets[0] == "set2") {
			if (value.visible == true) {
				$("#tweetBubble2").append('<span id="'+key+'" class="show">'+ theWord +' </span>');
			} else {
				$("#tweetBubble2").append('<span id="'+key+'" class="hide">'+ theWord +' </span>');
			}
		}
	});
}

//---------------------------------------------


// Alex's D3 code.
function drawD3TestChart() {

	// console.log('hello');

	var canvas = document.getElementById('tlt');
	
		/*var $tlt = $viewport.find('.tlt')
			.on('start.tlt', log('start.tlt triggered.'))
			.on('inAnimationBegin.tlt', log('inAnimationBegin.tlt triggered.'))
			.on('inAnimationEnd.tlt', log('inAnimationEnd.tlt triggered.'))
			.on('outAnimationBegin.tlt', log('outAnimationBegin.tlt triggered.'))
			.on('outAnimationEnd.tlt', log('outAnimationEnd.tlt triggered.'))
			.on('end.tlt', log('end.tlt'));*/
		
		//$form.on('change', function () {
			//var obj = getFormData();
			//var tlt = document.getElementById('tlt');
			var obj = "fadeInLeftBig";
			$('.tlt').textillate({ in: { effect: 'rollIn' } });
			//trigger('change');
		//}).trigger('change');

	var w = 1280,
		h = 800;


	var words = ["hello", "cat", "mouse", "pizza", "noodle", "sofa"];


	//var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; }),
	//    color = d3.scale.category10();

	var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; }),
			color = d3.scale.category10();

	 // console.log(nodes);

	var force = d3.layout.force()
			.gravity(0.05)
			.charge(function(d, i) { return i ? 0 : -2000; })
			.nodes(nodes)
			.size([w, h]);

	var root = nodes[0];
	root.radius = 0;
	root.fixed = true;

	force.start();

	// console.log("making circles");
	var svg = d3.select("body").append("svg:svg")
			.attr("width", w)
			.attr("height", h);

	svg.selectAll("circle")
			.data(nodes.slice(1))
		.enter().append("svg:circle")
			.attr("r", function(d) { return d.radius - 2; })
			.style("fill", function(d, i) { return color(i % 3); });

	force.on("tick", function(e) {
		var q = d3.geom.quadtree(nodes),
				i = 0,
				n = nodes.length;

		while (++i < n) {
			q.visit(collide(nodes[i]));
		}

		svg.selectAll("circle")
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
	});

	svg.on("mousemove", function() {

		// console.log('mouse move');
		var p1 = d3.mouse(this);
		root.px = p1[0];
		root.py = p1[1];
		force.resume();
	});

	function collide(node) {
		var r = node.radius + 16,
				nx1 = node.x - r,
				nx2 = node.x + r,
				ny1 = node.y - r,
				ny2 = node.y + r;
		return function(quad, x1, y1, x2, y2) {
			if (quad.point && (quad.point !== node)) {
				var x = node.x - quad.point.x,
						y = node.y - quad.point.y,
						l = Math.sqrt(x * x + y * y),
						r = node.radius + quad.point.radius;
				if (l < r) {
					l = (l - r) / l * .5;
					node.x -= x *= l;
					node.y -= y *= l;
					quad.point.x += x;
					quad.point.y += y;
				}
			}
			return x1 > nx2
					|| x2 < nx1
					|| y1 > ny2
					|| y2 < ny1;
		};
	} 

}
