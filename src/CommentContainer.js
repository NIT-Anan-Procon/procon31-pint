import React from 'react';

import Comment from './Comment'

class CommentContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      
    };
  }

  return (
    <>
      <p>
        <Comment comment="ReactTest" />
        <Comment comment="commentList" />
      </p>
    </>
  );
}

export default CommentContainer;
