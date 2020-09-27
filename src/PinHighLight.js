import React from 'react';

class PinHighLight extends React.Component{
  render() {
    return(
      <div className="pinHighLightAndInformation">
        <div className="pinHighLight">
          <div className="pinHighLightTitle">ピンのハイライト</div>
          {this.props.message}
        </div>
        <div className="pinInfomation">
          <div className="pinHighLightTitle">ピンの情報</div>
          <div className="pinCommentTotal">
            <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.0665 0C6.09182 0 0 4.57582 0 11.6944C0 16.0739 1.8208 19.5835 5.33836 21.8414C5.57297 21.9921 5.84977 22.015 5.74588 22.4487C5.32635 24.2027 4.59697 27.3282 4.59697 27.3282C4.56609 27.4606 4.61578 27.5988 4.72365 27.6815C4.83146 27.7637 4.9776 27.7757 5.09748 27.7112C5.09748 27.7112 10.2458 24.6605 10.9324 24.2792C12.534 23.3637 13.9136 23.1862 14.9495 23.1862C22.0675 23.1862 30 20.3381 30 11.6179C30 4.8549 24.5493 0 15.0665 0Z" fill="#2E75B6"/>
            </svg>
            <div className="description">
              コメント
            </div>
            <div className="description">
              {this.props.pinMessageSum}
            </div>
          </div>
          <div className="pinGoodTotal">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.7653 1.63478C22.3967 -1.83871 16.2909 0.59357 14.9996 5.45005C13.7082 0.59357 7.60296 -1.83871 3.23444 1.63478C-0.951846 4.96425 -0.61376 11.5931 3.48464 16.9084C7.27138 21.82 13.1879 26.5524 14.7823 29.8377C14.8454 29.9687 14.9878 30 14.9997 30C15.012 30 15.1544 29.9687 15.218 29.8377C16.8113 26.5524 22.7279 21.82 26.5151 16.9084C30.614 11.5931 30.9515 4.96425 26.7653 1.63478Z" fill="#FF0057"/>
            </svg>
            <div className="description">
              いいね！
            </div>
            <div className="description">
              {this.props.pinReactSum}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PinHighLight;