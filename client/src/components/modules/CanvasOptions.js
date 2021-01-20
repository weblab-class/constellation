import React, { Component } from "react";
import UserCollections from "./UserCollections.js";
import SaveCollection from "./SaveCollection.js";
import NewCollection from "./NewCollection.js";
import Dropdown from "./Dropdown.js";
import { navigate } from "@reach/router";

import "./CanvasOptions.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Function} resetCanvas callback function to clear graph, display bar
 * @param {Function} handleSaveCollection passed to SaveCollection
 * @param {Function} handleUserCollections passed to UserCollection
 * @param {Boolean} isDisplayCollections passed to SaveCollection 
 */

class CanvasOptions extends Component {
    constructor(props){
        super(props);
    }
  
    returnHome = () => {
        navigate("/");
    }
    
    render(){
        return(
            <nav className="CanvasOptions-navBar">
                <Dropdown />
                <UserCollections handleUserCollections={this.props.handleUserCollections}/>
                <NewCollection />
                <button type="submit" className="CanvasOptions-navButton" onClick={this.props.resetCanvas} disabled={this.props.isDisplayCollections}>reset</button>  
                <SaveCollection handleSaveCollection={this.props.handleSaveCollection} isDisplayCollections={this.props.isDisplayCollections}/>

                <button type="submit" className="CanvasOptions-navButton" onClick={this.returnHome} disabled={this.props.isDisplayCollections}>  Back to Home </button>
            </nav>
        )
    }
}

export default CanvasOptions;