import React from "login"

class login extends React.Component{
  render(){
    return(
      <div className="login">
        <input type="text" className="inputUsername">
        </input>
        <input type="text" className="inputPassword">
        </input>
      </div>
    )
  }
}

export default login;