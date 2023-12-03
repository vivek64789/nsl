import React, { useState,useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";


const Home = () => {
  const scrollToCertainElement = () => {
    const divElement = document.getElementById("whoweare");
    divElement.scrollIntoView({ behavior: "smooth" });
  };
  const [isLoading, setIsloading] = useState(true);
  const [newsAnnouncements, setNewsAnnouncements] = useState([]);
  const [gallery,setGallery] = useState([])
  const [latestClub,setLatestClub] = useState([])

  setTimeout(() => {
    if (isLoading) {
      setIsloading(false);
    }
  }, 4000);
  const [isImageVisible, setImageVisible] = useState(true);

  // Step 3: Create a click event handler for the "x" button
  const handleImageToggle = () => {
    setImageVisible(!isImageVisible);
  };
  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl =`${process.env.REACT_APP_API_BASE_URL}news-announcements/` 
    const galleryUrl = `${process.env.REACT_APP_API_BASE_URL}gallery/`
    const clubUrl = `${process.env.REACT_APP_API_BASE_URL}latest_club/`
    fetch(clubUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the response is an array of news announcements
        setLatestClub(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the response is an array of news announcements
        setNewsAnnouncements(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(galleryUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the response is an array of news announcements
        setGallery(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const newsLatest = newsAnnouncements.slice(0,4)
  const galleryLatest = gallery.slice(0,4)

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="nsl-banner">
        <video loop muted autoPlay id="myVideo">
          <source src="/assets/images/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag. I suggest you upgrade
          your browser.
        </video>
        <div className="banner-caption">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-7">
                <div className="banner-info">
                  <h1>
                    #AbaKhelchaNepal <br />
                    {/* <span className="brand-color"></span> */}
                  </h1>
                  <p>Welcome to the Nepal Super League official website</p>
                </div>
                <div className="image-list">
                  <div className="head">
                    <p>CLUBS</p>
                  </div>
                  {latestClub.map((club, index) => (
                      <div className="image-box" key={index}>
                         <Link to={`clubs/${club.name}`}>
                        <img src={club.logo} alt="club pic" />
                      </Link>
                      </div>
                    
          ))}
                </div>
              </div>
              {isImageVisible && (
              <div className="center-pop">
              {/* Step 4: Use conditional rendering */}
              
                <div className="center-pop-image">
                  <img
                    src="assets/images/logo_new.jpeg"
                    className="img-responsive"
                    alt="Image"
                  />
                </div>
                
              

              <button onClick={handleImageToggle}>x</button>
              
            </div>
            )}
            </div>
            
            <div className="banner__button">
              <button onClick={scrollToCertainElement}>
                <i className="fas fa-futbol landingpage__football"></i>{" "}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="whoweare" className="index-about-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="about-content">
                <span className="sub-title">
                  Nepal's Unrivalled Championship
                </span>
                <p>
                  The Nepal Super League is the first professional franchise
                  based football league in Nepal organised by Nepal Sports and
                  Events Management in technical support of All Nepal Football
                  Association (ANFA). <br />
                  There are a total of 10 clubs in the League from various
                  provinces of Nepal thus making it a nationwide league.
                  <br />
                  Nepal Sports & Events Managements main goal for starting the
                  league is to develop the youth of the nation through the
                  medium of sports and to raise the bar of sports in Nepal to an
                  international level. We plan to enter other sports in the
                  country too starting with the national game of the country,
                  Volleyball.
                </p>
                <Link to="/about" className="action-btn">
                  View More
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="about-img">
                <img
                  src="assets/images/image banner.jpg"
                  className="img-responsive"
                />
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="inner-page-wrap inner-page-wrap-home">
        <div className="company-intro">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="company-dsp text-center">
                  <h2>
                    Our <span className="brand-color">Mission</span>
                  </h2>
                  <p style={{ textAlign: "center" }}>
                    To develop the youth of the country through sports and for
                    Nepal to improve its ranking internationally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cs-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-6 pull-right">
              <div className="cs-details">
                <h2 className=" no-margin">
                  Our <span className="brand-color">Objectives</span>
                </h2>
                <ul className="objectivelists">
                  <li>
                    To help make improvements in playing standard of players
                  </li>
                  <li>
                    Encourage and facilitate more young people in the country to
                    take up sports as a career
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
            </div>
          </div>
        </div>
      </section>
      <section className="paper-wrap-sec ">
        <div className="container">
          <div className="row mt-3 no-margin">
            <div className="col-md-3 col-sm-3 no-padding">
              <div className="section-title-block">
                <h2>What's Happening in NSL</h2>
              </div>
              <div className="section-text-block">
                <a className="link">
                  <p>Stay upto date with news, information and notices</p>
                </a>
              </div>
            </div>
            {}
            <div className="col-md-9 col-sm-9">
              <div className="row white-wrap " style={{ background: "none" }}>
                {newsLatest.map((value,index)=>{
                  return(
                <div className="col-md-6" key={index}>
                  <div
                    className="notices-block"
                    style={{ borderRadius: "0px" }}
                  >
                    <Link to="/news/7">
                      <div className="notices-text">
                        <h3 className="whatshappening__h2">
                          {value.title}
                        </h3>
                        <span className="notice-date">
                          <i className="brand-color far fa-calendar-alt"></i>{" "}
                          {value.date}
                        </span>
                        <p>
                          <span className="whatshappening__span">
                            {value.title}
                          </span>
                          <Link className="brand-color" to={`/news/${index+1}`} >
                            Read More
                          </Link>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                )
                })}
              </div>
            </div>
          </div>
          <div className="row  mt-3 flex-gallery">
            <div className="col-md-9 col-sm-9 short-padding gallery-list-order ">
              <div className="col-md-12  short-padding">
                <div className="gallery-folder" id="folder_list">
                  {galleryLatest.map((value,index)=>{
                    return(
                  <div className="gallery-box" key={index}>
                    <Link to={`gallery/${index+1}`}>
                      <LazyLoadImage
                        alt="img"
                        src={value.images[0].images}
                        effect="blur"
                      />
                      <div className="event-name" style={{ color: "black" }}>
                        {/* <!-- <span className="notice-date"><i className="brand-color far fa-calendar-alt"></i> {{$folder->created_at->year}}-{{ date('m', strtotime($folder->created_at)) }}-{{$folder->created_at->day}}</span> --> */}
                        <p className="folder-title">{value.title}</p>
                      </div>
                    </Link>
                  </div>
                  )
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 no-padding gallery-info-order">
              <div className="section-title-block">
                <h2>Gallery</h2>
              </div>
              <div className="section-text-block">
                <Link to="/gallery" className="link">
                  <p>View photos from gallery</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-wrap">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>
     
     
    </>
  );
};

export default Home;
