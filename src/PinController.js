import React from 'react';

function PinController(props) {
	let alertMessage = (label) => {
	  alert(`${label}\n現在時刻 : ${props.getVideoTime()}秒`);
	}
  
	return (
	  <div className="pin">
		<div className="circle question" onClick={() => alertMessage("question")}></div>
		<div className="circle understanding" onClick={() => alertMessage("understanding")}></div>
		<div className="circle exclamation" onClick={() => alertMessage("exclamation")}></div>
	  </div>
	)
}

export default PinController;