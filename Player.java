import java.util.ArrayList; 
public class Player {
	String name;
	String school;
	int playerID;
	//double schoolRanking;
	double ranking;
	int weeklyMatches;
	//statistical career
	int careerPoints;
	int numGames;
	int numWins;
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
	public String getCareerPoints() {
		return careerPoints;
	}
	public void setCareerPoints(careerPoints) {
		this.careerPoints = careerPoints;
	}
	public String getNumGames() {
		return numGames;
	}
	public void setCareerPoints(numGames) {
		this.numGames = numGames;
	}
	public String getNumWins() {
		return numWins;
	}
	public void setCareerPoints(numWins) {
		this.numWins = numWins;
	}
}