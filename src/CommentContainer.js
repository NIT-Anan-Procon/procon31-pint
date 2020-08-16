
import React from 'react';

//import Comment from './Comment'

class CommentContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message:""
    };
    this.SetMessage=this.SetMessage.bind(this);
  }

  SetMessage(){
    this.setState({message:this.props.message});
  }

  render(){
  return (
      <div>{this.state.message}</div>
  );
  }
}

export default CommentContainer;
