import React from "react";

import Good from "./Good";
import ReplyMessage from "./ReplyMessage";

class Message extends React.Component {
	render() {
		return (
			<div className="message" >
				<div id="user">
					ユーザー: {this.props.user}
				</div>
				<div id="message">
					本文: {this.props.message}
				</div>
				<div>
					送信時間: {this.props.sendTime}
				</div>
				<div>
					MessageID: {this.props.messageID},
					GroupID: {this.props.groupID}
				</div>
				<div className="reaction">
					<Good
						messageID={this.props.messageID}
						reactNum={this.props.reactNum}
					/>
					<div className="reply" onClick={() => this.props.replyClicked(this.props.messageID)}>
						返信
					</div>
				</div>
				<div>
					{this.props.replyMessages.map((message, index) => {
						for (let i = 0; i < this.props.replyMessages.length; i++) {
							if (this.props.replyMessages[i] !== undefined) {
								if (String(this.props.messageID) === this.props.replyMessages[i].msgGroup) {
									return (
										<ReplyMessage
											key={index}
											messageID={index}
											groupID={message.msgGroup}
											sendTime={message.msgTime}
											user={message.userName}
											message={message.msg}
											reactNum={message.reactNum}
										/>
									)
								}
							}
						}
					})}
				</div>
			</div>
		);
	}
}

export default Message;