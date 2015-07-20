Parse.initialize("LZns8tKGpiFr6f1NbgHatFoOAQ8KBm2m8X8SoEZF", "QGkhPTDc3qLV3mVNgisg7gAqGzbciuXhBTnnyYjy");

$(document).ready(function() {
    $('#submitData').on('click', function (e) {
		e.preventDefault();
		submitGame();
	})
});

Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
  	success: function(user) {
	    new ManageTodosView();
	    self.undelegateEvents();
	    delete self;
  	},
  	error: function(user, error) {
    	self.$(".signup-form .error").html(error.message).show();
    	this.$(".signup-form button").removeAttr("disabled");
  	}
});
Parse.User.logIn(username, password, {
  	success: function(user) {
  	    new ManageTodosView();
  	    self.undelegateEvents();
  	    delete self;
  	},
  	error: function(user, error) {
    	self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
    	this.$(".login-form button").removeAttr("disabled");
  	}
});

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
		}
	});
}