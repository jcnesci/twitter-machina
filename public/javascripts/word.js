// Creates the individual word objects.
function Word(theWord, refSet, vis) {
	this.value = theWord;
	this.linkedSets = [refSet];
	this.linkedTweets = [{}];
	//this.count = 1;
	this.visible = vis;	//true or false
};