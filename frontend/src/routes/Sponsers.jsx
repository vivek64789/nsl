import React, { useState,useEffect } from "react";
import Loading from "../components/loading/Loading";
import { useParams } from "react-router-dom";

const Sponsers = () => {
  const [isLoading, setIsloading] = useState(true);
  const {seasonName} = useParams();
  console.log(seasonName)
  const [sponsers, setSponsers] = useState([]);
  setTimeout(() => {
    if (isLoading) {
      setIsloading(false);
    }
  }, 1);
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        if (seasonName) {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}sponsers/?season__name=${seasonName}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          console.log(data)
          setSponsers(data);
          
        } else {
          console.error("Season ID not provided in the URL.");
        }
      } catch (error) {
        console.error("Error fetching awards:", error);
        
      }
      
    };
    fetchAwards();
  }, [seasonName]);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section
        class="nsl-inner-banner text-center"
        style={{ backgroundSize: "cover", paddingTop: "200px" }}
      >
        <h1> {seasonName} Sponsors </h1>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="image-list club-image">
              {sponsers.map(sponser => (
                  <div className="image-box" key={sponser.id}>
                    <a href={sponser.website_url} target="_blank" rel="noopener noreferrer">
                      <img src={sponser.sponser_image} alt="" />
                    </a>
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

export default Sponsers;
