import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [galleryData, setGalleryData] = useState([]);
  const [seasonName,setSeasonName] = useState('')

  useEffect(() => {
    // Fetch gallery data from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}gallery/`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setGalleryData(data);
        setSeasonName(data[0].season.name); // Assuming the season name is in the response
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching gallery data:", error);
        setIsLoading(false);
      });
  }, []);

  // Function to get the URL of the first image
  
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="nsl-inner-banner text-center">
        <h1>Gallery</h1>
      </section>
      <section className="inner-page-wrap">
        <div className="gallery ">
          <div className="container">
            <div className="row">
              <div className="col-md-12 ">
                <div className="gallery-filter">
                  <ul>
                    <li>
                      <a
                        className="gallery_section"
                        style={{ color: "black", cursor: "pointer" }}
                        id="{{ $limit_section->id }}"
                      >
                        Matches - {seasonName}
                      </a>
                    </li>
                    {/* <li className="dropdown">
                      <a
                        className="gallery_section"
                        style={{ color: "black", cursor: "pointer" }}
                        id="{{ $limit_section->id }}"
                      >
                        Matches of NSL Season 2
                      </a>
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Dropdown button
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li style={{ display: "block", cursor: "pointer" }}>
                          <a
                            className="dropdown-item gallery_section"
                            id="{{ $dropdown_section->id }}"
                          >
                            fdsafdsa
                          </a>
                        </li>
                      </ul>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-md-12  short-padding">
              <div className="gallery-folder" id="folder_list">
                {galleryData.map((gallery) => (
                  <div key={gallery.id} className="gallery-box">
                    <Link to={`/gallery/${gallery.id}`}>
                      <img src={gallery.images[0].images} alt="" />
                      <div className="event-name" style={{ color: "black" }}>
                        <p className="folder-title">{gallery.tittle}</p>
                      </div>
                    </Link>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </section>
    </>
  );
};

export default Gallery;
