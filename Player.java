import java.util.ArrayList; 
public class Player {
	private String name;
	private String school;
	private int playerID;
	//double schoolRanking;
	private double ranking;
	private int weeklyMatches;
	//statistical career
	private int careerPoints;
	private int numGames;
	private int numWins;
	//past rankings in arrayList

	public Player(String name,String school) {
		this.name = name;
		this.school = school;
		ranking = 1400;
		weeklyMatches = 0;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSchool() {
		return school;
	}
	public void setSchool(String school) {
		this.school = school;
	}
	public double getRanking() {
		return ranking;
	}
	public void setRanking(double ranking) {
		this.ranking = ranking;
	}
	public int getWeeklyMatches() {
		return weeklyMatches;
	}
	public void setWeeklyMatches(int weeklyMatches) {
		this.weeklyMatches = weeklyMatches;
	}
	//
	public int getCareerPoints() {
		return careerPoints;
	}
	public void setCareerPoints(int careerPoints) {
		this.careerPoints = careerPoints;
	}
	public int getNumGames() {
		return numGames;
	}
	public void setNumGames(int numGames) {
		this.numGames = numGames;
	}
	public int getNumWins() {
		return numWins;
	}
	public void setNumWins(int numWins) {
		this.numWins = numWins;
	}
}