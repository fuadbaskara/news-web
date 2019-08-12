import React, { Component } from "react";
import "../../assets/styles/CarouselShimmer.css";

class CarouselShimmer extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12">
        <div className="shimmer">
          <article className="shimmer__background" />
        </div>
      </div>
    );
  }
}
export default CarouselShimmer;
