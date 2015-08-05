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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	var scoreA = 0;
	var scoreB = 0;
	// var lastRallyWinner = "";
	var numRallies = 1; //this is going to keep track of who won which points. Also useful for undoPoint
	var rallyTracker = [];
	function pointManager(winner) {
		if (winner === '#pointA') {
			scoreA += 1;
			document.getElementById("playerScoreA").innerHTML = scoreA;
		} else if (winner === '#pointB') {
			scoreB += 1;
			document.getElementById("playerScoreB").innerHTML = scoreB;
		}
		// lastRallyWinner = winner;
		rallyTracker[numRallies-1] = winner;
		numRallies+=1;
		console.log(numRallies);
	}
	function undoPoint() {
		numRallies -= 1;
		if (numRallies >= 1) {
			var lastWinner = rallyTracker[numRallies-1];
		} else {
			return;
		}

		if (lastWinner === '#pointA') {
			scoreA -= 1;
			document.getElementById("playerScoreA").innerHTML = scoreA;
		} else if (lastWinner === '#pointB') {
			scoreB -= 1;
			document.getElementById("playerScoreB").innerHTML = scoreB;
		}
		console.log(numRallies);
	}
});