import React from 'react';

class Pin extends React.Component{
	constructor(props) {
		super(props);
	}

	colorOfType(type) {
		switch (type) {
			case 0:
				return "#CB360D";
			case 1:
				return "#E1AA13";
			case 2:
				return "#138BAE";
			default:
				throw new Error("wrong pin type");
		}
	}

	seekPinTime(time) {
		this.props.getVideo().target.seekTo(time);
	}

	marginOfTime(currentTime) {
		return Math.round((currentTime * 390) / this.setState.duration);
	}

	render() {
		return (
			<div
				className="invertedTriangle"
				onClick={() => this.seekPinTime(this.props.time)}
				style={
					{
						borderBottom: "20px solid " + this.colorOfType(this.props.type),
						cursor: "pointer",
						position: "Absolute",
						left: this.marginOfTime(this.props.time)+"px"
					}
				}
			>
			</div>
		)
	}
}

export default Pin;