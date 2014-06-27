// Represents the entire Common Ground app. This object must be created to run the project.
function clientApp(){

	// --- Properties
	this.comparisons = [];
	this.curComparison = null;
	
	// --- Behavior
	// Comparison objects
	// var comparison1 = new comparison("BarackObama", "MichelleObama");
	this.comparisons.push(new comparison(1, "BarackObama", "MichelleObama"));
	this.comparisons.push(new comparison(2, "WholeFoods", "McDonalds"));
	this.comparisons.push(new comparison(3, "facebook", "twitter"));
	this.comparisons.push(new comparison(4, "foxnews", "mnsbc"));
	this.curComparison = this.comparisons[0];					//TODO: later, the dropdown should affect the curComparison.
	// Generic button setup
	setupButtons();
	// Comparison obj setup
	for (var i = 0; i < this.comparisons.length; i++){
			// Setup drowdown buttons here (cant be done in setupButtons because that runs before cgApp()'s constructor is done and cdApp witl be undefined at that moment).
			$("#dd_queries").append("<option value='"+ this.comparisons[i].id +"'>"+ this.comparisons[i].item1 +" / "+ this.comparisons[i].item2 +"</option>");
			// Initiating server calls (they are not done in the comparison constructor so the comparisons array gets its length quicker).
			this.comparisons[i].setupServerCalls();
	}
	// 
	this.buildIntroHTML();
	
	// TODO: attach reloadCOntent when select new item in dropdown


	console.log("clientApp- comparisons :");
	console.log(this.comparisons);
}
clientApp.prototype = {
	// Cutomize the intro text for each comparison. 
	buildIntroHTML: function(){
		for (var i = 0; i < this.comparisons.length; i++){
			this.comparisons[i].introHTML = "<div id='intro_view'>" +
																				"<p>There is a lot of strife out there in the world. And that discord reaches online with arguments, name-calling, and all out twitter warfare. But aren’t we all humans, born of the same stuff? Can’t we find some Common Ground?</p>" +
																				"<p>People who talk similarly are said to be likely matches for friends. Let’s see who deep-down, should be getting along, and who might be better off staying far away from each other.</p>" +
																			"</div>";

			console.log("INTRO HTML : "+ this.comparisons[i].introHTML);
		}
	},
	start: function(){
		// Display the first comparison.
		emptyViewItems();
		introView();
	},
	switchCurComparison: function(iComparisonNum){
		console.log("*** iComparisonNum : "+ iComparisonNum);

		// Get comparison with the id from the dropdown value.
		var newComparison = $.grep(this.comparisons, function(c, i){
			console.log("^^^ c: ");
			console.log(c);
			return (c.id == iComparisonNum);
		});

		console.log("*** newComparison : ");
		console.log(newComparison);

		this.curComparison = newComparison[0];

		console.log("*** this.curComparison : ");
		console.log(this.curComparison);

		this.start();
	}
}

