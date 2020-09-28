import React from "react";

import Good from "./Good";

class ReplyMessage extends React.Component {
	render() {
		return (
			<div className="replyMessageBox">
				<div className="text">
					<div className="user">
						ユーザー: {this.props.user}
					</div>
					<div className="message">
						{this.props.message}
					</div>
					<div className="time">
						送信時間: {this.props.sendTime}
					</div>
					<div className="id">
						MessageID: {this.props.messageID},
						GroupID: {this.props.groupID}
					</div>
					<div className="reaction">
						<Good
							messageID={this.props.messageID}
							reactNum={this.props.reactNum}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ReplyMessage;