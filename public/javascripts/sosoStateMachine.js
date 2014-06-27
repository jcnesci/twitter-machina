function sosoStateMachine(){

	this.curState = null;
	this.curTransition = null;
	this.isTransitionBlocking = false;

	this.states = [];
	this.transitions = [];

	// console.log("sosoStateMachine- this.states : " + this.states);
	// console.log("sosoStateMachine- this.transitions : " + this.transitions);
}
sosoStateMachine.prototype = {
	getState: function(iStateName){
		// If the state exists, return it.
		for (var i = 0; i < this.states.length; i++){
			if (this.states[i].name == iStateName){
				// console.log("sosoStateMachine- getState- state already exists: "+ this.states[i].name);
				return this.states[i];
			}
		}
		// Otherwise, return null.
		return null;
	},
	getTransition: function(iStartState, iEndState){
		// If the transition exists, return it.
		for (var i = 0; i < this.transitions.length; i++){
			if (this.transitions[i].startState == iStartState && this.transitions[i].endState == iEndState){
				// console.log("sosoStateMachine- getTransition- transition already exists: "+ this.transitions[i]);
				return this.transitions[i];
			}
		}
		// Otherwise, return null.
		return null;
	},
	addState: function(iStateName){
		// console.log("sosoStateMachine- addState- iStateName : "+ iStateName);
		
		var state = this.getState(iStateName);

		if (state){
			// If state exists already, return it.
			return state;
		} else {
			// Otherwise, create it now.
			var newState = new sosoState(iStateName);
			this.states.push(newState);
			// 
			// console.log("sosoStateMachine- addState- states: ");
			// console.log(this.states);
			// 
			return newState;
		}
		
	},
	addTransition: function(iStartState, iEndState){
		// console.log("sosoStateMachine- addTransition- iStartState : " + iStartState +" | iEndState : "+ iEndState);
		
		var newStartState = this.addState(iStartState);
		var newEndState = this.addState(iEndState);
		var transition = this.getTransition(newStartState, newEndState);

		if (transition){
			// If transition exists already, return it.
			return transition;
		} else {
			// Otherwise, create it now.
			var newTransition = new sosoStateTransition(newStartState, newEndState);
			this.transitions.push(newTransition);
			// 
			// console.log("sosoStateMachine- addTransition- transitions: ")
			// console.log(this.transitions);
			// 
			return newTransition;
		}

	},
	gotoState: function(iStateName){
		
		// See if state exists.
		var state = this.getState(iStateName);

		if (state){
			
			// If the curState is null, just set it to 'state'.
			if (this.curState == null){
				this.curState = state;
				// console.log("sosoStateMachine- gotoState- state initiated at : "+ state.name);
				return true;
			} else {
				// TODO: add transitionBlicking here, if necessary.

				// If the transition exists, start it.
				var transition = this.getTransition(this.curState, state);
				if (transition){
					this.startTransition(transition);
					return true;
				} else {
					// console.log("sosoStateMachine- gotoState- ERROR: transition does not exist.");
					return false;
				}

			}

		} else {
			// console.log("sosoStateMachine- gotoState- ERROR: state does not exist.");
			return false;
		}
	},
	startTransition: function(iTransition){
		this.curTransition = iTransition;
		this.curState = this.curTransition.endState;
		console.log("sosoStateMachine- startTransition- transition complete. curState : "+ this.curState.name +" | curTransition : ["+ this.curTransition.startState.name +", "+ this.curTransition.endState.name +"]");
	},
	forceState: function(iStateName){
		// See if state exists.
		var state = this.getState(iStateName);
		if (state){
			this.curState = state;
			this.curTransition = null;
			console.log("sosoStateMachine- forceState- curState: "+ this.curState);
		}
	}
}