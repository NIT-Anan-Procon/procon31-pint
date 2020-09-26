import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import PinHighLight from "./PinHighLight";
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
      messages: [],
      pinMessageSum: 0,
      pinReactSum: 0
    }
  }

  addPin(time) {
    const params = new URLSearchParams();
    params.append('MovieID', this.state.MovieID);
    params.append('PinTime', time);
    // params.append('PinType', type);
    axios
      .post("http://procon31-server.ddns.net/API/PinReg.php", params)
      .then(res => {
        console.log(res)
        this.syncPins()
      })
      .catch(err => alert(err));
  }

  syncPins = () => {
    let pins = [];
    const params = new URLSearchParams();
    params.append('MovieID', this.state.MovieID);
    this.setState({ pins: [] });
    axios
      .post("http://procon31-server.ddns.net/API/PinGet.php", params)
      .then(res => {
        console.log(res)
        for (let key in res.data.PinArray) {
          pins[key]=(res.data.PinArray[key]);
        }
        this.setState({ pins: pins });
      })
      .catch(err => alert(err));
    console.log(this.state.pins);
    setTimeout(this.syncPins, 10000)
  }

  setPinID(pinID) {
    this.setState({
      pinID: pinID
    }, () => {
      this.syncMessage();
      this.pinIdJudge();
    });
  }

  syncMessage = () => {
    let messages = [];
    const params = new URLSearchParams();
    params.append('PinID', this.state.pinID);
    this.setState({ messages: [] });
    axios
      .post("http://procon31-server.ddns.net/API/ChatGet.php", params)
      .then(res => {
        for (let key in res.data.MessageArray) {
          messages[key] = res.data.MessageArray[key]
        }
        this.setState({ messages: messages });
      })
      .catch(err => alert(err));
    console.log(this.state.messages);
    setTimeout(this.syncMessage, 10000)
  }

  pinIdJudge() {
    if (this.state.pinID != null) {
      this.setState({
        pinMessageSum: this.state.pins[this.state.pinID].msgSum,
        pinReactSum: this.state.pins[this.state.pinID].reactSum
      });
    }
  }

  render() {
    const opts = {
      height: '540',
      width: '960',
    };

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
              <PinHighLight
                pinMessageSum={this.state.pinMessageSum}
                pinReactSum={this.state.pinReactSum}
              />
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