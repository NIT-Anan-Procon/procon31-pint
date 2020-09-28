import React from "react";

import Good from "./Good";

class ReplyMessage extends React.Component {
	render() {
		return (
			<div className="replyMessage">
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
				</div>
			</div>
		);
	}
}

export default ReplyMessage;