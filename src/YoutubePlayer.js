import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import Controller from "./Controller";
import PinController from "./PinController";
import ChatContainer from "./ChatContainer";
import Header from "./Header";

import './YoutubePlayer.css';

class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoEl: null,
      MovieID: 1,
      pinID: null,
      pins: [],
			messages: []
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

  setPinID(pinID) {
    this.state.pinID = pinID;
    this.setState({ pinID: this.state.pinID });
    this.syncMessage();
  }

  syncMessage = () => {
    const params = new URLSearchParams();
    params.append('PinID', this.state.pinID);
    this.state.messages = [];
    axios
      .post("http://192.168.0.30/API/ChatGet.php", params)
      .then(res => {
        for (let key in res.data.MessageArray) {
          this.state.messages[key] = res.data.MessageArray[key]
        }
        this.setState({ messages: this.state.messages });
      })
      .catch(err => alert(err));
    console.log(this.state.messages);
    setTimeout(this.syncMessage, 10000)
  }

  render() {
    const opts = {
      height: '540',
      width: '960',
    };

    return (
      <>
      <div className="header">

      </div>
      <div className="all">
        <div className="youtube">
          <YouTube videoId={this.props.videoId} opts={opts} onReady={(event) => this._onReady(event)} />
          <div className="seekbar">

          </div>
          <div className="pinhighlight">

          </div>
          <div className="pin">
            {this.state.pins.map((pin, index) => {
              return (
                <Pin
                  pinTime={pin.pinTime}
                  pinType={pin.pinType}
                  pinID={index}
                  setPinID={(ID) => this.setPinID(ID)}
                  getVideo={() => this.state.videoEl}
                  duration={() => this.state.videoEl.getDuration()}
                />
              )
            })}
          </div>
          <div className="pinbutton">
            <a href="./Pin.svg"></a>
          </div>
        </div>
        <div className="chat">
          <ChatContainer
            pinID={this.state.pinID}
            messages={this.state.messages}
            syncMessage={this.syncMessage}
          />
        </div>
      </div>
      </>
    );
  }

  _onReady(event) {
    this.setState({ videoEl: event });
    this.syncPins(this.state.MovieID);
  }
}

export default YoutubePlayer;