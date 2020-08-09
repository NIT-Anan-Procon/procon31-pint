import React from 'react';

class InputContainer extends React.Component  {
  constructor(props){
    super(props);
    this.state={
      value:""
    };
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={()=>this.props.onClick(this.state.value)}>send</button>
      </div>
    );
  }
}

export default InputContainer;
