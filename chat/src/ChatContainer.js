import React from "react";
import axios from "axios";

import Message from "./Message";

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
				this.setState(
					this.state.messages.concat(res.data.MessageArray)
				)
				console.log(res.data.MessageArray)
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
					<div className="message">
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
			</div>
		);
	}
}

export default ChatContainer;