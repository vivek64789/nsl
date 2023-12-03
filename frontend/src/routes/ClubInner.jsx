import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/loading/Loading";

const ClubInner = () => {
  const { clubName } = useParams();
  const [clubData, setClubData] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch club data from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}player/?club_name=${clubName}`)
      .then((response) => response.json())
      .then((data) => {
        setClubData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching club data:", error);
        setIsLoading(false);
      });
  }, [clubName]);

  return (
    <>
      <section class="nsl-inner-banner text-center">
        <h1>{`SEASON 1 ${clubName}`}</h1>
      </section>
      <section class="inner-page-wrap">
        {isLoading ? (
          <Loading />
        ) : (
          <div class="team-wrap">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="section-title text-center">
                    <h2>
                      <span class="brand-color">{clubName}</span>
                    </h2>
                  </div>
                </div>
                {clubData.map((value) => (
                  <div key={value.id} class="col-lg-3 col-sm-6 col-6">
                    <div class="team-block club-block-image manager">
                      <img
                        src={value.player_image}
                        class="img-responsive"
                        alt={value.name}
                      />
                      <h3>{value.name}</h3>
                      <span class="designation">{value.position}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ClubInner;