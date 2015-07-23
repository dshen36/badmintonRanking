Parse.initialize("LZns8tKGpiFr6f1NbgHatFoOAQ8KBm2m8X8SoEZF", "QGkhPTDc3qLV3mVNgisg7gAqGzbciuXhBTnnyYjy");

$(document).ready(function() {
	
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
		// console.log(window.loggedInUser);
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
	window.loggedInUser = username;
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
	      // setCurrentUser(username);
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

// function logIn() {
//     var username = $("#navBarUsername").val();
//     var password = $("#navBarPassword").val();

//     var query = new Parse.Query(Parse.User);
// 	query.equalTo("username", username);  
// 	query.find({
// 	  success: function(user) {
// 	    for (var i = 0; i < user.length; i++) {
// 	      var object = user[i];
// 	      // setCurrentUser(username);
// 	  	}
// 	  }, 
// 	  error: function(user,error) {
// 	  	console.log("user not found");
// 	  }
// 	});
 
//     Parse.User.logIn(username, password, {
//         success: function(user) {
//         	//new ManageTodosView();
// 			//self.undelegateEvents();
// 			//delete self;
// 			setCurrentUser(username);
//             alert('Welcome!');
//             window.location.replace("loggedIn.html");//http://stackoverflow.com

//         },
//         // If there is an error
//         error: function(user, error) {
//         	handleParseError(error);
//         	//self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
//         	//this.$(".login-form button").removeAttr("disabled");
//         	alert('This email/password is not correct. Please try again.');
//             console.log(error);
//         }
//     });
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

function submitGame() {
	var Game = Parse.Object.extend("Game");
	var match = new Game();

	var winner = $("#winnerName").val();
	var loser = $("#loserName").val();
	var winner_Score = parseInt($("#scoreW").val());
	var loser_Score = parseInt($("#scoreL").val());

	
	match.set("loser",loser);
	match.set("winner",winner);
	match.set("winnerScore",winner_Score);
	match.set("loserScore",loser_Score);

	match.save(null
		, {
		success: function(match) {
			console.log(winner);
			alert('new match recorded with an id of: ' +match.id);
			console.log("game recorded!");
			//closeModal();
		},
		error: function(match,error) {
			
			console.log(error.message);
			alert('there was an issue with this record');
		}
	});
}