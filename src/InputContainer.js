import React from "react";
import axios from "axios";

class InputContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	setPlaceHolder() {
		if (this.props.replyID == null) {
			return "全体に送信";
		} else {
			return "ID:" + this.props.replyID + " に返信";
		}
	}

	sendMessage() {
		const params = new URLSearchParams();
		params.append('PinID', this.props.pinID);
		if (this.props.replyID != null) {
			params.append('MessageID', this.props.replyID);
		}
		params.append('Message', this.state.value);
		axios
			.post("http://procon31-server.ddns.net/API/ChatSend.php", params)
			.then(res => {
				console.log(res);
				this.props.syncMessage();
				this.setState({ value: [] });
				this.props.replyFinished();
			})
			.catch(err => alert(err));
	}

	render() {
		return (
			<div className="inputContainer">
				<input
					type="text"
					value={this.state.value}
					onChange={this.handleChange}
					className="inputField"
					placeholder={this.setPlaceHolder()}
				/>
				<button onClick={this.sendMessage} className="sendButton">
					送信
				</button>
			</div>
		);
	}
}

export default InputContainer;