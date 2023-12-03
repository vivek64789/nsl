import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
const About = () => {
  const [isLoading, setIsloading] = useState(true);
  setTimeout(() => {
    if (isLoading) {
      setIsloading(false);
    }
  }, 0);

  const { pathname } = useLocation();
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  if (pathname.includes("team")) {
    setTimeout(() => {
      executeScroll();
    }, 1000);
  }
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="nsl-inner-banner text-center">
        <h1>About Us</h1>
      </section>
      <section className="inner-page-wrap">
        <div className="company-intro">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="company-dsp text-center">
                  <h2>
                    About{" "}
                    <span className="brand-color">Nepal Super League</span>
                  </h2>
                  <p>
                    The Nepal Super League is the first professional franchise
                    based league in Nepal. It first kicked off with a football
                    championship held at the Dasrath Rangashala from April 24th
                    to May 15th. The Kathmandu Rayzrs were the winners of the
                    first championship. Due to the rising cases in Nepal
                    spectators were not allowed at the stadium but the league
                    became extremely popular in Nepal setting new records in
                    live and television viewership. It set a new benchmark in
                    Nepal for sports tournament and was seen as a major
                    breakthrough for Nepali football.
                  </p>
                  <p>
                    It was hailed as a landmark tournament by the sports
                    fraternity in Nepal as a football tournament of this
                    magnitude had never been held in nepal.
                  </p>
                  <p>
                    Nepal Sports and Events Management aims to develop the youth
                    of the country through sports. Hence it is much more than
                    just a league as it goes beyond that. To take this to
                    greater heights, involvement has to start from the grass
                    root levels. Developing better infrastructure, training
                    centers, sports academies is our priority moving forward.
                  </p>
                  <p>
                    The tournament brought together some of the finest players
                    from across the country to compete and showcase their
                    talents. NSL showed many upcoming talents that they can have
                    a career in sports in Nepal. It opened the door for local
                    coaches to improve and further their career prospects. Of
                    the seven teams, five teams had homegrown coaches in NSL.
                  </p>
                </div>
              </div>
              {/* <div className="col-md-5">
                <div className="abt-img">
                  <img
                    src="/assets/images/mission.png"
                    className="img-responsive"
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="mission-wrap">
                  <h2>
                    Our <span className="brand-color">Mission</span>
                  </h2>
                  <p style={{ margin: "0px 0px 10px" }}>
                    To develop the country's youth through sports to improve
                    Nepal's ranking internationally.
                  </p>{" "}
                  <ul>
                    <li>
                      To help make improvements in the playing standard of
                      players
                    </li>
                    <li>
                      Encourage and facilitate more young people in the country
                      to take up sports as a career
                    </li>
                    <li>
                      Deliver value to all our stakeholders by building a
                      successful and sustainable business model
                    </li>
                    <li>
                      Engage the fans and viewers by providing high-quality
                      entertainment
                    </li>
                    <li>
                      Promote athletes and talent development, creating a bigger
                      pool of players for the national team
                    </li>
                    <li>Develop training centres and sports academies</li>
                    <li>
                      Build a better sports infrastructure in all parts of the
                      country
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="c-values-wrap pt-6">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <span className="sub-title mb-4">Core Values</span>
              </div>
              <div className="col-md-2 col-sm-4 col-xs-6">
                <div className="c-values-block text-center active-red">
                  <img
                    src="assets/images/icons/dedication.svg"
                    className="black-icon"
                  />
                  <img
                    src="assets/images/icons/dedication-white.svg"
                    className="white-icon"
                  />
                  <h3>Dedication</h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-4 col-xs-6">
                <div className="c-values-block text-center active-red">
                  <img src="assets/images/icons/trust.svg" className="black-icon" />
                  <img
                    src="assets/images/icons/trust-white.svg"
                    className="white-icon"
                  />
                  <h3>Trust</h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-4 col-xs-6">
                <div className="c-values-block text-center active-red">
                  <img
                    src="assets/images/icons/accountability.svg"
                    className="black-icon"
                  />
                  <img
                    src="assets/images/icons/accountability-white.svg"
                    className="white-icon"
                  />
                  <h3>Accountability</h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-4 col-xs-6">
                <div className="c-values-block text-center active-red">
                  <img
                    src="assets/images/icons/honesty.svg"
                    className="black-icon"
                  />
                  <img
                    src="assets/images/icons/honesty-white.svg"
                    className="white-icon"
                  />
                  <h3>Honesty</h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-4 col-xs-6">
                <div className="c-values-block text-center active-red">
                  <img
                    src="assets/images/icons/consistency.svg"
                    className="black-icon"
                  />
                  <img
                    src="assets/images/icons/consistency-white.svg"
                    className="white-icon"
                  />
                  <h3>Consistency</h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-4 col-xs-6">
                <div className="c-values-block text-center active-red">
                  <img
                    src="assets/images/icons/availability.svg"
                    className="black-icon"
                  />
                  <img
                    src="assets/images/icons/availability-white.svg"
                    className="white-icon"
                  />
                  <h3>Availability</h3>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div ref={myRef} className="team-wrap">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title text-center">
                  <h2>
                    Our
                    <span className="brand-color"> Team</span>
                  </h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="team-block">
                  <img
                    src="/uploads/Files/member%203.png"
                    className="img-responsive"
                  />
                  <h3>Ashrayata Karki Chaudhary</h3>
                  <span className="designation">Chairperson</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="team-block">
                  <img
                    src="/uploads/Files/member%202.png"
                    className="img-responsive"
                  />
                  <h3>Shreyans Karki </h3>
                  <span className="designation">Director & Co-Founder</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="team-block">
                  <img
                    src="/uploads/Files/member%201.png"
                    className="img-responsive"
                  />
                  <h3>Sudeep Sharma </h3>
                  <span className="designation">CEO & Co-Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
