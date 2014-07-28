/*
View.js
Contains the code relative to the View parts of the app (following an MVC approach).
*/

// dev_jn
function appIntroView(){
	$("#state_title").html("");
	$("#content").html(cgApp.introHTML);
}

function comparisonOutroView(){
	emptyViewItems();
	$("#state_title").html("");
	$("#content").html("<div id='comparison-outro' class='center-block'><p class='text-center'>Select another pair<br/> of people to compare.</p></div>");
}


// A list view of both sets of tweets. Un-cleaned.
function comparisonListView(){
	console.log("listView - - - - - ENTER");

	$("#state_title").html("Let's compare the words that they each use");

	var sets = cgApp.curComparison.sets;
	$('#user1').html('<span class="name">' + sets[0].fullName + '</span><span class="screen_name">@' + sets[0].screenName + '</span>');
	$('#user2').html('<span class="name">' + sets[1].fullName + '</span><span class="screen_name">@' + sets[1].screenName + '</span>');
	$('#user1').fadeIn(1000);
	$('#user2').fadeIn(1000);

	// Add the HTML structure to be populated.
	$("#content").html("<div id='canvasBg' class='col-md-10 col-md-offset-1'></div><div id='listView'>");

	// Populate it.
	$.each(cgApp.curComparison.words, function(key, value) {
		if (value.linkedSets == "set1") {
				$("#canvasBg").append('<span id="word'+ key +'" class="tword" style="display: none;">' + value.value + '</span>');
				value.pixelWidth = $('#word' + key).width();
				// send word to listPack for positioning. (wordObj, width, set, word's key)
				listPack(value, 503 - 30, 0, key);
		} else if (value.linkedSets == "set2") {
				$("#canvasBg").append('<span id="word'+ key +'" class="tword" style="display: none;">' + value.value + '</span>');
				value.pixelWidth = $('#word' + key).width();
				// send word to listPack for positioning. (wordObj, width, set, word's key)
				listPack(value, 503 - 30, 1, key);
		}
	});

	// Make an array of each sets lineCount and tweetCount.
	var aLc = [cgApp.curComparison.sets[0].listPack.lineCount, cgApp.curComparison.sets[1].listPack.lineCount];
	var aTc = [cgApp.curComparison.sets[0].listPack.currentTweet, cgApp.curComparison.sets[1].listPack.currentTweet];

	// Take the largest lineCount and tweetCount and calculate the canvas height, then animate.
	var maxHeight = Math.max.apply(null, aLc) * circlePackinglineHeight + Math.max.apply(null, aTc) * 30;
	$('#canvasBg').animate({
		height: 30 + maxHeight + 30
	}, 1000, function() {

			console.log("canvasBg Grow!");
			console.log(30 + maxHeight + 30);

	});

	// reset set's listPacking values for future packing.
	cgApp.curComparison.sets[0].listPack = {
		"usedSpace": 0,
		"lineCount": 0,
		"currentTweet": 0,
	};
	cgApp.curComparison.sets[1].listPack = {
		"usedSpace": 0,
		"lineCount": 0,
		"currentTweet": 0,
	};

}

// From the list view of words, moves them into 2 separate circles of a venn diagram of words for each Twitter user.
function comparisonInitialVennView() {
	$("#state_title").html("Finally, what words do both of them use?");

/*
	// Add the HTML structure to be populated.
	$("<div id='bubbleView'>" +
			"<div class='row'>" +
				"<div class='col-lg-10 col-md-offset-1'>" +
					"<div id='bubbleContainer'>" +									// this is the full 10 columns wide
						"<div id='bubbleSubcontainer'>" +							// this is a manual way to have a smaller div within bubbleContainer to simulate padding, which we can't do with absolutely positioned words like we have. Make this slightly smaller than bubbleContainer.
							"<div id='tweetBubble1' class='tweetBubble'></div>" +
							"<div id='tweetBubble2' class='tweetBubble'></div>" +
						"</div>" +
					"</div>" +
					"<div id='bubbleContainerBg'></div>" +
				"</div>" +
			"</div>" +
		"</div>")
		.insertBefore("#listView");
*/

	//Bubble Area Count
	var bA1 = 0,
	    bA2 = 0;

	// Preperations fot absolute positioning.
	$.each(cgApp.curComparison.words, function(key, value) {
		value.startPosition = $("#word" + key).position();
		value.pixelWidth = $('#word'+key).width();
		value.selfRef = key;
		if (value.linkedSets == "set1") {
			if (cgApp.curComparison.sets[0].tweets[this.linkedTweet].height == 0) {
				cgApp.curComparison.sets[0].tweets[this.linkedTweet].height = $("#list1 #tweet" + this.linkedTweet).innerHeight();
				console.log("tweet-" + this.linkedTweet + " height=" + cgApp.curComparison.sets[0].tweets[this.linkedTweet].height);
			}
			$("#list1 #tweet" + this.linkedTweet).attr({style: "height: " +	cgApp.curComparison.sets[0].tweets[this.linkedTweet].height + "px"});
		} else {
			if (cgApp.curComparison.sets[1].tweets[this.linkedTweet].height == 0) {
				cgApp.curComparison.sets[1].tweets[this.linkedTweet].height = $("#list2 #tweet" + this.linkedTweet).innerHeight();
				console.log("tweet-" + this.linkedTweet + " height=" + cgApp.curComparison.sets[1].tweets[this.linkedTweet].height);
			}
			$("#list2 #tweet" + this.linkedTweet).attr({style: "height: " +	cgApp.curComparison.sets[1].tweets[this.linkedTweet].height + "px"});
		}
	});
	
	// Fade in the canvas background for word animation.
	//$("#canvasBg").fadeIn();

	// Populate it.
	$.each(cgApp.curComparison.words, function(key, value){
		var theWord = value.value;
/*		if (theWord.cleanTweet() == "") {
			$("#word" + key).attr({class: "extra word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});
		} else {*/
			if(value.linkedSets == "set1") {

			        if (value.visible == true) {
											$("#word" + key).attr({class: "word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});

							bA1 = value.pixelWidth + bA1; //Counting set1 visible word lengths.

			        } else {
			        				// None Visisble words. "extra" has replaced hide, which was already in bootstrap.
			        				$("#word" + key).attr({class: "extra word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});
											
			        }
			} else if(value.linkedSets == "set2") {
			        if (value.visible == true) {
					            $("#word" + key).attr({class: "word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});

			                bA2 = value.pixelWidth + bA2; //Counting set2 visible word lengths.

			        } else {
			        				// None Visible words.  "extra" has replaced hide, which was already in bootstrap.
	                    $("#word" + key).attr({class: "extra word", style: "top: " +	value.startPosition.top + "px;left: " + value.startPosition.left + "px"});
			        }

			} else {
			        console.log(" ********** Unaccounted Word! **********");
			}
		//}
	});
	cgApp.curComparison.sets[0].circleArea = bA1;
	cgApp.curComparison.sets[1].circleArea = bA2;

	// newAnimation - Colin :: Circle Packing!!!!
	console.log("-*-*-*-*- Begin packCircle -*-*-*-*-");
	var positioning = $('#canvasBg').width();
	console.log(positioning);
	circlePack(cgApp.curComparison.words.filter(set1Filter), bA1*16, positioning*.2, 200);
	circlePack(cgApp.curComparison.words.filter(set2Filter), bA2*16, positioning*.8, 200);

	$.each(cgApp.curComparison.words.filter(zeroVisFilter), function(key, value){
		
		if (value.firstPairLocation == undefined) {
			$("#word" + value.selfRef).fadeOut();
		} else if (value.secondSetPairLocation != undefined) {
			animateToDuplicate(value, key, cgApp.curComparison.words[value.secondSetPairLocation].circlePosition);
		} else {
			animateToDuplicate(value, key, cgApp.curComparison.words[value.firstPairLocation].circlePosition);
		}

	});

	$('#canvasBg').delay( 3000 ).animate({
			height: 15 + Math.max.apply(null, [Math.sqrt(bA1*15/Math.PI)*2, Math.sqrt(bA2*15/Math.PI)*2]) + 30
		}, 1000, function() {

				console.log("canvasBg shrink!");
				//console.log(15 + maxHeight + 15);

			});
	
}

// From the 2 initial venn circles, creates a 3rd circle with union words.
function comparisonUnionVennView(){
	$("#state_title").html("Start over or choose another pair of users");

	// Add the HTML structure to be populated.
	
	// Populate it.
	var unionCount = {}; //Counting Unions
	var bA3 = 0, //Count Union Words length
			bA1 = cgApp.curComparison.sets[0].circleArea, //Pull Old Area Counts
			bA2 = cgApp.curComparison.sets[1].circleArea;


	$.each(cgApp.curComparison.words,  function(key, value) {
    	var id = "#word" + key;

    	if (cgApp.curComparison.lookup[cgApp.curComparison.words[key].value].sets == "union") {
    		
    		//Union Count to check for duplicates.
	    	if (unionCount[cgApp.curComparison.words[key].value] == undefined) {
		    	bA3 = cgApp.curComparison.words[key].pixelWidth + bA3;  //Counting Length
		    	cgApp.curComparison.words[key].union = true;
		    	if (cgApp.curComparison.words[key].linkedSets == "set1") bA1 -= cgApp.curComparison.words[key].pixelWidth;
					if (cgApp.curComparison.words[key].linkedSets == "set2") bA2 -= cgApp.curComparison.words[key].pixelWidth;

		    	unionCount[cgApp.curComparison.words[key].value] = true;
		    	$(id).addClass("union");

	    	} else {
	    		//Hide the Duplicates
	    		value.visible = false;
	    		cgApp.curComparison.words[key].union = true;
		    	if (cgApp.curComparison.words[key].linkedSets == "set1") bA1 = bA1 - cgApp.curComparison.words[key].pixelWidth;
					if (cgApp.curComparison.words[key].linkedSets == "set2") bA2 = bA2 - cgApp.curComparison.words[key].pixelWidth;
    		}
    	} 		
	});

	console.log("-*-*-*-*- Begin Middle packCircle -*-*-*-*-");
	var positioning = $('#canvasBg').width();
	console.log(positioning);
	circlePack(cgApp.curComparison.words.filter(unionFilter), bA3*15, positioning*.5, 200);

	$.each(cgApp.curComparison.words.filter(unionVizFilter), function(key, value){
			animateToDuplicate(value, key, cgApp.curComparison.words[value.firstPairLocation].circlePosition);
	});
	
	console.log(cgApp.curComparison.words.filter(NonUnionSet1Filter));
	circlePack(cgApp.curComparison.words.filter(NonUnionSet1Filter), bA1*31, positioning*.2, 200);
	circlePack(cgApp.curComparison.words.filter(NonUnionSet2Filter), bA2*35, positioning*.80, 200);

}


// Create menu items for each query, click one to display it. The custom search query is prepopulated in index.jade.
function buildUserImageSet(iComparisonId, iItem1, iUrlItem1, iItem2, iUrlItem2){
	// console.log("buildUserImageSet- iComparisonId : "+ iComparisonId +" | cgApp.curComparison : "+ cgApp.curComparison);

	// Set the selected class on the default query at start.
	var curComparison = "";
	if(iComparisonId == cgApp.curComparison.id){
		curComparison = "selected";
	}
	// console.log("*********************************");
	// console.log(cgApp.curComparison.id);
	// console.log("*********************************");
	// Create query blocks containing the Twitter user images.
	if (cgApp.curComparison.id != "custom") {
		// NEW post-bootstrap
		$("#query-menu").prepend("<div class='col-lg-2 query-block "+ curComparison +"' id='"+ iComparisonId +"' onClick='queryBlockController("+ iComparisonId +")')>" +
			"<div class='row'>" +
				"<div class='col-lg-6'>" +
					"<img class='twitterUserImage custom pull-right' src='"+ iUrlItem1 +"' alt='@"+ iItem1 +"'>" +
				"</div>" +
				"<div class='col-lg-6'>" +
					"<img class='twitterUserImage custom pull-left' src='"+ iUrlItem2 +"' alt='@"+ iItem2 +"'>" +
				"</div>" +
			"</div>" +
		"</div>");
	} else {
		$("#query_block_container #" + cgApp.curComparison.id).html("<img class='twitterUserImage' src='"+ iUrlItem1 +"' alt='@"+ iItem1 +"'>" +
											"<img class='twitterUserImage' src='"+ iUrlItem2 +"' alt='@"+ iItem2 +"'>" +
											"<div class='comparisonTitle'>"+ iItem1 +"<br><span class='versus'>VS</span><br>"+ iItem2 +"</div>");
	}
	// console.log("buildUserImageSet- curComparison : "+ curComparison);
}

function updateView(){

	// Change the selected/hilited query block according to the newly selected comparison.
	$(".query-block").removeClass("selected");
	var _this = this;
	$(".query-block").each(function(){
		//console.log("* * * * attr id :"+ $(this).attr('id'));
		//console.log("^ ^ ^ : "+ cgApp.curComparison.id);

		if ($(this).attr('id') == cgApp.curComparison.id){
			$(this).addClass("selected");
		}
	});
}

function searchView() {
	$('#user1').html('<span class="name">Person 1: </span><span class="screen_name">@<input id="input1" class="typeahead" type="text" name="person1" value="DalaiLama"></span>');
	$('#user2').html('<span class="name">Person 2: </span><span class="screen_name">@<input id="input2" class="typeahead" type="text" name="person2" value="PutinRF_Eng"></span>' +
		'<input id="submit1" type="submit" value="Submit" onclick="searchButton(); return false;">');

	$('#user1').fadeIn(1000);
	$('#user2').fadeIn(1000);

	var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substringRegex;
	 
	    // an array that will be populated with substring matches
	    matches = [];
	 
	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');
	 
	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        // the typeahead jQuery plugin expects suggestions to a
	        // JavaScript object, refer to typeahead docs for more info
	        matches.push({ value: str });
	      }
	    });
	 
	    cb(matches);
	  };
	};
	 
	var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
	  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
	  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
	  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
	  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
	  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
	  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
	  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
	  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];
	 
	$('#searchForm .typeahead').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 1
	},
	{
	  name: 'states',
	  displayKey: 'value',
	  source: substringMatcher(states)
	});
}

function searchButton() {
	var inputs = {
		"input1": $("#input1").val(),
		"input2": $("#input2").val()
	};
	cgApp.search(inputs);
}

//DEV: should this be in view.js?
// Empties the tweet bubble divs.
function emptyViewItems(){
	// console.log("model.js- EMPTY VIEW ITEMS");
	// Clear current content div.
	$("#content").empty();
	//
	$("#tweetBubble1").empty();
	$("#tweetBubble2").empty();
	$("#tweetBubble3").empty();
	//
	$("#list1").empty();
	$("#list2").empty();
	//
	$("#searchContainer").empty();

	$('#user1').fadeOut(500);
	$('#user2').fadeOut(500);
}

//DEV: should this be in view.js?
// Empties the tweet bubble divs.
function emptySearchView(){
	console.log("model.js- EMPTY SEARCH VIEW");
	// Clear current content div.
	
}