/*
Client.js
Contains the code relative to the Model parts of the app (following an MVC approach).
*/

// Globals - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var dataTwitterGetResult_1 = null;		// Results from 1st Twitter GET query.
var dataTwitterGetResult_2 = null;		// Results from 2nd Twitter GET query.
var allQueriesReceived = false;
var set1;

// Runs at start.
$(function(){

	// Setup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// connect to the socket server
	var socket = io.connect(); 


	// Event handlers - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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
			// console.log("t- ALL QUERIES RECEIVED");
			allQueriesReceived = true;			// Currently unused.
			
			createSet(dataTwitterGetResult_1, "set1");
		}

	});

});

function createSet(iData, iName) {
	set1 = new Set(iData, iName);
	console.log(set1);

	diagramView();
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
