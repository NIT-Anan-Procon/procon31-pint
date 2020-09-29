import React from "react";

import Good from "./Good";

import ReplyImage from './image/reply.svg'

class Message extends React.Component {
	render() {
		return (
			<div className="messageBox" >
				<div className="text">
					<div className="head">
						<div className="user">
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
						<div className="reply" onClick={() => this.props.replyClicked(this.props.messageID)}>
							<img src={ReplyImage} alt="リプライロゴ" height="20px" style={{marginRight: "5px"}}/>返信
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Message;