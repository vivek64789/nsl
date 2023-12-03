import React, { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import { useLocation } from "react-router-dom";

const TournamentStaz = () => {
  const location = useLocation();
  const season_id = location.pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  const [topScorers, setTopScorers] = useState([]);
  const [totalGoals, setTotalGoals] = useState([]);
  const [fastestGoal, setFastestGoal] = useState([]);
  const [totalCardsTeam, setTotalCardsTeam] = useState([]);
  const [topScorersPlayer, setTopScorersPlayer] = useState([]);
  const [totalCards, setTotalCards] = useState([]);
  const [topResult,setTopResult] = useState([])

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching data from ${url}`);
        }
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    };

    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchData(`${process.env.REACT_APP_API_BASE_URL}top-scorer/${season_id}/`, setTopScorers),
          fetchData(`${process.env.REACT_APP_API_BASE_URL}total-goals/${season_id}/`, setTotalGoals),
          fetchData(`${process.env.REACT_APP_API_BASE_URL}fastest-goal/${season_id}/`, setFastestGoal),
          fetchData(`${process.env.REACT_APP_API_BASE_URL}top-results/${season_id}/`, setTopResult),
          fetchData(`${process.env.REACT_APP_API_BASE_URL}top-card-teams/${season_id}/`, setTotalCardsTeam),
          fetchData(`${process.env.REACT_APP_API_BASE_URL}top-scorer-player/${season_id}/`, setTopScorersPlayer),
          fetchData(`${process.env.REACT_APP_API_BASE_URL}total-cards/${season_id}/`, setTotalCards),
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();

    return () => {
      // Add cleanup logic here if needed
    };
  }, [season_id]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section
        className="nsl-inner-banner text-center"
        style={{ backgroundSize: "cover", paddingTop: "200px" }}
      >
        <h1>Tournament Statz - Season {season_id}</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12" style={{ paddingTop: "50px" }}>
              <div className="best-score">
                <div className="goal-haed-box">
                  <p className="goals-head">TOP SCORRERS</p>
                  <p className="goals-head">Goals</p>
                </div>
                {topScorersPlayer && topScorersPlayer.map((scorer,index) => (
                  <div className="best-score-box" key={index}>
                    <div className="data image">
                      <img src={scorer.club_image} alt="This is the club" />
                    </div>
                    <div className="data player">
                      <img src={scorer.player_image} alt="This is the player" />
                    </div>
                    <div className="data name">
                      <p className="sir-name">{scorer.player_name}</p>
                    </div>
                    <div className="data score-box">
                      <p className="score">
                        <i>{scorer.goals_scored}</i>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-10">
              <div className="team-score-head ">
                <h1>TOP SCORRERS TEAM</h1>
              </div>
              <div className="team-score">
                <table>
                <tbody>
                  <tr className="table-head">
                    <th colSpan="4">Top Goal Scorer in Tournament</th>
                  </tr>
                  <tr className="table-sub-head">
                    <th colSpan="2">Team Name</th>
                    <th className="text-center">Match</th>
                    <th className="text-center">Goals</th>
                  </tr>
                  <tr className="table-data" key={topScorers.top_scorer_team}>
                    <th>
                      <p className="name">{topScorers.top_scorer_team}</p>
                    </th>
                    <th>
                      <img src={topScorers.top_team_logo} alt="" />
                    </th>
                    <th className="text-center">{topScorers.total_matches_played}</th>
                    <th className="text-center">{topScorers.total_goals}</th>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="team-score">
                <table>
                <tbody>
                  <tr className="table-head">
                    <th colSpan="4">Total Goal Scorer in Tournament</th>
                  </tr>
                  <tr className="table-sub-head">
                    <th colSpan="2"></th>
                    <th className="text-center">Match</th>
                    <th className="text-center">Goals</th>
                  </tr>
                  <tr className="table-data">
                    <th>
                      <p className="name">Nepal Super League</p>
                    </th>
                    <th>
                      <img src="/assets/images/logo.png" alt="" />
                    </th>
                    <th className="text-center">{totalGoals.total_match_played}</th>
                    <th className="text-center">{totalGoals.total_goals}</th>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="team-score">
                <table>
                <tbody>
                  <tr className="table-head">
                    <th colSpan="5">Fastest Goal in the Tournament</th>
                  </tr>
                  <tr className="table-sub-head">
                    <th colSpan="2">Players Name</th>
                    <th className="text-center">Against</th>
                    <th className="text-center">Time</th>
                  </tr>
                  {fastestGoal && fastestGoal.map((goal,index) => (
                    <tr className="table-data" key={index}>
                      <th>
                        <p className="name">{goal.player_name}</p>
                      </th>
                      <th>
                        <img src={goal.player_home_team} alt="" />
                      </th>
                      <th className="text-center">{goal.opposing_team}</th>
                      <th className="text-center">{goal.fastest_goal_minute}</th>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="team-score">
                <table>
                <tbody>
                  <tr className="table-head">
                    <th colSpan="5">Total Numbers of Cards in Tournament</th>
                  </tr>
                  <tr className="table-sub-head">
                    <th colSpan="2"></th>
                    <th className="text-center">Red Card</th>
                    <th className="text-center">Yellow Card</th>
                    <th className="text-center">Total Cards</th>
                  </tr>
                  <tr className="table-data">
                    <th>
                      <p className="name">Nepal Super League</p>
                    </th>
                    <th>
                      <img src="/assets/images/logo.png" alt="" />
                    </th>
                    <th className="text-center">{totalCards.total_red_cards}</th>
                    <th className="text-center">{totalCards.total_yellow_cards}</th>
                    <th className="text-center">
                      {totalCards.total_red_cards + totalCards.total_yellow_cards}
                    </th>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="team-score">
                <table>
                <tbody>
                  <tr className="table-head">
                    <th colSpan="5">Highest No of Card/ Lowest No of Card</th>
                  </tr>
                  <tr className="table-sub-head">
                    <th colSpan="2">Team</th>
                    <th>Red Card</th>
                    <th>Yellow Card</th>
                    <th>Total Cards</th>
                  </tr>
                  {totalCardsTeam && totalCardsTeam.map((cards,index) => (
                    <tr className="table-data" key={index}>
                      <th>
                        <p className="name">{cards.team_name}</p>
                      </th>
                      <th>
                        <img src={cards.logo} alt="" />
                      </th>
                      <th className="text-center">{cards.total_red_cards}</th>
                      <th className="text-center">{cards.total_yellow_cards}</th>
                      <th className="text-center">{cards.total_cards}</th>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TournamentStaz;