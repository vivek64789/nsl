import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import Loading from "../components/loading/Loading";

const GalleryInner = () => {
  const { id: galleryId } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [galleryData, setGalleryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tittle,setTittle] = useState('')

  useEffect(() => {
    // Fetch gallery data from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}gallery/${galleryId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setGalleryData(data);
        setTittle(data.tittle)
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching gallery data:", error);
        setIsLoading(false);
      });
  }, [galleryId]);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="nsl-inner-banner text-center">
        <h1>Gallery</h1>
      </section>
      <section className="inner-page-wrap">
        <div className="gallery popup-gallery">
          <div className="container">
            <div className="row">
              <div className="col-md-12" style={{ paddingLeft: "0px" }}>
                <h1 className="section-head">{tittle}</h1>
              </div>
              {galleryData.images.map((value, index) => {
                return (
                  <div key={index} className="col-md-4 col-sm-6 short-padding">
                    <div className="front-gallery-image">
                      <a>
                        <img
                          onClick={() => openImageViewer(index)}
                          src={value.images}
                          alt="images"
                          className="img-responsive"
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {isViewerOpen && (
        <ImageViewer
          src={galleryData.images.map(image => image.images)}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
};

export default GalleryInner;