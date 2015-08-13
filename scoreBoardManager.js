$(document).ready(function() {
	// var test = document.getElementById("playerA");
	// var width = (test.clientWidth + 1) + "px";
	// console.log(" widthA: " + width);
	// var test2 = document.getElementById("playerB");
	// var width = (test2.clientWidth + 1) + "px";
	// console.log(" widthB: " + width);

	// var scoreBoardHeight = document.getElementById("scoreBoardAnchor");
	// var pScoreA = document.getElementById("playerScoreA");
	// var heightSB = (scoreBoardHeight.clientHeight);
	// var heightPSA = (pScoreA.clientHeight);
	// console.log("heightSB: " + heightSB + " ,heightPSA:" + heightPSA);
	// var difference = heightPSA - heightSB; //not the actual height where it is anchored, but the height from top to bottom
	// console.log("difference in pixels: " + difference);
	
	// setPlayer("#playerA",sessionStorage.getItem("p1"));
	// setPlayer("#playerB",sessionStorage.getItem("p2"));
	$('#pointA').on('click',function (e) {
		e.preventDefault();
		pointManager('#pointA');
	})
	$('#pointB').on('click',function (e) {
		e.preventDefault();
		pointManager('#pointB');
	})
	$('#undoPoint').on('click',function (e) {
		e.preventDefault();
		undoPoint();
	})
	$('#Heads').on('click',function (e) {
		e.preventDefault();
		decideStarter(0); //0 denotes heads
	})
	$('#Tails').on('click',function (e) {
		e.preventDefault();
		decideStarter(1); //1 denotes tails
	})
	$('#finishMatch').on('click',function (e) {
		e.preventDefault();
		confirmMatch();
	})
	$('#confirmData').on('click',function (e) {
		e.preventDefault();
		submitConfirmation();
	})
	// $('#finishMatch').on('click',function (e) {
	// 	e.preventDefault();
	// 	// confirmMatch();
	// })

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var firstServe = '';
	var isLeftServing = true;

	function decideStarter(coinSide) {
		var flipped = Math.floor(getRandom()*2);
		console.log("your choice: " + coinSide + " vs reality: " + flipped);
		if (coinSide === flipped) {
			firstServe = '#pointA'
			alert("you were right!");
		} else {
			firstServe = '#pointB'
			isLeftServing = false;
			$("#server").toggleClass("fa-flip-horizontal");
			alert("you weren't right :T");
		}

		console.log(firstServe);
		$("#flipCoin").fadeOut("slow");
		$("#flipCoinDesign").fadeOut("slow");
		//$("#flipCoin").remove();

	}
	function getRandom() {
	  	return Math.random();
	}
	var scoreA = 0;
	var scoreB = 0;
	// var lastRallyWinner = "";
	var numRallies = 1; //this is going to keep track of who won which points. Also useful for undoPoint
	var rallyTracker = [];
	
	 //sessionStorage.getItem("p1"); //eventually winner of coin flip
	function pointManager(winner) {
		if (winner === '#pointA') {
			scoreA += 1;
			document.getElementById("playerScoreA").innerHTML = scoreA;
			if (!isLeftServing) { //uh what do i do here
				$("#server").toggleClass("fa-flip-horizontal");
				isLeftServing = true;
			}
			// var d = document.getElementById("playerScoreA");
			// d.className = d.className + " fa-flip-horizontal";
		} else if (winner === '#pointB') {
			scoreB += 1;
			document.getElementById("playerScoreB").innerHTML = scoreB;
			if (isLeftServing) {
				$("#server").toggleClass("fa-flip-horizontal"); //gotta switch the arrows if undo.
				isLeftServing = false;
			}
		}
		// lastRallyWinner = winner;
		rallyTracker[numRallies-1] = winner;
		numRallies+=1;
		console.log(numRallies);
	}
	function undoPoint() {//pressing undo when 0
		var serverCheck = numRallies;
		numRallies -= 1;

		//edge case against pressing undo when 0 points have been played
		if (numRallies >= 1) {
			var lastWinner = rallyTracker[numRallies-1];
		} else {
			numRallies+=1;
			return;
		}

		if (lastWinner === '#pointA') {
			scoreA -= 1;
			document.getElementById("playerScoreA").innerHTML = scoreA;
		} else if (lastWinner === '#pointB') {
			scoreB -= 1;
			document.getElementById("playerScoreB").innerHTML = scoreB;
		}

		if (rallyTracker[numRallies-2] !== rallyTracker[numRallies-1] && (numRallies !== 1) ) { //&& notfirst point. if first point, then set server to winner of coin flip
			// console.log(rallyTracker[numRallies-1] + " , " + rallyTracker[serverCheck-1]);
			$("#server").toggleClass("fa-flip-horizontal");
			// console.log("pre: " + isLeftServing);
			toggle()// isLeftServing = !isLeftServing;
			// console.log("post: " + isLeftServing);
		}
		if (numRallies === 1 && (rallyTracker[numRallies-1] !== firstServe)) {
			 console.log("winner at # " + numRallies + " " +rallyTracker[numRallies]);
			 console.log("first server = " + firstServe);
			$("#server").toggleClass("fa-flip-horizontal");
			toggle()// LeftServing = !isLeftServing; //arrow isn't switching after getting back to score of 0.
		}
		console.log(numRallies + " , " + isLeftServing);

	}
	function toggle() {
		if (isLeftServing === true) {
			isLeftServing = false;
		} else if (isLeftServing === false) {
			isLeftServing = true;
		}
	}
	function confirmMatch() {
		var pA = sessionStorage.getItem("p1");
		var pB = sessionStorage.getItem("p2");
		var winnerPts,loserPts,winner,loser;
		if (scoreA >= scoreB) { //ideally it would never be equal.
			winnerPts = scoreA;
			loserPts = scoreB;
			winner = pA;
			loser = pB;
		} else {
			winnerPts = scoreB;
			loserPts = scoreA;
			winner = pB;
			loser = pA;
		}
		// console.log(winner);
		// console.log(loser);
		console.log(sessionStorage.getItem("p2"));
		document.getElementById("confirmWinner").value = winner;
		document.getElementById("confirmLoser").value = loser;
		document.getElementById("confirmScoreW").value = winnerPts;
		document.getElementById("confirmScoreL").value = loserPts;
	}
	function submitConfirmation() {
		//creating a new instance of the game
		var Game = Parse.Object.extend("Game");
		var match = new Game();

		//retrieving the values of from the form
		var winner = $("#confirmWinner").val();
		var loser = $("#confirmLoser").val();
		var winner_Score = parseInt($("#confirmScoreW").val());
		var loser_Score = parseInt($("#confirmScoreL").val());
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
	// function doneMatch(winner,loser) {
	// 	var eWin = calcExpectancy(winner,loser);
	// 	var eLose = calcExpectancy(loser,winner);
	// 	updateRanking(winner,eWin,1);
	// 	updateRanking(loser,eLose,0);
	// }
	// function calcExpectancy(a, b) {
	// 	double rA = a.getRanking(); //fix
	// 	double rB = b.getRanking(); //fix
	// 	double eA = (1/(1 + Math.pow(10,((rB - rA)/200))));
	// 	return eA;
	// }
	// function updateRanking(Player name, double e, int outcome) {
	// 	name.setRanking(name.getRanking() + Math.ceil(15*(outcome-e))); //fix
	// 	//if win, outcome=1,if lose, outcome = 0;
	// }
});