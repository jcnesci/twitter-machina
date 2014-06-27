// var words = [];	// An array for the collection of all the words.             // DEV: moved locally inside tweet object belonging to a comparison
var allTweets = [];	// An array to hold all the tweets.                          // DEV: keeping, in case we want to have an array of all tweets ever...?
// var lookup = {};	// Used to count words and determine duplicates.             // DEV: moved locally inside tweet object belonging to a comparison

// Creates the individual tweet objects.
function Tweet(iComparison, iSet, tweet) {
	this.comparison = iComparison;
    this.set = iSet;
    this.fullTweet = tweet;
	var tmpWords = tweet.cleanTweet().split(" ");

    allTweets.push(tweet);
	
  /*
  //OLD
	for (var i = 0; i < tmpWords.length; i++) {
			//If the word doesn't exists
    	if (this.comparison.lookup[tmpWords[i]] == undefined) {
    		this.comparison.lookup[tmpWords[i]] = { "count" : 1, "sets" : this.set.name};
    		this.comparison.words.push(new Word(tmpWords[i], this.set.name, true));
    	} else {
    		//If the word was originally in another set.
    		if (this.comparison.lookup[tmpWords[i]].sets != this.set.name) {
    			this.comparison.lookup[tmpWords[i]] = { "count" : 1 + this.comparison.lookup[tmpWords[i]].count, "sets" : "union"};
    		}
    		this.comparison.words.push(new Word(tmpWords[i], this.set.name, false));
      }
  }
  */

  // NEW
	for (var i = 0; i < tmpWords.length; i++) {  

      //NEW WORD
      //Does the word exist yet? If not create it and add it to the lookup. Visibility true.
  	if (this.comparison.lookup[tmpWords[i]] == undefined) {

  		this.comparison.lookup[tmpWords[i]] = { "count" : 1, "sets" : this.set.name};
          this.comparison.words.push(new Word(tmpWords[i], this.set.name, true));

  	} else {

          //DUPLICATE UNION
  		//Has the word been seen in both sets? Make visibility false.
  		if (this.comparison.lookup[tmpWords[i]].sets == "union") {

              this.comparison.lookup[tmpWords[i]].count = 1 + this.comparison.lookup[tmpWords[i]].count;
              this.comparison.words.push(new Word(tmpWords[i], this.set.name, false));

          //DUPLICATE IN SET
          //Has the word been seen in the set yet? Make visibility false.
  		} else if (this.comparison.lookup[tmpWords[i]].sets == this.set.name) {

          this.comparison.lookup[tmpWords[i]].count = 1 + this.comparison.lookup[tmpWords[i]].count;
          this.comparison.words.push(new Word(tmpWords[i], this.set.name, false));

      //NEW UNION WORD
      //By process of elimination an remaining words are initial union words.
      } else {

          this.comparison.lookup[tmpWords[i]] = { "count" : 1 + this.comparison.lookup[tmpWords[i]].count, "sets" : "union"};
          this.comparison.words.push(new Word(tmpWords[i], this.set.name, true));
      }
  	}		
	}

};
