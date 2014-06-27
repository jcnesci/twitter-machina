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

        //NEW WORD
        //Does the word exist yet? If not create it and add it to the lookup. Visibility true.
    	if (lookup[tmpWords[i]] == undefined) {

    		lookup[tmpWords[i]] = { "count" : 1, "sets" : refSet};
            words.push(new Word(tmpWords[i], refSet, true));

    	} else {

            //DUPLICATE UNION
    		//Has the word been seen in both sets? Make visibility false.
    		if (lookup[tmpWords[i]].sets == "union") {

                lookup[tmpWords[i]].count = 1 + lookup[tmpWords[i]].count;
                words.push(new Word(tmpWords[i], refSet, false));

            //DUPLICATE IN SET
            //Has the word been seen in the set yet? Make visibility false.
    		} else if (lookup[tmpWords[i]].sets == refSet) {

                lookup[tmpWords[i]].count = 1 + lookup[tmpWords[i]].count;
                words.push(new Word(tmpWords[i], refSet, false));

            //NEW UNION WORD
            //By process of elimination an remaining words are initial union words.
            } else {

                lookup[tmpWords[i]] = { "count" : 1 + lookup[tmpWords[i]].count, "sets" : "union"};
                words.push(new Word(tmpWords[i], refSet, true));

            }
    		
    	}		
	}

};