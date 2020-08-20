import React from "react";
import axios from "axios";

class InputContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	sendMessage() {
		const params = new URLSearchParams();
		params.append('PinID', 1);
		params.append('Message', this.state.value );
		axios
			.post("http://192.168.0.30/API/ChatSend.php", params)
			.then(res => console.log(res))
			.catch(err => alert(err));
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.value} onChange={this.handleChange} ></input>
				<button onClick={this.sendMessage()} >送信</button>
			</div>
		);
	}
}

export default InputContainer;