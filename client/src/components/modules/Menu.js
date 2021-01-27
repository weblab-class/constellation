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

        <div className="Menu-about"><p className="u-bold">What does Constellation do?</p> 
        <p>Constellation is an interactive course explorer, allowing users to visualize the wealth of classes at MIT, and their interdependencies, in a visually appealing and intuitive manner.
        </p></div> 
        <div className="Menu-getStarted"><p className="u-bold">Get Started</p> 
        <p> Construct colorful and informative directed networks of classes and their requirements, class by class. Get started by logging in!</p>
        </div>
        <div className="Menu-getStarted"><p className="u-bold">About</p> 
        <p> Constellation was created by Nicole Wong, Ben Wu, and Ezra Erives as part of the 2021 web.lab (web development) competition. This website is made possible by data from the FireRoad API, the vis.js and ReactJS libraries, and, of course, the wonderful teaching staff at web.lab 2021.</p>
        </div>
        </div>
    </>
    );
  }
}

export default Menu;
