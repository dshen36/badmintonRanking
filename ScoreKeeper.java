import java.util.ArrayList;
import java.util.List;
//eachIndividual game and it's score and properties
public class ScoreKeeper {
	int totalRallies; //also total points/curr rally. used to index to the array and keep track of player score history
	private List<Integer> scoreHistory1 = new ArrayList<Integer>();
	private List<Integer> scoreHistory2 = new ArrayList<Integer>();
	private List<Player> winnerHistory = new ArrayList<Player>(); //keeps track of winners. used primarily for undos
	int finalScore1; //final score of player 1
	int finalScore2; //final score of player 2
	int maxScore; //score that you play up to
	Player p1, p2;
	Player winner, loser;

	public ScoreKeeper(Player p1, Player p2, int maxScore) {
		this.p1 = p1;
		this.p2 = p2;
		totalRallies = 0;
		scoreHistory1.set(0,0); //(rally#.currentScore)
		scoreHistory2.set(0,0);
		winnerHistory.set(0,null);
		//toServe = random. create a random generator to decide who serves
	}
	public void incrementScore(Player winner, Player loser) {
		totalRallies+=1;
		if (winner.equals(p1)) {
			scoreHistory1.set(totalRallies,(scoreHistory1.get(totalRallies-1)+1)); //player 1 is the winner
			scoreHistory2.set(totalRallies,(scoreHistory2.get(totalRallies-1)));
		} else {
			scoreHistory1.set(totalRallies,(scoreHistory1.get(totalRallies-1))); 
			scoreHistory2.set(totalRallies,(scoreHistory2.get(totalRallies-1)+1)); //player 2 is the winner
			/* scoreHistory1[totalRallies]=scoreHistory1[totalRallies-1];
			scoreHistory2[totalRallies]=scoreHistory2[totalRallies-1]+1; */
		}
		winnerHistory.set(totalRallies,winner);
	}
	public void undo() {//-----------AM I FORGETTING SOMETHIGN
		//// an input will always be of the form (winnerHistory.get(totalRallies)) 
		scoreHistory1.set(totalRallies,null);
		scoreHistory2.set(totalRallies,null);
		winnerHistory.set(totalRallies,null);
		totalRallies-=1;
	}
	public Player toServe() {
		return winnerHistory.get(totalRallies);
	}
	public boolean passedMax() { //doesn't cover the duece/winBy2 portion of the game;
		if (scoreHistory1.get(totalRallies) == maxScore || scoreHistory2.get(totalRallies) == maxScore) {
			return true;
		}
		return false;
	}
	//----------------NEED SOMETHING TO INCREMENT MAX SCORE--------------------- ONLY DOES IT WHEN A PLAYER WINS A RALLY, 
	//THEN CHECK TO SEE IF GAME OVER (PAST MAX SCORE), THEN CHECKS TO SEE IF WON BY 2.
	//IF YES, RETURN WINNER AFTER SETTING ALL OF THE SCORES/ARRAYLISTS
	//ELSE (GAME NOT OVER) SET ALL OF THE SCORES, INCREASE THE MAX SCORE.
	public boolean wonByTwo() {
		if (Math.abs(scoreHistory1.get(totalRallies) - scoreHistory2.get(totalRallies)) > 1) {
			return true;
		}
		return false;
	}
	// public Player gameOver() {
	// 	if 
	// }
	//i need to import a player.. but not to instantiate a new player//game history?
}