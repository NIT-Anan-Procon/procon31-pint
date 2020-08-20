import React from "react";
import axios from "axios";

import Message from "./Message";
import InputContainer from "./InputContainer";

import './styles.css';

class ChatContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		}
	}

	syncMessage = () =>{
		const params = new URLSearchParams();
		params.append('PinID', 1);
		this.state.messages = [];
		axios
		.post("http://192.168.0.30/API/ChatGet.php", params)
		.then(res => {
			for (let key in res.data.MessageArray) {
				this.state.messages.push(res.data.MessageArray[key]);
			}
			this.setState({ messages: this.state.messages });
		})
		.catch(err => alert(err));
		console.log(this.state.messages);
	}

	render() {
		return (
			<div>
				<div className="chatContainer">
					<div>
						{this.state.messages.map((message, index) => {
							return (
								<Message 
									key={index}
									message={message.msg}
									user={message.userName}
								/>
							)
						})}
					</div>
				</div>
				<button onClick={this.syncMessage}>メッセージ取得</button>
				<InputContainer />
			</div>
		);
	}
}

export default ChatContainer;