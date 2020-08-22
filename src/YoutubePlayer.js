import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import Controller from "./Controller";
import PinController from "./PinController";
import ChatContainer from "./ChatContainer";

import './YoutubePlayer.css';

class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoEl: null,
      MovieID: 1,
      pinID: 0,
      pins: []
    }
  }

  addPin(time, type) {
    const params = new URLSearchParams();
    params.append('MovieID', this.state.MovieID);
    params.append('PinTime', time);
    params.append('PinType', type);
    axios
      .post("http://192.168.0.30/API/PinReg.php", params)
      .then(res => {
        console.log(res)
        this.syncPins()
      })
      .catch(err => alert(err));
  }

  syncPins() {
    const params = new URLSearchParams();
    params.append('MovieID', this.state.MovieID);
    this.state.pins = [];
    axios
      .post("http://192.168.0.30/API/PinGet.php", params)
      .then(res => {
        console.log(res)
        for (let key in res.data.PinArray) {
          this.state.pins[key]=(res.data.PinArray[key]);
        }
        this.setState({ pins: this.state.pins });
      })
      .catch(err => alert(err));
    console.log(this.state.pins);
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
    };

    return (
      <div className="all">
        <div className="youtube">
          <YouTube videoId={this.props.videoId} opts={opts} onReady={(event) => this._onReady(event)} />
          <div className="pin">
            {this.state.pins.map((pin, index) => {
              return (
                <Pin
                  pinTime={pin.pinTime}
                  pinType={pin.pinType}
                  pinID={index}
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
        <div className="chat">
          <ChatContainer
            pinID={this.state.pinID}
          />
        </div>
      </div>
    );
  }

  _onReady(event) {
    this.setState({ videoEl: event });
    this.syncPins(this.state.MovieID);
  }
}

export default YoutubePlayer;