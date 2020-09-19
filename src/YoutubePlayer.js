import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import ChatContainer from "./ChatContainer";

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
        <div className="logo">
          <img src="./pint ロゴ最終版.png" alt="Pintロゴ" />
        </div>
      </div>
      <div className="all">
        <div className="youtube">
          <YouTube videoId={this.props.videoId} opts={opts} onReady={(event) => this._onReady(event)} />
          <div className="seekbar">
            <div className="redbar">

            </div>
          </div>
          <div>
            <div className="pinhighlight">

            </div>
            <div className="pinbutton">
              <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="75" cy="75" r="75" fill="#FE5600"/>
              </svg>
              <div className="pinbuttonChild">
                <svg width="68" height="100" viewBox="0 0 68 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.6633 0C15.0691 0 0 15.0693 0 33.6633C0 52.6402 9.40586 56.6832 19.802 69.3068C32.2367 84.4064 33.6633 100 33.6633 100C33.6633 100 35.0898 84.4064 47.5246 69.307C57.9207 56.6832 67.3266 52.6402 67.3266 33.6635C67.3266 15.0693 52.2574 0 33.6633 0ZM33.6633 45.2971C27.2381 45.2971 22.0297 40.0885 22.0297 33.6635C22.0297 27.2385 27.2383 22.0299 33.6633 22.0299C40.0883 22.0299 45.2969 27.2385 45.2969 33.6635C45.2969 40.0885 40.0883 45.2971 33.6633 45.2971Z" fill="blue"/>
                </svg>
              </div>
            </div>
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
        </div>
        <div>
          <div className="pintitlebox">
            <h2>ピンのタイトル</h2>
          </div>
          <div>
            <div className="commentContainer">
              <div>
                <ChatContainer
                  pinID={this.state.pinID}
                  messages={this.state.messages}
                  syncMessage={this.syncMessage}
                />
              </div>
            </div>
          </div>  
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