import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";

const News = () => {
  const [isLoading, setIsloading] = useState(true);
  const [newsData,setNewsData] = useState(true)
  setTimeout(() => {
    if (isLoading) {
      setIsloading(false);
    }
  }, 2000);
  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}news-announcements/`;

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
        setNewsData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section class="nsl-inner-banner text-center">
        <h1>News & Announcement</h1>
      </section>
      <section class="inner-page-wrap ">
        <div class="container">
          <div class="row">
            <div class="col-md-12  ">
              <h2 className="newsheading">
                Nepal <span className="brand-color">Super League</span>
              </h2>
            </div>
            <div class="col-md-12 ">
              <div class="tips">
                {newsData.map((value,index) => {
                  return (
                    <div class="tips_list" key={index}>
                      <div class="tips_box">
                        <div class="img">
                          <img src={value.images[0].images} alt="" />
                        </div>
                        <div class="info">
                          <p class="for">{value.type}</p>
                          <span class="notice-date">
                            <i
                              style={{ marginRight: "5px" }}
                              class="brand-color far fa-calendar-alt"
                            ></i>
                            {value.date}
                          </span>
                          <Link to={`/news/${value.id}`}>
                            <p class="name news_title">
                              {value.title}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default News;
