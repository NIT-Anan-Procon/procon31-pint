import React from "react";

import Pin from "./Pin";

class PinBox extends React.Component {
	render() {
		return (
			<div className="pinBox">
				<div className="pin">
					{this.props.pins.map((pin, index) => {
						return (
							<Pin
								pinReact={this.props.pins[index].reactSum}
								pinMsgLength={this.props.pins[index].msgSum}
								pinTime={pin.pinTime}
								pinType={pin.pinType}
								pinID={index}
								setPinID={(ID) => this.props.setPinID(ID)}
								getVideo={() => this.props.videoEl}
								duration={() => this.props.videoEl.target.getDuration()}
							/>
						)
					})}
				</div>
				<hr className="seekBar" />
			</div>
		);
	}
}

export default PinBox