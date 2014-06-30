//word exclusion array
var exWordArray = ["the", "a", "if", "is", "on", "in", "to", "it", "of"];

// Creates the individual word objects.
function Word(theWord, refSet, vis) {
	this.value = theWord;
	this.linkedSets = [refSet];
	this.linkedTweets = [{}];
	//this.count = 1;

	this.startPosition = {"left": "450px", "top": "300px"};
	this.position1 = {"left": 0, "top": 0};
	this.position2 = {"left":0, "top":0};
	this.position3 = {"left": 0, "top": 0};

	//if word is in exclusion array or only one letter, set visibility to false.
	if (exWordArray.indexOf(theWord) !== -1 || theWord.length < 2) {
		this.visible = false;
	} else {
		this.visible = vis;	//true or false
	}
}

Word.prototype = {
	setVisible: function(iVisible){

	}
}