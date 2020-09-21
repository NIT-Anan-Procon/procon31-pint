import React from 'react';

class Pin extends React.Component{
	constructor(props) {
		super(props);
	}
/*
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
*/
	colorOfReaction(reactsum){
		if(reactsum>=0) return Math.log(reactsum+1)*30;
		else return 0;
	}

	seekPinTime(time) {
		this.props.getVideo().target.seekTo(time);
	}

	marginOfTime(currentTime) {
		return Math.round((currentTime * 640) / 1343);
	}
	
	pinSize(msgleng){
		if(msgleng<=5) 			 return 10;
		else if(msgleng<=10) return 20;
		else 								 return 30;
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
						borderBottom: this.pinSize(this.props.pinMsgLength) +"px solid",
						borderBottomColor: "hsl( 30, "+this.colorOfReaction(this.props.pinReact)+"%, 60%)",
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