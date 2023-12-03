import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="foot-logo">
              <img
                src="/assets/images/logo.png"
                alt="Nepal Super Leagues Logo"
                className="img-responsive"
              />
            </div>
            <div className="qlink">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
                <li>
                  <Link to="/about">Team</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="social-link">
              <p>Find Us On</p>
              <ul className="social-icon">
                <li>
                  <a
                    href="https://www.facebook.com/NSLnepalsuperleague"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/NpSuperLeague"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/nepalsuperleague/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCyeYNqN9E1FzqTtFpIs58cg"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Youtube"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12">
            <div className="copyright">
              <p>&copy; Copyright 2020 | Nepal Super Leagues</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;