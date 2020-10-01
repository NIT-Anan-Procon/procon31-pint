import React from 'react';

import PinImage from './image/Pin.svg'

class Pin extends React.Component {
	// ピンの初期カラーの設定
	colorOfTime(pintime) {
		if (pintime === "0") return 1;
		else return 112;
	}

	// いいねが押されたときの色の変化の設定
	colorOfReaction(reactsum) {
		const ret = 10000 - Math.log(reactsum + 1) * 2000
		if (ret >= 100) return ret;
		else return 100;
	}

	// ピンがクリックされたときにYouTubeをシークさせる
	seekPinTime(time) {
		this.props.getVideo().target.seekTo(time);
	}

	// ピンの位置の指定
	marginOfTime(currentTime, duration) {
		const iframeSize = 936;
		return Math.round(currentTime * iframeSize / duration);
	}

	// ピンのサイズの指定
	pinSize(msgleng) {
		if (msgleng <= 5) return 30;
		else if (msgleng <= 10) return 40;
		else return 50;
	}

	render() {
		return (
			<div
				onClick={() => {
					this.seekPinTime(this.props.pinTime);
					this.props.setPinID(this.props.pinID);
				}
				}
				style={
					{
						cursor: "pointer",
						position: "Absolute",
						left: (this.marginOfTime(this.props.pinTime, this.props.duration()) - (this.pinSize(this.props.pinMsgLength) / 2) + 16) + "px",
						bottom: 20
					}
				}
			>
				<img style={{ filter: "invert(15%) sepia(95%) saturate(6932%) hue-rotate(320deg) brightness(" + this.colorOfReaction(this.props.pinReact) + "%) contrast(" + this.colorOfTime(this.props.pinTime) + "%)" }} className="pins" src={PinImage} alt="" width={this.pinSize(this.props.pinMsgLength)} height={this.pinSize(this.props.pinMsgLength)} />
			</div>
		)
	}
}

export default Pin;