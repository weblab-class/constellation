import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import About from "../modules/About.js";
import Menu from "../modules/Menu.js";

import "../../utilities.css";
import "./Login.css";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Login extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      displayMenu: false,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  toggleMenu = () => {
    console.log("clicky");
    this.setState({
      displayMenu: !this.state.displayMenu,
    });
  }


  render() {
    console.log(this.state.displayMenu);
    return (
      <>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
        <About toggleMenu={this.toggleMenu}/>
        <div className="Login-centerFlex">
          <div className="Login-title u-bold">
            constellation
          </div> 
          <br />
          <div className="Login-description">
            a visually driven course explorer
          </div>
        </div>
        <Menu displayMenu={this.state.displayMenu}/>
      </>
    );
  }
}

export default Login;
