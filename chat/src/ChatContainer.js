import React from "react";
import axios from "axios";

import Message from "./Message";
import InputContainer from "./InputContainer";

import './styles.css';

class ChatContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [{msgTime: "2020-08-14 23:25:20", msg: "こんばんはaaaaaaaaaaaaaaa", userName: "Miyamoto"}]
		}
	}

	syncMessage = () =>{
		const params = new URLSearchParams();
		params.append('PinID', 1);
		axios
			.post("http://192.168.0.30/API/ChatGet.php", params)
			.then(res => {
					// this.state.messages = this.state.messages.concat(res.data.MessageArray)
					// this.setState({ messages: this.state.messages })
				this.state.messages.clear();
				for (let key in res.data.MessageArray) {
					this.state.messages.push(res.data.MessageArray[key]);
				}
				this.setState({ messages: this.state.messages });
				}
			)
			.catch(err => alert(err));
		console.log(this.state.messages);
	}

	render() {
		return (
			<div>
				<div
					style={
						{
							height: "500px",
							width: "400px",
							border: "1px solid black"
						}
					}
				>
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