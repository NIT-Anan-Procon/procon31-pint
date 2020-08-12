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

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [{time: 10, type: 0},{time: 150, type: 1},{time: 200, type:2}]
    }
  }

  add(time, type) {
    this.state.pins.push({ time: time, type: type });
  }

  render() {
    return (
      <div>
        <button
          className="playButton"
          onClick={ () => this.props.getVideo().target.playVideo() }
        >
          再生
        </button>
        <button
          className="pauseButton"
          onClick={ () => this.props.getVideo().target.pauseVideo() }
        >
          停止
        </button>
        <div>
          {this.state.pins.map((pin) => {
            return (
              <Pin
                time={pin.time}
                type={pin.type}
                getVideo={() => this.props.getVideo()}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Controller;
