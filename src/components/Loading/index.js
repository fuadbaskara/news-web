import React from "react";
import loading from "../../assets/images/loading.gif";
import "../../assets/styles/Loading.css";

const Loading = () => (
  <div
    className="loading-container"
    style={{ textAlign: "center", padding: "200px, 200px, 0px, 200px", color: "#ebe5e5" }}
  >
    <img className="loading-sign" src={loading} alt="Loading" />
  </div>
);

export default Loading;
