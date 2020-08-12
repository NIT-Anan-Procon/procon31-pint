
import React from 'react';

import Comment from './Comment'

class CommentContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message:""
    };
    this.messageChange=this.messageChange.bind(this);
  }

  messageChange(){
    this.setState({message:this.props.message});
  }
  render(){
  return (
    <>
      <Comment comment={this.state.message}/>
    </>
  );
  }
}

export default CommentContainer;
