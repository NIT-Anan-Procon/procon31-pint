import React from "react";

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
				<div className="chatTitleBox">
					test
				</div>
				<div className="chatContainer">
					<div className="messageContainer">
						<div>
							{this.props.messages.map((message, index) => {
								return (
									<Message
										key={index}
										messageID={index}
										reactNum={message.reactNum}
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
			</div>
		);
	}
}

export default ChatContainer;