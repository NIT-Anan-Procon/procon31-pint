import React from 'react';

function PinController(props) {
	// let alertMessage = (label) => {
	//   alert(`${label}\n現在時刻 : ${props.getVideoTime()}秒`);
	// }
	
	return (
		<>
		<div className="circle question" onClick={() => props.addPin(props.getVideoTime(), "0")}></div>
		<div className="circle understanding" onClick={() => props.addPin(props.getVideoTime(), "1")}></div>
		<div className="circle exclamation" onClick={() => props.addPin(props.getVideoTime(), "2")}></div> 
		</>
	)
}

export default PinController;