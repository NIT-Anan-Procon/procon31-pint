import React from "react";

import './styles.css';

class Message extends React.Component {
	constructor(props) {
		super(props);
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
			</div>
		);
	}
}

export default Message;