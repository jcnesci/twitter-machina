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
	
});

// Global functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// 
function emptyResultObjects(){
	dataTwitterGetResult_1 = null;
	dataTwitterGetResult_2 = null;
}

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

//Adding a union class and moving union words to another div.
function union() {
	console.log("model.js- union- ENTER --------------------");

	// tweetBubbles();
	for (var i = 0; i < words.length; i++) {
    	if (lookup[words[i].value].sets == "union") {
    		var id = "#"+i;
    		$uSpan = $(id).clone();
    		$(id).remove();
    		$("#tweetBubble3").append($uSpan);
    		$(id).addClass("union");
    	}		
	}
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
