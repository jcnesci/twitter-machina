// var words = [];	// An array for the collection of all the words.             // DEV: moved locally inside tweet object belonging to a comparison
var allTweets = [];	// An array to hold all the tweets.                          // DEV: keeping, in case we want to have an array of all tweets ever...?
// var lookup = {};	// Used to count words and determine duplicates.             // DEV: moved locally inside tweet object belonging to a comparison

// Creates the individual tweet objects.
function Tweet(tweet, refSet) {
	this.fullTweet = tweet;
	this.ref = [refSet];
	var tmpWords = tweet.cleanTweet().split(" ")
	
    this.words = [];
    this.lookup = {};

    allTweets.push(tweet);
	
	for (var i = 0; i < tmpWords.length; i++) {
			//If the word doesn't exists
    	if (this.lookup[tmpWords[i]] == undefined) {
    		this.lookup[tmpWords[i]] = { "count" : 1, "sets" : refSet};
    		this.words.push(new Word(tmpWords[i], refSet, true));
    	} else {
    		//If the word was originally in another set.
    		if (this.lookup[tmpWords[i]].sets != refSet) {
    			this.lookup[tmpWords[i]] = { "count" : 1 + this.lookup[tmpWords[i]].count, "sets" : "union"};
    		}
    		this.words.push(new Word(tmpWords[i], refSet, false));
    	}		
	}

    // console.log("tweet.js- words: - - - - - - - - - *");
    // console.log(this.words);

};
