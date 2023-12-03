import React, { useState } from "react";
import Loading from "../components/loading/Loading";

const Contact = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendingData = async () => {
    try {
      setIsLoading(true); // Set loading state when the request starts
      const response = await fetch(`${apiUrl}contactus/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setIsError(false);
      } else {
        setIsSuccess(false);
        setIsError(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsSuccess(false);
      setIsError(true);
    } finally {
      setIsLoading(false); // Set loading state to false when the request completes
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="nsl-inner-banner text-center">
            <h1>Contact Us</h1>
          </section>
          <section className="inner-page-wrap">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="cntc-dtl section-title text-center">
                    <h2 className="newsheading">
                      We're Here <span className="brand-color">to Help You</span>
                    </h2>
                    <p>
                      We always want to hear from you! Let us know how we can best
                      help you, and we'll do our very best.
                    </p>
                  </div>
                  <div className="cntc-form">
                    {/* Add a form element here */}
                    <form onSubmit={sendingData}>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12">
                            {/* Display errors or success messages here */}
                            {isSuccess && (
                              <div className="alert alert-success" id="alert">
                                <strong>Success: Your Message is Sent</strong>
                              </div>
                            )}
                            {isError && (
                              <div className="alert alert-danger" id="alert">
                                <strong>Error: Something Went Wrong</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="custom-input"
                            placeholder="Your Name"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="custom-input"
                            placeholder="Email Address"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows="6"
                          placeholder="Message"
                          required
                        />
                      </div>
                      <div className="form-group text-center">
                        <button type="submit" className="user-accept-btn">
                          Send Your Message
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="cntc-info-block text-center">
                        <img src="/assets/images/icons/location.svg" alt="Location" />
                        <h3>Nepal Super League</h3>
                        <p>Kathmandu, Nepal</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="cntc-info-block text-center">
                        <img src="/assets/images/icons/email.svg" alt="Mail" />
                        <h3>Mail Us</h3>
                        <p>info@nsem.com.np</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Contact;