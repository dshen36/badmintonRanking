import java.util.ArrayList; 
public class Player {
	String name;
	String school;
	double ranking;
	int weeklyMatches;
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
}