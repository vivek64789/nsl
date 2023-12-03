import React, { useState, useEffect } from "react";

const Video = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch video data from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}video/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVideos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <section className="nsl-inner-banner text-center">
        <h1>Videos</h1>
      </section>
      <section className="inner-page-wrap">
        <div className="gallery">
          <div className="container">
            <div className="row">
              {videos.map((video, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="gallery-box">
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <iframe
                        width="100%"
                        height="210"
                        src={video.video_url.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="event-name" style={{ color: "black" }}>
                        <p className="folder-title">{video.title}</p>
                        <p className="folder-title">{video.sub_tittle}</p>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Video;