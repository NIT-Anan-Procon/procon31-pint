import React from 'react';

import CommentContainer from './CommentContainer';
import InputContainer from './InputContainer';

function CommentList() {
  return (
    <>
      <CommentContainer />
      <InputContainer onClick={(text)=>console.log(text)}/>
    </>
  );
}

export default CommentList;
