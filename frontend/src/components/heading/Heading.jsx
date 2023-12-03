import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import OutsideAlerter from "../../hooks/ClickOutside";

const Heading = () => {
  const { pathname } = useLocation();
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [showDropdowns, setShowDropdowns] = useState({
    about: false,
    football: false,
    gallery: false,
  });
  const [seasons, setSeasons] = useState([]);

  const hideMenu = () => {
    setToggleHamburger(false);
  };

  const toggleDropdown = (dropdownName) => {
    setShowDropdowns((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}season/`)
      .then((response) => response.json())
      .then((data) => {
        setSeasons(data);
      })
      .catch((error) => {
        console.error("Error fetching season data:", error);
      });
  }, [pathname]);

  return (
    <header>
      <div className="main-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3 no-padding">
              <div className="logo">
                <Link to="/">
                  <img
                    src="/assets/images/nepal-super-league-2023.png"
                    alt="nepal super league"
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-11 col-md-11 col-sm-10 col-xs-9">
              <div className="social-search">
                <ul className="social-icon">
                  <label>Connect With Us:</label>
                  <li>
                    <a
                      href="https://www.facebook.com/NSLnepalsuperleague"
                      title="Facebook"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/NpSuperLeague" title="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/NepalSuperLeague"
                      title="Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCyeYNqN9E1FzqTtFpIs58cg"
                      target="_blank"
                      title="Youtube"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
                <OutsideAlerter function={hideMenu}>
                  <div
                    className={
                      toggleHamburger ? "ham-menu close-nav" : "ham-menu"
                    }
                  >
                    <div
                      onClick={() => setToggleHamburger(!toggleHamburger)}
                      className="spancontainer"
                      role="button"
                      aria-expanded={toggleHamburger}
                      aria-controls="ham-menu__slides"
                    >
                      <span className="burger-menu burger1"></span>
                      <span className="burger-menu burger2"></span>
                      <span className="burger-menu no-burger"></span>
                    </div>
                  </div>
                  {toggleHamburger && (
                    <div
                      className={
                        toggleHamburger
                          ? "ham-menu__slides ham-menu__slides__open"
                          : "ham-menu__slides ham-menu__slides__close"
                      }
                    >
                      <div className="ham-menu__slides__lists">
                        <ul>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                toggleDropdown("about")
                              }
                            >
                              About Us{" "}
                              <span>
                                <i className="fas fa-angle-down"></i>
                              </span>
                            </a>{" "}
                            {showDropdowns.about && (
                              <div className="linkInner">
                                <li>
                                  <Link to="/about">
                                    Nepal Sports & Events Management
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/about/team">The Team</Link>
                                </li>
                              </div>
                            )}
                          </li>
                          <li>
                            <Link to="/news">News & Announcement</Link>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                toggleDropdown("football")
                              }
                            >
                              Football{" "}
                              <span>
                                <i className="fas fa-angle-down"></i>
                              </span>
                            </a>{" "}
                            {showDropdowns.football && (
                              <div className="linkInner">
                                {seasons.map((season) => (
                                  <li key={season.id}>
                                    <a
                                      onClick={() =>
                                        toggleDropdown(season.id)
                                      }
                                    >
                                      {season.name}{" "}
                                      <span>
                                        <i className="fas fa-angle-down"></i>
                                      </span>
                                    </a>{" "}
                                    {showDropdowns[season.id] && (
                                      <div className="linkInner">
                                        <li>
                                          <Link to={`/standings/${season.id}`}>
                                            Standings
                                          </Link>
                                        </li>
                                        <li>
                                          <Link to={`/clubs/${season.name}`}>Clubs</Link>
                                        </li>
                                        <li>
                                          <Link
                                            to={`/fixtureandresult/${season.id}`}
                                          >
                                            Fixtures & Results
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            to={`/tournamentstatz/${season.id}`}
                                          >
                                            Statistics
                                          </Link>
                                        </li>
                                        <li>
                                          <Link to={`/awards/${season.name}`}>
                                            Awards
                                          </Link>
                                        </li>
                                        <li>
                                          <Link to={`/Sponsors/${season.name}`}>
                                            Sponsors
                                          </Link>
                                        </li>
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </div>
                            )}
                          </li>
                          <li>
                            <Link to="/volleyball">Volleyball </Link>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                toggleDropdown("gallery")
                              }
                            >
                              Gallery{" "}
                              <span>
                                <i className="fas fa-angle-down"></i>
                              </span>
                            </a>{" "}
                            {showDropdowns.gallery && (
                              <div className="linkInner">
                                <li>
                                  <Link to="/gallery">Photos</Link>
                                </li>
                                <li>
                                  <Link to="/videos">Videos</Link>
                                </li>
                              </div>
                            )}
                          </li>
                          <li>
                            <Link to="/contact">Contact</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </OutsideAlerter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Heading;