public class Ranking {
	public static void main(String[] args) {
		 Player dan = new Player("Dan","GT");
		 Player ramon = new Player("Ramon","GT");
		 System.out.println("Dan: " + dan.getRanking());
		 System.out.println("Ramon: " + ramon.getRanking());
		 doneMatch(dan,ramon);
		 System.out.println("-------------------Round 2--------------------");
		 System.out.println("Dan: " + dan.getRanking());
		 System.out.println("Ramon: " + ramon.getRanking());

	}

	public static void doneMatch(Player winner, Player loser) {
		double eWin = calcExpectancy(winner,loser);
		double eLose = calcExpectancy(loser,winner);
		updateRanking(winner,eWin,1);
		updateRanking(loser,eLose,0);
	}

	public static double calcExpectancy(Player a,Player b) {
		double rA = a.getRanking();
		double rB = b.getRanking();
		double eA = (1/(1 + Math.pow(10,((rB - rA)/200))));
		return eA;
	}

	public static void updateRanking(Player name, double e, int outcome) {
		name.setRanking(name.getRanking() + Math.ceil(15*(outcome-e)));
		//if win, outcome=1,if lose, outcome = 0;
	}
}