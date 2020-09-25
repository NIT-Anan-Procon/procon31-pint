import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import PinHighLight from "./PinHighLight";
import PinController from "./PinController";
import ChatContainer from "./ChatContainer";

import PintLogo from "./image/PintLogo.png";

import './reset.css';
import './YoutubePlayer.css';
import './Pin.css'
import './Chat.css';

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
      .post("http://procon31-server.ddns.net/API/PinReg.php", params)
      .then(res => {
        console.log(res)
        this.syncPins()
      })
      .catch(err => alert(err));
  }

  syncPins = () => {
    const params = new URLSearchParams();
    params.append('MovieID', this.state.MovieID);
    this.state.pins = [];
    axios
      .post("http://procon31-server.ddns.net/API/PinGet.php", params)
      .then(res => {
        console.log(res)
        for (let key in res.data.PinArray) {
          this.state.pins[key]=(res.data.PinArray[key]);
        }
        this.setState({ pins: this.state.pins });
      })
      .catch(err => alert(err));
    console.log(this.state.pins);
    setTimeout(this.syncPins, 10000)
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
      .post("http://procon31-server.ddns.net/API/ChatGet.php", params)
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

    const isPin = this.state.pinID;

    return (
      <>
      <header>
          <img src={PintLogo} alt="Pintロゴ" className="pintLogo"/>
      </header>
      <div className="all">
        <div className="leftSection">
          <YouTube videoId={this.props.videoId} opts={opts} onReady={(event) => this._onReady(event)} />
          <div className="pinBox">
            <div className="pin">
              {this.state.pins.map((pin, index) => {
                return (
                  <Pin
                    pinReact={this.state.pins[index].reactSum}
                    pinMsgLength={this.state.pins[index].msgSum}
                    pinTime={pin.pinTime}
                    pinType={pin.pinType}
                    pinID={index}
                    setPinID={(ID) => this.setPinID(ID)}
                    getVideo={() => this.state.videoEl}
                    duration={() => this.state.videoEl.target.getDuration()}
                  />
                )
              })}
            </div>
            <hr className="seekBar" />
          </div>
          <div className="pinHighLightAndButton">
            <div className="pin">
              {isPin == null &&
                <PinHighLight
                pinReact={0}
                pinMsgLength={0}
                />
              }
              {isPin != null &&
                <PinHighLight
                pinReact={this.state.pins[this.state.pinID].reactSum}
                pinMsgLength={this.state.pins[this.state.pinID].msgSum}
                />
              }
            </div>
            <PinController />
          </div>
        </div>
        <div className="rightSection">
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