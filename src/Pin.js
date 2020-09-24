import React from 'react';

import pinimage from './image/Pin.svg'

class Pin extends React.Component{
	constructor(props) {
		super(props);
	}

	colorOfReaction(reactsum){
		if(reactsum>=0) return Math.log(reactsum+1)*30;
		else return 0;
	}

	seekPinTime(time) {
		this.props.getVideo().target.seekTo(time);
	}

	marginOfTime(currentTime,duration) {
		const iframeSize = 936;
		return Math.round(currentTime * iframeSize / duration);
	}
	
	pinSize(msgleng){
		if(msgleng<=5) 			 return 30;
		else if(msgleng<=10) return 40;
		else 								 return 50;
	}

	render() {
		return (
			<div
				onClick={() =>{
					this.seekPinTime(this.props.pinTime);
					this.props.setPinID(this.props.pinID);
					}
				}
				style={
					{
						cursor: "pointer",
						position: "Absolute",
						left: (this.marginOfTime(this.props.pinTime,this.props.duration())-(this.pinSize(this.props.pinMsgLength)/2)+16)+"px",
						bottom: 20
					}
				}
			>
				<img className="invertedTriangle" src={pinimage} alt="" width={this.pinSize(this.props.pinMsgLength)} height={this.pinSize(this.props.pinMsgLength)} />
			</div>
		)
	}
}

export default Pin;