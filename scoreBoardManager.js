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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	var scoreA = 0;
	var scoreB = 0;
	// var lastRallyWinner = "";
	var numRallies = 1; //this is going to keep track of who won which points. Also useful for undoPoint
	var rallyTracker = [];
	var isLeftServing = true;
	function pointManager(winner) {
		if (winner === '#pointA') {
			scoreA += 1;
			document.getElementById("playerScoreA").innerHTML = scoreA;
			if (!isLeftServing) {
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
	function undoPoint() {
		numRallies -= 1;
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
		console.log(numRallies);
	}
	// function setPlayer(id,name) {
	// 	document.getElementById(id).innerHTML = name;
	// }
});