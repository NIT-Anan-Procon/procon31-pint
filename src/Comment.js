import React from 'react';

function Comment(props){
  const [message, setMessage]=useState("");

  return{
    <>
      {setMessage(message:this.props.message);}
      <div>{message}</div>
    </>
  };
}

export default Comment;
