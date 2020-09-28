import React from "react";

import Good from "./Good";
// import ReplyMessage from "./ReplyMessage";

class Message extends React.Component {
	render() {
		return (
			<div className="message" >
				<div>
					ユーザー: {this.props.user}
				</div>
				<div>
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
					
				</div>
			</div>
		);
	}
}

export default Message;