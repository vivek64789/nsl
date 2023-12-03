import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useParams } from "react-router-dom";

const Awards = () => {
  const [isLoading, setIsloading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const { seasonName } = useParams();
  const [awards, setAwards] = useState([]);
  setTimeout(() => {
    if (isLoading) {
      setIsloading(false);
    }
  }, 2000);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}news-announcements/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        if (seasonName) {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}awards/?season__name=${seasonName}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setAwards(data);
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
    {awards.map((award,index) => (
      <section 
      key={index}
        class="nsl-inner-banner text-center"
        style={{ backgroundSize: "cover", paddingTop: "200px" }}
      >
        <h1>{award.season.name} Awards </h1>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12" style={{ paddingTop: "50px" }}>
              <div class="best-score ">
                <div class="goal-haed-box award-title">
                  <p class="goals-head">Best Goal Keeper Award</p>
                  {/* <!-- <p class="goals-head">Goals</p> --> */}
                </div>
                <div class="best-score-box award-box">
                  {/* <!-- <div class="data image">
                            <img src="{{asset('uploads\Files\kathmandu rayzers.png')}}" alt="">
                        </div> --> */}
                  <div class="data player">
                    <img src={award.best_goalkepper.player_image} alt="" />
                  </div>
                  <div class="data name">
                    <div>
                      <p class="sir-name title">Goal Keeper</p>
                      <p class="last-name">{award.best_goalkepper.name}</p>
                    </div>
                    <div class="in-club">
                      <div class="in-club-image">
                        <img src={award.best_goalkepper.club.logo} alt="" />
                      </div>
                      <p class="club-name">{award.best_goalkepper.club.name}</p>
                    </div>
                  </div>
                  {/* <!-- <div class="data score-box">
                            <p class="score"><i>8</i></p>
                        </div> --> */}
                </div>
              </div>

              <div class="best-score ">
                <div class="goal-haed-box award-title">
                  <p class="goals-head">Best Defender Award</p>
                  {/* <!-- <p class="goals-head">Goals</p> --> */}
                </div>
                <div class="best-score-box award-box">
                  {/* <!-- <div class="data image">
                            <img src="{{asset('uploads\Files\kathmandu rayzers.png')}}" alt="">
                        </div> --> */}
                  <div class="data player">
                    <img src={award.best_defender.player_image} alt="" />
                  </div>
                  <div class="data name">
                    <div>
                      <p class="sir-name title">Defender</p>
                      <p class="last-name">{award.best_defender.name}</p>
                    </div>
                    <div class="in-club">
                      <div class="in-club-image">
                        <img src={award.best_defender.club.logo} alt="" />
                      </div>
                      <p class="club-name">{award.best_defender.club.name}</p>
                    </div>
                  </div>
                  {/* <!-- <div class="data score-box">
                            <p class="score"><i>8</i></p>
                        </div> --> */}
                </div>
              </div>
              <div class="best-score ">
                <div class="goal-haed-box award-title">
                  <p class="goals-head">Best Mid Fielder</p>
                  {/* <!-- <p class="goals-head">Goals</p> --> */}
                </div>
                <div class="best-score-box award-box">
                  {/* <!-- <div class="data image">
                            <img src="{{asset('uploads\Files\kathmandu rayzers.png')}}" alt="">
                        </div> --> */}
                  <div class="data player">
                    <img src={award.best_midfielder.player_image} alt="" />
                  </div>
                  <div class="data name">
                    <div>
                      <p class="sir-name title">Mid Fielder</p>
                      <p class="last-name">{award.best_midfielder.name}</p>
                    </div>
                    <div class="in-club">
                      <div class="in-club-image">
                        <img
                          src={award.best_midfielder.club.logo}
                          alt=""
                        />
                      </div>
                      <p class="club-name">{award.best_midfielder.club.name}</p>
                    </div>
                  </div>
                  {/* <!-- <div class="data score-box">
                            <p class="score"><i>8</i></p>
                        </div> --> */}
                </div>
              </div>

              <div class="best-score ">
                <div class="goal-haed-box award-title">
                  <p class="goals-head">Best Forward</p>
                  {/* <!-- <p class="goals-head">Goals</p> --> */}
                </div>
                <div class="best-score-box award-box">
                  {/* <!-- <div class="data image">
                            <img src="{{asset('uploads\Files\kathmandu rayzers.png')}}" alt="">
                        </div> --> */}
                  <div class="data player">
                    <img src={award.best_forward.player_image} alt="" />
                  </div>
                  <div class="data name">
                    <div>
                      <p class="sir-name title">Forward</p>
                      <p class="last-name">{award.best_forward.name}</p>
                    </div>
                    <div class="in-club">
                      <div class="in-club-image">
                        <img
                          src={award.best_forward.club.logo}
                          alt=""
                        />
                      </div>
                      <p class="club-name">{award.best_forward.club.name}</p>
                    </div>
                  </div>
                  {/* <!-- <div class="data score-box">
                            <p class="score"><i>8</i></p>
                        </div> --> */}
                </div>
              </div>

              <div class="best-score ">
                <div class="goal-haed-box award-title">
                  <p class="goals-head">Emerging Player of the Tournament</p>
                  {/* <!-- <p class="goals-head">Goals</p> --> */}
                </div>
                <div class="best-score-box award-box">
                  {/* <!-- <div class="data image">
                            <img src="{{asset('uploads\Files\kathmandu rayzers.png')}}" alt="">
                        </div> --> */}
                  <div class="data player">
                    <img src={award.best_emerging.player_image} alt="" />
                  </div>
                  <div class="data name">
                    <div>
                      <p class="sir-name title">Forward</p>
                      <p class="last-name">{award.best_emerging.name}</p>
                    </div>
                    <div class="in-club">
                      <div class="in-club-image">
                        <img
                          src={award.best_emerging.club.logo}
                          alt=""
                        />
                      </div>
                      <p class="club-name">{award.best_emerging.club.name}</p>
                    </div>
                  </div>
                  {/* <!-- <div class="data score-box">
                            <p class="score"><i>8</i></p>
                        </div> --> */}
                </div>
              </div>

              <div class="best-score ">
                <div class="goal-haed-box award-title">
                  <p class="goals-head">Best Coash</p>
                  {/* <!-- <p class="goals-head">Goals</p> --> */}
                </div>
                <div class="best-score-box award-box">
                  {/* <!-- <div class="data image">
                            <img src="{{asset('uploads\Files\kathmandu rayzers.png')}}" alt="">
                        </div> --> */}
                  <div class="data player">
                    <img src={award.best_coach.player_image} alt="" />
                  </div>
                  <div class="data name">
                    <div>
                      <p class="sir-name title">Head Coach</p>
                      <p class="last-name">{award.best_coach.name}</p>
                    </div>
                    <div class="in-club">
                      <div class="in-club-image">
                        <img
                          src={award.best_coach.club.logo}
                          alt=""
                        />
                      </div>
                      <p class="club-name">{award.best_coach.name}</p>
                    </div>
                  </div>
                  {/* <!-- <div class="data score-box">
                            <p class="score"><i>8</i></p>
                        </div> --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ))}
      <section class="paper-wrap-sec" style={{ padding: "30px 0px" }}>
        <div class="container">
          <div class="row mt-3 no-margin">
            <div class="col-md-3 col-sm-3 no-padding">
              <div class="section-title-block">
                <h2>Others Awards</h2>
              </div>
              <div class="section-text-block">
                <Link to="/news" class="link">
                  <p>Stay upto date with news, information and notices</p>
                </Link>
              </div>
            </div>
            <div className="col-md-9 col-sm-9">
              <div className="row white-wrap " style={{ background: "none" }}>
                <div className="col-md-6">
                  <div className="notices-block" style={{ borderRadius: "0px" }}>
                    <div className="notices-text">
                      <h3 className="whatshappening__h2">
                        {newsData[2].title}
                      </h3>
                      <span className="notice-date">
                        <i className="brand-color far fa-calendar-alt"></i>{" "}
                        {newsData[2].date}
                      </span>
                      <p>
                        <span className="whatshappening__span">
                          {newsData[2].short_discription}
                        </span>
                        <Link to="/news/3" className="brand-color">
                          Read More
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Awards;