import React from "react";
import { createPortal } from "react-dom";

const Loading = () => {
  return createPortal(
    <div className="loadingcomponent">
      <div className="loadingcomponent__logo">
        <img src="/assets/images/nepal-super-league-2023.png" alt="logo" />
        <div className="loadingcomponent__animation">
          <img src="/assets/images/ball.png" alt="img" />
        </div>
      </div>
    </div>,
    document.getElementById("loading")
  );
};

export default Loading;
