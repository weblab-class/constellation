import React, { Component } from "react";
import "./Menu.css";

/**
 * Info section for user
 *
 * Proptypes
 * @param {boolean} displayMenu boolean that indicates whether to show menu or not
 */

class Menu extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    const classAddOn = this.props.displayMenu ? "Menu-box Menu-visible" : "Menu-box Menu-invisible";
    return (
    <>
        <div className={classAddOn}>
        <div className="Menu-about"><p className="u-bold">What does constellation do?</p> 
        <p>Constellation allows you to dive into the wealth of classes at MIT in a visual and dynamic manner. </p></div> 
        <div className="Menu-getStarted"><p className="u-bold">Get Started</p>
        <p>Constellation builds a network for classes that you select. 
            It also gives you the option to expand your network to include pre-requisites and related classes. 
            Get started by logging in!</p>
        </div>
        </div>
    </>
    );
  }
}

export default Menu;
