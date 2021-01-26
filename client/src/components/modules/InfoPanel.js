import React, { Component } from "react";
import "./InfoPanel.css";

/**
 * Info section for user
 *
 * Proptypes
 * @param {boolean} displayMenu boolean that indicates whether to show menu or not
 */

class InfoPanel extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    console.log("message to infopanel:", this.props.popupMessage);
    let panelClassName = (this.props.popupMessage !== "popup") ? "InfoPanel-container InfoPanel-boxOpen" : "InfoPanel-container InfoPanel-boxClose";
    return (
        <div className={panelClassName}> 
            <div>{this.props.popupMessage}</div>
        </div>

    );
  }
}

export default InfoPanel;
