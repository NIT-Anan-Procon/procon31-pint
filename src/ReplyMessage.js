import React from "react";

import Good from "./Good";

class ReplyMessage extends React.Component {
	render() {
		return (
			<div className="replyMessageBox">
				<div className="text">
					<div className="head">
						<div className="replyUser">
							{this.props.user}
						</div>
						<div className="date">
							{this.props.sendTime}
						</div>
					</div>
					<div className="message">
						{this.props.message}
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