import React from "react";
import PintLogo from "./image/PintLogo.png";

class Login extends React.Component{
  render(){
    return(
      <div className="login">
        <img src={PintLogo} alt="Pintロゴ" align="center" width="40%" height="40%"/>
        <form action="" method="post">
          <div className="inputUsername">
            ユーザーネーム:<input type="text"/>
          </div>
          <div className="inputPassword">
            パスワード:<input type="password"/>
          </div>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Login;