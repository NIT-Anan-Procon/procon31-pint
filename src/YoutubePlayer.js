import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import Controller from "./Controller";
import PinController from "./PinController";

import './YoutubePlayer.css';

class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoEl: null,
      MovieID: 1,
      pins: [{time: 10, type: 0},{time: 150, type: 1},{time: 200, type:2}]
    }
  }

  addPin(time, type) {
    this.state.pins.push({ time: time, type: type });
    this.setState({ pins: this.state.pins });
  }

  syncPins(MovieID) {
    const params = new URLSearchParams();
    params.append('MovieID', MovieID);
    axios
      .post("http://192.168.0.30/API/PinGet.php", params)
      .then(res => console.log(res))
      .catch(err => alert(err));
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
    };

    return (
      <div>
        <YouTube videoId={this.props.videoId} opts={opts} onReady={(event) => this._onReady(event)} />
        <div className="pin">
          {this.state.pins.map((pin) => {
            return (
              <Pin
                time={pin.time}
                type={pin.type}
                getVideo={() => this.state.videoEl}
                duration={() => this.state.videoEl.getDuration()}
              />
            )
          })}
        </div>
        <Controller
          getVideo={() => this.state.videoEl}
        />
        <PinController
          getVideoTime={() => Math.round(this.state.videoEl.target.getCurrentTime())}
          addPin={(time, type) => this.addPin(time, type)}
        />
      </div>
    );
  }

  _onReady(event) {
    this.setState({ videoEl: event });
    this.syncPins(this.state.MovieID);
  }
}

export default YoutubePlayer;