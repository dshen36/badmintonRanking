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
	var firstServe = '#pointA'; //sessionStorage.getItem("p1"); //eventually winner of coin flip
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
	// function setPlayer(id,name) {
	// 	document.getElementById(id).innerHTML = name;
	// }
	function toggle() {
		if (isLeftServing === true) {
			isLeftServing = false;
		} else if (isLeftServing === false) {
			isLeftServing = true;
		}
	}
});