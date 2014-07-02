/*
View.js
Contains the code relative to the View parts of the app (following an MVC approach).
*/

// View for intro/1st state of a comparison.
function introView(){
	console.log("introView -- - - - - cgApp");
	console.log(cgApp);
	console.log("introView -- - - - - cgApp.curComparison");
	console.log(cgApp.curComparison);
	console.log("introView -- - - - - cgApp.curComparison.introHTML");
	console.log(cgApp.curComparison.introHTML);

	$("#state_title").html("state : intro");

	// $("#content").html("<div id='intro_view'>" +
	// 											"<p>There is a lot of strife out there in the world. And that discord reaches online with arguments, name-calling, and all out twitter warfare. But aren’t we all humans, born of the same stuff? Can’t we find some Common Ground?</p>" +
	// 											"<p>People who talk similarly are said to be likely matches for friends. Let’s see who deep-down, should be getting along, and who might be better off staying far away from each other.</p>" +
	// 										"</div>");

	$("#content").html(cgApp.curComparison.introHTML);
}

// A list view of both sets of tweets. Un-cleaned.
function listView(){
	$("#state_title").html("state : tweetList");

	// Add the HTML structure to be populated.
	$("#content").html("<div id='listView'>" +
												"<div id='listContainer'>" +
													"<h2>List 1</h2>" +
													"<div id='list1' class='tweetlist'></div>" +
												"</div>" +
												"<div id='listContainer'>" +
													"<h2>List 2</h2>" +
													"<div id='list2' class='tweetlist'></div>");
	var s1tw = 0;
	var s2tw = 0;
	var wCount = 0
	// Populate it.
	$.each(cgApp.curComparison.sets, function(key, value) {
			if (key == 0) {		//if in set 1 place in div list1
				$.each(value.tweets, function(jKey, jValue) {
						var tweet = "";
						$.each(jValue.fullTweet.split(" "), function(k, v) {
							
							tweet = tweet + '<span id="tw'+ s1tw +'">' + v + ' </span>'; 

							var cleanW = v.cleanTweet();
							//console.log(value.comparison.words);
							if (value.comparison.words[wCount].value == cleanW) {
								
								value.comparison.words[wCount].linkedTweetWord = "#list1 #tw"+ s1tw;
								wCount++;
							}
							s1tw++;

						});
						$("#list1").append('<p>'+ tweet +' </p><br>');
				});
			} else if (key == 1) {	//if in set 2 place in div list2
				$.each(value.tweets, function(jKey, jValue) {
						var tweet = "";
							$.each(jValue.fullTweet.split(" "), function(k, v) {
							tweet = tweet + '<span id="tw'+ s2tw +'">' + v + ' </span>';

							var cleanW = v.cleanTweet();
							//console.log(value.comparison.words);
							if (value.comparison.words[wCount].value == cleanW) {
								
								value.comparison.words[wCount].linkedTweetWord = "#list2 #tw"+ s2tw;
								wCount++;
							}
							s2tw++;
						});
						$("#list2").append('<p>'+ tweet +' </p><br>');
				});

			} else { console.log("Error in listView")}; //If not a part of a set...

	});
	//console.log(cgApp.curComparison.sets);
	$.each(cgApp.curComparison.sets, function(key, value) {
		if (key == 0) {
			$.each(value.comparison.words, function(k, v) {
				v.startPosition = $(v.linkedTweetWord).position();
				console.log("Set 1 - " + k);
				console.log(v.startPosition);
			});
		} else if (key == 1) {
			$.each(value.comparison.words, function(k, v) {
				v.startPosition = $(v.linkedTweetWord).position();
				console.log("Set 2 - " + k);
				console.log(v.startPosition);
			});
		}
	});
	console.log(cgApp.curComparison.sets);
}

function initialTweetBubblesView() {
	$("#state_title").html("state : initialTweetBubbles");

	// Add the HTML structure to be populated.
	$("<div id='bubbleContainer'>" +
											"<div id='tweetBubble1' class='tweetBubble'></div>" +
											"<div id='tweetBubble2' class='tweetBubble'></div>" +
										"</div>").insertBefore("#listView");

	//Bubble Area Count
	var bA1 = 0,
	    bA2 = 0;

	console.log("1 :");
	console.log(cgApp.curComparison);
	console.log("2 :");
	console.log(cgApp.curComparison.words);
	console.log("3 :");
	console.log(cgApp.curComparison.lookup);

	// Populate it.
	var canvasWidth = $('#container').width() - 15;
	var setCount1 = {"lineWidth": 0, "lineCount": 0 , "setPos": 0}; //For Line Pack
	var setCount2 = {"lineWidth": 0, "lineCount": 0 , "setPos": 2*canvasWidth/3}; //For Line Pack
	$.each(cgApp.curComparison.words, function(key, value){
		var theWord = value.value;

		if(value.linkedSets[0] == "set1") {

		        if (value.visible == true) {
		                bA1 = theWord.length + bA1; //Counting set1 visibile word lengths.
										$("#tweetBubble1").append('<span id="word'+key+'" class="show word" style="top: ' + value.startPosition.top + 'px;left: ' + value.startPosition.left + 'px">'+ theWord +' </span>');
		                setCount1 = linePack(key, setCount1);
		        } else {
										$("#tweetBubble1").append('<span id="word'+key+'" class="hide word" style="top: ' + value.startPosition.top + 'px;left: ' + value.startPosition.left + 'px">'+ theWord +' </span>');
		        }
		} else if(value.linkedSets[0] == "set2") {
		        if (value.visible == true) {
		                bA2 = theWord.length + bA2; //Counting set2 visibile word lengths.
				            $("#tweetBubble2").append('<span id="word'+key+'" class="show word" style="top: ' + value.startPosition.top + 'px;left: ' + value.startPosition.left + 'px">'+ theWord +' </span>');
		                setCount2 = linePack(key, setCount2);
		        } else {
                    $("#tweetBubble2").append('<span id="word'+key+'" class="hide word" style="top: ' + value.startPosition.top + 'px;left: ' + value.startPosition.left + 'px">'+ theWord +' </span>');
		        }

		} else {
		        console.log(" ********** Unaccounted Word! **********");
		}
	});

	$("#content #listView").fadeOut();
	//And the word length count to the DOM.
	$('#tweetBubble1').append("<p id='bubbleArea1' class='bubbleArea'>" + bA1 + "</p>");
	$('#tweetBubble2').append("<p id='bubbleArea2' class='bubbleArea'>" + bA2 + "</p>");
}

function unionTweetBubblesView(){
	$("#state_title").html("state : unionTweetBubbles");

	// Add the HTML structure to be populated.
	$("#bubbleContainer > #tweetBubble1").after("<div id='tweetBubble3' class='tweetBubble'></div>");

	// Populate it.

	var unionCount = {}; //Counting Unions
	var bA3 = 0, //Count Union Words length
			bA1 = Number($('#bubbleArea1').html()), //Pull Old Area Counts
			bA2 = Number($('#bubbleArea2').html());

	//Line Packing Variables
	var canvasWidth = $('#container').width() - 15;
	var setCount3 = {"lineWidth": 0, "lineCount": 0 , "setPos": 1*canvasWidth/3}; //For Line Pack
	var setCount2 = {"lineWidth": 0, "lineCount": 0 , "setPos": 2*canvasWidth/3};
	var setCount1 = {"lineWidth": 0, "lineCount": 0 , "setPos": 0};

	for (var i = 0; i < cgApp.curComparison.words.length; i++) {
    	var id = "#word"+i;

    	if (cgApp.curComparison.lookup[cgApp.curComparison.words[i].value].sets == "union") {

    		//Union Count to check for duplicates.
	    	if (unionCount[cgApp.curComparison.words[i].value] == undefined) {
		    	bA3 = cgApp.curComparison.words[i].value.length + bA3;  //Counting Length

		    	if (cgApp.curComparison.words[i].linkedSets == "set1") bA1 = bA1 - cgApp.curComparison.words[i].value.length;
					if (cgApp.curComparison.words[i].linkedSets == "set2") bA2 = bA2 - cgApp.curComparison.words[i].value.length;

		    	unionCount[cgApp.curComparison.words[i].value] = true;
		    	$(id).addClass("union");
		    	if ($(id).hasClass('show')) {
		    	setCount3 = linePack(i, setCount3);
		    	};
	    	} else {
	    		//Hide the Duplicates
	    		$(id).fadeOut(1000);
		    	if (cgApp.curComparison.words[i].linkedSets == "set1") bA1 = bA1 - cgApp.curComparison.words[i].value.length;
					if (cgApp.curComparison.words[i].linkedSets == "set2") bA2 = bA2 - cgApp.curComparison.words[i].value.length;
    		}
    	} else {
    		if (cgApp.curComparison.words[i].linkedSets == "set1" && $(id).hasClass('show')) {
    			if ($(id).hasClass('show')) {
			    		setCount1 = linePack(i, setCount1);
			    	};
    		};
    		if (cgApp.curComparison.words[i].linkedSets == "set2" && $(id).hasClass('show')) {
    			if ($(id).hasClass('show')) {
			    		setCount2 = linePack(i, setCount2);
			    	};
    		};
    	}		
	}

	//Add union bubble area to Dom.
	$('#tweetBubble3').append("<p id='bubbleArea3' class='bubbleArea'>" + bA3 + "</p>");
	$('#bubbleArea1').html(bA1);
	$('#bubbleArea2').html(bA2);

}


// Create menu items for each query, click one to display it. The custom search query is prepopulated in index.jade.
function buildUserImageSet(iComparisonId, iItem1, iUrlItem1, iItem2, iUrlItem2){
	// console.log("buildUserImageSet- iComparisonId : "+ iComparisonId +" | cgApp.curComparison : "+ cgApp.curComparison);

	// Set the selected class on the default query at start.
	var curComparison = "";
	if(iComparisonId == cgApp.curComparison.id){
		curComparison = "selected";
	}
	// Create query blocks containing the Twitter user images.
	$("#menu > #query_block_container").prepend("<li id='"+ iComparisonId +"' class='query_block "+ curComparison +"' onClick='queryBlockController("+ iComparisonId +")')>" +
											"<img class='twitterUserImage' src='"+ iUrlItem1 +"' alt='@"+ iItem1 +"'>" +
											"<img class='twitterUserImage' src='"+ iUrlItem2 +"' alt='@"+ iItem2 +"'>" +
											"<div class='comparisonTitle'>"+ iItem1 +"<br><span class='versus'>VS</span><br>"+ iItem2 +"</div>" +
										"</li>");

	// console.log("buildUserImageSet- curComparison : "+ curComparison);
}

function updateView(){

	// Change the selected/hilited query block according to the newly selected comparison.
	$(".query_block").removeClass("selected");
	var _this = this;
	$(".query_block").each(function(){
		console.log("* * * * attr id :"+ $(this).attr('id'));
		console.log("^ ^ ^ : "+ cgApp.curComparison.id);

		if ($(this).attr('id') == cgApp.curComparison.id){
			$(this).addClass("selected");
		}
	});
}

// 
function diagramView(){

}

// 
function setView(){

}

// 
function tweetView(){

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
