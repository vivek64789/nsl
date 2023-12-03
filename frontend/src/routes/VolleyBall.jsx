import React, { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";

const VolleyBall = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay and then set isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="nsl-inner-banner text-center">
        <h1>Volley Ball</h1>
      </section>
      <section className="inner-page-wrap">
        <div className="company-intro">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="company-dsp text-center">
                  <h2>
                    Volley<span className="brand-color">Ball</span>
                  </h2>
                  <p>
                    Volleyball-NSEM has also signed a 10-year contract with the
                    National Volleyball Association (NVA) of Nepal to start the
                    first professional franchise-based Volleyball League. It
                    will have competitions in both men’s and women’s categories.
                  </p>
                  <p>
                    The NSL volleyball will be the first-ever franchise-based
                    women’s league held in the country in any sport. More and
                    more women are slowly getting involved in sports in Nepal,
                    and our goal is to increase not just participation but
                    provide a platform for more women to showcase their skills
                    and talent. We want to provide more opportunities for women
                    to have a career in sports in Nepal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VolleyBall;