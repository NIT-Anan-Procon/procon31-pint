import React from "react";

import Message from "./Message";
import InputContainer from "./InputContainer";

export const InsertID = React.createContext()

class ChatContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			replyID: null,
		};
	}

	replyClicked(messageID) {
		this.setState({ replyID: messageID });
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
									<InsertID.Provider value={null}>
										<Message
											key={index}
											messageID={index}
											groupID={message.msgGroup}
											sendTime={message.msgTime}
											user={message.userName}
											message={message.msg}
											reactNum={message.reactNum}
											replyClicked={(ID) => this.replyClicked(ID)}
										/>
									</InsertID.Provider>
								)
							})}
						</div>
					</div>
					<InputContainer 
						pinID={this.props.pinID}
						replyID={this.state.replyID}
						syncMessage={this.props.syncMessage}
					/>
				</div>
			</div>
		);
	}
}

export default ChatContainer;