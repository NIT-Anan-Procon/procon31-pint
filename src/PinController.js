import React from 'react';

function PinController(props) {
	// let alertMessage = (label) => {
	//   alert(`${label}\n現在時刻 : ${props.getVideoTime()}秒`);
	// }
  
	return (
			<div onClick={() => props.addPin(props.getVideoTime())} className="circle">
			</div>
	)
}

export default PinController;