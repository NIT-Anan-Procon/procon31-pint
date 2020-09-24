import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import ChatContainer from "./ChatContainer";
import PintLogo from "./image/PintLogo.png";
import PinController from "./PinController";

import './reset.css';
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

    return (
      <>
      <div className="header">
          <img src={PintLogo} alt="Pintロゴ" width="200px" height="60px"/>
      </div>
      <div className="all">
        <div className="youtube">
          <YouTube videoId={this.props.videoId} opts={opts} onReady={(event) => this._onReady(event)} />
          <div className="seekbar">
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
              <div className="redbar">
            </div>
          </div>
          <div>
            <div className="pinhighlight">
              <div className="textbox1">ピンのハイライト</div>
              <div className="line1" />
              <div className="textbox2">ピンの情報</div>
              <div className="line2" />
              <div className="symbol">
                <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M15.0665 0C6.09182 0 0 4.57582 0 11.6944C0 16.0739 1.8208 19.5835 5.33836 21.8414C5.57297 21.9921 5.84977 22.015 5.74588 22.4487C5.32635 24.2027 4.59697 27.3282 4.59697 27.3282C4.56609 27.4606 4.61578 27.5988 4.72365 27.6815C4.83146 27.7637 4.9776 27.7757 5.09748 27.7112C5.09748 27.7112 10.2458 24.6605 10.9324 24.2792C12.534 23.3637 13.9136 23.1862 14.9495 23.1862C22.0675 23.1862 30 20.3381 30 11.6179C30 4.8549 24.5493 0 15.0665 0Z" fill="#2E75B6"/>
                </svg>
              </div>
              <div className="symbol">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.7653 1.63478C22.3967 -1.83871 16.2909 0.59357 14.9996 5.45005C13.7082 0.59357 7.60296 -1.83871 3.23444 1.63478C-0.951846 4.96425 -0.61376 11.5931 3.48464 16.9084C7.27138 21.82 13.1879 26.5524 14.7823 29.8377C14.8454 29.9687 14.9878 30 14.9997 30C15.012 30 15.1544 29.9687 15.218 29.8377C16.8113 26.5524 22.7279 21.82 26.5151 16.9084C30.614 11.5931 30.9515 4.96425 26.7653 1.63478Z" fill="#FF0057"/>
                </svg>
              </div>
            </div>
            <div className="pinbutton">
              <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="75" cy="75" r="75" fill="#FE5600"/>
              </svg>
              <div className="pinbuttonChild">
                <svg width="68" height="100" viewBox="0 0 68 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.6633 0C15.0691 0 0 15.0693 0 33.6633C0 52.6402 9.40586 56.6832 19.802 69.3068C32.2367 84.4064 33.6633 100 33.6633 100C33.6633 100 35.0898 84.4064 47.5246 69.307C57.9207 56.6832 67.3266 52.6402 67.3266 33.6635C67.3266 15.0693 52.2574 0 33.6633 0ZM33.6633 45.2971C27.2381 45.2971 22.0297 40.0885 22.0297 33.6635C22.0297 27.2385 27.2383 22.0299 33.6633 22.0299C40.0883 22.0299 45.2969 27.2385 45.2969 33.6635C45.2969 40.0885 40.0883 45.2971 33.6633 45.2971Z" fill="white"/>
                </svg>
              </div> 
            </div>
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