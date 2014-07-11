/*
View.js
Contains the code relative to the View parts of the app (following an MVC approach).
*/

// View for intro/1st state of a comparison.
function introView(){
	//console.log("introView -- - - - - cgApp");
	//console.log(cgApp);
	//console.log("introView -- - - - - cgApp.curComparison");
	//console.log(cgApp.curComparison);
	//console.log("introView -- - - - - cgApp.curComparison.introHTML");
	//console.log(cgApp.curComparison.introHTML);

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
												"<div class='row'>" +
													"<div class='col-lg-5 col-md-offset-1'>" +
														"<div class='listContainer'>" +
															// "<h2>List 1</h2>" +
															"<div id='list1' class='tweetlist'></div>" +
														"</div>" +
													"</div>" +
													"<div class='col-lg-5'>" +
														"<div class='listContainer'>" +
															// "<h2>List 2</h2>" +
															"<div id='list2' class='tweetlist'></div>" +
														"</div>" +
													"</div>" +
												"</div>" +
											"</div>");


	// Populate it.
	$.each(cgApp.curComparison.words, function(key, value) {
		if (value.linkedSets == "set1") {
			if ($("#list1 #tweet" + this.linkedTweet).html() == undefined) {
				$("#list1").append('<div id="tweet' + this.linkedTweet + '" class="tweet"><span id="word'+ key +'" class="tword">' + value.value + '</span></div>');
			} else {
				$("#list1 #tweet" + this.linkedTweet).html($("#list1 #tweet" + this.linkedTweet).html() + '<span id="word'+ key +'" class="tword">' + value.value + '</span>');
			}
		} else if (value.linkedSets == "set2") {
			if ($("#list2 #tweet" + this.linkedTweet).html() == undefined) {
				$("#list2").append('<div id="tweet' + this.linkedTweet + '" class="tweet"><span id="word'+ key +'" class="tword">' + value.value + '</span></div>');
			} else {
				$("#list2 #tweet" + this.linkedTweet).html($("#list2 #tweet" + this.linkedTweet).html() + '<span id="word'+ key +'" class="tword">' + value.value + '</span>');
			}
		}
		value.startPosition = $("#word" + key).position();
		value.pixelWidth = $('#word'+key).width();
	});

}

// 
function initialTweetBubblesView() {
	$("#state_title").html("state : initialTweetBubbles");

	// Add the HTML structure to be populated.
	$("<div id='bubbleView'>" +
			"<div class='row'>" +
				"<div class='col-lg-10 col-md-offset-1'>" +
					"<div id='bubbleContainer'>" +									// this is the full 10 columns wide
						"<div id='bubbleSubcontainer'>" +							// this is a manual way to have a smaller div within bubbleContainer to simulate padding, which we can't do with absolutely positioned words like we have. Make this slightly smaller than bubbleContainer.
							"<div id='tweetBubble1' class='tweetBubble'></div>" +
							"<div id='tweetBubble2' class='tweetBubble'></div>" +
						"</div>" +
					"</div>" +
					"<div id='bubbleContainerBg'></div>" +
				"</div>" +
			"</div>" +
		"</div>")
		.insertBefore("#listView");

	//Bubble Area Count
	var bA1 = 0,
	    bA2 = 0;

	//console.log("1 :");
	//console.log(cgApp.curComparison);
	//console.log("2 :");
	//console.log(cgApp.curComparison.words);
	//console.log("3 :");
	//console.log(cgApp.curComparison.lookup);

	// Populate it.
	var canvasWidth = $('#bubbleSubcontainer').width() - 15;
	var setCount1 = {"lineWidth": 0, "lineCount": 0 , "setPos": 0}; //For Line Pack
	var setCount2 = {"lineWidth": 0, "lineCount": 0 , "setPos": 2*canvasWidth/3}; //For Line Pack
	var delayCount = 0;
	var delayCount2 = 0;
	$.each(cgApp.curComparison.words, function(key, value){
		var theWord = value.value;

		if(value.linkedSets == "set1") {

		        if (value.visible == true) {
		                // Append words over tweet list yet invisible in the DOM. 
										$("#word" + key).attr({class: "show word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});
										// Fade In the words.
										//$("#word" + key).fadeIn(800);

						
						bA1 = value.pixelWidth + bA1; //Counting set1 visibile word lengths.

										// Animate to Bubble View
		                setCount1 = linePack(key, setCount1, delayCount);
		                delayCount++;
		        } else {
		        				// None Visisble words.
		        				$("#word" + key).attr({class: "hide word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});
										
		        }
		} else if(value.linkedSets == "set2") {
		        if (value.visible == true) {
		                // Append words over tweet list yet invisible in the DOM.
				            $("#word" + key).attr({class: "show word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});
				            // Fade In the words.
		                //$("#word" + key).fadeIn(800);

		                //value.pixelWidth = $('#word'+key).width();
		                bA2 = value.pixelWidth + bA2; //Counting set2 visibile word lengths.
		                // Animate to Bubble View
		                setCount2 = linePack(key, setCount2, delayCount2);
		                delayCount2++;
		        } else {
		        				// None Visible words.
                    $("#word" + key).attr({class: "hide word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});
		        }

		} else {
		        console.log(" ********** Unaccounted Word! **********");
		}
	});
	
	// DEV - Colin
	//console.log("-*-*-*-*- Begin packCircle -*-*-*-*-");
	//packCircle(cgApp.curComparison.words, bA1*15/2, 200, 200);

	// --- Setup
	$("#bubbleContainerBg").hide();

	// FadeOut the listView
	//$(".tword").each(function(i) {
	//	$(this).delay(1*i).fadeTo( 500, 0);
	//});
	//	$(".tword2").each(function(i) {
	//	$(this).delay(1*i).fadeTo( 500, 0);
	//});
/*
	$("#content #listView").delay( 2000 ).fadeOut(1000, function(){
			console.log("showBubbleView- ENTER");

			//And the word length count to the DOM.
			$('#tweetBubble1').append('<p id="bubbleArea1" class="bubbleArea" style="display: none">' + bA1 + '</p>');
			$('#tweetBubble2').append('<p id="bubbleArea2" class="bubbleArea" style="display: none">' + bA2 + '</p>');

			// Fade-in the bubbleView
			// Make the height of the bubbleView container equal the height of the largest bubble. Need to count the lines in the largest bubble and multiply that to the line height.
			var linesInLargestBubble = (setCount1.lineCount+1) > (setCount2.lineCount+1) ? (setCount1.lineCount+1) : (setCount2.lineCount+1);
			var padding = 60;
			var heightOfLargestBubble = linesInLargestBubble * circlePackinglineHeight + padding;
			$("#bubbleContainerBg").height(heightOfLargestBubble);
			$("#bubbleContainerBg").fadeIn();
			$("#bubbleContainerBg").css('top', -padding/2 + "px");			// center bg vertically
			
			$('#bubbleArea1').fadeIn(1000);
			$('#bubbleArea2').fadeIn(1000);	
		}

	);*/
	
}

function unionTweetBubblesView(){
	$("#state_title").html("state : unionTweetBubbles");

	// Add the HTML structure to be populated.
	$("#bubbleSubcontainer > #tweetBubble1").after("<div id='tweetBubble3' class='tweetBubble'></div>");

	// Populate it.

	var unionCount = {}; //Counting Unions
	var bA3 = 0, //Count Union Words length
			bA1 = Number($('#bubbleArea1').html()), //Pull Old Area Counts
			bA2 = Number($('#bubbleArea2').html());

	//Line Packing Variables
	var canvasWidth = $('#container').width() - 15;
	var setCount4 = {"lineWidth": 0, "lineCount": 0 , "setPos": 1*canvasWidth/3}; // For Duplicates to move before fading.
	var setCount3 = {"lineWidth": 0, "lineCount": 0 , "setPos": 1*canvasWidth/3}; // Union Pack
	var setCount2 = {"lineWidth": 0, "lineCount": 0 , "setPos": 2*canvasWidth/3}; // Right Bubble
	var setCount1 = {"lineWidth": 0, "lineCount": 0 , "setPos": 0}; 							// Left Bubble
	var delayCount = 0;

	for (var i = 0; i < cgApp.curComparison.words.length; i++) {
    	var id = "#word"+i;

    	if (cgApp.curComparison.lookup[cgApp.curComparison.words[i].value].sets == "union") {

    		//Union Count to check for duplicates.
	    	if (unionCount[cgApp.curComparison.words[i].value] == undefined) {
		    	bA3 = cgApp.curComparison.words[i].pixelWidth + bA3;  //Counting Length

		    	if (cgApp.curComparison.words[i].linkedSets == "set1") bA1 = bA1 - cgApp.curComparison.words[i].pixelWidth;
					if (cgApp.curComparison.words[i].linkedSets == "set2") bA2 = bA2 - cgApp.curComparison.words[i].pixelWidth;

		    	unionCount[cgApp.curComparison.words[i].value] = true;
		    	$(id).addClass("union");
		    	if ($(id).hasClass('show')) {
		    	setCount3 = linePack(i, setCount3, delayCount);
		    	delayCount++
		    	};
	    	} else {
	    		//Hide the Duplicates
	    		$(id).fadeOut(1000);
		    	if (cgApp.curComparison.words[i].linkedSets == "set1") bA1 = bA1 - cgApp.curComparison.words[i].pixelWidth;
					if (cgApp.curComparison.words[i].linkedSets == "set2") bA2 = bA2 - cgApp.curComparison.words[i].pixelWidth;
    		}
    	} else {
    		if (cgApp.curComparison.words[i].linkedSets == "set1" && $(id).hasClass('show')) {
    			if ($(id).hasClass('show')) {
			    		setCount1 = linePack(i, setCount1, delayCount);
			    		delayCount++;
			    	};
    		};
    		if (cgApp.curComparison.words[i].linkedSets == "set2" && $(id).hasClass('show')) {
    			if ($(id).hasClass('show')) {
			    		setCount2 = linePack(i, setCount2, delayCount);
			    		delayCount++;
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
	// console.log("*********************************");
	// console.log(cgApp.curComparison.id);
	// console.log("*********************************");
	// Create query blocks containing the Twitter user images.
	if (cgApp.curComparison.id != "custom") {
		// NEW post-bootstrap
		$("#query-menu").prepend("<div class='col-lg-2 query-block "+ curComparison +"' id='"+ iComparisonId +"' onClick='queryBlockController("+ iComparisonId +")')>" +
			"<div class='row'>" +
				"<div class='col-lg-6'>" +
					"<img class='twitterUserImage custom pull-right' src='"+ iUrlItem1 +"' alt='@"+ iItem1 +"'>" +
				"</div>" +
				"<div class='col-lg-6'>" +
					"<img class='twitterUserImage custom pull-left' src='"+ iUrlItem2 +"' alt='@"+ iItem2 +"'>" +
				"</div>" +
			"</div>" +
		"</div>");
	} else {
		$("#query_block_container #" + cgApp.curComparison.id).html("<img class='twitterUserImage' src='"+ iUrlItem1 +"' alt='@"+ iItem1 +"'>" +
											"<img class='twitterUserImage' src='"+ iUrlItem2 +"' alt='@"+ iItem2 +"'>" +
											"<div class='comparisonTitle'>"+ iItem1 +"<br><span class='versus'>VS</span><br>"+ iItem2 +"</div>");
	}
	// console.log("buildUserImageSet- curComparison : "+ curComparison);
}

function updateView(){

	// Change the selected/hilited query block according to the newly selected comparison.
	$(".query-block").removeClass("selected");
	var _this = this;
	$(".query-block").each(function(){
		//console.log("* * * * attr id :"+ $(this).attr('id'));
		//console.log("^ ^ ^ : "+ cgApp.curComparison.id);

		if ($(this).attr('id') == cgApp.curComparison.id){
			$(this).addClass("selected");
		}
	});
}

function searchView() {
	$('#searchContainer').append('<div id="searchForm"><div>'+
		'Person 1: <input id="input1" class="typeahead" type="text" name="person1" value="DalaiLama">'+
		'Person 2: <input id="input2" class="typeahead" type="text" name="person2" value="PutinRF_Eng">'+
		'<input type="submit" value="Submit" onclick="searchButton(); return false;"></div></div>');

	var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substringRegex;
	 
	    // an array that will be populated with substring matches
	    matches = [];
	 
	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');
	 
	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        // the typeahead jQuery plugin expects suggestions to a
	        // JavaScript object, refer to typeahead docs for more info
	        matches.push({ value: str });
	      }
	    });
	 
	    cb(matches);
	  };
	};
	 
	var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
	  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
	  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
	  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
	  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
	  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
	  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
	  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
	  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];
	 
	$('#searchForm .typeahead').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 1
	},
	{
	  name: 'states',
	  displayKey: 'value',
	  source: substringMatcher(states)
	});
}

function searchButton() {
	var inputs = {
		"input1": $("#input1").val(),
		"input2": $("#input2").val()
	};
	cgApp.search(inputs);
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
