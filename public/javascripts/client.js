// Globals - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var dataTwitterGetResult_1 = null;		// Results from 1st Twitter GET query.
var dataTwitterGetResult_2 = null;		// Results from 2nd Twitter GET query.
var allQueriesReceived = false;
var words = [];
var allTweets = [];
var sets = [];


$(function(){

	// Setup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// connect to the socket server
	var socket = io.connect(); 

	
	// Main - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	

	// Receive Twitter search results.
	socket.on('eReceiveTwitterResult', function (iResponse) {
		
		console.log("- - - - - - - - - - ");
		console.log(iResponse.iData);
		console.log("- ");
		console.log(iResponse.iQueryNum);
		console.log("- - - - -");

		// Store query results.
		if(iResponse.iQueryNum == 1){
			dataTwitterGetResult_1 = iResponse.iData;
		} else if(iResponse.iQueryNum == 2){
			dataTwitterGetResult_2 = iResponse.iData;
		}

		// When all data received, trigger the views.
		if(dataTwitterGetResult_1 != null && dataTwitterGetResult_2 != null){
			// console.log("* * * * * * * * * * * * * * * * * * * * * * * * ALL QUERIES RECEIVED");
			allQueriesReceived = true;			// Currently unused.
			diagramView();
		}

	});


});

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Models
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function Word(theWord, refSet) {
	this.value = theWord;
	this.ref = [refSet];
};

function Tweet(tweet, refSet, numX) {
	this.value = numX;
	this.fullTweet = tweet;
	this.ref = [refSet];

	this.words = tweet.split(" ");
	// this.words = tmpWords;

console.log("-- tmpWords.length = " + this.words.length);

	for (var i = 0; i < this.words.length; i++) {
			// words.push(new Word(tmpWords[i], refSet));

			console.log("-- #"+i);
	}

};

function Set(iData, iName) {
	var testing = iData;
	//console.log(testing);
	this.value = iName;
	//this.tweets = [];
	//this.words = [];

console.log("testing length = "+ testing.length);

	for (var i = 0; i < testing.length; i++) {
		var obj = testing[i];
		
		console.log("- #"+i+ " = " + obj);
			
			allTweets.push(new Tweet(obj, iName, i));
	}
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Views
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// 
function diagramView(){

	// TODO: set the state of the diagram view.
	// Each state has descriptive text and a graphical layout of the data associated with it.
	
	// For now, print data to webpage just to see it.
	printTwitterResults(dataTwitterGetResult_1, '#twitter_results_1 ul');
	printTwitterResults(dataTwitterGetResult_2, '#twitter_results_2 ul');
	// setState(1); 		// eventually, will be used to set first state of the view (ie. shows empty search boes that get populated with Barack & Michelle).
}

// 
function setView(){

}

// 
function tweetView(){

}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Controllers
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



var obamaData = {
	tweets : [
	"Thanks to the Affordable Care Act, getting covered means a health emergency won't break your bank.",
	"Hugs for Dad Happy Father's Day.",
	"College graduates Make sure you know your health care options.  #GetCovered",
	"Don't miss the opportunity to be an  Summer Fellow",
	"Watch President Obama's weekly address wishing dads a happy #FathersDay.",
	"Watch This could be you this summer.  #OFAFellows",
	"Add your name The burden of student loan debt is too great. It's time to take action.  #DegreesNotDebt",
	'"Michelle and I were saddened to hear of the passing of actress, author, and activist Ruby Dee." —President Obama',
	"Retweet if you think it's time to act on the student loan debt crisis. #DegreesNotDebt",
	"Take this survey What's your top priority for ?"
	]
};

// console.log(obamaData.tweets.length);
var obama = new Set(obamaData.tweets, "Barack Obama");
//var obama = new Tweet(obamaData.tweets[3], "Barack Obama");
//console.log(obama);
//console.log("-----------------");
// console.log(allTweets);
//console.log(words);




// Previously Created Javascript --------------------------------

// console.log('client');

window.onload = function() {

		// console.log("loaded window");
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
} }




// Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// Print data from Twitter JS object into an html element.
function printTwitterResults(data, domElementTitle) {
	$.each(data, function(key, value){
		var tweetText = value.text;
		$(domElementTitle).append('<li>'+ tweetText.cleanTweet() +'</li>');
	});
}


// Common function, to clean a tweet of unwanted features.
	String.prototype.cleanTweet = function() {		
		var tweet = this;
		// NB: we're not doing it now, but it's possible to store the regex matches in arrays for later use. We would need to use .
		tweet = tweet.replace(/@([a-zA-Z0-9]+)/g, "");	// remove user mentions.
		tweet = tweet.replace(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g, "");	// remove http links.
		tweet = tweet.replace(/: /, " ");		// remove colons at the end of a word.
		$.trim(tweet);	// Remove leading and trailing whitespace.
			// return this.replace(/^\s+|\s+$/g,"");		// regex for trim fct.

		return tweet;
	}