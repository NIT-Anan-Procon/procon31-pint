import React from 'react';

function PinController(props) {
	// let alertMessage = (label) => {
	//   alert(`${label}\n現在時刻 : ${props.getVideoTime()}秒`);
	// }
	
	return (
		{/* <div className="circle question" onClick={() => props.addPin(props.getVideoTime(), "0")}></div>
		<div className="circle understanding" onClick={() => props.addPin(props.getVideoTime(), "1")}></div>
		<div className="circle exclamation" onClick={() => props.addPin(props.getVideoTime(), "2")}></div> */}
		<div className="pinbutton" onClick={() => props.addPin(props.getVideoTime(),"0")}>
			<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="75" fill="#FE5600"/>
      </svg>
		</div>
	)
}

export default PinController;