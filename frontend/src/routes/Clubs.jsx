import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useParams } from "react-router-dom";


const Clubs = () => {
  const { seasonName} = useParams();
  const [isLoading, setIsloading] = useState(true);
  const [clubData, setClubData] = useState([]);
  
  useEffect(() => {
    // Fetch club data from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}clubs/?season__name=${seasonName}`)
      .then((response) => response.json())
      .then((data) => {
        setClubData(data);
        setIsloading(false);
      })
      .catch((error) => {
        console.error("Error fetching club data:", error);
        setIsloading(false);
      });
  }, [seasonName]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section
        class="nsl-inner-banner text-center"
        style={{ backgroundSize: "cover", paddingTop: "200px" }}
      >
        <h1>SEASON 1 CLUBS</h1>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="image-list club-image">
                {clubData.map((club) => (
                  <div class="image-box" key={club.id}>
                    <Link to={`/club/${club.name}`}>
                      <img src={club.logo} alt={club.name} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Clubs;