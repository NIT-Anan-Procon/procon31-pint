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

	sendMessage() {
		const params = new URLSearchParams();
		params.append('PinID', this.props.pinID);
		params.append('Message', this.state.value );
		axios
			.post("http://procon31-server.ddns.net/API/ChatSend.php", params)
			.then(res => {
				console.log(res);
				this.props.syncMessage();
				this.setState({ value: [] });
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
				/>
				<button onClick={this.sendMessage} className="sendButton">
					送信
				</button>
			</div>
		);
	}
}

export default InputContainer;