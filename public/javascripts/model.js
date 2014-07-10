/*
Client.js
Contains the code relative to the Model parts of the app (following an MVC approach).
*/

// Global variables - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var socket = io.connect();						// Connect to the socket server.
var cgApp;														// The main client-side app, which controls everything.
var circlePackinglineHeight = 15;									// Used for circle packing.

// Main execution body - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
$(function(){

	// --- Setup

	cgApp = new clientApp(false);				// DEV: run the app with static data (ie. 'false').
	cgApp.start();
	
});

// Global functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Empties the sets array.
function emptyModelItems(){
	// words.length = 0;			// before var was made local to comparison obj
	allTweets.length = 0;
	// lookup = {};			// before var was made local to comparison obj
	// sets.length = 0;			// before var was made local to comparison obj
}

//DEV: should this be in view.js?
// Empties the tweet bubble divs.
function emptyViewItems(){
	// console.log("model.js- EMPTY VIEW ITEMS");
	// Clear current content div.
	$("#content").empty();
	//
	$("#tweetBubble1").empty();
	$("#tweetBubble2").empty();
	$("#tweetBubble3").empty();
	//
	$("#list1").empty();
	$("#list2").empty();
	//
	$("#searchContainer").empty();
}

//DEV: should this be in view.js?
// Empties the tweet bubble divs.
function emptySearchView(){
	console.log("model.js- EMPTY SEARCH VIEW");
	// Clear current content div.
	
}

// Print out the tweet text for each query.
function logTwitterResults(data) {
	console.log("-logTwitterResults - - - - - - - - - - - - - - - - - - - - - - - - - ");
	console.log("query string: "+ data.iQueryString);
	console.log("query num: "+ data.iQueryNum);
	$.each(data.iData, function(key, value){
		var tweetText = value.text;
		console.log("Tweet #"+ key + ": " + tweetText.cleanTweet() );
	});
}


function createSet(iData, iName) {
	var set = new Set(iData, iName);
}

// Common function, to clean a tweet of unwanted features.
String.prototype.cleanTweet = function() {		
	var tweet = this;
	// -- NB: we're not doing it now, but it's possible to store the regex matches in arrays for later use. We would need to use
	// Matches punctuation. Leaves words, time ex. 2:20, p.m, 5.7, urls, and contractions.
	var punctRegEx = new RegExp(/(?!\.\w{1,2})(?!\.\d{1,2})(?!\:\d{1,2})([^A-Za-z0-9#'\u2026]+|https?:\/\/\S+)/g);
	// Matches URLs that start with http, ftp, and https.
	var urlRegEx = new RegExp(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g);
	// Matches most emoticons.
	var emojiRegEx = new RegExp(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g);

	//tweet = tweet.replace(/@([a-zA-Z0-9]+)/g, "");	// remove user mentions.
	tweet = tweet.replace(punctRegEx, " "); // remove punctuation.
	tweet = tweet.replace(urlRegEx, "");	// remove http links.
	tweet = tweet.replace(emojiRegEx, "EMOJI "); //Swap Most Emoji with EMOJI	
	tweet = tweet.replace(/([\u2014])/g, '');	//em dash
	tweet = tweet.replace(/([\u201C])/g, '');	//left double quote
	tweet = tweet.replace(/([\u201D])/g, '');	//right double quote
	//tweet = tweet.replace(/([\u2026])/g, '');	// ... ellipsis
	tweet = tweet.replace(/([\u2019])/g, '\u0027');	// Make funky apostrophes regular
	tweet = tweet.replace(/([\u02BC])/g, '\u0027');	// Make funky apostrophes regular

	$.trim(tweet);	// Remove leading and trailing whitespace.

	return tweet;
}

// Common function, to split a tweet of unwanted features.
String.prototype.splitTweet = function() {		
	var tweet = this;
	// Matches punctuation. Leaves words, time ex. 2:20, p.m, 5.7, urls, and contractions.
	var punctRegEx = new RegExp(/(?!\.\w{1,2})(?!\.\d{1,2})(?!\:\d{1,2})([^A-Za-z0-9#'\u2026]+|https?:\/\/\S+)/g);

	tweet = tweet.split(punctRegEx); // remove punctuation.


	return tweet;
}

// -- -- -- -- -- Animations -- -- -- -- --

// Line Packing
function linePack(id, setCount, delayCount) {
	var span = $('#word' + id),
			width = span.width() + 3,
			canvasWidth = $('#bubbleSubcontainer').width() - 15,
			freeSpace = canvasWidth/3 - setCount.lineWidth,
			newTop = 0,
			newLeft = 0;

	if (width - 3 <= freeSpace) {
		newTop = setCount.lineCount * circlePackinglineHeight;
		newLeft = setCount.lineWidth;
		//console.log(newTop + ":" + newLeft);
		setCount.lineWidth = setCount.lineWidth + width;
	} else if (width - 3 > freeSpace) {
		++setCount.lineCount;
		setCount.lineWidth = 0;
		newTop = setCount.lineCount * circlePackinglineHeight;
		newLeft = setCount.lineWidth;
		setCount.lineWidth = setCount.lineWidth + width;
	}

	span.delay( 200 + delayCount * 10 ).animate({

			top: newTop + 50,
			left: newLeft + setCount.setPos + 10

		}, 1000, function() {

		//console.log("animation complete");

		});

	return {"lineWidth": setCount.lineWidth, "lineCount": setCount.lineCount , "setPos": setCount.setPos};

}

// Line Count for packing circles
function lineCount(iArea) {
   
    var intArea = iArea, // Initial Area to reference back to.
        lH = 15, // Line Height **Could make this a global variable for animations.
        radius = Math.sqrt(intArea / Math.PI), // initial radius of estimated circle.
        lC = Math.floor(2*radius / lH), // initial line count.
        sqAr = 0, // The square area of the circle based on the words square space.
        loopOn = 1,
        pcErr = 1; // percent Error

   	// A for loop to get the square area as close to the initial area as possible (0.01)
   	// For better acuraccy this should be reworked to account for a greater area or negative difference.
     for (; loopOn != 0;) {

        console.log(lC + 1);

        if (pcErr > 0.01) {
	        sqAr = 0;  // As the loop cycles through this needs to be reset.

	        // Calculate the area based on Line Height * Line Count for the circle.
	        for (i = 0; i <= lC; i++) {
	            if (i * lH < 2*radius) {
	            	if (i%2 == 0) {
		              var s = Math.sqrt(radius * radius - i * lH * i * lH);
		              sqAr = 2 * s * 15 + sqAr; // both sides of the circle.
		            } else {
		            	var lineArea = sqAr - 30*Math.sqrt(radius * radius - (i-1) * lH * (i-1) * lH);
		          		sqAr = sqAr + lineArea; // both sides of the circle.
		          	}
		          }
	            console.log("line : " + (i + 1) + " : " + sqAr);
	        }

	        var pcErr = 1 - sqAr / intArea; // Percent Error
	        console.log(pcErr);

	        // new area to shoot for...
	        sqRad = Math.sqrt(sqAr / Math.PI);
	        radius = 1 + radius;
	        lC = Math.floor(radius / lH);
	        console.log(radius);
	        console.log(sqAr);
        } else {
          loopOn = 0;
        }

    };
    console.log(lC + 1);
    return {"radius": radius, "lineCount": 2*lC};
}

// Packing Circle
function packCircle(iWords, iArea, iX, iY) {
	var wordsArray = iWords,
			specs = lineCount(iArea),
			lineTracker = [],
			curLine = 0;

	for (i = 0; i < specs.lineCount; i++) {
		if (i%2 == 0) {
		var space  = 2*Math.sqrt(specs.radius*specs.radius - i*15*i*15);
		lineTracker.push({"line": i, "space": space});
		} else {
			lineTracker.push({"line": i, "space": lineTracker[i-1].space});
		}
	}
	console.log(lineTracker);




/*	for (i = 0; i < wordsArray.length; i++) {
		if (wordsArray[i].linkedSets[0] == "set1") {
			if (curLine <= lineTracker.length) {
				console.log(lineTracker[curLine]);
				if (wordsArray[i].pixelWidth-3 > lineTracker[curLine].space) {
					cgApp.curComparison.words[i].circlePosition.percent = (wordsArray[i].pixelWidth-3)/lineTracker[curLine].space;
					cgApp.curComparison.words[i].circlePosition.line = curLine;
				} else {
					curLine++;
				}
			} else if (curLine2 <= lineTracker2.length) {
				console.log(lineTracker2[curLine2]);
				if (wordsArray[i].pixelWidth-3 > lineTracker2[curLine2].space) {
					cgApp.curComparison.words[i].circlePosition.percent = (wordsArray[i].pixelWidth-3)/lineTracker2[curLine2].space;
					cgApp.curComparison.words[i].circlePosition.line = curLine2;
					} else {
					curLine2++;
				}
			} else {
				console.log("**not enough space**");
			}
		}

	}*/



}


//-- -- -- -- -- -- -- -- -- -- -- -- -- --
