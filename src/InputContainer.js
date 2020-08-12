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
      <>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={()=>this.props.onChange(this.state.value)}>send</button>
      </>
    );
  }
}

export default InputContainer;
