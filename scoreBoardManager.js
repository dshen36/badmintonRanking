$(document).ready(function() {
	var test = document.getElementById("playerA");
	var width = (test.clientWidth + 1) + "px";
	console.log(" widthA: " + width);
	var test2 = document.getElementById("playerB");
	var width = (test2.clientWidth + 1) + "px";
	console.log(" widthB: " + width);

	var scoreBoardHeight = document.getElementById("scoreBoardAnchor");
	var pScoreA = document.getElementById("playerScoreA");
	var heightSB = (scoreBoardHeight.clientHeight);
	var heightPSA = (pScoreA.clientHeight);
	console.log("heightSB: " + heightSB + " ,heightPSA:" + heightPSA);
	var difference = heightPSA - heightSB; //not the actual height where it is anchored, but the height from top to bottom
	console.log("difference in pixels: " + difference);
});