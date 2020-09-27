import React from 'react';
import axios from 'axios';

import HeartDefault from './image/HeartDefault.png'
import HeartClicked from './image/HeartClicked.png'

class Good extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			liked: false,
			count: Number(this.props.reactNum),
			messageID: this.props.messageID
		}
	}

	addGood = () => {
		const params = new URLSearchParams();
		params.append('messageID', this.state.messageID);
		axios
			.post("http://procon31-server.ddns.net/API/ReactSend.php", params)
			.then(res => {
				console.log(res)
			})
			.catch(err => alert(err));
	}

	goodClick = () => {
		document.getElementById(this.state.messageID).src = HeartClicked;

		this.setState({
			liked: true,
			count: this.state.count + 1
		});
		this.addGood();
	};

	goodJudge() {
		if (this.state.count === 0) {
			return HeartDefault
		}
		if (this.state.count > 0) {
			return HeartClicked
		}
	}

	render() {
		return (
			<div className="good">
				<img src={this.goodJudge()} alt="いいね" id={this.state.messageID} className="goodIcon" onClick={this.goodClick} />
				<div className="goodCount">
					{this.state.count}
				</div>
			</div>
		)
	}
}

export default Good;