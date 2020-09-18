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
	/*
	pinSize(msgleng){
		size=0;
		if(msgleng<=5)       size=10;
		else if(msgleng<=10) size=12;
		else								 size=15;
		return size;
	}
	*/
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
						//size: this.pinSize(this.props.pinMsglength),
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