import React, { Component } from "react";
import "./About.css";
class About extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <button className="About-button" onClick={this.props.toggleMenu}>About</button>
      </>
    );
  }
}

export default About;
