import React from 'react';

class Controller extends React.Component {
	/*
	constructor(props) {
	  super(props);
	}
	*/

	render() {
		return (
			<div style={{ marginTop: "30px" }}>
				<button className="playButton" onClick={() => this.props.getVideo().target.playVideo()}>
					再生
				</button>
				<button className="pauseButton" onClick={() => this.props.getVideo().target.pauseVideo()}>
					停止
				</button>
			</div>
		)
	}
}

export default Controller;
