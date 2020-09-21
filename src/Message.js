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
				<div id="message">
					本文: {this.props.message}
				</div>
				<div id="user">
					ユーザー: {this.props.user}
				</div>
				<div>
					<Good 
						messageID={this.props.messageId}
						reactnum={this.props.good}
					/>
				</div>
			</div>
		);
	}
}

export default Message;