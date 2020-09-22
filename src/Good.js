import React from 'react';
import axios from 'axios';

class Good extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            liked: false
        }
    }
  
    addGood = () => {
        const params = new URLSearchParams();
        params.append('msgId',this.state.messageId);
        axios
          .post("http://procon31-server.ddns.net/API/ReactSend.php",params)
          .then(res => {
            console.log(res)
          })
          .catch(err => alert(err));
    }

    goodClick = () => {
        this.setState({ 
            liked: true
        });
    };
    

    render(){
        return (
            <button onClick={this.goodClick}>{this.props.reactnum}</button>
        )
    }
}

export default Good;