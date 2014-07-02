/*
Client.js
Contains the code relative to the Model parts of the app (following an MVC approach).
*/

// Global variables - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var socket = io.connect();						// connect to the socket server
var cgApp;														// the main client-side app, which controls everything.

// Main execution body - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
$(function(){

	// --- Setup

	cgApp = new clientApp();
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
	console.log("model.js- EMPTY VIEW ITEMS");
	// Clear current content div.
	$("#content").empty();
	//
	$("#tweetBubble1").empty();
	$("#tweetBubble2").empty();
	$("#tweetBubble3").empty();
	//
	$("#list1").empty();
	$("#list2").empty();
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
	// NB: we're not doing it now, but it's possible to store the regex matches in arrays for later use. We would need to use .
	tweet = tweet.replace(/@([a-zA-Z0-9]+)/g, "");	// remove user mentions.
	tweet = tweet.replace(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g, "");	// remove http links.
	tweet = tweet.replace(/: /, " ");		// remove colons at the end of a word.
	tweet = tweet.replace(/[\.,-\/"!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, "");
	tweet = tweet.replace('\u2014', '');	//em dash
	tweet = tweet.replace('\u201C', '');	//left double quote
	tweet = tweet.replace('\u201D', '');	//right double quote

	$.trim(tweet);	// Remove leading and trailing whitespace.
		// return this.replace(/^\s+|\s+$/g,"");		// regex for trim fct.

	return tweet;
}

//-- -- -- -- -- Animations -- -- -- -- --

//Line Packing
	function linePack(id, setCount) {
		var span = $('#word' + id),
				width = span.width() + 3,
				lineHeight = 15,
				canvasWidth = $('#container').width() - 15,
				freeSpace = canvasWidth/3 - setCount.lineWidth,
				newTop = 0,
				newLeft = 0;

		if (width - 3 <= freeSpace) {
			newTop = setCount.lineCount * lineHeight;
			newLeft = setCount.lineWidth;
			//console.log(newTop + ":" + newLeft);
			setCount.lineWidth = setCount.lineWidth + width;
		} else if (width - 3 > freeSpace) {
			++setCount.lineCount;
			setCount.lineWidth = 0;
			newTop = setCount.lineCount * lineHeight;
			newLeft = setCount.lineWidth;
			setCount.lineWidth = setCount.lineWidth + width;
		}

		span.animate({

				top: newTop + 50,
				left: newLeft + setCount.setPos + 10

			}, 1000, function() {

			//console.log("animation complete");

			});

		return {"lineWidth": setCount.lineWidth, "lineCount": setCount.lineCount , "setPos": setCount.setPos};

		};


//-- -- -- -- -- -- -- -- -- -- -- -- -- --
