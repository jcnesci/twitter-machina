/*
Client.js
Contains the code relative to the Model parts of the app (following an MVC approach).
*/

// Globals - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var dataTwitterGetResult_1 = null;		// Results from 1st Twitter GET query.
var dataTwitterGetResult_2 = null;		// Results from 2nd Twitter GET query.
var allQueriesReceived = false;				// DEV: Currently unused.
var socket = null;

// Runs at start.
$(function(){

	// Setup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// connect to the socket server
	socket = io.connect(); 


	// Event handlers - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// Receive Twitter search results.
	socket.on('eReceiveTwitterResult', function (iResponse) {
		
		logTwitterResults(iResponse);

		// Store query results.
		if(iResponse.iQueryNum == 1){
			dataTwitterGetResult_1 = iResponse.iData;
		} else if(iResponse.iQueryNum == 2){
			dataTwitterGetResult_2 = iResponse.iData;
		}

		// When all data received, trigger the views.
		if(dataTwitterGetResult_1 != null && dataTwitterGetResult_2 != null){
			// console.log("t- ALL QUERIES RECEIVED");
			allQueriesReceived = true;			// Currently unused.
			
			// Clear Model & View items.
			emptyModelItems();
			emptyViewItems();
			// Create sets.
			createSet(dataTwitterGetResult_1, "set1");
			createSet(dataTwitterGetResult_2, "set2");
			emptyResultObjects();
			// Display diagram.
			diagramView();


			console.log(sets);
		}

	});

});

// 
function emptyResultObjects(){
	dataTwitterGetResult_1 = null;
	dataTwitterGetResult_2 = null;
}

// Empties the sets array.
function emptyModelItems(){
	words.length = 0;
	allTweets.length = 0;
	lookup = {};
	sets.length = 0;
}

//DEV: should this be in view.js?
// Empties the tweet bubble divs.
function emptyViewItems(){
	console.log("EMPTY BUBBLE DOM * * * * * * ********");
	$("#tweetBubble1").empty();
	$("#tweetBubble2").empty();
	$("#tweetBubble3").empty();
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
	$.trim(tweet);	// Remove leading and trailing whitespace.
		// return this.replace(/^\s+|\s+$/g,"");		// regex for trim fct.

	return tweet;
}
