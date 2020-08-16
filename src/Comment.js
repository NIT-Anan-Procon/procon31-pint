import React from 'react';

class Comment extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message:""
    }
  }

  render(){
    return(
        <p  {this.state.message}>
    );
  }
}

export default Comment;
