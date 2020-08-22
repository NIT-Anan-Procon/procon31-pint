import React from "react";
import axios from "axios";

import Message from "./Message";
import InputContainer from "./InputContainer";

class ChatContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div>
				<div className="chatContainer">
					<div>
						{this.props.messages.map((message, index) => {
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
				<InputContainer 
					pinID={this.props.pinID}
					syncMessage={this.props.syncMessage}
				/>
			</div>
		);
	}
}

export default ChatContainer;