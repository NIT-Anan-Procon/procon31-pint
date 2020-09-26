import React from "react";

import Good from "./Good";

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
        }
	}

	render() {
		return (
			<div className="message">
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
					<div className="reply">
						返信
					</div>
				</div>
			</div>
		);
	}
}

export default Message;