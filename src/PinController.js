import React from 'react';

function PinController(props) {
	let alertMessage = (label) => {
	  alert(`${label}\n現在時刻 : ${props.getVideoTime()}秒`);
	}
  
	return (
	  <div className="pin">
		<div className="circle question" onPress={(0, props.getVideoTime())}  onClick={() => alertMessage("question")}></div>
		<div className="circle understanding" onPress={(1, props.getVideoTime())} onClick={() => alertMessage("understanding")}></div>
		<div className="circle exclamation" onPress={(2, props.getVideoTime())} onClick={() => alertMessage("exclamation")}></div>
	  </div>
	)
}

export default PinController;