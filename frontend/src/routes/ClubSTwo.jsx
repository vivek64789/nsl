import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";

const ClubSTwo = () => {
  const [isLoading, setIsloading] = useState(true);
  setTimeout(() => {
    if (isLoading) {
      setIsloading(false);
    }
  }, 1);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section
        class="nsl-inner-banner text-center"
        style={{ backgroundSize: "cover", paddingTop: "200px" }}
      >
        <h1> SEASON 2 CLUBS</h1>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="image-list club-image">
                {/* <!-- <style>
						.image-box{
							padding: 20px;
						}
						.image-box img{
							height: 300px !important;
						}
					</style> --> */}
                <div class="image-box">
                  <Link to="/clubs/1">
                    <img
                      src="/uploads/Files/Biratnagarcityfc%20(1).svg"
                      alt=""
                    />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to="/clubs/2">
                    <img src="/uploads/Files/Chitwan%20FC%20Final.svg" alt="" />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to={"/clubs/3"}>
                    <img
                      src="/uploads/Files/Final%20Pokhara%20Thunder%20Logo.svg"
                      alt=""
                    />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to="/clubs/4">
                    <img src="/uploads/Files/dhangadi%20fc.png" alt="" />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to="/clubs/5">
                    <img
                      src="/uploads/Files/LALITPUR%20CITY%20LOGO_MAIN.svg"
                      alt=""
                    />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to="/clubs/6">
                    <img src="/uploads/Files/Butwal%20Lumbini.svg" alt="" />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to="/clubs/7">
                    <img src="/uploads/Files/kathmandu%20rayzers.png" alt="" />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to="/clubs/7">
                    <img src="/assets/images/japafc.png" alt="" />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to="/clubs/7">
                    <img src="/assets/images/illam.png" alt="" />
                  </Link>
                </div>
                <div class="image-box">
                  <Link to="/clubs/7">
                    <img src="/assets/images/birjungFc.png" alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubSTwo;
