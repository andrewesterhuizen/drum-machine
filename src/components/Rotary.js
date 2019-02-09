import React from "react";

const roundHundredths = n => Math.round(n * 100) / 100;

const outerStyle = {
  border: "2px solid black",
  width: 35,
  height: 35,
  borderRadius: "50%",
  display: "flex"
};

const innerStyle = {
  background: "linear-gradient(to right, #000, 50%, rgba(0,0,0,0) 50%)",
  height: 2,
  width: "100%",
  margin: "auto 0"
};

class Rotary extends React.Component {
  static defaultProps = {
    startOffest: -0.15,
    speed: 0.01,
    limit: 1
  };
  dragging = false;
  componentDidMount() {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }
  onMouseUp = () => {
    this.dragging = false;
  };
  handleMouseDown = () => {
    this.dragging = true;
  };
  handleMouseUp = () => {
    this.dragging = false;
  };
  onMouseMove = e => {
    if (this.dragging && e.movementY !== 0) {
      const { value, onChange, speed, limit } = this.props;

      const change = e.movementY * speed * -1;
      const nextValue = roundHundredths(value + change);

      if (nextValue >= 0 && nextValue <= limit) {
        // console.log({ nextValue });
        onChange(nextValue);
      }
    }
  };
  getRotation = value => {
    return (this.props.startOffest + value) * 360 * this.props.limit;
  };
  render() {
    return (
      <div style={outerStyle} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        <div
          className="k-inner"
          style={{ ...innerStyle, transform: `rotate(${this.getRotation(this.props.value)}deg)` }}
        />
      </div>
    );
  }
}

export default Rotary;
