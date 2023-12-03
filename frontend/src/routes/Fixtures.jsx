import React, { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import { useLocation } from "react-router-dom";

const Fixtures = () => {
  const location = useLocation();
  const season_id = location.pathname.split("/")[2];
  const [fixtures, setFixtures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}fixtures/?season=${season_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch fixtures data");
        }
        const data = await response.json();
        setFixtures(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchFixtures();
  }, [season_id]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section
        className="nsl-inner-banner text-center"
        style={{ backgroundSize: "cover", paddingTop: "200px" }}
      >
        <h1>SEASON {fixtures[0]?.season.name} FIXTURES & RESULT</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12" style={{ paddingTop: "50px" }}>
              <div className="table-box">
                <table>
                  <thead>
                    <tr>
                      <th style={{ padding: "20px 0px !important" }}>Match No</th>
                      <th className="string" style={{ padding: "20px 0px !important" }}>
                        Date
                      </th>
                      <th style={{ padding: "20px 0px !important" }}>Fixtures & Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fixtures.map((fixture, index) => (
                      <tr className="table-value" key={index}>
                        <td>{index + 1}.</td>
                        <td className="string">{new Date(fixture.match_date).toLocaleDateString()}</td>
                        <td>
                          {fixture.home_team.name} {fixture.result_set[0]?.home_team_goals} -{" "}
                          {fixture.result_set[0]?.away_team_goals} {fixture.away_team.name}
                        </td>
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

export default Fixtures;