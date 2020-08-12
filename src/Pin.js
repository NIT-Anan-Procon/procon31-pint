import React from 'react';

class Pin extends React.Component{
  constructor(props) {
    super(props);
  }

  colorOfType(type) {
    switch (type) {
      case 0:
        return "#CB360D";
      case 1:
        return "#E1AA13";
      case 2:
        return "#138BAE";
      default:
        throw new Error("wrong pin type");
    }
  }

  seekPinTime(time) {
    this.props.getVideo().target.seekTo(time)
  }

  render() {
    return (
      <div
        onClick={() => this.seekPinTime(this.props.time)}
        style={{ background: this.colorOfType(this.props.type), width: `${this.props.time}px`, height: "20px", cursor: "pointer" }}
      >
      </div>
    )
  }
}

export default Pin;