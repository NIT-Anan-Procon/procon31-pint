import React from 'react';
import axios from 'axios';

class Good extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			liked: false,
			count: Number(this.props.reactNum),
			fill: "#FFFFFF",
			stroke: "#000000",
			strokeWidth: 2
		}
	}

	addGood = () => {
		const params = new URLSearchParams();
		params.append('messageID', this.state.messageID);
		axios
			.post("http://procon31-server.ddns.net/API/ReactSend.php", params)
			.then(this.props.syncPins())
			.catch(err => alert(err));
	}

	goodClick = () => {
		this.setState({
			liked: true,
			count: this.state.count + 1,
			fill: "#EE64C0",
			stroke: "#00FFFFFF",
			strokeWidth: 0
		});
		this.addGood();
	};

	goodJudge() {
		if (this.state.count === 0) {
			this.setState({
				fill: "#FFFFFF",
				stroke: "#000000",
				strokeWidth: 2
			});
		}
		if (this.state.count > 0) {
			this.setState({
				liked: true,
				fill: "#EE64C0",
				stroke: "#00FFFFFF",
				strokeWidth: 0
			});
		}
	}

	componentDidMount() {
		this.goodJudge();
	}
	
	render() {
		return (
			<div className="good" onClick={this.goodClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 32 32"
					width="20"
					height="20"
					fill={this.state.fill}
					stroke={this.state.stroke}
					stroke-width={this.state.strokeWidth}
				>
					<path d="m 27.96387,2.6347786 c -4.442293,-3.47348998 -10.651088,-1.04121 -11.964226,3.81527 -1.313199,-4.85648 -7.5214578,-7.28875998 -11.9636911,-3.81527 -4.25693168,3.32947 -3.91314061,9.9583004 0.2544173,15.2736304 3.8506382,4.91156 9.8669818,9.64399 11.4883418,12.92929 0.06417,0.13101 0.208896,0.1623 0.220991,0.1623 0.01257,0 0.157357,-0.0313 0.222064,-0.1623 1.620167,-3.2853 7.636571,-8.01773 11.487746,-12.92929 4.168034,-5.31528 4.511229,-11.9441604 0.254357,-15.2736304 z" />
				</svg>
				<div className="goodCount">
					{this.state.count}
				</div>
			</div>
		)
	}
}

export default Good;