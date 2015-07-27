Parse.initialize("LZns8tKGpiFr6f1NbgHatFoOAQ8KBm2m8X8SoEZF", "QGkhPTDc3qLV3mVNgisg7gAqGzbciuXhBTnnyYjy");

$(document).ready(function() {
	$('#reportMatch').on('click',function (e) {
		e.preventDefault();
		createGameForm();
	})
    $('#submitData').on('click', function (e) {
		e.preventDefault();
		submitGame();
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
	var queryWin = new Parse.Query(Player);//Player
	var queryLose = new Parse.Query(Player);

	queryWin.equalTo("name",winner);
	queryLose.equalTo("name",loser);

	//console.log("player: " + winner);
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
		match.set("loserID",loserID);//not setting the loserID
		return playersL[0].id;
	}).then(function() {
		return match.save(null);
	}).then(function(match) {
		alert('new match recorded with an id of: ' + match.id);
	}, function(error) {
		alert("Error: " + error.code + " " + error.message);
	});

	// winnerID = findUserAttr(winner,'name','objectId').then(function() {
	// 	loserID = findUserAttr(loser,'name','objectId');
	// 	return findUserAttr(loser,'name','objectId');
	// }).then(function() {
	// 	return match.save(null);
	// }).then(function(match) {
	// 	alert('new match recorded with an id of: ' +match.id);
	// }, function(error) {
	// 	console.log(error.message);
	// 	alert('there was an issue with this record');
	// });


}
function findUserAttr(given,givenAttr,desiredAttr) {
	var Player = Parse.Object.extend("User");
	var query = new Parse.Query(Player);//Player
	query.equalTo(givenAttr,given);
	console.log("player: " + given);
	query.find().then(function(players) {
		console.log("player id: " + players[0].id);
		return players[0].id;
	}, function(error) {
		alert("Error: " + error.code + " " + error.message);
	});
	// query.find({

	// 	success: function(players) {
	// 		console.log("entered success");
	// 		console.log(players.length);
	// 		for (var i = 0; i < players.length; i++) { 
 //  				var player = players[i];//assumably only 1
 //  				if (desiredAttr === 'objectId') {
	// 					var desired = player.id;
 //  					console.log(desired);
 //  				} else {
 //  					var desired = String(player.get(desiredAttr));
 //  				}
 //  			}
	// 		return desired;
	// 	},
	// 	error: function (error) {
	// 		console.log("entered error");
			
	// 	}
	// });
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

// function submitGame() {
// 	//creating a new instance of the game
// 	var Game = Parse.Object.extend("Game");
// 	var match = new Game();

// 	//retrieving the values of from the form
// 	var winner = $("#winnerName").val();
// 	var loser = $("#loserName").val();
// 	var winner_Score = parseInt($("#scoreW").val());
// 	var loser_Score = parseInt($("#scoreL").val());
// 	var winnerID = "";
// 	var loserID = "";

// 	// match.set("loser",loser);
// 	// match.set("winner",winner);
// 	// match.set("winnerScore",winner_Score);
// 	// match.set("loserScore",loser_Score);
// 	//getting the userfrom the database
// 	winnerID = findUserAttr(winner,'name','objectId').then(function() {
// 		loserID = findUserAttr(loser,'name','objectId').then(function() {
// 			//console.log(winnerID);

// 			//setting the statistics of the game
// 			// match.set("loser",loser);
// 			// match.set("winner",winner);
// 			// match.set("winnerScore",winner_Score);
// 			// match.set("loserScore",loser_Score);

// 			//actually saving the game or throwing an error
// 			match.save(null, {
// 				success: function(match) {
// 					console.log(winner);
// 					alert('new match recorded with an id of: ' +match.id);
// 					console.log("game recorded!");
// 					//closeModal();
// 				},
// 				error: function(match,error) {
					
// 					console.log(error.message);
// 					alert('there was an issue with this record');
// 				}
// 			});
// 		});
// 		return loserID;
// 	});
// 	return winnerID;
// }