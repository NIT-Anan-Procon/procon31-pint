import React from "react";

import Good from "./Good";

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
					count: 0,
					liked: false
        }
	}

	goodClick = () => {
		this.setState({ 
				liked: true,
				count: this.state.count+1
		});
};

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
					<button onClick={this.goodClick}>{this.state.count}</button>
					{/* <Good */}
					 {/* messageID={this.props.messageId} */}
						{/* reactnum={this.props.good} */}
					{/* /> */}
				</div>
			</div>
		);
	}
}

export default Message;