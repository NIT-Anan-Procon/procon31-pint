import React from 'react';

// import Comment from './Comment'

class CommentContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message:""
    };
  };

  handleChange = () =>{
    this.setState({message: this.props.message});
  };

  componentDidUpdate(prevProps){
    if(!prevProps.message&&this.props.message){
      this.handleChange();
    }
  }

  render(){
    return (
      <>
      <div>{this.state.message} </div>
      {console.log("CC:"+this.state.message)}
      </>
    );
  }
}

export default CommentContainer;
