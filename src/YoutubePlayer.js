import React from 'react';
import YouTube from 'react-youtube';
import './YoutubePlayer.css';

function Controller(props) {
  return (
    <div>
      <button
        className="playButton"
        onClick={ () => props.getVideo().target.playVideo() }
      >
          再生
      </button>
      <button
        className="pauseButton"
        onClick={ () => props.getVideo().target.pauseVideo() }
      >
        停止
      </button>
    </div>
  );
}

function PinController(props) {
  let alertMessage = (label) => {
    alert(`${label}\n現在時刻 : ${props.getVideoTime()}秒`);
  }

  return (
    <div className="pin">
      <div className="circle question" onClick={() => alertMessage("question")}></div>
      <div className="circle understanding" onClick={() => alertMessage("understanding")}></div>
      <div className="circle exclamation" onClick={() => alertMessage("exclamation")}></div>
    </div>
  )
}

class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoEl: null
    }
  }

  render() {
    const opts = {
      height: '390',
      width: '640'
    };
 
    return (
      <div>
        <YouTube videoId="M7lc1UVf-VE" opts={opts} onReady={(event) => this._onReady(event)} />
        <Controller
          getVideo={ () => this.state.videoEl }
        />
        <PinController
          getVideoTime={ () => Math.round(this.state.videoEl.target.getCurrentTime()) }
        />
      </div>
    );
  }

  _onReady(event) {
    this.setState({videoEl: event});
    event.target.pauseVideo();
  }
}

export default YoutubePlayer;