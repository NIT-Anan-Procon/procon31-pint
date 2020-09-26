import React from "react";

import Message from "./Message";
import InputContainer from "./InputContainer";

export const InsertID = React.createContext()

class ChatContainer extends React.Component {
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
										/>
									</InsertID.Provider>
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