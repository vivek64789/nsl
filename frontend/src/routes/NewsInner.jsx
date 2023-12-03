import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/loading/Loading";

const NewsInner = () => {
  const { id: newsId } = useParams();
  const [innerData, setInnerData] = useState({});
  const [innerDescription, setInnerDescription] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}news-announcements/${newsId}`
    const latestNewsApiUrl = `${process.env.REACT_APP_API_BASE_URL}news-announcements/`
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setInnerData(data);
          setInnerDescription(data.sub_description); // Use sub_description here
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching inner data:", error);
        setIsLoading(false);
      });

    fetch(latestNewsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setNewsData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
      });

    return () => {
      isMounted = false;
    };
  }, [newsId]);
  const latestnews = newsData.slice(0,3)

  const baseUrl = 'http://localhost:8000'; // Replace with the actual base URL of your image server

// ...

return isLoading ? (
  <Loading />
) : (
  <>
    <section className="nsl-inner-banner text-center">
      <h1>News & Announcement</h1>
    </section>
    <section className="inner-page-wrap inner-page-wrap-manage forNewsInner">
      <div className="gallery popup-gallery">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="news-center">
                <span className="notice-date">
                  <i
                    style={{ marginRight: "5px" }}
                    className="brand-color far fa-calendar-alt"
                  ></i>
                  {innerData.date}
                </span>
                <h1 className="section-head">{innerData.title}</h1>
                <div className="news-contain">
                  <div>
                    {/* Render innerDescription as raw HTML */}
                    <div dangerouslySetInnerHTML={{ __html: innerDescription.replace(/src='(.*?)'/g, `src='${baseUrl}$1'`) }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      <section className="inner-page-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="section-head">Latest News and Announcement</h1>
            </div>
            <div className="col-md-12">
              <div className="tips">
                {latestnews.map((value, index) => (
                  <div className="tips_list" key={index}>
                    <div className="tips_box">
                      <div className="img">
                        {value.images && value.images[0] && (
                          <img src={value.images[0].images} alt="" />
                        )}
                      </div>
                      <div className="info">
                        <p className="for">News</p>
                        <span className="notice-date">
                          <i
                            style={{ marginRight: "5px" }}
                            className="brand-color far fa-calendar-alt"
                          ></i>
                          {value.date}
                        </span>
                        <Link to={`/news/${value.id}`}>
                          <p className="name news_title">{value.title}</p>
                        </Link>
                      </div>
                    </div>
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

export default NewsInner;