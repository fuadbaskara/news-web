import React, { Component } from "react";
import "../../assets/styles/Slide.css";

const SliderSlide = props => {
  const className = props.roles.reduce(
    (res, cur) => res + " slide_" + cur,
    "slide"
  );
  return (
    <li className={className}>
      <div className="slide__image-container">
        <img
          className="slide__bg-image"
          src={props.image}
          alt="../../assets/styles/placeholder-img.png"
        />
      </div>
      <div className="slide__overlay">
        <span className="slide__caption">{props.hero}</span>
      </div>
    </li>
  );
};

const SliderArrow = props => {
  return (
    <button
      className={"slider__arrow slider__arrow_direction-" + props.direction}
      onClick={props.onClick}
    />
  );
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOfPrev: this.getIndexOfPrev(0),
      indexOfActive: 0,
      indexOfNext: this.getIndexOfNext(0),
      direction: null,
      busy: false,
      autoplay: true
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      if (this.state.autoplay) {
        this.toNext();
      }
    }, this.props.interval * 500);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  getIndexOfPrev(current) {
    return current === 0 ? this.props.slides.length - 1 : --current;
  }

  getIndexOfNext(current) {
    const next = ++current;
    return next % this.props.slides.length;
  }

  responsiveWidth() {
    let sliderWidth = document.querySelector(".slider-section").offsetWidth;
    function resize(event) {
      let bgImage = document.querySelectorAll(".slide__bg-image")
        ? document.querySelectorAll(".slide__bg-image")
        : null;
      for (let i = 0; i < bgImage.length; i++) {
        bgImage[i].style.width = `${sliderWidth}px`;
        // bgImage[i].style.height = `${sliderWidth - 284}px`;
      }
    }
    document.addEventListener("DOMContentLoaded", resize());
    window.addEventListener("resize", resize());
  }

  getSlideRoles(index) {
    const roles = [];
    if (index === this.state.indexOfPrev) {
      roles.push("prev");
      if (this.state.direction === "forward") roles.push("outgoing");
    } else if (index === this.state.indexOfActive) {
      roles.push("active");
      roles.push("incoming");
    } else if (index === this.state.indexOfNext) {
      roles.push("next");
      if (this.state.direction === "backward") roles.push("outgoing");
    }
    return roles;
  }

  toPrev() {
    if (this.state.busy) return;
    this.setState((prevState, props) => {
      const prev = this.getIndexOfPrev(prevState.indexOfActive);
      this.unblock();
      return Object.assign(prevState, {
        indexOfPrev: this.getIndexOfPrev(prev),
        indexOfActive: prev,
        indexOfNext: prevState.indexOfActive,
        direction: "backward",
        busy: true
      });
    });
  }

  toNext() {
    if (this.state.busy) return;
    this.setState((prevState, props) => {
      const next = this.getIndexOfNext(prevState.indexOfActive);
      this.unblock();
      return Object.assign(prevState, {
        indexOfPrev: prevState.indexOfActive,
        indexOfActive: next,
        indexOfNext: this.getIndexOfNext(next),
        direction: "forward",
        busy: true
      });
    });
  }

  unblock() {
    setTimeout(() => {
      this.setState((prevState, props) =>
        Object.assign(prevState, { busy: false })
      );
    }, this.props.duration * 1000);
  }

  pause() {
    this.setState((prevState, props) =>
      Object.assign(prevState, { autoplay: false })
    );
  }

  resume() {
    this.setState((prevState, props) =>
      Object.assign(prevState, { autoplay: true })
    );
  }

  render() {
    const imageContainer = document.querySelector(".slider-section")
      ? document.querySelector(".slider-section").offsetWidth
      : null;
    const bgImage = document.querySelectorAll(".slide__bg-image")[0]
      ? document.querySelectorAll(".slide__bg-image")
      : null;
    if (
      this.props.slides.length > 1 &&
      imageContainer !== null &&
      bgImage !== null
    ) {
      this.responsiveWidth();
    }
    return (
      <section
        className="slider"
        onMouseEnter={() => this.pause()}
        onMouseLeave={() => this.resume()}
      >
        <ul className="slider__slide-list">
          {this.props.slides.map((slide, index) => (
            <SliderSlide
              {...slide}
              key={index}
              roles={this.getSlideRoles(index)}
            />
          ))}
        </ul>
        <SliderArrow direction="left" onClick={e => this.toPrev()} />
        <SliderArrow direction="right" onClick={e => this.toNext()} />
      </section>
    );
  }
}

export default Slider;
