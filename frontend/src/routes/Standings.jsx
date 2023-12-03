import React, { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import { useLocation } from "react-router-dom";

const Standings = () => {
  const location = useLocation();
  const season_id = location.pathname.split("/")[2];
  const [standings, setStandings] = useState([]);
  const [season, setSeason] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch standings data from the API
    const fetchStandings = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}standings/?season=${season_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch standings data");
        }
        const data = await response.json();
        setStandings(data);
        // Extract the season name from the first standing entry (assuming all standings have the same season)
        if (data.length > 0) {
          setSeason(data[0].season.name);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchStandings();
  }, [season_id]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section
        className="nsl-inner-banner text-center"
        style={{ backgroundSize: "cover", paddingTop: "200px" }}
      >
        <h1> {season} Standing</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12" style={{ paddingTop: "50px" }}>
              <div className="table-box">
                <table>
                  <thead>
                    <tr className="main-head">
                      <th colSpan="10">Standings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>POS</th>
                      <th className="string">CLUB</th>
                      <th>MP</th>
                      <th>W-D-L</th>
                      <th>GF</th>
                      <th>GA</th>
                      <th>GD</th>
                      <th>PTS</th>
                      <th>RC</th>
                      <th>YC</th>
                    </tr>
                    {standings.map((standing, index) => (
                      <tr className="table-value" key={index}>
                        <td>{standing.rank}.</td>
                        <td className="string">{standing.club.name}</td>
                        <td>{standing.matches_played}</td>
                        <td>{`${standing.wins}-${standing.draws}-${standing.losses}`}</td>
                        <td>{standing.goals_for}</td>
                        <td>{standing.goals_against}</td>
                        <td>{standing.goal_difference}</td>
                        <td>{standing.points}</td>
                        <td>{standing.red_cards}</td>
                        <td>{standing.yellow_cards}</td>
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

export default Standings;