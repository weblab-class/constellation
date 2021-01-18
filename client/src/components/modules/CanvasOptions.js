import React, { Component } from "react";
import UserCollections from "./UserCollections.js";
import SaveCollection from "./SaveCollection.js";

import { navigate } from "@reach/router";
import { get } from "../../utilities";

import "./CanvasOptions.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {() => ()} resetCanvas callback function to clear graph, display bar
 * @param {() => ()} handleSaveCollection callback function to active pop-up for saving collection
 * @param {() => ()} handleUserCollections callback function to display of SideBar with collection options
 */

class CanvasOptions extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    
    returnHome = () => {
        navigate("/");
    }
    
    render(){
        return(
            
            <nav className="CanvasOptions-navBar">
                <button type="submit" className="CanvasOptions-navButton" onClick={this.props.resetCanvas} disabled={this.props.isDisplayCollections}>Reset Canvas</button>  
                <SaveCollection handleSaveCollection={this.props.handleSaveCollection} isDisplayCollections={this.props.isDisplayCollections}/>
                <UserCollections handleUserCollections={this.props.handleUserCollections}/>
                <button type="submit" className="CanvasOptions-navButton" onClick={this.returnHome} disabled={this.props.isDisplayCollections}>  Back to Home </button>
            </nav>
        )
    }
}

export default CanvasOptions;