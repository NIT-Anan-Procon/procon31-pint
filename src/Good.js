import React from 'react';
import axios from 'axios';
import heart1 from './image/heart1.png'
import heart2 from './image/heart2.png'

class Good extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            liked: false,
            count: Number(this.props.reactNum),
            messageID: this.props.messageID
        }
    }
  
    addGood = () => {
        const params = new URLSearchParams();
        params.append('messageID',this.state.messageID);
        axios
          .post("http://procon31-server.ddns.net/API/ReactSend.php",params)
          .then(res => {
            console.log(res)
          })
          .catch(err => alert(err));
    }

    goodClick = () => {
        {
            document.getElementById(this.state.messageID).src = heart2;
        };

        this.setState({ 
            liked: true,
            count: this.state.count + 1
        });
        this.addGood();
    };

    render(){
        return (
            <>
                <img src={heart1} id={this.state.messageID} clssName="LikesIcon-fa-heart" onClick={this.goodClick} 
                    style={
                        {
                            width: "32px",
                            height: "32px"
                        }
                    }
                />
                {this.state.count}
            </>
        )
    }
}

export default Good;