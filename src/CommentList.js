import React from 'react';

import CommentContainer from './CommentContainer';
import InputContainer from './InputContainer';

function CommentList() {
  return (
    <div>
      <CommentContainer />
      <InputContainer onClick={(text)=>console.log(text)}/>
    </div>
  );
}

export default CommentList;
