import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import About from "../modules/About.js";
import Menu from "../modules/Menu.js";

import "../../utilities.css";
import "./Login.css";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "157610550288-q8s3sjaa519htgsle5cjvqku1tgcdqob.apps.googleusercontent.com";

/**
 * Login page for constellation. Includes title, google login, and about info. Logging in will automatically redirect to explorer page
 *
 * Proptypes
 * @param {(UserObject) => ()} handleLogin function that takes in response from google, sets user id, and redirects to explorer
 * @param {(UserObject) => ()} handleLogout function that takes in response from google, sets user id to undefined, redirects to home
 * @param {string} userId id of current logged in user
 */

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

        <About toggleMenu={this.toggleMenu} />
        <div className="Login-centerFlex">

          <br />
          <div className="Login-title u-bold">
            constellation
          </div>
          <br />
          <div className="Login-description">
            a visually driven course explorer
          </div>
        </div>
        <Menu displayMenu={this.state.displayMenu} />
      </>
    );
  }
}

export default Login;
