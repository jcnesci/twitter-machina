var words = [];	// An array for the collection of all the words.
var allTweets = [];	// An array to hold all the tweets.
var lookup = {};	// Used to count words and determine duplicates.

// Creates the individual tweet objects.
function Tweet(tweet, refSet) {
	this.fullTweet = tweet;
	this.ref = [refSet];
	var tmpWords = tweet.cleanTweet().split(" ")
	this.words = tmpWords;
	allTweets.push(tweet);
	
	for (var i = 0; i < tmpWords.length; i++) {
			//If the word doesn't exists
    	if (lookup[tmpWords[i]] == undefined) {
    		lookup[tmpWords[i]] = { "count" : 1, "sets" : refSet};
    		words.push(new Word(tmpWords[i], refSet, true));
    	} else {
    		//If the word was originally in another set.
    		if (lookup[tmpWords[i]].sets != refSet) {
    			lookup[tmpWords[i]] = { "count" : 1 + lookup[tmpWords[i]].count, "sets" : "union"};
    		}
    		words.push(new Word(tmpWords[i], refSet, false));
    	}		
	}

};
