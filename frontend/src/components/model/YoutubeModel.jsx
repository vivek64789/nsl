import React, { useState } from "react";
import ReactDOM from "react-dom";
import ModalVideo from "react-modal-video";
const YoutubeModel = (props) => {
  return (
    <React.Fragment>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={props.isOpen}
        videoId={props.id}
        allowFullScreen={true}
        onClose={props.onClose}
      />
    </React.Fragment>
  );
};

export default YoutubeModel;
