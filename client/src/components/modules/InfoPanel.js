import React, { Component } from "react";
import "./InfoPanel.css";

/**
 * Info section for user
 *
 * Proptypes
 * @param {String} popupMessage message to be displayed in the sliding panel
 * 
 */

class InfoPanel extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {

    };
  }

  render() {
    //console.log("message to infopanel:", this.props.popupMessage);
    let className = this.props.popupMessage === "popup" ? "InfoPanel-container InfoPanel-panelClose" : "InfoPanel-container InfoPanel-panelOpen";
    return (
      <div className={className}>
        <div>{this.props.popupMessage}</div>
      </div>

    );
  }
}

export default InfoPanel;
