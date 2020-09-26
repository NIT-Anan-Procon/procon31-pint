import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import PinController from './PinController';
import PinHighLight from "./PinHighLight";
import ChatContainer from "./ChatContainer";
// import Login from "./login";

import PintLogo from "./image/PintLogo.png";

import './reset.css';
import './YoutubePlayer.css';
import './Pin.css'
import './Chat.css';
import './Login.css';   //ログイン画面のcss

class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoID: "M7lc1UVf-VE",
      videoEl: null,
      movieID: 1,
      pinID: null,
      pins: [],
      messages: [],
      replyMessages: [],
      titleMessage: null,
      pinMessageSum: 0,
      pinReactSum: 0
    }
  }

  // setVideoAndMovieID() {
  //   const params = new URLSearchParams();
  //   params.append('ID', ID);
  //   axios
  //     .post("url", params)
  //     .then(res => {
  //       this.setState({
  //         videoID: res.data.,
  //         movieID: res.data.
  //       });
  //     })
  //     .catch(err => alert(err))
  // }

  addPin(time) {
    const params = new URLSearchParams();
    params.append('MovieID', this.state.movieID);
    params.append('PinTime', time);
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
    params.append('MovieID', this.state.movieID);
    this.setState({ pins: [] });
    axios
      .post("http://procon31-server.ddns.net/API/PinGet.php", params)
      .then(res => {
        console.log(res)
        for (let key in res.data.PinArray) {
          pins[key] = (res.data.PinArray[key]);
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

  checkReplyMessages = () => {
    let replyMessages = [];
    for (let key in this.state.messages) {
      if (this.state.messages[key].msgGroup !== "0") {
        replyMessages[key] = this.state.messages[key];
        delete this.state.messages[key];
      }
    }
    this.setState({ replyMessages: replyMessages });
  }

  syncMessage = () => {
    let messages = [];
    const params = new URLSearchParams();
    params.append('PinID', this.state.pinID);
    this.setState({ messages: [] });
    axios
      .post("http://procon31-server.ddns.net/API/ChatGet.php", params)
      .then(res => {
        console.log(res);
        for (let key in res.data.MessageArray) {
          messages[key] = res.data.MessageArray[key]
        }
        this.setState({
          messages: messages
        }, ()=> {
            this.checkReplyMessages();
        });
        for (let key in this.state.messages) {
          if (this.state.messages[key] !== null) {
            this.setState({ titleMessage: this.state.messages[key].msg });
            break;
          }
        }
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
      }, () => {
        if (this.state.pinMessageSum === "0") {
            this.setState({ titleMessage: null });
        }
      }
      );
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
          <img src={PintLogo} alt="Pintロゴ" className="pintLogo" />
          <a href="http://procon31-server.ddns.net/API/Logout.php" className="Logout">ログアウト</a>
      </header>
      <div className="all">
        <div className="leftSection">
          <YouTube videoId={this.state.videoID} opts={opts} onReady={(event) => this._onReady(event)} />
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
              <PinController 
                addPin={(time) => this.addPin(time)}
                getCurrentTime={() => Math.round(this.state.videoEl.target.getCurrentTime())}
              />
          </div>
        </div>
        <div className="rightSection">
          <ChatContainer
            pinID={this.state.pinID}
            messages={this.state.messages}
            replyMessages={this.state.replyMessages}
            titleMessage={this.state.titleMessage}
            syncMessage={this.syncMessage}
          />
        </div>
      </div>
      </>
    );
  }

  _onReady(event) {
    // this.setVideoAndMovieID();
    this.setState({ videoEl: event });
    this.syncPins(this.state.MovieID);
  }
}

export default YoutubePlayer;