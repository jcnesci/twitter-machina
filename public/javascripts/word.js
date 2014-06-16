// Creates the individual word objects.
function Word(theWord, refSet) {
	this.value = theWord;
	this.linkedSets = [refSet];
	this.linkedTweets = [{}];	
};