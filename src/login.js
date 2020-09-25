import React from "login"

class login extends React.Component{
  render(){
    return(
      <div className="login">
        <form>
          <input type="text" className="inputUsername"></input>
          <input type="text" className="inputPassword"></input>
        </form>
      </div>
    )
  }
}

export default login;