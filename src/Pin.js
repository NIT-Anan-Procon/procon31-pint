import React from 'react';

class Pin extends React.Component{
	constructor(props) {
		super(props);
	}

	colorOfType(type) {
		switch (type) {
			case "0":
				return "#CB360D";
			case "1":
				return "#E1AA13";
			case "2":
				return "#138BAE";
			default:
				throw new Error("wrong pin type");
		}
	}

	seekPinTime(time) {
		this.props.getVideo().target.seekTo(time);
	}

	marginOfTime(currentTime) {
		return Math.round((currentTime * 640) / 1343);
	}

	render() {
		return (
			<div
				className="invertedTriangle"
				onClick={() =>{
					this.seekPinTime(this.props.pinTime);
					this.props.setPinID(this.props.pinID);
					}
				}
				style={
					{
						borderBottom: "20px solid " + this.colorOfType(this.props.pinType),
						cursor: "pointer",
						position: "Absolute",
						left: this.marginOfTime(this.props.pinTime)+"px"
					}
				}
			>
			</div>
		)
	}
}

export default Pin;