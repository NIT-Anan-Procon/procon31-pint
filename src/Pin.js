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
				onClick={() =>{
					this.seekPinTime(this.props.pinTime);
					this.props.setPinID(this.props.pinID);
					}
				}
				style={
					{
						cursor: "pointer",
						position: "Absolute",
						left: this.marginOfTime(this.props.pinTime)+"px"
					}
				}
			>
				<img className="invertedTriangle" src={pinimage} alt="" width="100
				0px" height="1000px" />
			</div>
		)
	}
}

export default Pin;