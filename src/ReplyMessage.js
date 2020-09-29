import React from "react";

import Good from "./Good";

class ReplyMessage extends React.Component {
	render() {
		return (
			<div className="replyMessageBox">
				<div className="text">
					<div className="replyUser">
						{this.props.user}: {this.props.message}
					</div>
					<div className="message">
					</div>
					<div className="date">
						{this.props.sendTime}
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