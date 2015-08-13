Parse.initialize("LZns8tKGpiFr6f1NbgHatFoOAQ8KBm2m8X8SoEZF", "QGkhPTDc3qLV3mVNgisg7gAqGzbciuXhBTnnyYjy");

$(document).ready(function() {
	$('#searchButton').on('click',function (e) {
		e.preventDefault();
		searchUserHistory();
	})
	$('#reportMatch').on('click',function (e) {
		e.preventDefault();
		createGameForm();
	})
	$('#submitData').on('click', function (e) {
		e.preventDefault();
		submitGame();
	})
	$('#playMatch').on('click',function (e) {
		e.preventDefault();
		populatePlayers();
	})
    $('#createMatch').on('click', function (e) {
		e.preventDefault();
		createScoreBoard();
		e.preventDefault();
		// window.location.replace("scoreBoard.html");
		//console.log(player1 + ", " + player2 + ", " + points + ", " + isRanked);
		//createMatch(player1,player2,points,isRanked);
	})
	$('#createUser').on('click', function(e) {
	    e.preventDefault();
		signUp();
	})
	$('#navBarSignIn').on('click', function(e) {
	    e.preventDefault();
	    var username = $("#navBarUsername").val();
    	var password = $("#navBarPassword").val();
		logIn(username,password);
	})
	$('#logOut').on('click', function(e) {
	    e.preventDefault();
	    alert('pce ' + getCurrentUser() + '!');
		logOut();
	})
});

function logOut () {
	Parse.User.logOut();
	window.location.replace("index.html");
}
function handleParseError(err) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
      // If web browser, render a log in screen
      // If Express.js, redirect the user to the log in route
      break;
    // Other Parse API errors that you want to explicitly handle
  }
}
function signUp() {
	var user = new Parse.User();
	var name = $("#signUpName").val();
	var school = $("#signUpSchool").val();
	var email = $("#signUpEmail").val();
	var username = $("#signUpUsername").val();	
	var password = $("#signUpPassword").val();
	var confPassword = $("#confirmPassword").val();


	if (password === confPassword) {//no .equals?
		user.set("name", name);
		user.set("school", school);
		user.set("email", email);
		user.set("username", username);
		user.set("password", password);
		user.set("rank", 1400);
	} else {
		//throw new error
		alert("Passwords do not match! Please try again.")
	}
	user.signUp(null, {
		success: function(user) {
			//setCurrentUser(user);
		    alert("Thank you for signing up. We'll keep you updated!");
		    logIn(username,password);
		},
		error: function(user, error) {
			handleParseError(error);
			alert("Error: " + error.code + " " + error.message);
		}
	});

}
function setCurrentUser(username) {
	sessionStorage.setItem("user",username);
}
function getCurrentUser() {
	return sessionStorage.getItem("user");
}

function logIn(username,password) {
    var query = new Parse.Query(Parse.User);
	query.equalTo("username", username);  
	query.find({
		success: function(user) {
			for (var i = 0; i < user.length; i++) {
			  	var object = user[i];
			  	sessionStorage.setItem((username + "Rank"),object.get('rank'));
		    }
		}, 
		error: function(user,error) {
			console.log("user not found");
		}
	});
    Parse.User.logIn(username, password, {
        success: function(user) {
        	//new ManageTodosView();
			//self.undelegateEvents();
			//delete self;
			setCurrentUser(username);
            alert('Welcome!');
            window.location.replace("loggedIn.html");//http://stackoverflow.com

        },
        // If there is an error
        error: function(user, error) {
        	handleParseError(error);
        	//self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
        	//this.$(".login-form button").removeAttr("disabled");
        	alert('This email/password is not correct. Please try again.');
            console.log(error);
        }
    });
}

function createGameForm() {//onclick of (Report Game)
	var Player = Parse.Object.extend("User");
	var query = new Parse.Query(Player);
	query.find({
		success: function(players) {
			console.log(players.length);
			var selectW = document.getElementById("winnerName");
			var lengthW = selectW.options.length;
			if (lengthW >= 2) { //this gets rid of the text "select the winner" when you reclick on the button
				for (i = 0; i < lengthW; i++) {
				  selectW.options[0] = null;
				}
			}
			var selectL = document.getElementById("loserName");
			var lengthL = selectL.options.length;
			if (lengthL >= 2) { //this gets rid of the text "select the winner" when you reclick on the button
				for (i = 0; i < lengthL; i++) {
				  selectL.options[0] = null;
				}
			}
			//<option value="" disabled selected>Select the Winner</option>
			for (var i = 0; i < players.length; i++) { 
  				var player = players[i];
  				if(sessionStorage.getItem(String(player.get('name'))) !== String(player.get('name'))) {
  					sessionStorage.setItem(String(player.get('name')),String(player.get('name')));
		   		}
		   		(function($) {
	      			$('#winnerName').append($("<option></option>")
			    	.attr("value",String(sessionStorage.getItem(String(player.get('name')))))
			    	.text(String(sessionStorage.getItem(String(player.get('name')))))); 
			    	$('#loserName').append($("<option></option>")
			    	.attr("value",String(sessionStorage.getItem(String(player.get('name')))))
			    	.text(String(sessionStorage.getItem(String(player.get('name')))))); 
	      		})(jQuery);
		   	}
	    },
	    error: function(error) {
	    	alert("Error: " + error.code + " " + error.message);
	    }
	});
}

function submitGame() {
	//creating a new instance of the game
	var Game = Parse.Object.extend("Game");
	var match = new Game();

	//retrieving the values of from the form
	var winner = $("#winnerName").val();
	var loser = $("#loserName").val();
	var winner_Score = parseInt($("#scoreW").val());
	var loser_Score = parseInt($("#scoreL").val());
	var winnerID = "";
	var loserID = "";

	match.set("loser",loser);
	match.set("winner",winner);
	match.set("winnerScore",winner_Score);
	match.set("loserScore",loser_Score);
	
	//getting the userfrom the database
	var Player = Parse.Object.extend("User");
	var queryWin = new Parse.Query(Player);
	var queryLose = new Parse.Query(Player);

	queryWin.equalTo("name",winner);
	queryLose.equalTo("name",loser);

	queryWin.find().then(function(playersW) {
		console.log("player id: " + playersW[0].id);
		winnerID = playersW[0].id;
		match.set("winnerID",winnerID);
		return playersW[0].id;
	}).then(function() {
		return queryLose.find();
	}).then(function(playersL) {
		console.log("player id: " + playersL[0].id);
		loserID = playersL[0].id;
		match.set("loserID",loserID);
		return playersL[0].id;
	}).then(function() {
		return match.save(null);
	}).then(function(match) {
		alert('new match recorded with an id of: ' + match.id);
	}, function(error) {
		alert("Error: " + error.code + " " + error.message);
	});
}

function populatePlayers() {//onclick of (play match)
	var Player = Parse.Object.extend("User");
	var query = new Parse.Query(Player);
	query.find({
		success: function(players) {
			console.log(players.length);
			var selectW = document.getElementById("player1");
			var lengthW = selectW.options.length;
			if (lengthW >= 2) { //this gets rid of the text "select the winner" when you reclick on the button
				for (i = 0; i < lengthW; i++) {
				  selectW.options[0] = null;
				}
			}
			var selectL = document.getElementById("player2");
			var lengthL = selectL.options.length;
			if (lengthL >= 2) { //this gets rid of the text "select the winner" when you reclick on the button
				for (i = 0; i < lengthL; i++) {
				  selectL.options[0] = null;
				}
			}
			//<option value="" disabled selected>Select the Winner</option>
			for (var i = 0; i < players.length; i++) { 
  				var player = players[i];
  				if(sessionStorage.getItem(String(player.get('name'))) !== String(player.get('name'))) {
  					sessionStorage.setItem(String(player.get('name')),String(player.get('name')));
		   		}
		   		(function($) {
	      			$('#player1').append($("<option></option>")
			    	.attr("value",String(sessionStorage.getItem(String(player.get('name')))))
			    	.text(String(sessionStorage.getItem(String(player.get('name')))))); 
			    	$('#player2').append($("<option></option>")
			    	.attr("value",String(sessionStorage.getItem(String(player.get('name')))))
			    	.text(String(sessionStorage.getItem(String(player.get('name')))))); 
	      		})(jQuery);
		   	}
	    },
	    error: function(error) {
	    	alert("Error: " + error.code + " " + error.message);
	    }
	});
}

function createScoreBoard() {
	var player1 = $("#player1").val();
	var player2 = $("#player2").val();
	var points = $("#maxPoints").val();
	var isRanked = $("#isRanked").val();
	console.log(isRanked);
	if (isRanked === "Yes") {
		var Player = Parse.Object.extend("User");
		// var query = new Parse.Query(Player);
		var query1 = new Parse.Query(Player);
		var query2 = new Parse.Query(Player);
		query1.equalTo("name", player1);
		query2.equalTo("name", player2);
		console.log(player1+" "+player2);

		query1.find().then(function(p1) {
			p1Rank = p1[0].get('rank');
			sessionStorage.setItem("p1Rank",p1Rank);
			console.log(p1Rank);
			return p1Rank;
		}).then(function() {
			return query2.find();
		}).then(function(p2) {
			p2Rank = p2[0].get('rank');
			sessionStorage.setItem("p2Rank",p2Rank);
			console.log(p2Rank);
			return p2Rank;
		}, function(error) {
			alert("Rank Retrieval Error: " + error.code + " " + error.message);
		});
	}
	// console.log("player1: " + player1 + "player2: " + player2);
	sessionStorage.setItem("p1",player1);
	sessionStorage.setItem("p2",player2);
	sessionStorage.setItem("pts",points);
	sessionStorage.setItem("isRanked",isRanked);

	
}

function searchUserHistory() {
	var searchVal = $("#searchInput").val();
	var searchID = "";

	var matchHistory = Parse.Object.extend("Game");
	var queryWon = new Parse.Query(matchHistory);
	var queryLost = new Parse.Query(matchHistory);

	var Player = Parse.Object.extend("User");
	var queryID = new Parse.Query(Player);//Player
	queryID.equalTo("name",searchVal);

	var DNE = false; //need to implement this
	var sortedMerge = "";
	var bothWinLose = "";

	queryID.find().then(function(player) {
		if (typeof player[0] === 'undefined') {
			alert("Error: " + searchVal +" does not exist. Instead, I'm going to show all past games");
			DNE = true;
			return;
		} else {
			console.log("player id: " + player[0].id);
			searchID = player[0].id;
			queryWon.equalTo("winnerID",searchID);
			queryLost.equalTo("loserID",searchID);
			bothWinLose = Parse.Query.or(queryWon, queryLost);
			return player[0].id;
		}
	}, function(error) {
		alert("Error: "+ searchVal +" does not exist or has not played any matches yet");
	}).then(function() {
		return bothWinLose.find();
	}).then(function(gameBoth) {
		var verdict = "";
		for (var i = 0; i < gameBoth.length; i++) {
			if (gameBoth[i].get("winnerID") === searchID) {
				verdict = "Winner: ";
			} else {
				verdict = "Loser: ";
			}
			console.log(verdict + "player with game id #" + i + ": " + gameBoth[i].id);
		}
		//return bothWinLose.descending("createdAt"); //need to implement descending sort
		return gameBoth;
	});
}

function findUserAttr(given,givenAttr) {
	var Player = Parse.Object.extend("User");
	var query = new Parse.Query(Player);//Player
	query.equalTo(givenAttr,given);
	console.log("player: " + given);
	query.find().then(function(players) {
		//console.log("player id: " + players[0].id);
		return players[0].id;
	}, function(error) {
		alert("Error: " + error.code + " " + error.message);
	});
}


// function desiredCredentials(desired,desiredAttr) { //for search bar
// 	var Player = Parse.Object.extend("User");
// 	var query = new Parse.Query(Player);
// 	query.equalTo(desiredAttr,desired);
// 	query.find({
// 		success: function(user) {

// 		},
// 		error: function (error) {
// 			alert("Error: " + error.code + " " + error.message);
// 		}
// 	});
// }

// Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
//   	success: function(user) {
// 	    new ManageTodosView();
// 	    self.undelegateEvents();
// 	    delete self;
//   	},
//   	error: function(user, error) {
//     	self.$(".signup-form .error").html(error.message).show();
//     	this.$(".signup-form button").removeAttr("disabled");
//   	}
// });

// function findUserAttr(given,givenAttr,desiredAttr) {
// 	var Player = Parse.Object.extend("User");
// 	var query = new Parse.Query(Player);//Player
// 	query.equalTo(givenAttr,given);
// 	query.find({
// 		success: function(players) {
// 			console.log(players.length);
// 			for (var i = 0; i < players.length; i++) { 
//   				var player = players[i];//assumably only 1
//   				//console.log("player: " + player.get('school'));
//   				if (desiredAttr === 'objectId') {
//						var desired = player.id;
//   					console.log(desired);
//   					return desired;
//   				} else {
//   					var desired = String(player.get(desiredAttr));
//   					return desired;
//   				}
//   				//console.log("The desired value is: " + desired);
//   			}
// 		},
// 		error: function (error) {
// 			alert("Error: " + error.code + " " + error.message);
// 		}
// 	});
// }

// function findUserAttr(given,givenAttr,desiredAttr) {
// 	var Player = Parse.Object.extend("User");
// 	var query = new Parse.Query(Player);//Player
// 	query.equalTo(givenAttr,given);
// 	console.log("player: " + given);
// 	query.find().then(function(players) {
// 		console.log("player id: " + players[0].id);
// 		return players[0].id;
// 	}, function(error) {
// 		alert("Error: " + error.code + " " + error.message);
// 	});
// }