var sets = [];	//An array to hold sets of word origins.

// Creates set objects. This creates the parent objects for the tweets and word.
function Set(iData, iName) {
	sets.push(iName);
	this.tweets = [];

	for (var i = 0; i < iData.length; i++) {
		var tweetText = iData[i].text;
		console.log(iData[i].text);
		this.tweets.push(new Tweet(tweetText.cleanTweet(), iName));
			
	}
};