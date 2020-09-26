import React from 'react';

import pinimage from './image/Pin.svg'

class Pin extends React.Component{
	constructor(props) {
		super(props);
	}

	colorOfTime(pintime){
		if(pintime==0) return 1;
		else return 112;
	}

	colorOfReaction(reactsum){
		const ret=10000-Math.log(reactsum+1)*2000
		if(ret>=100) return ret;
		else return 100;
	}

	seekPinTime(time) {
		this.props.getVideo().target.seekTo(time);
	}

	marginOfTime(currentTime,duration) {
		const iframeSize = 936;
		return Math.round(currentTime * iframeSize / duration);
	}
	
	pinSize(msgleng){
		if(msgleng<=5)			return 30;
		else if(msgleng<=10)	return 40;
		else					return 50;
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
				<img style={{filter: "invert(15%) sepia(95%) saturate(6932%) hue-rotate(320deg) brightness("+this.colorOfReaction(this.props.pinReact)+"%) contrast("+this.colorOfTime(this.props.pinTime)+"%)"}} className="pins" src={pinimage} alt="" width={this.pinSize(this.props.pinMsgLength)} height={this.pinSize(this.props.pinMsgLength)} />
			</div>
		)
	}
}

export default Pin;