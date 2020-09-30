import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import PinBox from "./PinBox"
import PinController from './PinController';
import PinHighLight from "./PinHighLight";
import ChatContainer from "./ChatContainer";

import PintLogo from "./image/PintLogo.png";

import './css/reset.css';
import './css/YoutubePlayer.css';
import './css/Pin.css'
import './css/Chat.css';

class YoutubePlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			videoID: null,
			videoEl: null,
			movieID: null,
			pinID: null,
			pins: [],
			messages: [],
			replyMessages: [],
			titleMessage: null,
			highLightMessage: null,
			highLightUser: null,
			pinMessageSum: 0,
			pinReactSum: 0
		}
	}

	syncPins = () => {
		let pins = [];
		clearTimeout(this.syncPins);
		const params = new URLSearchParams();
		params.append('MovieID', this.state.movieID);
		this.setState({ pins: [] });
		axios
			.post("http://procon31-server.ddns.net/API/PinGet.php", params)
			.then(res => {
				for (let key in res.data.PinArray) {
					pins[key] = (res.data.PinArray[key]);
				}
				this.setState({
					pins: pins
				}, () => {
					this.initialSetPin()
				});
			})
			.catch(err => alert(err));
		setTimeout(this.syncPins, 10000)
	}

	initialSetPin() {
		if (this.state.pinID != null) {
			this.setState({
				pinMessageSum: this.state.pins[this.state.pinID].msgSum,
				pinReactSum: this.state.pins[this.state.pinID].reactSum
			}, () => {
				if (this.state.pinMessageSum == 0) {
					this.setState({ titleMessage: null });
				}
			});
		}
	}

	setPinID(pinID) {
		this.setState({
			pinID: pinID
		}, () => {
			this.syncMessage();
			this.initialSetPin();
		});
	}

	addPin(time) {
		const params = new URLSearchParams();
		params.append('MovieID', this.state.movieID);
		params.append('PinTime', time);
		axios
			.post("http://procon31-server.ddns.net/API/PinReg.php", params)
			.then(res => {
				this.syncPins()
			})
			.catch(err => alert(err));
	}

	syncMessage = () => {
		let messages = [];
		clearTimeout(this.syncMessage);
		const params = new URLSearchParams();
		params.append('PinID', this.state.pinID);
		axios
			.post("http://procon31-server.ddns.net/API/ChatGet.php", params)
			.then(res => {
				for (let key in res.data.MessageArray) {
					messages[key] = res.data.MessageArray[key]
				}
				messages.sort((a, b) => {
					if (a.msgGroup < b.msgGroup) return -1;
					if (a.msgGroup > b.msgGroup) return 1;
					return 0;
				});
				if (Number(this.state.messages.length) != Number(messages.length)) {
					this.setState({
						messages: []
					}, () => {
						this.setState({
							messages: messages
						}, () => {
							this.setHighLightMassage();
						})
					});
				}
				for (let key in this.state.messages) {
					if (this.state.messages[key] !== null) {
						this.setState({ titleMessage: this.state.messages[key].msg });
						break;
					}
				}
			})
			.catch(err => alert(err));
		setTimeout(this.syncMessage, 10000)
	}

	setHighLightMassage = () => {
		const params = new URLSearchParams();
		params.append('PinID', this.state.pinID);
		this.setState({ goodMaxMsg: [] });
		axios
			.post("http://procon31-server.ddns.net/API/BestReactGet.php", params)
			.then(res => {
				if (res.data.Result) {
					for (let key in this.state.messages) {
						if (this.state.messages[key].msgId == res.data.msgId) {
							this.setState({
								highLightMessage: this.state.messages[key].msg,
								highLightUser: this.state.messages[key].userName
							});
						}
					}
				}
			})
			.catch(err => alert(err));
	}

	componentWillMount() {
		console.log("url")
		let urlParamStr = window.location.search

		if (urlParamStr) {
			//?を除去
			urlParamStr = urlParamStr.substring(1)

			let params = {}

			//urlパラメータをオブジェクトにまとめる
			urlParamStr.split('&').forEach(param => {
				const temp = param.split('=')
				//pramsオブジェクトにパラメータを追加
				params = {
					...params,
					[temp[0]]: temp[1]
				}
			})
			this.setState({
				movieID: params.id,
				videoID: params.videoID
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
					<img src={PintLogo} alt="Pintロゴ" className="pintLogo" />
					<a href="http://procon31-server.ddns.net/API/Logout.php" className="Logout">ログアウト</a>
				</header>
				<div className="all">
					<div className="leftSection">
						<YouTube videoId={this.state.videoID} opts={opts} onReady={(event) => this._onReady(event)} />
						<PinBox 
							pins={this.state.pins}
							videoEl={this.state.videoEl}
							setPinID={(ID) => this.setPinID(ID)}
						/>
						<div className="pinHighLightAndButton">
							<PinHighLight
								pinMessageSum={this.state.pinMessageSum}
								pinReactSum={this.state.pinReactSum}
								user={this.state.highLightUser}
								message={this.state.highLightMessage}
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
		console.log(event.target.getDuration())
		this.setState({ videoEl: event });
		this.syncPins(this.state.MovieID);
		this.syncMessage();
	}
}

export default YoutubePlayer;